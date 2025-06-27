
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoSave } from '@/hooks/useAutoSave';
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
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  saveKey?: string;
}

export function useInlineImageEditor() {
  const { isAuthenticated } = useAuth();
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<any>({});

  // Auto-save hook
  useAutoSave({
    data: currentData,
    key: 'inline-image-editor',
    delay: 1000,
    onSave: (data) => {
      console.log('Auto-saved image data:', data);
    }
  });

  const InlineImageEditor = ({
    src,
    alt,
    onImageChange,
    onPositionChange,
    className = '',
    editable = true,
    initialPosition = { x: 0, y: 0 },
    objectFit = 'cover',
    saveKey = 'default',
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

    const handleImageChange = (newSrc: string) => {
      onImageChange(newSrc);
      
      // Update auto-save data
      setCurrentData((prev: any) => ({
        ...prev,
        [saveKey]: {
          src: newSrc,
          alt,
          position: initialPosition
        },
        lastModified: new Date().toISOString()
      }));

      stopEditing();
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
            onPositionChange={(position) => {
              onPositionChange(position);
              // Update auto-save data for position
              setCurrentData(prev => ({
                ...prev,
                [saveKey + '_position']: position,
                lastModified: new Date().toISOString()
              }));
            }}
            objectFit={objectFit}
          />
        ) : (
          <img src={src} alt={alt} className={className} style={{ objectFit }} />
        )}
        
        {isAuthenticated && editable && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">Selecionar Nova Imagem</h3>
              <EnhancedImageSelector
                currentImage={src}
                onImageSelect={handleImageChange}
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
        )}
      </div>
    );
  };

  return { InlineImageEditor, isEditingImage: !!editingImageId };
}
