import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import DragImagePosition from '@/components/DragImagePosition';

interface InlineImageEditorProps {
  src: string;
  alt: string;
  onImageChange: (newSrc: string) => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  className?: string;
  editable?: boolean;
  initialPosition?: { x: number; y: number };
}

export function useInlineImageEditor() {
  const { isAuthenticated } = useAuth();
  const [editingImageId, setEditingImageId] = useState<string | null>(null);

  const InlineImageEditor = ({
    src,
    alt,
    onImageChange,
    onPositionChange,
    className = '',
    editable = true,
    initialPosition = { x: 0, y: 0 },
    objectFit = 'cover',
    ...props
  }: InlineImageEditorProps & { id?: string }) => {
    const id = props.id || Math.random().toString(36);
    const isEditing = editingImageId === id;

    const startEditing = () => {
      setEditingImageId(id);
    };

    const stopEditing = () => {
      setEditingImageId(null);
    };

    if (!isAuthenticated) {
      return onPositionChange ? (
        <DragImagePosition
          src={src}
          alt={alt}
          className={className}
          editable={false}
          initialPosition={initialPosition}
          onPositionChange={onPositionChange}
          objectFit={objectFit}
        />
      ) : (
        <img src={src} alt={alt} className={className} style={{ objectFit }} />
      );
    }

    return (
      <div className="relative group">
        {onPositionChange ? (
          <DragImagePosition
            src={src}
            alt={alt}
            className={className}
            editable={isAuthenticated && editable}
            initialPosition={initialPosition}
            onPositionChange={onPositionChange}
            objectFit={objectFit}
          />
        ) : (
          <img src={src} alt={alt} className={className} style={{ objectFit }} />
        )}
        
        {isAuthenticated && editable && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="outline"
              className="p-1 h-8 w-8 bg-white/90 shadow-md"
              onClick={startEditing}
            >
              <Upload size={12} />
            </Button>
          </div>
        )}

        {isEditing && (
          <div className="absolute inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                <h3 className="text-lg font-bold mb-4">Selecionar Nova Imagem</h3>
                <EnhancedImageSelector
                  currentImage={src}
                  onImageSelect={(newSrc) => {
                    onImageChange(newSrc);
                    stopEditing();
                  }}
                />
                <Button 
                  onClick={stopEditing} 
                  variant="outline" 
                  className="mt-4 w-full"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return { InlineImageEditor, isEditingImage: !!editingImageId };
}