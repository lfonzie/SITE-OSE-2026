import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { newImages } from "@/lib/image-verification";
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const { heroImage, getImagePosition, updateImagePosition, updateHeroImage } = usePageData('Home', {
    heroImage: newImages.horizontal1,
    images: []
  });

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
        <div className="relative w-full h-full">
          <DragImagePosition
            src={heroImage || newImages.horizontal1} 
            alt="Colégio OSE - Campus e estudantes"
            className="w-full h-full"
            editable={isAuthenticated}
            initialPosition={{
              x: getImagePosition('hero-bg')?.horizontalPosition || 0,
              y: getImagePosition('hero-bg')?.verticalPosition || 0
            }}
            onPositionChange={(position: { x: number; y: number }) => {
              const currentPos = getImagePosition('hero-bg') || {
                objectPosition: 'center center',
                horizontalPosition: 0,
                verticalPosition: 0,
                scale: 1,
                opacity: 1,
                filter: 'none',
                objectFit: 'cover' as const
              };
              updateImagePosition('hero-bg', {
                ...currentPos,
                objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                horizontalPosition: position.x,
                verticalPosition: position.y
              });
            }}
          />
          {isAuthenticated && (
            <EnhancedImageSelector
              currentImage={heroImage || newImages.horizontal1}
              onImageSelect={updateHeroImage}
              className="absolute top-4 right-4 z-10"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-school-brown/90 via-school-orange/80 to-white/85">
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl"
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
          <h2 className="text-lg md:text-xl text-white/95 mb-4 max-w-4xl mx-auto font-medium drop-shadow-xl">
            a OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem:
          </h2>
          <h3 className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-xl">
            Tradição e uma rica história.
          </h3>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-xl">
            Educando com excelência há mais de 100 anos em Sorocaba. Com base em valores éticos e formação integral, preparamos gerações para o sucesso e a cidadania.
          </p>
        </div>
      </div>
    </section>
  );
}