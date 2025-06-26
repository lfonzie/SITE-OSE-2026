
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoSave } from '@/hooks/useAutoSave';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import ImagePositionControls from '@/components/ImagePositionControls';

interface HeroBackground {
  type: 'gradient' | 'image' | 'color';
  gradientColors?: string[];
  solidColor?: string;
  imageUrl?: string;
  opacity?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  position?: string;
  size?: string;
  repeat?: string;
}

interface InlineHeroEditorProps {
  heroImage?: string;
  heroBackground?: HeroBackground;
  onHeroImageChange?: (newSrc: string) => void;
  onHeroBackgroundChange?: (newBackground: HeroBackground) => void;
  onHeroImagePositionChange?: (position: { x: number; y: number }) => void;
  className?: string;
  children: React.ReactNode;
  initialImagePosition?: { x: number; y: number };
  saveKey?: string;
}

export function useInlineHeroEditor() {
  const { isAuthenticated } = useAuth();
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'background' | 'image' | null>(null);
  const [currentData, setCurrentData] = useState<any>({});

  // Auto-save hook
  useAutoSave({
    data: currentData,
    key: 'inline-hero-editor',
    delay: 1000,
    onSave: (data) => {
      console.log('Auto-saved hero data:', data);
    }
  });

  const InlineHeroEditor = ({
    heroImage,
    heroBackground,
    onHeroImageChange,
    onHeroBackgroundChange,
    onHeroImagePositionChange,
    className = '',
    children,
    initialImagePosition = { x: 0, y: 0 },
    saveKey = 'default',
    ...props
  }: InlineHeroEditorProps & { id?: string }) => {
    const id = props.id || Math.random().toString(36);
    const isEditing = editingHeroId === id;

    const startEditing = (mode: 'background' | 'image') => {
      setEditingHeroId(id);
      setEditMode(mode);
    };

    const stopEditing = () => {
      setEditingHeroId(null);
      setEditMode(null);
    };

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

    const currentBackground = heroBackground || defaultBackground;

    const handleBackgroundChange = (newBackground: HeroBackground) => {
      if (onHeroBackgroundChange) {
        onHeroBackgroundChange(newBackground);
        
        // Update auto-save data
        setCurrentData(prev => ({
          ...prev,
          [saveKey + '_background']: newBackground,
          lastModified: new Date().toISOString()
        }));
      }
    };

    const handleImageChange = (newSrc: string) => {
      if (onHeroImageChange) {
        onHeroImageChange(newSrc);
        
        // Update auto-save data
        setCurrentData(prev => ({
          ...prev,
          [saveKey + '_image']: newSrc,
          lastModified: new Date().toISOString()
        }));
      }
      stopEditing();
    };

    const handlePositionChange = (position: { x: number; y: number }) => {
      if (onHeroImagePositionChange) {
        onHeroImagePositionChange(position);
        
        // Update auto-save data
        setCurrentData(prev => ({
          ...prev,
          [saveKey + '_position']: position,
          lastModified: new Date().toISOString()
        }));
      }
    };

    return (
      <section 
        className={`relative ${className}`}
        style={{
          ...(currentBackground?.type === 'gradient' && {
            background: `linear-gradient(135deg, ${currentBackground.gradientColors?.join(', ') || '#475569, #64748b'})`,
            backgroundImage: 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent'
          }),
          ...(currentBackground?.type === 'image' && currentBackground.imageUrl && {
            background: 'none',
            backgroundImage: `url(${currentBackground.imageUrl})`,
            backgroundSize: currentBackground.size || 'cover',
            backgroundPosition: currentBackground.position || 'center',
            backgroundRepeat: currentBackground.repeat || 'no-repeat',
            backgroundColor: 'transparent'
          }),
          ...(currentBackground?.type === 'color' && {
            background: 'none',
            backgroundImage: 'none',
            backgroundSize: 'auto',
            backgroundPosition: 'initial',
            backgroundRepeat: 'repeat',
            backgroundColor: currentBackground.solidColor || '#475569'
          }),
          ...(!currentBackground?.type && {
            background: 'linear-gradient(135deg, #475569, #64748b)',
            backgroundImage: 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent'
          }),
          opacity: currentBackground?.opacity || 1
        }}
      >
        {/* Overlay */}
        {currentBackground?.overlay && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: currentBackground.overlayColor || '#1e293b',
              opacity: currentBackground.overlayOpacity || 0.8
            }}
          />
        )}

        {/* Hero Controls */}
        {isAuthenticated && (
          <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 shadow-md"
              onClick={() => startEditing('background')}
            >
              <Settings size={16} className="mr-1" />
              Fundo
            </Button>
            {heroImage && (
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 shadow-md"
                onClick={() => startEditing('image')}
              >
                <ImageIcon size={16} className="mr-1" />
                Imagem
              </Button>
            )}
          </div>
        )}

        {/* Background Editor */}
        {isEditing && editMode === 'background' && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">Configurar Fundo do Hero</h3>
              <HeroBackgroundManager
                currentBackground={currentBackground}
                onBackgroundChange={handleBackgroundChange}
              />
              <Button 
                onClick={stopEditing} 
                variant="outline" 
                className="mt-4 w-full"
              >
                Fechar
              </Button>
            </div>
          </div>
        )}

        {/* Image Editor */}
        {isEditing && editMode === 'image' && heroImage && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">Alterar Imagem do Hero</h3>
              <EnhancedImageSelector
                currentImage={heroImage}
                onImageSelect={handleImageChange}
              />
              {onHeroImagePositionChange && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Posição da Imagem</h4>
                  <ImagePositionControls
                    currentPosition={initialImagePosition}
                    onPositionChange={handlePositionChange}
                  />
                </div>
              )}
              <Button 
                onClick={stopEditing} 
                variant="outline" 
                className="mt-4 w-full"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </section>
    );
  };

  return { InlineHeroEditor, isEditingHero: !!editingHeroId };
}
