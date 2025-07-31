import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ImageIcon, 
  Upload, 
  Folder,
  Check,
  X,
  Save,
  Settings
} from 'lucide-react';

interface ServerImage {
  filename: string;
  url: string;
  directory: string;
  size: string;
}

interface ImageManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

export default function ImageManager({ isOpen, onClose, onImageSelect, currentImage }: ImageManagerProps) {
  const { toast } = useToast();
  const [serverImages, setServerImages] = useState<ServerImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(currentImage || '');

  // Carregar imagens do servidor
  const loadServerImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/images');
      if (response.ok) {
        const images = await response.json();
        setServerImages(images);
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar imagens do servidor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadServerImages();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedImage(currentImage || '');
  }, [currentImage]);

  // Upload de nova imagem
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Falha no upload');
        }
      }

      toast({
        title: "Sucesso",
        description: `${files.length} imagem(ns) enviada(s) com sucesso`,
      });

      // Recarregar imagens
      await loadServerImages();
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro",
        description: "Falha ao enviar imagem",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Selecionar imagem
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Confirmar seleção
  const handleConfirmSelection = () => {
    if (selectedImage) {
      onImageSelect(selectedImage);
      onClose();
      toast({
        title: "Imagem alterada",
        description: "A imagem foi alterada com sucesso",
      });
    }
  };

  // Organizar imagens por diretório
  const imagesByDirectory = serverImages.reduce((acc, image) => {
    const dir = image.directory || 'root';
    if (!acc[dir]) acc[dir] = [];
    acc[dir].push(image);
    return acc;
  }, {} as Record<string, ServerImage[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gerenciador de Imagens
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">
              <Folder className="w-4 h-4 mr-2" />
              Galeria
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Carregando imagens...</div>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-6">
                  {Object.entries(imagesByDirectory).map(([directory, images]) => (
                    <div key={directory} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4" />
                        <Badge variant="outline">{directory}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {images.length} imagens
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {images.map((image) => (
                          <div
                            key={image.filename}
                            className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImage === image.url
                                ? 'border-orange-500 ring-2 ring-orange-200'
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                            onClick={() => handleImageSelect(image.url)}
                          >
                            <img
                              src={image.url}
                              alt={image.filename}
                              className="w-full h-20 object-cover"
                            />
                            {selectedImage === image.url && (
                              <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                                <Check className="w-6 h-6 text-orange-600" />
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="truncate">{image.filename}</div>
                              <div>{image.size}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Enviar novas imagens</h3>
              <p className="text-sm text-gray-500 mb-4">
                Selecione arquivos de imagem (JPG, PNG, WebP)
              </p>
              
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <Button disabled={uploading} className="bg-orange-500 hover:bg-orange-600">
                  {uploading ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Selecionar Imagens
                    </>
                  )}
                </Button>
              </Label>
            </div>
            
            {uploading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Enviando imagens...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {selectedImage && (
              <>
                <ImageIcon className="w-4 h-4" />
                Imagem selecionada
              </>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmSelection} 
              disabled={!selectedImage}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}