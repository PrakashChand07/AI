import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '@/lib/api';

// Register mutation
export const useRegister = () => {
    return useMutation({
        mutationFn: authAPI.register,
    });
};

// Login mutation
export const useLogin = (updateUser) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authAPI.login,
        onSuccess: (data) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            if (updateUser) {
                updateUser(data.user);
            }
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
};

// Logout mutation
export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authAPI.logout,
        onSuccess: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');

                // delete remaining auth cookies if they existed originally
                document.cookie = `token=; path=/; max-age=-1`;

                queryClient.clear();
                window.location.href = '/';
            }
        },
    });
};

// Get current user query
export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: authAPI.getCurrentUser,
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
        retry: false,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
