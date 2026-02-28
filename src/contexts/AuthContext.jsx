'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLogin, useLogout, useRegister, useCurrentUser } from '@/lib/hooks/useAuth';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    const [loading, setLoading] = useState(true);

    const updateUser = useCallback((newUser) => {
        setUser(newUser);
    }, []);

    const loginMutation = useLogin(updateUser);
    const logoutMutation = useLogout();
    const registerMutation = useRegister();

    // Use React query for fetching user just as backup validator, 
    // keeping context populated from localStorage immediately for UX
    const { data: currentUserData, isLoading: queryLoading, isError: queryError } = useCurrentUser();

    useEffect(() => {
        if (currentUserData?.user) {
            setUser(currentUserData.user);
            localStorage.setItem('user', JSON.stringify(currentUserData.user));
        }
        if (!queryLoading) {
            setLoading(false);
        }
    }, [currentUserData, queryLoading]);

    // Handle auto logout on error or invalid token from query backend
    useEffect(() => {
        if (queryError) {
            setUser(null);
        }
    }, [queryError]);

    const logout = () => {
        setUser(null);
        logoutMutation.mutate();
    };

    const value = {
        user,
        loading: loading || queryLoading,
        loginMutation,
        logoutMutation,
        registerMutation,
        isAuthenticated: !!user,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
