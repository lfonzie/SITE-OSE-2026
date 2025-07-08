import React, { useState, useRef, useEffect } from 'react';

interface WebPImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

export const WebPImage: React.FC<WebPImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes = '100vw'
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP and responsive versions
  const generateSrcSet = (originalSrc: string) => {
    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();
    
    // Generate different sizes for responsive images
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    const webpSrcSet = sizes.map(size => `${basePath}_${size}w.webp ${size}w`).join(', ');
    const fallbackSrcSet = sizes.map(size => `${basePath}_${size}w.${extension} ${size}w`).join(', ');
    
    return { webpSrcSet, fallbackSrcSet };
  };

  // Check if WebP is supported
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  useEffect(() => {
    // Try to load WebP version first if supported
    const webpSupported = supportsWebP();
    if (webpSupported) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const testImg = new Image();
      testImg.onload = () => setImageSrc(webpSrc);
      testImg.onerror = () => setImageSrc(src);
      testImg.src = webpSrc;
    } else {
      setImageSrc(src);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original image if WebP fails
    if (imageSrc.includes('.webp')) {
      setImageSrc(src);
    }
  };

  const { webpSrcSet, fallbackSrcSet } = generateSrcSet(src);

  // Preload critical images
  useEffect(() => {
    if (priority && imageSrc) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      if (sizes !== '100vw') {
        link.setAttribute('imagesizes', sizes);
      }
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [imageSrc, priority, sizes]);

  return (
    <picture className={className}>
      {/* WebP source with srcset for responsive images */}
      <source
        srcSet={webpSrcSet}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* Fallback source with srcset */}
      <source
        srcSet={fallbackSrcSet}
        sizes={sizes}
        type={`image/${src.split('.').pop()}`}
      />
      
      {/* Main image element with explicit dimensions */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'bg-gray-200' : ''}
          ${className}
        `}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
        />
      )}
    </picture>
  );
};