import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Upload, Image as ImageIcon, Check, Edit3, Folder, HardDrive, Cloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface EnhancedImageSelectorProps {
  currentImage?: string;
  onImageSelect: (imageUrl: string) => void;
  className?: string;
}

interface ServerImage {
  filename: string;
  path: string;
  url: string;
  directory: string;
  size: number;
  lastModified: string;
}

interface UploadedImage {
  filename: string;
  uploadedAt: string;
  url: string;
}

export default function EnhancedImageSelector({ currentImage, onImageSelect, className = '' }: EnhancedImageSelectorProps) {
  const { isAuthenticated } = useAuth();
  const [serverImages, setServerImages] = useState<ServerImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('server');
  const [selectedDirectory, setSelectedDirectory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && dialogOpen) {
      loadServerImages();
      loadUploadedImages();
    }
  }, [isAuthenticated, dialogOpen]);

  const loadServerImages = async () => {
    try {
      const response = await fetch('/api/server-images');
      if (response.ok) {
        const images = await response.json();
        setServerImages(images);
      }
    } catch (error) {
      console.error('Erro ao carregar imagens do servidor:', error);
    }
  };

  const loadUploadedImages = async () => {
    try {
      // Carregar apenas imagens da pasta /images para uploads gerais
      const response = await fetch('/api/general-images');
      if (response.ok) {
        const imageData = await response.json();
        const images: UploadedImage[] = imageData.map((img: any) => ({
          filename: img.filename,
          uploadedAt: img.uploadedAt,
          url: `/api/images/${img.filename}`
        }));
        setUploadedImages(images.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        ));
      }
    } catch (error) {
      console.error('Erro ao carregar imagens enviadas:', error);
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

      await loadUploadedImages();
      
      const newImageUrl = `/api/images/${fileName}`;
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
      description: "A nova imagem foi aplicada com sucesso!",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            size="sm" 
            className="bg-school-orange text-white hover:bg-school-orange/90 shadow-lg z-20 relative"
          >
            <Edit3 size={16} className="mr-2" />
            Alterar Imagem
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Selecionar Imagem
              </DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="server" className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Imagens do Servidor
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Upload & Biblioteca
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="server" className="space-y-4">
                {/* Directory Filter */}
                <div className="flex flex-wrap gap-2">
                  {getDirectories().map((dir) => (
                    <Badge
                      key={dir}
                      variant={selectedDirectory === dir ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedDirectory === dir 
                          ? 'bg-school-orange hover:bg-school-orange/90' 
                          : 'hover:bg-school-orange/10'
                      }`}
                      onClick={() => setSelectedDirectory(dir)}
                    >
                      <Folder className="w-3 h-3 mr-1" />
                      {dir === 'all' ? 'Todas' : dir === 'root' ? 'Raiz' : dir}
                    </Badge>
                  ))}
                </div>
                
                <ScrollArea className="h-96">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
                    {getFilteredServerImages().map((image) => (
                      <div
                        key={image.path}
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
                        <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs truncate font-medium">{image.filename}</p>
                          <p className="text-xs text-gray-300">{formatFileSize(image.size)}</p>
                          {image.directory !== 'root' && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {image.directory}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center gap-4">
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
                  <p className="text-sm text-gray-500 mt-2">
                    Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)
                  </p>
                </div>

                {/* Uploaded Images Gallery */}
                <ScrollArea className="h-80">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
                    {uploadedImages.map((image) => (
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
                        <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs truncate">{image.filename}</p>
                          <p className="text-xs text-gray-300">
                            {new Date(image.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
    </div>
  );
}