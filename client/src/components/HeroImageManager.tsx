import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Image as ImageIcon } from "lucide-react";
import EnhancedImageSelector from './EnhancedImageSelector';
import ImagePositionControls, { ImagePosition } from './ImagePositionControls';
import { useAutoSave } from "@/hooks/useAutoSave";

interface HeroConfig {
  backgroundImage: string;
  position: ImagePosition;
}

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

const defaultPosition: ImagePosition = {
  objectPosition: 'center center',
  horizontalPosition: 0,
  verticalPosition: 0,
  scale: 1,
  opacity: 1,
  filter: 'none',
  objectFit: 'cover'
};

export default function HeroImageManager() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    backgroundImage: '',
    position: defaultPosition
  });
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [showPositionControls, setShowPositionControls] = useState(false);
  const { toast } = useToast();

  // Auto-save functionality
  const [isSaving, setIsSaving] = useState(false);

  // Load hero configuration for selected page
  useEffect(() => {
    const savedConfig = localStorage.getItem(`hero-config-${selectedPage}`);
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setHeroConfig(config);
      } catch (error) {
        console.error('Error loading hero config:', error);
        setHeroConfig({
          backgroundImage: '',
          position: defaultPosition
        });
      }
    } else {
      setHeroConfig({
        backgroundImage: '',
        position: defaultPosition
      });
    }
  }, [selectedPage]);

  // Auto-save hero configuration
  useEffect(() => {
    if (heroConfig.backgroundImage) {
      const timeoutId = setTimeout(() => {
        setIsSaving(true);
        localStorage.setItem(`hero-config-${selectedPage}`, JSON.stringify(heroConfig));
        setTimeout(() => setIsSaving(false), 500);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [heroConfig, selectedPage]);

  const handleImageSelect = (imageUrl: string) => {
    setHeroConfig(prev => ({
      ...prev,
      backgroundImage: imageUrl
    }));
    setShowImageSelector(false);
    toast({
      title: "Imagem aplicada ao hero",
      description: `Imagem definida para ${pages.find(p => p.value === selectedPage)?.label}`,
    });
  };

  const handlePositionChange = (position: ImagePosition) => {
    setHeroConfig(prev => ({
      ...prev,
      position
    }));
  };

  const applyToPage = () => {
    // Apply the hero configuration to the actual page
    const pageDataKey = `pageData-${selectedPage}`;
    const existingData = JSON.parse(localStorage.getItem(pageDataKey) || '{}');
    
    existingData.heroBackground = {
      type: 'image',
      value: heroConfig.backgroundImage,
      position: heroConfig.position
    };
    
    localStorage.setItem(pageDataKey, JSON.stringify(existingData));
    
    toast({
      title: "Configuração aplicada",
      description: `Hero atualizado para ${pages.find(p => p.value === selectedPage)?.label}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Selection */}
      <div className="space-y-2">
        <Label>Selecionar Página</Label>
        <Select value={selectedPage} onValueChange={setSelectedPage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.value} value={page.value}>
                {page.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Hero Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Configuração Hero - {pages.find(p => p.value === selectedPage)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Image Preview */}
          {heroConfig.backgroundImage && (
            <div className="space-y-2">
              <Label>Imagem Atual</Label>
              <div 
                className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${heroConfig.backgroundImage})`,
                  backgroundSize: heroConfig.position.objectFit === 'cover' ? 'cover' : heroConfig.position.objectFit,
                  backgroundPosition: heroConfig.position.objectPosition,
                  transform: `scale(${heroConfig.position.scale})`,
                  opacity: heroConfig.position.opacity,
                  filter: heroConfig.position.filter
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setShowImageSelector(true)}
              variant="outline"
              size="sm"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              {heroConfig.backgroundImage ? 'Trocar Imagem' : 'Selecionar Imagem'}
            </Button>

            {heroConfig.backgroundImage && (
              <Button 
                onClick={() => setShowPositionControls(true)}
                variant="outline"
                size="sm"
              >
                Ajustar Posição
              </Button>
            )}

            {heroConfig.backgroundImage && (
              <Button 
                onClick={applyToPage}
                size="sm"
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Aplicando...' : 'Aplicar à Página'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Image Selector Modal */}
      {showImageSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Selecionar Imagem para Hero</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowImageSelector(false)}
                >
                  Fechar
                </Button>
              </div>
              <EnhancedImageSelector
                onImageSelect={handleImageSelect}
              />
            </div>
          </div>
        </div>
      )}

      {/* Position Controls Modal */}
      {showPositionControls && heroConfig.backgroundImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <ImagePositionControls
              currentPosition={heroConfig.position}
              onPositionChange={handlePositionChange}
            />
            <div className="p-4 border-t">
              <Button 
                onClick={() => setShowPositionControls(false)}
                className="w-full"
              >
                Aplicar Posicionamento
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}