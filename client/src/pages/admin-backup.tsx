import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon, Trash2, Eye, Edit } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import HeroImageManager from '@/components/HeroImageManager';
import InstagramUploadManager from '@/components/InstagramUploadManager';

interface InstagramPost {
  id: string;
  imageUrl: string;
  uploadedAt: Date;
}

interface LoginFormData {
  email: string;
  password: string;
}

export default function AdminPage() {
  const { isAuthenticated, user, isLoading, loginMutation, logoutMutation } = useAuth();
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  // Form de login
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onError: (error) => {
        toast({
          title: "Erro no Login",
          description: error.message || "Credenciais inválidas",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Login realizado",
          description: "Bem-vindo ao painel administrativo",
        });
      },
    });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadInstagramPosts();
    }
  }, [isAuthenticated]);

  const loadInstagramPosts = async () => {
    // Carregar imagens da pasta IG via API
    try {
      const response = await fetch('/api/instagram-images');
      if (response.ok) {
        const images = await response.json();
        const posts: InstagramPost[] = images.map((image: any) => ({
          id: image.filename.replace(/\.[^/.]+$/, ""), // Remove extensão para usar como ID
          imageUrl: `/api/images/IG/${image.filename}`,
          uploadedAt: new Date(image.uploadedAt)
        }));

        setInstagramPosts(posts.sort((a, b) => 
          b.uploadedAt.getTime() - a.uploadedAt.getTime()
        ));
      }
    } catch (error) {
      console.error('Erro ao carregar imagens do IG:', error);
    }

    // Fallback: carregar do localStorage se API falhar
    const savedPosts = localStorage.getItem("instagram_posts");
    if (savedPosts && instagramPosts.length === 0) {
      try {
        const posts = JSON.parse(savedPosts).map((post: any) => ({
          ...post,
          uploadedAt: new Date(post.uploadedAt)
        }));
        setInstagramPosts(posts);
      } catch (error) {
        localStorage.removeItem("instagram_posts");
      }
    }
  };

  const saveInstagramPosts = (posts: InstagramPost[]) => {
    localStorage.setItem("instagram_posts", JSON.stringify(posts));
    setInstagramPosts(posts);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro no upload",
        description: "O arquivo deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Criar nome único para o arquivo
      const timestamp = Date.now();
      const extension = file.name.split('.').pop() || 'jpg';
      const fileName = `instagram_${timestamp}.${extension}`;

      // Criar FormData para envio
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);

      // Enviar arquivo para o servidor
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      const result = await response.json();
      const imageUrl = result.path; // Use the path returned by the server

      const newPost: InstagramPost = {
        id: timestamp.toString(),
        imageUrl,
        uploadedAt: new Date()
      };

      // Recarregar lista de imagens do servidor
      await loadInstagramPosts();

      toast({
        title: "Foto enviada com sucesso!",
        description: "A foto foi adicionada ao feed do Instagram.",
      });

      // Limpar input
      e.target.value = '';
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar a foto.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deletePost = async (postId: string) => {
    const postToDelete = instagramPosts.find(post => post.id === postId);
    if (!postToDelete) return;

    try {
      // Extrair nome do arquivo da URL
      const filename = postToDelete.imageUrl.split('/').pop();

      // Deletar arquivo no servidor
      const response = await fetch(`/api/delete-image/${filename}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remover da lista local
        const updatedPosts = instagramPosts.filter(post => post.id !== postId);
        setInstagramPosts(updatedPosts);
        saveInstagramPosts(updatedPosts);

        toast({
          title: "Foto removida",
          description: "A foto foi removida do servidor e do feed.",
        });
      } else {
        throw new Error('Erro ao deletar imagem no servidor');
      }
    } catch (error) {
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível remover a foto do servidor.",
        variant: "destructive",
      });
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-school-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-body">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Mostrar login se não estiver autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-school-orange via-school-brown to-orange-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-school-brown font-headline">
              Admin OSE
            </CardTitle>
            <p className="text-center text-slate-600 font-body">
              Login Administrativo
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
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
          <h1 className="text-3xl font-bold text-school-brown">
            Painel Administrativo OSE
          </h1>
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

        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="instagram">Feed Instagram</TabsTrigger>
            <TabsTrigger value="editor">Editor Visual</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="instagram" className="space-y-6">
            <InstagramUploadManager />
          </TabsContent>

          {/* Editor Visual Tab */}
          <TabsContent value="editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit size={24} />
                  Editor Visual de Páginas
                </CardTitle>
                <p className="text-gray-600">
                  Editor simplificado para personalizar textos e imagens das páginas
                </p>
              </CardHeader>
              <CardContent>
                <HeroImageManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Configurações adicionais serão implementadas conforme necessário.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}