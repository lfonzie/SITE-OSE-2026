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
    
    console.log('🎯 Ativando modo de edição - buscando imagens editáveis');
    
    // Buscar apenas imagens que estão nas seções editáveis
    const editableSelectors = [
      '#hero img',                    // Hero section
      '#hero-section img',            // Hero section alternativo
      '[data-section="hero"] img',    // Hero com data-attribute
      '#why-ose img',                 // Por que escolher a OSE
      '[data-section="why-ose"] img', // Por que OSE com data-attribute
      '#programas img',               // Programas
      '[data-section="programs"] img', // Programas com data-attribute
      '#features img',                // Features/diferenciais
      '[data-section="features"] img' // Features com data-attribute
    ];
    
    let foundImages = 0;
    editableSelectors.forEach(selector => {
      const images = document.querySelectorAll(selector);
      console.log(`📷 Selector "${selector}": ${images.length} imagens encontradas`);
      
      images.forEach((img, index) => {
        foundImages++;
        const htmlImg = img as HTMLImageElement;
        console.log(`✅ Imagem editável #${foundImages}:`, htmlImg.src);
        
        // Aplicar estilos visuais
        htmlImg.style.outline = '4px solid #ea580c';
        htmlImg.style.outlineOffset = '4px';
        htmlImg.style.cursor = 'pointer';
        htmlImg.style.transition = 'all 0.2s ease';
        htmlImg.style.filter = 'brightness(1.1) saturate(1.2)';
        htmlImg.style.transform = 'scale(1.02)';
        
        // Adicionar indicador visual
        const indicator = document.createElement('div');
        indicator.className = 'absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10';
        indicator.textContent = '✏️ CLIQUE PARA EDITAR';
        indicator.style.pointerEvents = 'none';
        
        // Posicionar o indicador
        const parent = htmlImg.parentElement;
        if (parent && getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }
        if (parent) {
          parent.appendChild(indicator);
        }
        
        // Adicionar listener de clique
        const handleClick = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🖱️ Clique na imagem detectado:', htmlImg.src);
          
          setTargetImage(htmlImg);
          setIsManagerOpen(true);
          deactivateEditMode();
        };
        
        htmlImg.addEventListener('click', handleClick, { once: true });
        
        // Salvar referência para limpeza
        (htmlImg as any).__editModeIndicator = indicator;
      });
    });

    // Mudar cursor da página
    document.body.style.cursor = 'crosshair';
    
    console.log(`📊 Total de imagens editáveis encontradas: ${foundImages}`);
    
    // Mostrar toast informativo
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
    toast.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
        <strong>Modo de Edição Ativo</strong>
      </div>
      <p class="text-sm">${foundImages} imagens editáveis encontradas. Clique nas imagens com bordas laranja.</p>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      if (editMode) {
        deactivateEditMode();
      }
    }, 8000);
  };

  // Desativar modo de edição
  const deactivateEditMode = () => {
    setEditMode(false);
    document.body.style.cursor = '';
    
    console.log('🔴 Desativando modo de edição');
    
    // Remover indicadores visuais de todas as imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      htmlImg.style.outline = '';
      htmlImg.style.outlineOffset = '';
      htmlImg.style.cursor = '';
      htmlImg.style.filter = '';
      htmlImg.style.transform = '';
      
      // Remover indicador visual se existir
      const indicator = (htmlImg as any).__editModeIndicator;
      if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
        delete (htmlImg as any).__editModeIndicator;
      }
    });
  };

  // Aplicar nova imagem
  const handleImageSelect = (newImageUrl: string) => {
    if (targetImage) {
      console.log('💾 Aplicando nova imagem:', newImageUrl, 'para elemento:', targetImage);
      
      const oldSrc = targetImage.src;
      targetImage.src = newImageUrl;
      
      // Disparar evento personalizado para sistemas de auto-save
      const changeEvent = new CustomEvent('imageChanged', {
        detail: { 
          element: targetImage, 
          newUrl: newImageUrl,
          oldUrl: oldSrc,
          timestamp: Date.now()
        }
      });
      window.dispatchEvent(changeEvent);
      
      // Forçar re-render do elemento
      targetImage.style.opacity = '0.8';
      setTimeout(() => {
        targetImage.style.opacity = '1';
      }, 100);
      
      // Tentar identificar e atualizar hooks de página correspondentes
      const sectionId = targetImage.closest('[id]')?.id;
      if (sectionId) {
        console.log(`📍 Imagem está na seção: ${sectionId}`);
        
        // Tentar atualizar dados da página específica
        const updateEvent = new CustomEvent('sectionImageUpdate', {
          detail: {
            sectionId,
            imageElement: targetImage,
            newUrl: newImageUrl,
            oldUrl: oldSrc
          }
        });
        window.dispatchEvent(updateEvent);
      }
      
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