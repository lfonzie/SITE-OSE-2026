import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ImageIcon, 
  Upload, 
  Folder,
  Check,
  Edit3,
  Save,
  X,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ServerImage {
  filename: string;
  url: string;
  directory: string;
  size: string;
}

interface GlobalImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  targetImage?: HTMLImageElement;
  onImageChange?: (newUrl: string) => void;
}

export default function GlobalImageEditor({ 
  isOpen, 
  onClose, 
  targetImage,
  onImageChange 
}: GlobalImageEditorProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [serverImages, setServerImages] = useState<ServerImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ServerImage[]>([]);
  const [selectedDirectory, setSelectedDirectory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // Debug log
  console.log('GlobalImageEditor - isOpen:', isOpen, 'targetImage:', targetImage?.src);

  useEffect(() => {
    if (targetImage) {
      setCurrentImageUrl(targetImage.src);
    }
  }, [targetImage]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadServerImages();
      loadUploadedImages();
    }
  }, [isOpen, isAuthenticated]);

  const loadServerImages = async () => {
    try {
      const response = await fetch('/api/images');
      if (response.ok) {
        const images = await response.json();
        setServerImages(images);
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  };

  const loadUploadedImages = async () => {
    try {
      const response = await fetch('/api/uploaded-images');
      if (response.ok) {
        const images = await response.json();
        setUploadedImages(images);
      }
    } catch (error) {
      console.error('Erro ao carregar imagens enviadas:', error);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    if (targetImage) {
      targetImage.src = imageUrl;
      targetImage.style.transition = 'opacity 0.3s ease';
      targetImage.style.opacity = '0.7';
      setTimeout(() => {
        targetImage.style.opacity = '1';
      }, 150);
    }
    if (onImageChange) {
      onImageChange(imageUrl);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        await loadUploadedImages();
        handleImageSelect(result.url);
        toast({
          title: "Sucesso",
          description: "Imagem enviada com sucesso!",
        });
      } else {
        toast({
          title: "Erro",
          description: "Falha no envio da imagem.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar imagem.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getDirectories = () => {
    const directories: string[] = [];
    serverImages.forEach(img => {
      if (!directories.includes(img.directory)) {
        directories.push(img.directory);
      }
    });
    return ['all', ...directories.filter(dir => dir !== 'root').sort()];
  };

  const getFilteredServerImages = () => {
    if (selectedDirectory === 'all') {
      return serverImages;
    }
    return serverImages.filter(img => img.directory === selectedDirectory);
  };

  const applyChanges = () => {
    if (targetImage && currentImageUrl) {
      targetImage.src = currentImageUrl;
      if (onImageChange) {
        onImageChange(currentImageUrl);
      }
      toast({
        title: "Sucesso",
        description: "Imagem atualizada!",
      });
    }
    onClose();
  };

  if (!isAuthenticated) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Editor Global de Imagens
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="server" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="server">Imagens do Servidor</TabsTrigger>
            <TabsTrigger value="upload">Enviar Nova</TabsTrigger>
          </TabsList>
          
          {/* Server Images Tab */}
          <TabsContent value="server" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {getDirectories().map((dir) => (
                <Badge
                  key={dir}
                  variant={selectedDirectory === dir ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedDirectory === dir 
                      ? 'bg-school-orange text-white' 
                      : 'hover:bg-school-orange hover:text-white'
                  }`}
                  onClick={() => setSelectedDirectory(dir)}
                >
                  <Folder size={12} className="mr-1" />
                  {dir === 'all' ? 'Todas' : dir}
                </Badge>
              ))}
            </div>
            
            <ScrollArea className="h-96">
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {getFilteredServerImages().map((image) => (
                  <div
                    key={image.filename}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all group ${
                      currentImageUrl === image.url 
                        ? 'border-school-orange ring-2 ring-school-orange/30' 
                        : 'border-gray-200 hover:border-school-orange'
                    }`}
                    onClick={() => handleImageSelect(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={image.filename}
                      className="w-full h-20 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
                    {currentImageUrl === image.url && (
                      <div className="absolute inset-0 bg-school-orange/20 flex items-center justify-center">
                        <Check className="text-school-orange" size={20} />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="truncate">{image.filename}</div>
                      <div className="text-gray-300">{image.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="mb-4"
              />
              <p className="text-sm text-gray-500">
                {uploading ? 'Enviando...' : 'Selecione uma imagem para enviar'}
              </p>
            </div>
            
            {uploadedImages.length > 0 && (
              <ScrollArea className="h-72">
                <Label className="text-sm font-medium mb-2 block">Imagens Enviadas</Label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {uploadedImages.map((image) => (
                    <div
                      key={image.filename}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageUrl === image.url 
                          ? 'border-school-orange' 
                          : 'border-gray-200 hover:border-school-orange'
                      }`}
                      onClick={() => handleImageSelect(image.url)}
                    >
                      <img
                        src={image.url}
                        alt={image.filename}
                        className="w-full h-20 object-cover"
                        loading="lazy"
                      />
                      {currentImageUrl === image.url && (
                        <div className="absolute inset-0 bg-school-orange/20 flex items-center justify-center">
                          <Check className="text-school-orange" size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <X size={14} />
            Cancelar
          </Button>
          <Button
            onClick={applyChanges}
            className="bg-school-orange hover:bg-school-orange/90 flex items-center gap-2"
          >
            <Save size={14} />
            Aplicar Mudanças
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}