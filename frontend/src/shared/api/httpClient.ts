import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

let csrfToken: string | null = null;

// CSRF Helpers

const extractCsrfTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const refreshCsrfToken = () => {
  csrfToken = extractCsrfTokenFromCookie();
};

// Auth endpoints that should SKIP CSRF check
const isAuthEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return (
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh')
  );
};

// Request Interceptor

httpClient.interceptors.request.use((config) => {
  
  if (isAuthEndpoint(config.url)) {
    return config;
  }

  // For all other requests, attach CSRF token
  const token = csrfToken || extractCsrfTokenFromCookie();
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

// ── Response Interceptor 

httpClient.interceptors.response.use(
  (response) => {
    // Update CSRF token if server sends a new one
    const newCsrfToken =
      response.headers['x-csrf-token'] ||
      response.headers['x-xsrf-token'];

    if (newCsrfToken) {
      csrfToken = newCsrfToken;
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only fire logout event for authenticated requests
      // NOT for login/register failures (wrong password etc.)
      if (!isAuthEndpoint(error.config?.url)) {
        console.warn('Unauthorized access detected — dispatching logout');
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }

    if (error.response?.status === 419) {
      console.warn('CSRF token mismatch, refreshing...');
      refreshCsrfToken();
      const config = error.config;
      config.headers['X-CSRF-TOKEN'] = csrfToken;
      config.headers['X-XSRF-TOKEN'] = csrfToken;
      return httpClient(config);
    }

    // Reject with full error object — keeps error.response.data.message intact
    // AuthContext needs the full error to extract the message correctly
    return Promise.reject(error);
  }
);

// Auth State Helper 

export const isAuthenticated = (): boolean => {
  return document.cookie.includes('XSRF-TOKEN=');
};

// Initialize CSRF token on app load
refreshCsrfToken();