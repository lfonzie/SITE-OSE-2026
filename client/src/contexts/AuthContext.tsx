
import React, { createContext, useContext } from 'react';
import { useAuth as useReplitAuth } from '@/hooks/useAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  isAuthorized: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useReplitAuth();
  
  // Email autorizado para admin
  const AUTHORIZED_EMAIL = "fonseca@colegioose.com.br";
  const isAuthorized = isAuthenticated && user?.email === AUTHORIZED_EMAIL;

  const logout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, isAuthorized, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
