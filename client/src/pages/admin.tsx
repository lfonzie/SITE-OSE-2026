
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon, Trash2, Eye } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface InstagramPost {
  id: string;
  imageUrl: string;
  uploadedAt: Date;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Verificar se já está autenticado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isLoggedIn);
    
    if (isLoggedIn) {
      loadInstagramPosts();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "fonseca@colegioose.com.br" && password === "19082018!") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      loadInstagramPosts();
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
      toast({
        title: "Erro no login",
        description: "E-mail ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setEmail("");
    setPassword("");
  };

  const loadInstagramPosts = () => {
    const savedPosts = localStorage.getItem("instagram_posts");
    if (savedPosts) {
      try {
        const posts = JSON.parse(savedPosts).map((post: any) => ({
          ...post,
          uploadedAt: new Date(post.uploadedAt)
        }));
        
        // Validar se as imagens existem
        const validPosts: InstagramPost[] = [];
        
        posts.forEach((post: InstagramPost) => {
          const img = new Image();
          img.onload = () => {
            if (!validPosts.find(p => p.id === post.id)) {
              validPosts.push(post);
              setInstagramPosts(validPosts.sort((a, b) => 
                b.uploadedAt.getTime() - a.uploadedAt.getTime()
              ));
            }
          };
          img.onerror = () => {
            console.log(`Imagem inválida removida do admin: ${post.imageUrl}`);
          };
          img.src = post.imageUrl;
        });

        // Se não há posts válidos, limpar localStorage
        if (posts.length === 0) {
          localStorage.removeItem("instagram_posts");
        }
      } catch (error) {
        console.error('Erro ao carregar posts do localStorage:', error);
        localStorage.removeItem("instagram_posts");
        setInstagramPosts([]);
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
      const imageUrl = `/images/IG/${fileName}`;
      
      const newPost: InstagramPost = {
        id: timestamp.toString(),
        imageUrl,
        uploadedAt: new Date()
      };

      const updatedPosts = [newPost, ...instagramPosts].slice(0, 8); // Manter apenas 8 fotos
      saveInstagramPosts(updatedPosts);

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

  const deletePost = (postId: string) => {
    const updatedPosts = instagramPosts.filter(post => post.id !== postId);
    saveInstagramPosts(updatedPosts);
    
    toast({
      title: "Foto removida",
      description: "A foto foi removida do feed do Instagram.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-school-brown">
              Painel Administrativo OSE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu-email@colegioose.com.br"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-school-orange text-white font-semibold"
              >
                Entrar
              </Button>
            </form>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="text-school-orange" />
                  Gerenciar Feed do Instagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="photo-upload" className="block mb-2">
                    Adicionar Nova Foto
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="flex-1"
                    />
                    <Button 
                      disabled={uploading}
                      className="bg-school-orange text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Enviando...' : 'Upload'}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Máximo 8 fotos. Formatos: JPG, PNG, GIF. Tamanho máximo: 5MB.
                  </p>
                  <div className="mt-4">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        localStorage.removeItem("instagram_posts");
                        setInstagramPosts([]);
                        toast({
                          title: "Cache limpo",
                          description: "Todas as fotos do cache foram removidas.",
                        });
                      }}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      🗑️ Limpar Cache do Instagram
                    </Button>
                  </div>
                </div>

                {/* Grid de fotos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {instagramPosts.map((post) => (
                    <div key={post.id} className="relative group">
                      <img
                        src={post.imageUrl}
                        alt="Instagram post"
                        className="w-full h-48 rounded-lg shadow-lg object-cover"
                        onError={(e) => {
                          console.log(`Erro ao carregar imagem no admin: ${post.imageUrl}`);
                          e.currentTarget.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePost(post.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {post.uploadedAt.toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  ))}
                  
                  {/* Placeholders para fotos vazias */}
                  {Array.from({ length: Math.max(0, 8 - instagramPosts.length) }).map((_, index) => (
                    <div 
                      key={`placeholder-${index}`}
                      className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center"
                    >
                      <ImageIcon className="text-gray-400" size={32} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Editor Visual do Site</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Funcionalidade em desenvolvimento. Em breve você poderá editar o conteúdo 
                  do site usando um editor visual drag & drop.
                </p>
                <Button 
                  onClick={() => window.open('/editor', '_blank')}
                  className="bg-school-orange text-white"
                >
                  Ir para Editor (Beta)
                </Button>
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
