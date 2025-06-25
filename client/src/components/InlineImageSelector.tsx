
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Image as ImageIcon, Check, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface InlineImageSelectorProps {
  currentImage?: string;
  onImageSelect: (imageUrl: string) => void;
  className?: string;
}

interface ImageItem {
  filename: string;
  uploadedAt: string;
  url: string;
}

export default function InlineImageSelector({ currentImage, onImageSelect, className = '' }: InlineImageSelectorProps) {
  const { isAuthenticated } = useAuth();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && dialogOpen) {
      loadImages();
    }
  }, [isAuthenticated, dialogOpen]);

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
      const fileName = `upload_${timestamp}.${extension}`;
      
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
      
      // Auto-selecionar a imagem recém-enviada
      const newImageUrl = `/api/images/IG/${fileName}`;
      onImageSelect(newImageUrl);
      setDialogOpen(false);

      toast({
        title: "Foto enviada e selecionada!",
        description: "A nova imagem foi aplicada.",
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
    onImageSelect(imageUrl);
    setDialogOpen(false);
    toast({
      title: "Imagem alterada",
      description: "A imagem foi atualizada com sucesso.",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Overlay de edição */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              className="bg-white/90 text-gray-900 hover:bg-white"
            >
              <Edit3 size={16} className="mr-2" />
              Alterar Imagem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Selecionar Imagem</DialogTitle>
            </DialogHeader>
            
            {/* Upload Section */}
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

            {/* Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.filename}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    currentImage === image.url 
                      ? 'border-school-orange bg-orange-50' 
                      : 'border-gray-200 hover:border-school-orange'
                  }`}
                  onClick={() => handleImageSelect(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-32 object-cover"
                  />
                  {currentImage === image.url && (
                    <div className="absolute inset-0 bg-school-orange/20 flex items-center justify-center">
                      <Check className="text-school-orange" size={24} />
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
    </div>
  );
}
