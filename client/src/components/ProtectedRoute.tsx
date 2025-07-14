import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ children, redirectTo = '/admin' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, navigate] = useLocation();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-school-orange mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Show access denied page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        {/* Enhanced Glassmorphism Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white/90 to-amber-50/80"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-400/25 via-amber-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <Card className="max-w-md w-full bg-white/30 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="h-16 w-16 text-slate-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Acesso Restrito</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-slate-600">
                Esta página é restrita a administradores. 
                Faça login para acessar este conteúdo.
              </p>
              <Button 
                onClick={() => navigate(redirectTo)}
                className="w-full bg-school-orange hover:bg-orange-600 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render protected content if authenticated
  return <>{children}</>;
}