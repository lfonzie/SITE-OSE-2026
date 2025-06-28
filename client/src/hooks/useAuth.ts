import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";

// Helper function to get auth token from localStorage
function getAuthToken(): string | null {
  try {
    return localStorage.getItem('authToken');
  } catch {
    return null;
  }
}

interface User {
  email: string;
  isAuthenticated: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

export function useAuth() {
  const userQuery = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: (failureCount, error) => {
      // Não tentar novamente em caso de erro 401
      if (error.message.includes('401')) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: true,
  });

  const user = userQuery.data;

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const response = await apiRequest('/api/auth/login', {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["/api/auth/user"], data.user);
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("/api/auth/logout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/user"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  const login = async (credentials: { email: string; password: string }) => {
    return loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  return {
    user,
    isLoading: userQuery.isLoading,
    isAuthenticated: !!user?.isAuthenticated,
    login,
    logout,
    loginMutation,
    logoutMutation,
    error: userQuery.error,
  };
}