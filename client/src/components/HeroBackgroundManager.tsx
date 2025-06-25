import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  ImageIcon, 
  Settings, 
  Upload, 
  Palette, 
  RotateCcw, 
  Eye, 
  EyeOff,
  Folder,
  HardDrive,
  Cloud,
  Check
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface HeroBackgroundManagerProps {
  currentBackground?: HeroBackground;
  onBackgroundChange: (background: HeroBackground) => void;
  className?: string;
}

export interface HeroBackground {
  type: 'image' | 'gradient' | 'color';
  imageUrl?: string;
  gradientColors?: string[];
  solidColor?: string;
  opacity: number;
  overlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
  position: string;
  size: 'cover' | 'contain' | 'auto';
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
}

const defaultBackground: HeroBackground = {
  type: 'gradient',
  gradientColors: ['#475569', '#64748b'],
  opacity: 1,
  overlay: true,
  overlayColor: '#1e293b',
  overlayOpacity: 0.8,
  position: 'center',
  size: 'cover',
  repeat: 'no-repeat'
};

const gradientPresets = [
  { name: 'OSE Cinza', colors: ['#475569', '#64748b'] },
  { name: 'OSE Laranja', colors: ['#ea580c', '#dc2626'] },
  { name: 'Azul Oceano', colors: ['#0ea5e9', '#0284c7'] },
  { name: 'Verde Natureza', colors: ['#059669', '#047857'] },
  { name: 'Roxo Moderno', colors: ['#7c3aed', '#6366f1'] },
  { name: 'Rosa Suave', colors: ['#ec4899', '#db2777'] },
];

