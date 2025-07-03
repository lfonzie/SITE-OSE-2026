import { useEffect, useState } from 'react';

interface PreloaderOptions {
  images: string[];
  priority?: boolean;
  maxConcurrent?: number;
}

interface PreloadState {
  loaded: string[];
  loading: string[];
  errors: string[];
  progress: number;
}

export function useImagePreloader({ images, priority = false, maxConcurrent = 3 }: PreloaderOptions) {
  const [state, setState] = useState<PreloadState>({
    loaded: [],
    loading: [],
    errors: [],
    progress: 0,
  });

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already in cache
      const cachedKey = `img_cache_${btoa(src)}`;
      if (sessionStorage.getItem(cachedKey)) {
        setState(prev => ({
          ...prev,
          loaded: [...prev.loaded, src],
          progress: (prev.loaded.length + 1) / images.length * 100,
        }));
        resolve();
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        setState(prev => ({
          ...prev,
          loaded: [...prev.loaded, src],
          loading: prev.loading.filter(url => url !== src),
          progress: (prev.loaded.length + 1) / images.length * 100,
        }));
        
        // Cache small images
        try {
          if (img.naturalWidth * img.naturalHeight < 50000) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              ctx.drawImage(img, 0, 0);
              const dataUrl = canvas.toDataURL('image/webp', 0.8);
              sessionStorage.setItem(cachedKey, dataUrl);
            }
          }
        } catch {
          // Caching failed, continue anyway
        }
        
        resolve();
      };

      img.onerror = () => {
        setState(prev => ({
          ...prev,
          errors: [...prev.errors, src],
          loading: prev.loading.filter(url => url !== src),
          progress: (prev.loaded.length + prev.errors.length + 1) / images.length * 100,
        }));
        reject(new Error(`Failed to load ${src}`));
      };

      setState(prev => ({
        ...prev,
        loading: [...prev.loading, src],
      }));

      img.src = src;
    });
  };

  const preloadBatch = async (batch: string[]) => {
    const promises = batch.map(src => 
      preloadImage(src).catch(error => {
        console.warn('Image preload failed:', error);
      })
    );
    
    await Promise.allSettled(promises);
  };

  useEffect(() => {
    if (images.length === 0) return;

    const loadImages = async () => {
      // Filter out already loaded images
      const filteredImages = images.filter(src => 
        !state.loaded.includes(src) && !state.loading.includes(src) && !state.errors.includes(src)
      );

      if (filteredImages.length === 0) return;

      // Process images in batches to avoid overwhelming the browser
      for (let i = 0; i < filteredImages.length; i += maxConcurrent) {
        const batch = filteredImages.slice(i, i + maxConcurrent);
        await preloadBatch(batch);
        
        // Add small delay between batches to prevent blocking
        if (i + maxConcurrent < filteredImages.length) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    };

    // Start loading immediately for priority images, otherwise with a small delay
    if (priority) {
      loadImages();
    } else {
      const timeout = setTimeout(loadImages, 100);
      return () => clearTimeout(timeout);
    }
  }, [images, priority, maxConcurrent]);

  return {
    isLoaded: (src: string) => state.loaded.includes(src),
    isLoading: (src: string) => state.loading.includes(src),
    hasError: (src: string) => state.errors.includes(src),
    progress: state.progress,
    allLoaded: state.loaded.length === images.length,
    preloadImage,
    loadedCount: state.loaded.length,
    totalCount: images.length,
    errorCount: state.errors.length,
  };
}

// Hook for preloading critical images on app start
export function useAppImagePreloader() {
  const criticalImages = [
    '/images/horizontal_13.png', // Hero image
    '/images/LogoOSE100anos.png', // Logo
    '/images/9.png', // Program images
    '/images/10.png',
    '/images/11.png',
    '/images/12.png',
  ];

  return useImagePreloader({ 
    images: criticalImages, 
    priority: true,
    maxConcurrent: 5 
  });
}