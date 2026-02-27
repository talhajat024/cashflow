// features/auth/api/auth.api.ts
import { httpClient, refreshCsrfToken } from '../../../shared/api/httpClient';
import type { LoginCredentials, SignupData, AuthResponse, User } from '../types/auth.types';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
        const response = await httpClient.post<AuthResponse>('/auth/login', credentials);
        refreshCsrfToken(); 
        return response.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}

export async function signup(data: SignupData): Promise<AuthResponse> {
    try {
        const response = await httpClient.post<AuthResponse>('/auth/register', data);
        refreshCsrfToken(); 
        return response.data;
    } catch (error) {
        console.error('Signup API error:', error);
        throw error;
    }
}

export async function logout(): Promise<void> {
    try {
        await httpClient.post('/auth/logout');
    } catch (error) {
        console.error('Logout API error:', error);
    } finally {
        refreshCsrfToken();
    }
}

export async function getCurrentUser(): Promise<User> {
    try {
        const response = await httpClient.get<User>('/auth/me');
        return response.data;
    } catch (error) {
        console.error('Get current user API error:', error);
        throw error;
    }
}

export async function refreshToken(): Promise<void> {
    try {
        await httpClient.post('/auth/refresh');
        refreshCsrfToken();
    } catch (error) {
        console.error('Refresh token API error:', error);
        throw error;
    }
}