export default function HeroBackgroundManager({ 
  currentBackground = defaultBackground, 
  onBackgroundChange, 
  className = '' 
}: HeroBackgroundManagerProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [background, setBackground] = useState<HeroBackground>(currentBackground);
  const [serverImages, setServerImages] = useState<any[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('gradient');
  const [selectedDirectory, setSelectedDirectory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
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
      const response = await fetch('/api/instagram-images');
      if (response.ok) {
        const imageData = await response.json();
        const images = imageData.map((img: any) => ({
          filename: img.filename,
          uploadedAt: img.uploadedAt,
          url: `/api/images/IG/${img.filename}`
        }));
        setUploadedImages(images.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        ));
      }
    } catch (error) {
      console.error('Erro ao carregar imagens enviadas:', error);
    }
  };

  const handleBackgroundUpdate = (updates: Partial<HeroBackground>) => {
    const newBackground = { ...background, ...updates };
    setBackground(newBackground);
    onBackgroundChange(newBackground);
  };

  const handleImageSelect = (imageUrl: string) => {
    handleBackgroundUpdate({
      type: 'image',
      imageUrl
    });
    toast({
      title: "Imagem de fundo alterada",
      description: "A nova imagem foi aplicada como fundo do hero.",
    });
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
      const fileName = `hero_${timestamp}.${extension}`;
      
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
      
      const newImageUrl = `/api/images/IG/${fileName}`;
      handleImageSelect(newImageUrl);

      toast({
        title: "Imagem enviada e aplicada!",
        description: "A nova imagem foi definida como fundo do hero.",
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

  const generateGradientCSS = (colors: string[]) => {
    if (colors.length === 1) return colors[0];
    return `linear-gradient(135deg, ${colors.join(', ')})`;
  };

  const resetBackground = () => {
    setBackground(defaultBackground);
    onBackgroundChange(defaultBackground);
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
            variant="outline"
            className="absolute top-2 right-2 z-20 bg-white/90 hover:bg-white shadow-md"
          >
            <Palette size={14} className="mr-1" />
            Fundo
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Gerenciar Fundo do Hero
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gradient">Gradiente</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            {/* Gradient Tab */}
            <TabsContent value="gradient" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gradientPresets.map((preset, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:border-school-orange"
                    style={{
                      background: generateGradientCSS(preset.colors),
                      height: '80px'
                    }}
                    onClick={() => handleBackgroundUpdate({
                      type: 'gradient',
                      gradientColors: preset.colors
                    })}
                  >
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="text-white text-sm font-medium text-center px-2">
                        {preset.name}
                      </span>
                    </div>
                    {background.type === 'gradient' && 
                     JSON.stringify(background.gradientColors) === JSON.stringify(preset.colors) && (
                      <div className="absolute top-2 right-2">
                        <Check className="text-white" size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Custom Color */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Cor Sólida Personalizada</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={background.solidColor || '#475569'}
                    onChange={(e) => handleBackgroundUpdate({
                      type: 'color',
                      solidColor: e.target.value
                    })}
                    className="w-20 h-10"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleBackgroundUpdate({
                      type: 'color',
                      solidColor: background.solidColor || '#475569'
                    })}
                  >
                    Aplicar Cor
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Images Tab */}
            <TabsContent value="images" className="space-y-4">
              <Tabs value="server" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="server">
                    <HardDrive className="w-4 h-4 mr-2" />
                    Servidor
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Cloud className="w-4 h-4 mr-2" />
                    Upload
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
                  
                  <ScrollArea className="h-60">
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {getFilteredServerImages().map((image) => (
                        <div
                          key={image.path}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            background.imageUrl === image.url 
                              ? 'border-school-orange' 
                              : 'border-gray-200 hover:border-school-orange'
                          }`}
                          onClick={() => handleImageSelect(image.url)}
                        >
                          <img
                            src={image.url}
                            alt={image.filename}
                            className="w-full h-20 object-cover"
                          />
                          {background.imageUrl === image.url && (
                            <div className="absolute inset-0 bg-school-orange/20 flex items-center justify-center">
                              <Check className="text-school-orange" size={20} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500">
                      {uploading ? 'Enviando...' : 'Envie uma imagem para usar como fundo'}
                    </p>
                  </div>
                  
                  <ScrollArea className="h-52">
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {uploadedImages.map((image) => (
                        <div
                          key={image.filename}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            background.imageUrl === image.url 
                              ? 'border-school-orange' 
                              : 'border-gray-200 hover:border-school-orange'
                          }`}
                          onClick={() => handleImageSelect(image.url)}
                        >
                          <img
                            src={image.url}
                            alt={image.filename}
                            className="w-full h-20 object-cover"
                          />
                          {background.imageUrl === image.url && (
                            <div className="absolute inset-0 bg-school-orange/20 flex items-center justify-center">
                              <Check className="text-school-orange" size={20} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              {/* Opacity */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Opacidade do Fundo: {Math.round(background.opacity * 100)}%
                </Label>
                <Slider
                  value={[background.opacity]}
                  onValueChange={([value]) => handleBackgroundUpdate({ opacity: value })}
                  min={0.1}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              {/* Overlay Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Overlay Escuro</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBackgroundUpdate({ overlay: !background.overlay })}
                  className="flex items-center gap-2"
                >
                  {background.overlay ? <Eye size={14} /> : <EyeOff size={14} />}
                  {background.overlay ? 'Ativo' : 'Inativo'}
                </Button>
              </div>
              
              {background.overlay && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Opacidade do Overlay: {Math.round(background.overlayOpacity * 100)}%
                  </Label>
                  <Slider
                    value={[background.overlayOpacity]}
                    onValueChange={([value]) => handleBackgroundUpdate({ overlayOpacity: value })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              )}
              
              {/* Image-specific settings */}
              {background.type === 'image' && (
                <>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Tamanho</Label>
                    <Select
                      value={background.size}
                      onValueChange={(value: any) => handleBackgroundUpdate({ size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cover">Cobrir</SelectItem>
                        <SelectItem value="contain">Conter</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Posição</Label>
                    <Select
                      value={background.position}
                      onValueChange={(value) => handleBackgroundUpdate({ position: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="center">Centro</SelectItem>
                        <SelectItem value="top">Topo</SelectItem>
                        <SelectItem value="bottom">Base</SelectItem>
                        <SelectItem value="left">Esquerda</SelectItem>
                        <SelectItem value="right">Direita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              {/* Reset Button */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={resetBackground}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  Resetar
                </Button>
                <Button
                  onClick={() => setDialogOpen(false)}
                  className="bg-school-orange hover:bg-school-orange/90"
                >
                  Aplicar
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}