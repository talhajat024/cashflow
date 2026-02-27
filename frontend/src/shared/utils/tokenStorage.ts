// features/auth/utils/tokenStorage.ts
import type { User } from "../../features/user/types/user.types";

// Use proper typing instead of 'any'
let userData: User | null = null;

export const tokenStorage = {
    setTokens: (accessToken: string, refreshToken: string) => {
        if (!document.cookie.includes('XSRF-TOKEN=')) {
            console.warn('CSRF token not found in cookies');
        }
    },
    
    getAccessToken: (): null => {
        console.warn('Access tokens are HttpOnly - cannot access from JS');
        return null;
    },

    getRefreshToken: (): null => {
        console.warn('Refresh tokens are HttpOnly - cannot access from JS');
        return null;
    },

    setUser: (user: User) => {
        userData = user;
        try {
            sessionStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Failed to persist user data:', error);
        }
    },

    getUser: (): User | null => {
        if (userData) {
            return userData;
        }
        
        const stored = sessionStorage.getItem('user');
        if (stored) {
            try {
                userData = JSON.parse(stored) as User;
                return userData;
            } catch {
                sessionStorage.removeItem('user');
                return null;
            }
        }
        return null;
    },

    clearTokens: () => {
        userData = null;
        sessionStorage.removeItem('user');
        console.log('User data cleared');
    },
    

    hasTokens: (): boolean => {
        const hasCsrfToken = document.cookie.includes('XSRF-TOKEN=');
        
        const hasUserData = !!tokenStorage.getUser();
        
        if (hasCsrfToken && !hasUserData) {
            console.warn('Inconsistent auth state: CSRF token present but no user data');
            return false;
        }
        
        return hasCsrfToken;
    },

    getAuthState: () => {
        return {
            isAuthenticated: tokenStorage.hasTokens(),
            hasUserData: !!tokenStorage.getUser(),
            cookies: document.cookie
                .split('; ')
                .filter(c => c.includes('XSRF-TOKEN') || c.includes('access'))
                .map(c => c.split('=')[0]),
        };
    }
};