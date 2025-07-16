import { useState, useEffect } from 'react';
import { frontendAuth } from '@/lib/frontendAuth';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { email: string; isAuthenticated: boolean } | null;
}

export function useFrontendAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null
  });

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const isAuth = frontendAuth.isAuthenticated();
      const user = frontendAuth.getUser();
      
      setAuthState({
        isAuthenticated: isAuth,
        isLoading: false,
        user
      });
    };

    checkAuth();

    // Set up storage event listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ose_admin_auth') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (email: string, password: string): boolean => {
    const success = frontendAuth.login(email, password);
    
    if (success) {
      const user = frontendAuth.getUser();
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user
      });
    }
    
    return success;
  };

  const logout = () => {
    frontendAuth.logout();
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null
    });
  };

  const refreshSession = () => {
    const success = frontendAuth.refreshSession();
    if (!success) {
      logout();
    }
    return success;
  };

  return {
    ...authState,
    login,
    logout,
    refreshSession
  };
}