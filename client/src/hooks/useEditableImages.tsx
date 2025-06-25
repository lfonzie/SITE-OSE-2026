
import { useState } from 'react';

interface UseEditableImagesProps {
  initialImages: string[];
}

export const useEditableImages = ({ initialImages }: UseEditableImagesProps) => {
  const [images, setImages] = useState<string[]>(initialImages);

  const updateImage = (index: number, newUrl: string) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = newUrl;
      return newImages;
    });
  };

  const updateImageByUrl = (currentUrl: string, newUrl: string) => {
    setImages(prev => prev.map(img => img === currentUrl ? newUrl : img));
  };

  return {
    images,
    updateImage,
    updateImageByUrl,
    setImages
  };
};
