
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Instagram, Camera } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InstagramUploadManager from '@/components/InstagramUploadManager';
import AlbumEventsManager from '@/components/AlbumEventsManager';

interface LoginFormData {
  email: string;
  password: string;
}

export default function AdminPage() {
  const { isAuthenticated, user, isLoading, loginMutation, logoutMutation } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    document.title = "Admin - OSE";
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-school-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-school-brown">
              Login Administrativo
            </CardTitle>
            <p className="text-gray-600">
              Acesse o painel de controle da OSE
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Digite seu email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Digite sua senha"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit"
                  className="w-full bg-school-orange text-white font-semibold"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Entrando..." : "Fazer Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-school-brown">
              Painel Administrativo OSE
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie o conteúdo do site da escola
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => window.open('/', '_blank')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye size={20} />
              Ver Site
            </Button>
            <Button 
              onClick={handleLogout}
              variant="destructive"
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Instagram Management Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="w-6 h-6 text-pink-600" />
              Gerenciamento do Feed Instagram
            </CardTitle>
            <p className="text-gray-600">
              Faça upload e gerencie as imagens que aparecem no feed do Instagram no site
            </p>
          </CardHeader>
          <CardContent>
            <InstagramUploadManager />
          </CardContent>
        </Card>

        {/* Album Events Management Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-amber-600" />
                Gerenciamento do Álbum OSE
              </CardTitle>
              <p className="text-gray-600">
                Adicione e gerencie eventos e links de fotos do álbum escolar
              </p>
            </CardHeader>
            <CardContent>
              <AlbumEventsManager />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
