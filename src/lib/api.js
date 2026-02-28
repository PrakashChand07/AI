import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add access token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If 401, user needs to login again
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');

                const currentPath = window.location.pathname;
                if (currentPath && !currentPath.includes('/login') && !currentPath.includes('/register')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

// Auth API functions
export const authAPI = {
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    login: async (data) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    googleAuth: async (credential) => {
        const response = await api.post('/auth/google', { credential });
        return response.data;
    },

    verifyEmail: async (data) => {
        const response = await api.post('/auth/verify', data);
        return response.data;
    },

    forgotPassword: async (data) => {
        const response = await api.post('/auth/forgot-password', data);
        return response.data;
    },
};

export default api;
