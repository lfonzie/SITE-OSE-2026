
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Type, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  Upload,
  Check,
  Palette,
  Layout,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PageElement {
  id: string;
  type: 'text' | 'image' | 'section';
  content: any;
  styles: any;
}

interface ImageItem {
  filename: string;
  uploadedAt: string;
  url: string;
}

export default function SimpleVisualComposer() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [elements, setElements] = useState<PageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const { toast } = useToast();

  const pages = [
    { value: 'home', label: 'Página Inicial' },
    { value: 'educacao-infantil', label: 'Educação Infantil' },
    { value: 'fundamental-1', label: 'Fundamental I' },
    { value: 'fundamental-2', label: 'Fundamental II' },
    { value: 'ensino-medio', label: 'Ensino Médio' },
    { value: 'bilingue', label: 'Programa Bilíngue' },
    { value: 'integral', label: 'Programa Integral' },
    { value: 'missao-valores', label: 'Missão e Valores' },
    { value: 'legacy', label: 'Legado OSE' }
  ];

  useEffect(() => {
    loadImages();
    loadPageContent();
  }, [selectedPage]);

  const loadImages = async () => {
    try {
      const response = await fetch('/api/instagram-images');
      if (response.ok) {
        const imageData = await response.json();
        const imageItems: ImageItem[] = imageData.map((img: any) => ({
          filename: img.filename,
          uploadedAt: img.uploadedAt,
          url: `/api/images/IG/${img.filename}`
        }));
        setImages(imageItems.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        ));
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  };

  const loadPageContent = () => {
    // Simular carregamento de conteúdo da página
    const mockElements: PageElement[] = [
      {
        id: '1',
        type: 'section',
        content: { title: 'Seção Hero' },
        styles: { backgroundColor: '#ff7f00', color: 'white' }
      },
      {
        id: '2',
        type: 'text',
        content: { text: 'Texto principal da página' },
        styles: { fontSize: '18px', color: '#333' }
      },
      {
        id: '3',
        type: 'image',
        content: { src: '/images/horizontal_1.png', alt: 'Imagem exemplo' },
        styles: { width: '100%', borderRadius: '8px' }
      }
    ];
    setElements(mockElements);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const timestamp = Date.now();
      const extension = file.name.split('.').pop() || 'jpg';
      const fileName = `editor_${timestamp}.${extension}`;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      await loadImages();

      toast({
        title: "Imagem enviada com sucesso!",
        description: "A imagem está disponível na galeria.",
      });

      e.target.value = '';
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar a imagem.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const addElement = (type: 'text' | 'image' | 'section') => {
    const newElement: PageElement = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? { text: 'Novo texto' } : 
               type === 'image' ? { src: '/images/horizontal_1.png', alt: 'Nova imagem' } :
               { title: 'Nova seção' },
      styles: {}
    };
    
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<PageElement>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Toolbar */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center">
              <Layout size={16} className="mr-2" />
              Página
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pages.map(page => (
                  <SelectItem key={page.value} value={page.value}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Elementos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => addElement('text')} 
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Type size={16} className="mr-2" />
              Adicionar Texto
            </Button>
            <Button 
              onClick={() => addElement('image')} 
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <ImageIcon size={16} className="mr-2" />
              Adicionar Imagem
            </Button>
            <Button 
              onClick={() => addElement('section')} 
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Layout size={16} className="mr-2" />
              Adicionar Seção
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center">
              <ImageIcon size={16} className="mr-2" />
              Galeria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full mb-3">
                  <ImageIcon size={16} className="mr-2" />
                  Gerenciar Imagens
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Galeria de Imagens</DialogTitle>
                </DialogHeader>
                
                {/* Upload */}
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="flex-1"
                    />
                    <Button 
                      disabled={uploading}
                      className="bg-school-orange text-white hover:bg-school-orange/90"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Enviando...' : 'Upload'}
                    </Button>
                  </div>
                </div>

                {/* Grid de imagens */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.filename}
                      className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-school-orange transition-all"
                      onClick={() => {
                        navigator.clipboard.writeText(image.url);
                        toast({
                          title: "URL copiada!",
                          description: "A URL da imagem foi copiada para a área de transferência.",
                        });
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.filename}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs truncate">{image.filename}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Canvas */}
      <div className="lg:col-span-2 border rounded-lg bg-white p-4 overflow-y-auto">
        <div className="space-y-4">
          {elements.map((element) => (
            <div
              key={element.id}
              onClick={() => setSelectedElement(element.id)}
              className={`p-2 border rounded cursor-pointer transition-all ${
                selectedElement === element.id 
                  ? 'border-school-orange bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {element.type === 'text' && (
                <div style={element.styles}>
                  {element.content.text}
                </div>
              )}
              {element.type === 'image' && (
                <img 
                  src={element.content.src} 
                  alt={element.content.alt}
                  className="max-w-full h-auto"
                  style={element.styles}
                />
              )}
              {element.type === 'section' && (
                <div 
                  className="p-4 rounded"
                  style={element.styles}
                >
                  <h3 className="font-semibold">{element.content.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="lg:col-span-1">
        {selectedEl ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Settings size={16} className="mr-2" />
                Propriedades - {selectedEl.type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="style">Estilo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-3">
                  {selectedEl.type === 'text' && (
                    <div>
                      <label className="text-sm font-medium">Texto</label>
                      <Textarea
                        value={selectedEl.content.text}
                        onChange={(e) => updateElement(selectedEl.id, {
                          content: { ...selectedEl.content, text: e.target.value }
                        })}
                        rows={4}
                      />
                    </div>
                  )}
                  
                  {selectedEl.type === 'image' && (
                    <>
                      <div>
                        <label className="text-sm font-medium">URL da Imagem</label>
                        <Input
                          value={selectedEl.content.src}
                          onChange={(e) => updateElement(selectedEl.id, {
                            content: { ...selectedEl.content, src: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Texto Alternativo</label>
                        <Input
                          value={selectedEl.content.alt}
                          onChange={(e) => updateElement(selectedEl.id, {
                            content: { ...selectedEl.content, alt: e.target.value }
                          })}
                        />
                      </div>
                    </>
                  )}
                  
                  {selectedEl.type === 'section' && (
                    <div>
                      <label className="text-sm font-medium">Título</label>
                      <Input
                        value={selectedEl.content.title}
                        onChange={(e) => updateElement(selectedEl.id, {
                          content: { ...selectedEl.content, title: e.target.value }
                        })}
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="style" className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Cor de Fundo</label>
                    <Input
                      type="color"
                      value={selectedEl.styles.backgroundColor || '#ffffff'}
                      onChange={(e) => updateElement(selectedEl.id, {
                        styles: { ...selectedEl.styles, backgroundColor: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cor do Texto</label>
                    <Input
                      type="color"
                      value={selectedEl.styles.color || '#000000'}
                      onChange={(e) => updateElement(selectedEl.id, {
                        styles: { ...selectedEl.styles, color: e.target.value }
                      })}
                    />
                  </div>
                  {selectedEl.type === 'text' && (
                    <div>
                      <label className="text-sm font-medium">Tamanho da Fonte</label>
                      <Select 
                        value={selectedEl.styles.fontSize || '16px'} 
                        onValueChange={(value) => updateElement(selectedEl.id, {
                          styles: { ...selectedEl.styles, fontSize: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="14px">14px</SelectItem>
                          <SelectItem value="16px">16px</SelectItem>
                          <SelectItem value="18px">18px</SelectItem>
                          <SelectItem value="24px">24px</SelectItem>
                          <SelectItem value="32px">32px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center text-gray-500 py-8">
              <Settings size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Selecione um elemento para editar</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
