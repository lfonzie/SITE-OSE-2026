import { useState, useEffect, useCallback } from 'react';
import { useAutoSave } from './useAutoSave';
import { useToast } from '@/hooks/use-toast';

interface PageData {
  pageName: string;
  heroImage?: string;
  images?: string[];
  content?: any;
  lastModified?: string;
  autoSaved?: boolean;
}

export function usePageData(pageName: string, initialData: Partial<PageData> = {}) {
  const { toast } = useToast();
  const [pageData, setPageData] = useState<PageData>(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem(`page_${pageName}`);
    if (saved) {
      try {
        return { ...initialData, ...JSON.parse(saved), pageName };
      } catch (error) {
        console.error('Error loading saved page data:', error);
      }
    }
    return { ...initialData, pageName };
  });

  // Auto-save whenever pageData changes
  useAutoSave({
    data: pageData,
    key: `page_${pageName}`,
    delay: 500, // Save after 500ms of no changes
    onSave: (data) => {
      // Custom save logic can be added here if needed
      console.log(`Auto-saved page: ${pageName}`, data);
    }
  });

  // Update hero image
  const updateHeroImage = useCallback((imageUrl: string) => {
    setPageData(prev => ({
      ...prev,
      heroImage: imageUrl,
      lastModified: new Date().toISOString()
    }));
  }, []);

  // Update images array
  const updateImage = useCallback((index: number, imageUrl: string) => {
    setPageData(prev => {
      const newImages = [...(prev.images || [])];
      newImages[index] = imageUrl;
      return {
        ...prev,
        images: newImages,
        lastModified: new Date().toISOString()
      };
    });
  }, []);

  // Update multiple images
  const updateImages = useCallback((images: string[]) => {
    setPageData(prev => ({
      ...prev,
      images,
      lastModified: new Date().toISOString()
    }));
  }, []);

  // Update any content
  const updateContent = useCallback((content: any) => {
    setPageData(prev => ({
      ...prev,
      content,
      lastModified: new Date().toISOString()
    }));
  }, []);

  // Manual save function
  const saveManually = useCallback(() => {
    const saveData = {
      ...pageData,
      lastModified: new Date().toISOString(),
      autoSaved: false
    };
    
    localStorage.setItem(`page_${pageName}`, JSON.stringify(saveData));
    
    toast({
      title: "Página salva manualmente",
      description: "Todas as alterações foram salvas.",
    });
  }, [pageData, pageName, toast]);

  return {
    pageData,
    heroImage: pageData.heroImage,
    images: pageData.images || [],
    content: pageData.content,
    updateHeroImage,
    updateImage,
    updateImages,
    updateContent,
    saveManually,
    setPageData
  };
}