import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  onClick?: () => void;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  fallback,
  onClick
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)} onClick={onClick}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Carregando...</div>
        </div>
      )}
      <img
        src={imageError ? fallback : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          onClick && "cursor-pointer hover:scale-105 transition-transform"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}