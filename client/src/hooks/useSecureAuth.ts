import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthUser {
  email: string;
  loginTime: number;
  lastActivity?: number;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
}

interface LoginResponse {
  success: boolean;
  user?: AuthUser;
  message?: string;
  lockoutUntil?: number;
}

export function useSecureAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null
  });
  const { toast } = useToast();

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/auth/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: data.user
          });
          return;
        }
      }

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null
      });
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.user) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: data.user
        });
        return true;
      } else {
        // Verificar se é bloqueio por tentativas
        if (response.status === 429) {
          const lockoutUntil = data.lockoutUntil;
          if (lockoutUntil) {
            const timeRemaining = Math.ceil((lockoutUntil - Date.now()) / 60000);
            toast({
              title: "Conta Bloqueada",
              description: `Muitas tentativas de login. Tente novamente em ${timeRemaining} minutos.`,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Erro no Login",
            description: data.message || "Credenciais inválidas",
            variant: "destructive",
          });
        }
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro de Conexão",
        description: "Não foi possível conectar ao servidor. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Logout Realizado",
          description: "Você foi desconectado com sucesso.",
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null
      });
    }
  };

  const refreshAuth = () => {
    checkAuthStatus();
  };

  return {
    ...authState,
    login,
    logout,
    refreshAuth
  };
}