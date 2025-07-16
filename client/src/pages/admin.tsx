import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, Instagram, Camera, FileText, Users, LogOut } from "lucide-react";
import { useFrontendAuth } from "@/hooks/useFrontendAuth";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InstagramUploadManager from '@/components/InstagramUploadManager';
import AlbumEventsManager from '@/components/AlbumEventsManager';
import MaterialListManager from '@/components/MaterialListManager';
import ProfessoresManager from '@/components/ProfessoresManager';
import PageConfigManager from '@/components/PageConfigManager';

export default function AdminPage() {
  const { isAuthenticated, user, isLoading, login, logout } = useFrontendAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    const success = login(email, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo!",
      });
      setEmail("");
      setPassword("");
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive",
      });
    }
    
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
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
              Faça login para acessar o painel administrativo
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-school-orange hover:bg-orange-600 text-white py-3"
                size="lg"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              Acesso restrito a administradores autorizados
            </p>
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

        {/* Admin Management Tabs */}
        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="album" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Álbum OSE
            </TabsTrigger>
            <TabsTrigger value="material" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lista de Material
            </TabsTrigger>
            <TabsTrigger value="professores" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Professores
            </TabsTrigger>
            <TabsTrigger value="configs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instagram" className="mt-6">
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
          </TabsContent>

          <TabsContent value="album" className="mt-6">
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
          </TabsContent>

          <TabsContent value="material" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-school-orange" />
                  Gerenciamento de Lista de Material
                </CardTitle>
                <p className="text-gray-600">
                  Configure os links do Google Drive para as listas de material por segmento e série
                </p>
              </CardHeader>
              <CardContent>
                <MaterialListManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professores" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Gerenciamento de Professores
                </CardTitle>
                <p className="text-gray-600">
                  Adicione, edite e gerencie o corpo docente da escola
                </p>
              </CardHeader>
              <CardContent>
                <ProfessoresManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Configurações de Páginas
                </CardTitle>
                <p className="text-gray-600">
                  Gerencie as imagens e configurações salvas de cada página para garantir consistência no deployment
                </p>
              </CardHeader>
              <CardContent>
                <PageConfigManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}