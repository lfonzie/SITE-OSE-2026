import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

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

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      return await res.json();
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
      const res = await apiRequest("POST", "/api/auth/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/user"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  return {
    user,
    isLoading: userQuery.isLoading,
    isAuthenticated: !!user?.isAuthenticated,
    loginMutation,
    logoutMutation,
    error: userQuery.error,
  };
}