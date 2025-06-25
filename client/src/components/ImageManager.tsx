
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Image as ImageIcon, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ImageManagerProps {
  onImageSelect?: (imageUrl: string) => void;
  selectedImage?: string;
  category?: string;
}

interface ImageItem {
  filename: string;
  uploadedAt: string;
  url: string;
}

export default function ImageManager({ onImageSelect, selectedImage, category = 'general' }: ImageManagerProps) {
  const { isAuthenticated } = useAuth();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadImages();
    }
  }, [isAuthenticated]);

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
      const timestamp = Date.now();
      const extension = file.name.split('.').pop() || 'jpg';
      const fileName = `${category}_${timestamp}.${extension}`;
      
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
        title: "Foto enviada com sucesso!",
        description: "A foto foi adicionada à galeria.",
      });

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

  const handleImageSelect = (imageUrl: string) => {
    if (onImageSelect) {
      onImageSelect(imageUrl);
      setDialogOpen(false);
      toast({
        title: "Imagem selecionada",
        description: "A imagem foi selecionada com sucesso.",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <ImageIcon size={20} />
          Gerenciamento de Imagens (Admin)
        </h3>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Ver Galeria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Galeria de Imagens</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.filename}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image.url 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleImageSelect(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-32 object-cover"
                  />
                  {selectedImage === image.url && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <Check className="text-blue-600" size={24} />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs truncate">{image.filename}</p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Upload Nova Imagem
          </label>
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
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Enviando...' : 'Upload'}
            </Button>
          </div>
        </div>

        {selectedImage && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Imagem Selecionada:
            </label>
            <div className="flex items-center gap-4">
              <img
                src={selectedImage}
                alt="Imagem selecionada"
                className="w-20 h-20 object-cover rounded border"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-600">{selectedImage}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onImageSelect && onImageSelect('')}
                  className="mt-2"
                >
                  <X size={16} className="mr-1" />
                  Remover Seleção
                </Button>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-blue-600">
          Apenas administradores logados podem ver e usar esta funcionalidade.
        </p>
      </div>
    </div>
  );
}
