import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Edit3, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import GlobalImageEditor from './GlobalImageEditor';

export default function GlobalImageEditButton() {
  const { isAuthenticated } = useAuth();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [targetImage, setTargetImage] = useState<HTMLImageElement | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Debug log para verificar autenticação
  console.log('GlobalImageEditButton - isAuthenticated:', isAuthenticated);
  console.log('GlobalImageEditButton - editMode:', editMode);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleImageClick = (event: MouseEvent) => {
      console.log('Click detectado - editMode:', editMode, 'target:', event.target);
      if (!editMode) return;
      
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG') {
        console.log('Imagem clicada:', (target as HTMLImageElement).src);
        event.preventDefault();
        event.stopPropagation();
        setTargetImage(target as HTMLImageElement);
        setIsEditorOpen(true);
        console.log('Editor deve abrir - isEditorOpen será:', true);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditMode(false);
      }
    };

    if (editMode) {
      document.addEventListener('click', handleImageClick, true);
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.cursor = 'crosshair';
      
      // Add visual indicators to images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.outline = '2px dashed #ea580c';
        img.style.outlineOffset = '2px';
        img.style.transition = 'all 0.2s ease';
      });
    } else {
      document.removeEventListener('click', handleImageClick, true);
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.cursor = '';
      
      // Remove visual indicators
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.outline = '';
        img.style.outlineOffset = '';
      });
    }

    return () => {
      document.removeEventListener('click', handleImageClick, true);
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.cursor = '';
      
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.outline = '';
        img.style.outlineOffset = '';
      });
    };
  }, [editMode, isAuthenticated]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      // Show instructions
      const toast = document.createElement('div');
      toast.className = 'fixed top-24 right-4 bg-school-orange text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
      toast.innerHTML = `
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
          <strong>Modo de Edição Ativo</strong>
        </div>
        <p class="text-sm">Clique em qualquer imagem para editá-la. Pressione ESC para sair.</p>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 4000);
    }
  };

  const handleImageChange = (newUrl: string) => {
    if (targetImage) {
      targetImage.src = newUrl;
      // Trigger any data-binding or auto-save systems
      const event = new CustomEvent('imageChanged', { 
        detail: { 
          element: targetImage, 
          newUrl 
        } 
      });
      window.dispatchEvent(event);
    }
  };

  // Temporariamente sempre mostrar para debug
  if (!isAuthenticated && false) return null;

  return (
    <>
      <Button
        size="sm"
        onClick={toggleEditMode}
        className={`fixed top-32 right-4 z-50 transition-all duration-300 ${
          editMode 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-school-orange hover:bg-school-orange/90'
        }`}
      >
        {editMode ? (
          <>
            <Target size={14} className="mr-1" />
            Sair da Edição
          </>
        ) : (
          <>
            <Edit3 size={14} className="mr-1" />
            ✏️ Editar Imagens
          </>
        )}
      </Button>

      <GlobalImageEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setTargetImage(null);
        }}
        targetImage={targetImage || undefined}
        onImageChange={handleImageChange}
      />
    </>
  );
}