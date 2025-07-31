import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit3, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ImageManager from './ImageManager';

export default function SimpleImageEditor() {
  const { isAuthenticated } = useAuth();
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [targetImage, setTargetImage] = useState<HTMLImageElement | null>(null);

  // Ativar modo de edição
  const activateEditMode = () => {
    setEditMode(true);
    
    // Adicionar indicadores visuais
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      img.style.outline = '3px solid #ea580c';
      img.style.outlineOffset = '3px';
      img.style.cursor = 'pointer';
      img.style.transition = 'all 0.2s ease';
      
      // Adicionar listener de clique
      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        setTargetImage(img as HTMLImageElement);
        setIsManagerOpen(true);
        deactivateEditMode();
      };
      
      img.addEventListener('click', handleClick, { once: true });
    });

    // Mudar cursor da página
    document.body.style.cursor = 'crosshair';
    
    // Mostrar toast de instrução
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
    toast.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
        <strong>Modo de Edição Ativo</strong>
      </div>
      <p class="text-sm">Clique em qualquer imagem para editá-la</p>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      if (editMode) {
        deactivateEditMode();
      }
    }, 5000);
  };

  // Desativar modo de edição
  const deactivateEditMode = () => {
    setEditMode(false);
    document.body.style.cursor = '';
    
    // Remover indicadores visuais
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.outline = '';
      img.style.outlineOffset = '';
      img.style.cursor = '';
    });
  };

  // Aplicar nova imagem
  const handleImageSelect = (newImageUrl: string) => {
    if (targetImage) {
      targetImage.src = newImageUrl;
      
      // Disparar evento personalizado para sistemas de auto-save
      const changeEvent = new CustomEvent('imageChanged', {
        detail: { element: targetImage, newUrl: newImageUrl }
      });
      window.dispatchEvent(changeEvent);
      
      setTargetImage(null);
    }
  };

  // Sempre mostrar o botão para debug (remover verificação de autenticação temporariamente)
  return (
    <>
      <Button
        size="sm"
        onClick={activateEditMode}
        disabled={editMode}
        className={`fixed top-32 right-4 z-50 transition-all duration-300 ${
          editMode 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse cursor-not-allowed' 
            : 'bg-orange-500 hover:bg-orange-600'
        }`}
      >
        {editMode ? (
          <>
            <ImageIcon size={14} className="mr-1" />
            Clique nas imagens
          </>
        ) : (
          <>
            <Edit3 size={14} className="mr-1" />
            ✏️ Editar Imagens
          </>
        )}
      </Button>

      <ImageManager
        isOpen={isManagerOpen}
        onClose={() => {
          setIsManagerOpen(false);
          setTargetImage(null);
        }}
        onImageSelect={handleImageSelect}
        currentImage={targetImage?.src}
      />
    </>
  );
}