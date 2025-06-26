import { useEffect, useState } from "react";
import { ArrowRight, Play, Award, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { newImages } from "@/lib/image-verification";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const { 
    pageData, 
    updatePageData, 
    updateImage, 
    getImagePosition, 
    updateImagePosition,
    updateHeroImage,
    updateHeroBackground,
    heroImage,
    heroBackground 
  } = usePageData('Home', {
    heroImage: newImages.horizontal1,
    images: []
  });

  const backgroundImages = [
    heroImage || newImages.horizontal_1,
    newImages.horizontal_2,
    newImages.horizontal_3,
    newImages.horizontal_4,
    newImages.horizontal_5
  ];

  const scrollToNext = () => {
    const element = document.getElementById("stats");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {heroBackground?.type === 'image' && heroBackground.imageUrl ? (
            <div
              className="absolute inset-0 transition-all duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${heroBackground.imageUrl})`,
                backgroundSize: heroBackground.size || 'cover',
                backgroundPosition: heroBackground.position || 'center',
                backgroundRepeat: heroBackground.repeat || 'no-repeat',
                opacity: heroBackground.opacity || 1
              }}
            />
          ) : heroBackground?.type === 'gradient' && heroBackground.gradientColors ? (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${heroBackground.gradientColors.join(', ')})`,
                opacity: heroBackground.opacity || 1
              }}
            />
          ) : heroBackground?.type === 'color' && heroBackground.solidColor ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: heroBackground.solidColor,
                opacity: heroBackground.opacity || 1
              }}
            />
          ) : (
            <div className="relative">
              <DragImagePosition
                src={backgroundImages[currentImageIndex]}
                alt="Hero background"
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                editable={isAuthenticated}
                initialPosition={{
                  x: getImagePosition('hero')?.horizontalPosition || 0,
                  y: getImagePosition('hero')?.verticalPosition || 0
                }}
                onPositionChange={(position: { x: number; y: number }) => {
                  const currentPos = getImagePosition('hero') || {
                    objectPosition: 'center center',
                    horizontalPosition: 0,
                    verticalPosition: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'none',
                    objectFit: 'cover' as const
                  };
                  updateImagePosition('hero', {
                    ...currentPos,
                    objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                    horizontalPosition: position.x,
                    verticalPosition: position.y
                  });
                }}
                style={{
                  objectPosition: getImagePosition('hero')?.objectPosition || 'center',
                  objectFit: getImagePosition('hero')?.objectFit || 'cover',
                  transform: `scale(${getImagePosition('hero')?.scale || 1})`,
                  opacity: getImagePosition('hero')?.opacity || 1,
                  filter: getImagePosition('hero')?.filter || 'none'
                }}
              />
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={heroImage}
                    onImageSelect={updateHeroImage}
                    className="absolute inset-0"
                  />
                  <ImagePositionControls
                    currentPosition={getImagePosition('hero')}
                    onPositionChange={(position) => updateImagePosition('hero', position)}
                    className="absolute inset-0"
                  />
                </>
              )}
            </div>
          )}
        </div>

        {/* Hero Background Manager */}
        {isAuthenticated && (
          <HeroBackgroundManager
            currentBackground={heroBackground}
            onBackgroundChange={updateHeroBackground}
            className="absolute inset-0"
          />
        )}

        {/* Overlay */}
        {heroBackground?.overlay && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: heroBackground.overlayColor || '#1e293b',
              opacity: heroBackground.overlayOpacity || 0.8
            }}
          ></div>
        )}
        {!heroBackground?.overlay && <div className="absolute inset-0 bg-slate-900/80"></div>}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl font-headline"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="block text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Tradição Secular de Ensino:
            </motion.span>
            <motion.span 
              className="block text-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Celebrando 100 Anos
            </motion.span>
          </motion.h1>
          <h2 className="text-lg md:text-xl text-white/95 mb-4 max-w-4xl mx-auto font-medium drop-shadow-xl font-body">
            a OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem:
          </h2>
          <h3 className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-xl font-headline">
            Tradição e uma rica história.
          </h3>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-xl font-body">
            Educando com excelência há mais de 100 anos em Sorocaba. Com base em valores éticos e formação integral, preparamos gerações para o sucesso e a cidadania.
          </p>
        </div>
      </div>
    </section>
  );
}