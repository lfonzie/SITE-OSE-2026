import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Image, Palette } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import DragImagePosition from '@/components/DragImagePosition';

interface HeroBackground {
  type: 'gradient' | 'image' | 'color';
  gradientColors?: string[];
  imageUrl?: string;
  solidColor?: string;
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
}

export function useInlineHeroEditor() {
  const { isAuthenticated } = useAuth();
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'background' | 'image' | null>(null);

  const InlineHeroEditor = ({
    heroImage,
    heroBackground,
    onHeroImageChange,
    onHeroBackgroundChange,
    onHeroImagePositionChange,
    className = '',
    children,
    initialImagePosition = { x: 0, y: 0 },
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

    return (
      <section 
        className={`relative overflow-hidden ${className}`}
        style={{
          background: 'none',
          backgroundColor: 'transparent',
          backgroundImage: currentBackground?.type === 'gradient' 
            ? `linear-gradient(135deg, ${currentBackground.gradientColors?.join(', ') || '#475569, #64748b'})`
            : currentBackground?.type === 'image' && currentBackground.imageUrl
            ? `url(${currentBackground.imageUrl})`
            : 'linear-gradient(135deg, #475569, #64748b)',
          backgroundSize: currentBackground?.type === 'image' ? currentBackground.size : 'cover',
          backgroundPosition: currentBackground?.type === 'image' ? currentBackground.position : 'center',
          backgroundRepeat: currentBackground?.type === 'image' ? currentBackground.repeat : 'no-repeat',
          opacity: currentBackground?.opacity || 1
        }}
      >
        {/* Hero Background Manager */}
        {isAuthenticated && isEditing && editMode === 'background' && onHeroBackgroundChange && (
          <HeroBackgroundManager
            currentBackground={currentBackground}
            onBackgroundChange={onHeroBackgroundChange}
            className="absolute inset-0 z-50"
            onClose={stopEditing}
          />
        )}

        {/* Overlay */}
        {currentBackground?.overlay && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: currentBackground.overlayColor || '#1e293b',
              opacity: currentBackground.overlayOpacity || 0.8
            }}
          ></div>
        )}

        {/* Hero Image */}
        {heroImage && (
          <div className="absolute inset-0">
            {onHeroImagePositionChange ? (
              <DragImagePosition
                src={heroImage}
                alt="Hero Image"
                className="w-full h-full opacity-30"
                editable={isAuthenticated}
                initialPosition={initialImagePosition}
                onPositionChange={onHeroImagePositionChange}
              />
            ) : (
              <img 
                src={heroImage} 
                alt="Hero Image" 
                className="w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-700/80"></div>
          </div>
        )}

        {/* Hero Image Selector */}
        {isAuthenticated && isEditing && editMode === 'image' && onHeroImageChange && (
          <div className="absolute inset-0 z-50">
            <EnhancedImageSelector
              currentImage={heroImage || ''}
              onImageSelect={(newSrc) => {
                onHeroImageChange(newSrc);
                stopEditing();
              }}
              onClose={stopEditing}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            />
          </div>
        )}

        {/* Admin Controls */}
        {isAuthenticated && !isEditing && (
          <div className="absolute top-4 right-4 z-40 flex gap-2">
            {onHeroBackgroundChange && (
              <Button
                size="sm"
                variant="outline"
                className="p-2 h-10 w-10 bg-white/90 shadow-md hover:bg-white"
                onClick={() => startEditing('background')}
                title="Editar Fundo"
              >
                <Palette size={16} />
              </Button>
            )}
            {onHeroImageChange && (
              <Button
                size="sm"
                variant="outline"
                className="p-2 h-10 w-10 bg-white/90 shadow-md hover:bg-white"
                onClick={() => startEditing('image')}
                title="Alterar Imagem"
              >
                <Image size={16} />
              </Button>
            )}
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