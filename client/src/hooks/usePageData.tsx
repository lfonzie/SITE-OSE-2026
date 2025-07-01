import { useState, useEffect, useCallback } from 'react';
import { useAutoSave } from './useAutoSave';
import { useToast } from '@/hooks/use-toast';
import { ImagePosition } from '@/components/ImagePositionControls';
import { HeroBackground } from '@/components/HeroBackgroundManager';

interface PageData {
  pageName: string;
  heroImage?: string;
  heroBackground?: HeroBackground;
  images?: string[];
  imagePositions?: { [key: string]: ImagePosition };
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

  // Load server configuration on mount
  useEffect(() => {
    const loadServerConfig = async () => {
      try {
        const response = await fetch(`/api/page-config/${pageName}`);
        if (response.ok) {
          const serverConfig = await response.json();

          // Check if we're in deployment/production
          const isProduction = import.meta.env.PROD || 
                              window.location.hostname.includes('.replit.app') ||
                              window.location.hostname.includes('.repl.co');

          // In production, always use server config
          // In development, use server config if it's newer than local
          let useServerConfig = isProduction;

          if (!isProduction) {
            const localData = localStorage.getItem(`page_${pageName}`);
            if (localData) {
              try {
                const localConfig = JSON.parse(localData);
                const serverDate = new Date(serverConfig.lastModified);
                const localDate = new Date(localConfig.lastModified || 0);

                // Use server config if it's newer than local
                useServerConfig = serverDate > localDate;
              } catch (error) {
                console.error('Error parsing local config:', error);
                useServerConfig = true;
              }
            } else {
              useServerConfig = true;
            }
          }

          if (useServerConfig) {
            console.log(`Loading server config for ${pageName} (production: ${isProduction}):`, serverConfig);
            setPageData(prev => ({
              ...prev,
              ...serverConfig,
              pageName
            }));

            // Also save to localStorage for offline access
            localStorage.setItem(`page_${pageName}`, JSON.stringify(serverConfig));
          }
        }
      } catch (error) {
        console.error(`Error loading server config for ${pageName}:`, error);
      }
    };

    loadServerConfig();
  }, [pageName]);

  const saveToServer = useCallback(async (config: any) => {
    try {
      const response = await fetch('/api/page-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageName,
          config: {
            ...config,
            savedForDeployment: true, // Always save for deployment
            lastModified: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        console.error('Failed to save server config');
      } else {
        console.log(`Server config saved for page: ${pageName} (deployment ready)`);
      }
    } catch (error) {
      console.error('Error saving server config:', error);
    }
  }, [pageName]);

  // Auto-save whenever pageData changes
  useAutoSave({
    data: pageData,
    key: `page_${pageName}`,
    delay: 500, // Save after 500ms of no changes
    onSave: async (data) => {
      // Save to localStorage (local backup)
      console.log(`Auto-saved page: ${pageName}`, data);
      await saveToServer(data);
    }
  });

  // Update hero image
  const updateHeroImage = useCallback((imageUrl: string) => {
    console.log('updateHeroImage chamado com:', imageUrl);
    setPageData(prev => {
      console.log('Dados anteriores:', prev);
      const newData = {
        ...prev,
        heroImage: imageUrl,
        lastModified: new Date().toISOString()
      };
      console.log('Novos dados:', newData);
      return newData;
    });
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

  // Update hero background
  const updateHeroBackground = useCallback((background: HeroBackground) => {
    setPageData(prev => ({
      ...prev,
      heroBackground: background,
      lastModified: new Date().toISOString()
    }));
  }, []);

  // Update image position
  const updateImagePosition = useCallback((imageKey: string, position: ImagePosition) => {
    setPageData(prev => ({
      ...prev,
      imagePositions: {
        ...prev.imagePositions,
        [imageKey]: position
      },
      lastModified: new Date().toISOString()
    }));
  }, []);

  // Get image position
  const getImagePosition = useCallback((imageKey: string): ImagePosition | undefined => {
    return pageData.imagePositions?.[imageKey];
  }, [pageData.imagePositions]);

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
    heroBackground: pageData.heroBackground || {
      type: 'gradient' as const,
      gradientColors: ['#475569', '#64748b'],
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.8,
      position: 'center',
      size: 'cover' as const,
      repeat: 'no-repeat' as const
    },
    images: pageData.images || [],
    imagePositions: pageData.imagePositions || {},
    content: pageData.content,
    updateHeroImage,
    updateImage,
    updateImages,
    updateContent,
    updateHeroBackground,
    updateImagePosition,
    getImagePosition,
    saveManually,
    setPageData
  };
}