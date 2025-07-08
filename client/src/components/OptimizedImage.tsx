import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  lazy?: boolean;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  lazy = true,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjOTk5Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==',
  width,
  height,
  sizes = '100vw',
  className,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{width?: number, height?: number}>({});
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Load image dimensions for CLS optimization
  useEffect(() => {
    const loadDimensions = async () => {
      try {
        const response = await fetch('/api/image-dimensions');
        const dimensions = await response.json();
        const fileName = src.split('/').pop() || '';
        
        if (dimensions[fileName]) {
          setImageDimensions({
            width: dimensions[fileName].width,
            height: dimensions[fileName].height
          });
        }
      } catch (error) {
        console.warn('Failed to load image dimensions:', error);
      }
    };

    if (!width || !height) {
      loadDimensions();
    }
  }, [src, width, height]);

  // Cache management
  const getCachedImage = (url: string): string | null => {
    try {
      return sessionStorage.getItem(`img_cache_${btoa(url)}`);
    } catch {
      return null;
    }
  };

  const setCachedImage = (url: string, dataUrl: string): void => {
    try {
      sessionStorage.setItem(`img_cache_${btoa(url)}`, dataUrl);
    } catch {
      // Storage full or disabled
    }
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority, isInView]);

  // Preload critical images
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        try {
          document.head.removeChild(link);
        } catch {
          // Link may have been removed already
        }
      };
    }
  }, [priority, src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();

    // Cache small images (< 100KB estimated)
    if (imgRef.current && imgRef.current.naturalWidth * imgRef.current.naturalHeight < 50000) {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = imgRef.current.naturalWidth;
          canvas.height = imgRef.current.naturalHeight;
          ctx.drawImage(imgRef.current, 0, 0);
          const dataUrl = canvas.toDataURL('image/webp', 0.8);
          setCachedImage(src, dataUrl);
        }
      } catch {
        // Canvas operations may fail
      }
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Check cache first
  const cachedSrc = getCachedImage(src);
  const imageSrc = cachedSrc || (isInView ? src : placeholder);

  // Use provided dimensions or fall back to loaded dimensions
  const finalWidth = width || imageDimensions.width;
  const finalHeight = height || imageDimensions.height;

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      sizes={sizes}
      className={cn(
        'transition-opacity duration-300 performance-optimized',
        isLoading ? 'opacity-70' : 'opacity-100',
        hasError ? 'opacity-50' : '',
        'w-full h-auto',
        className
      )}
      style={{
        aspectRatio: finalWidth && finalHeight ? `${finalWidth} / ${finalHeight}` : undefined,
        contentVisibility: 'auto',
        containIntrinsicSize: finalWidth && finalHeight ? `${finalWidth}px ${finalHeight}px` : undefined,
      }}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...props}
    />
  );
}