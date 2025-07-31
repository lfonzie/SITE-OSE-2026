import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, X, Check } from 'lucide-react';
import ImageManager from '@/components/ImageManager';

export default function DirectImageEditor() {
  const [isActive, setIsActive] = useState(false);
  const [targetImage, setTargetImage] = useState<HTMLImageElement | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [editableImages, setEditableImages] = useState<HTMLImageElement[]>([]);

  // Buscar e preparar imagens editáveis
  const setupEditableImages = () => {
    console.log('🎯 Configurando imagens editáveis...');
    
    // Selectors específicos das seções que queremos editar
    const selectors = [
      '#hero img',
      '#why-ose img', 
      '#programas img'
    ];
    
    const allImages: HTMLImageElement[] = [];
    
    selectors.forEach(selector => {
      const images = document.querySelectorAll(selector) as NodeListOf<HTMLImageElement>;
      console.log(`📷 ${selector}: ${images.length} imagens`);
      
      images.forEach((img, index) => {
        console.log(`✅ Imagem encontrada: ${img.src}`);
        allImages.push(img);
        
        // Aplicar estilos de edição
        img.style.position = 'relative';
        img.style.outline = '3px solid #ea580c';
        img.style.outlineOffset = '2px';
        img.style.cursor = 'pointer';
        img.style.zIndex = '999';
        img.style.pointerEvents = 'auto';
        
        // Adicionar badge "CLIQUE PARA EDITAR"
        const badge = document.createElement('div');
        badge.innerHTML = '✏️ CLIQUE';
        badge.style.cssText = `
          position: absolute;
          top: 4px;
          left: 4px;
          background: #ea580c;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: bold;
          z-index: 1000;
          pointer-events: none;
        `;
        
        // Inserir o badge
        const parent = img.parentElement;
        if (parent) {
          if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
          }
          parent.appendChild(badge);
          (img as any).__editBadge = badge;
        }
        
        // Event listener direto
        const clickHandler = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🖱️ CLIQUE DETECTADO!', img.src);
          setTargetImage(img);
          setIsManagerOpen(true);
          setIsActive(false);
          cleanupImages();
        };
        
        img.addEventListener('click', clickHandler);
        (img as any).__clickHandler = clickHandler;
      });
    });
    
    setEditableImages(allImages);
    console.log(`📊 Total: ${allImages.length} imagens configuradas`);
  };

  // Limpar estilos e listeners
  const cleanupImages = () => {
    console.log('🧹 Limpando estilos...');
    
    editableImages.forEach(img => {
      img.style.outline = '';
      img.style.outlineOffset = '';
      img.style.cursor = '';
      img.style.zIndex = '';
      
      // Remover badge
      const badge = (img as any).__editBadge;
      if (badge && badge.parentElement) {
        badge.parentElement.removeChild(badge);
      }
      
      // Remover listener
      const handler = (img as any).__clickHandler;
      if (handler) {
        img.removeEventListener('click', handler);
      }
    });
    
    setEditableImages([]);
  };

  // Ativar modo de edição
  const activateEditMode = () => {
    setIsActive(true);
    setupEditableImages();
  };

  // Desativar modo de edição
  const deactivateEditMode = () => {
    setIsActive(false);
    cleanupImages();
  };

  // Aplicar nova imagem
  const handleImageSelect = (newImageUrl: string) => {
    if (targetImage) {
      console.log('💾 Aplicando imagem:', newImageUrl);
      
      // Atualizar a imagem com efeito visual
      targetImage.style.opacity = '0.5';
      setTimeout(() => {
        targetImage.src = newImageUrl;
        targetImage.style.opacity = '1';
        targetImage.style.transition = 'opacity 0.3s ease';
      }, 100);
      
      console.log('✅ Imagem atualizada!');
    }
    
    setTargetImage(null);
    setIsManagerOpen(false);
  };

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      cleanupImages();
    };
  }, []);

  return (
    <>
      {/* Botão de controle */}
      <Button
        onClick={isActive ? deactivateEditMode : activateEditMode}
        className={`fixed top-4 right-4 z-50 font-bold px-4 py-2 rounded-lg shadow-lg transition-all ${
          isActive 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-orange-500 hover:bg-orange-600'
        }`}
      >
        {isActive ? (
          <>
            <X size={16} className="mr-2" />
            Cancelar Edição
          </>
        ) : (
          <>
            <Edit size={16} className="mr-2" />
            ✏️ Editar Imagens
          </>
        )}
      </Button>

      {/* Status indicator */}
      {isActive && (
        <div className="fixed top-16 right-4 z-40 bg-orange-500 text-white p-2 rounded text-sm font-bold">
          🎯 Modo ativo - {editableImages.length} imagens editáveis
        </div>
      )}

      {/* Modal do gerenciador */}
      <ImageManager
        isOpen={isManagerOpen}
        onClose={() => {
          setIsManagerOpen(false);
          setTargetImage(null);
        }}
        onImageSelect={handleImageSelect}
        currentImage={targetImage?.src || ''}
      />
    </>
  );
}