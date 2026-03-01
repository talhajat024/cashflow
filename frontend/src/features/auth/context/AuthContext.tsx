import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../../../shared/utils/tokenStorage";
import * as authApi from '../api/auth.api';
import type { LoginCredentials, SignupData, AuthContextType } from "../types/auth.types";
import type { User } from "../../user/types/user.types";

const getInitials = (name: string): string => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
};

const transformUser = (data: any): User => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role || 'user',
        avatar: data.avatar,
        initials: getInitials(data.name),
        createdAt: data.createdAt || new Date().toISOString(),
        lastLogin: data.lastLogin,
    };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const initialCheckDone = useRef(false);
    const isRefreshingRef = useRef(false);

    // handle unauthorized events
    useEffect(() => {
        const handleUnauthorized = () => {
            console.log("Unauthorized access detected - logging out");
            tokenStorage.clearTokens();
            setUser(null);
            navigate('/login', { replace: true });
        };
        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, [navigate]);

    // initialize auth state
    useEffect(() => {
        const initializeAuth = async () => {
            if (initialCheckDone.current) return;

            try {
                setIsLoading(true);
                setError(null);

                if (tokenStorage.hasTokens()) {
                    console.log("CSRF token found - attempting to restore session...");

                    const storedUser = tokenStorage.getUser();
                    if (storedUser) {
                        console.log("Found stored user data:", storedUser.email);
                        setUser(storedUser);
                    }

                    try {
                        console.log("Verifying session with backend...");
                        const userData = await authApi.getCurrentUser();
                        console.log("Session verified for:", userData.email);
                        const appUser = transformUser(userData);
                        setUser(appUser);
                        tokenStorage.setUser(appUser); 
                    } catch (err) {
                        console.error("Session verification failed");
                        tokenStorage.clearTokens();
                        setUser(null);
                    }
                } else {
                    console.log("No CSRF token found - user is not authenticated");
                }
            } catch (err) {
                console.error("Auth initialization error:", err);
                setError("Failed to initialize authentication");
            } finally {
                setIsLoading(false);
                initialCheckDone.current = true;
            }
        };

        initializeAuth();
    }, []);

    // login handler
    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            setError(null);
            console.log("Attempting login for:", credentials.email);

            const response = await authApi.login(credentials);
            console.log("Login successful for:", response.user.email);

            const appUser = transformUser(response.user);
            tokenStorage.setUser(appUser);
            setUser(appUser); 
            navigate('/dashboard/overview', { replace: true });
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Login failed';
            console.error("Login error:", errorMessage);
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // signup handler
    const signup = useCallback(async (data: SignupData) => {
        try {
            setIsLoading(true);
            setError(null);
            console.log("Attempting signup for:", data.email);

            const response = await authApi.signup(data);
            console.log("Signup successful for:", response.user.email);

            const appUser = transformUser(response.user);
            tokenStorage.setUser(appUser);
            setUser(appUser);
            navigate('/dashboard/overview', { replace: true });
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Signup failed';
            console.error("Signup error:", errorMessage);
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // logout handler
    const logout = useCallback(async () => {
        try {
            setIsLoading(true);
            console.log("Logging out...");

            try {
                await authApi.logout();
                console.log("Logout API call successful");
            } catch (err) {
                console.error("Logout API error (continuing with local cleanup):", err);
            }

            tokenStorage.clearTokens();
            setUser(null);
            setError(null);
            console.log("Local auth state cleared");
            navigate('/login', { replace: true });
        } catch (err) {
            console.error("Unexpected logout error:", err);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // refresh user
    const refreshUser = useCallback(async (): Promise<User> => {
        try {
            console.log("Refreshing user data...");
            const userData = await authApi.getCurrentUser(); 
            const appUser = transformUser(userData);
            setUser(appUser);
            tokenStorage.setUser(appUser);
            console.log("User data refreshed for:", appUser.email);
            return appUser;
        } catch (err) {
            console.error("Failed to refresh user:", err);
            throw err;
        }
    }, []);

    // force refresh token
    const forceRefreshToken = useCallback(async (): Promise<void> => {
        if (isRefreshingRef.current) { 
            console.log("Token refresh already in progress");
            return;
        }
        try {
            isRefreshingRef.current = true; 
            console.log("Forcing token refresh...");
            await authApi.refreshToken();
            console.log("Token refresh successful");
        } catch (err) {
            console.error("Token refresh failed:", err);
            tokenStorage.clearTokens();
            setUser(null);
            navigate('/login', { replace: true });
            throw err;
        } finally {
            isRefreshingRef.current = false; 
        }
    }, [navigate]); 

    // check role
    const hasRole = useCallback((role: string): boolean => {
        return user?.role === role;
    }, [user]);

    const value: AuthContextType = {
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshUser,
        forceRefreshToken,
        hasRole,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };