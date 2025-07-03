import { useEffect, useState } from 'react';

interface SimplePreloaderState {
  loadedImages: string[];
  loadingImages: string[];
  errorImages: string[];
  progress: number;
}

export function useSimpleImagePreloader(images: string[], priority = false) {
  const [state, setState] = useState<SimplePreloaderState>({
    loadedImages: [],
    loadingImages: [],
    errorImages: [],
    progress: 0,
  });

  const preloadImage = async (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check cache first
      const cachedKey = `img_cache_${btoa(src).slice(0, 20)}`;
      if (sessionStorage.getItem(cachedKey)) {
        setState(prev => ({
          ...prev,
          loadedImages: [...prev.loadedImages, src],
          progress: Math.round(((prev.loadedImages.length + 1) / images.length) * 100),
        }));
        resolve();
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      // Add to loading state
      setState(prev => ({
        ...prev,
        loadingImages: [...prev.loadingImages, src],
      }));

      img.onload = () => {
        setState(prev => ({
          ...prev,
          loadedImages: [...prev.loadedImages, src],
          loadingImages: prev.loadingImages.filter(url => url !== src),
          progress: Math.round(((prev.loadedImages.length + 1) / images.length) * 100),
        }));

        // Cache small images
        try {
          if (img.naturalWidth * img.naturalHeight < 100000) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = Math.min(img.naturalWidth, 800);
              canvas.height = Math.min(img.naturalHeight, 600);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/webp', 0.7);
              sessionStorage.setItem(cachedKey, dataUrl);
            }
          }
        } catch {
          // Silent fail on caching
        }
        
        resolve();
      };

      img.onerror = () => {
        setState(prev => ({
          ...prev,
          errorImages: [...prev.errorImages, src],
          loadingImages: prev.loadingImages.filter(url => url !== src),
          progress: Math.round(((prev.loadedImages.length + prev.errorImages.length + 1) / images.length) * 100),
        }));
        reject(new Error(`Failed to load ${src}`));
      };

      img.src = src;
    });
  };

  useEffect(() => {
    if (images.length === 0) return;

    const loadImagesSequentially = async () => {
      for (const src of images) {
        // Skip already processed images
        if (state.loadedImages.includes(src) || 
            state.loadingImages.includes(src) || 
            state.errorImages.includes(src)) {
          continue;
        }

        try {
          await preloadImage(src);
          // Small delay between images to prevent blocking
          await new Promise(resolve => setTimeout(resolve, 20));
        } catch (error) {
          console.warn('Failed to preload:', src);
        }
      }
    };

    if (priority) {
      loadImagesSequentially();
    } else {
      const timeout = setTimeout(loadImagesSequentially, 300);
      return () => clearTimeout(timeout);
    }
  }, [images, priority]);

  return {
    isLoaded: (src: string) => state.loadedImages.includes(src),
    isLoading: (src: string) => state.loadingImages.includes(src),
    hasError: (src: string) => state.errorImages.includes(src),
    progress: state.progress,
    allLoaded: state.loadedImages.length === images.length,
    loadedCount: state.loadedImages.length,
    totalCount: images.length,
    errorCount: state.errorImages.length,
  };
}

// Critical images preloader for app startup
export function useAppImagePreloader() {
  const criticalImages = [
    '/images/horizontal_13.png',
    '/images/LogoOSE100anos.png',
    '/images/9.png',
    '/images/10.png',
    '/images/11.png',
    '/images/12.png',
  ];

  return useSimpleImagePreloader(criticalImages, true);
}