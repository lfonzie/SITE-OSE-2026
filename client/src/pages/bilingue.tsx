import { Globe, Users, BookOpen, Award, Target, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import { useAuth } from '@/contexts/AuthContext';
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

// Import images
import { newImages } from "@/lib/image-verification";
const img1 = newImages.horizontal1;
const img2 = newImages.horizontal2;
const img3 = newImages.horizontal3;
const img4 = newImages.horizontal4;

export default function Bilingue() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Programa Bilíngue');

  // Initialize page data with auto-save functionality
  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('Programa Bilíngue', {
    heroImage: newImages.img22,
    images: [newImages.img23, newImages.img24, newImages.img25],
    heroBackground: {
      type: 'image',
      imageUrl: newImages.img22,
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.7,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });
  const features = [
    {
      icon: Globe,
      title: "Cidadania Global",
      description: "Formação de consciência cultural e perspectiva internacional, preparando alunos para um mundo globalizado."
    },
    {
      icon: Users,
      title: "Imersão Total",
      description: "Ambiente completamente bilíngue que promove fluência natural através da prática constante."
    },
    {
      icon: BookOpen,
      title: "MacMillan Education",
      description: "Material didático de excelência internacional com metodologia comprovada e reconhecida mundialmente."
    },
    {
      icon: Award,
      title: "Fluência Autêntica",
      description: "Desenvolvimento de competências comunicativas reais para uso prático em contextos diversos."
    },
    {
      icon: Target,
      title: "Metodologia Ativa",
      description: "Aprendizado através de projetos, experiências práticas e situações do cotidiano."
    },
    {
      icon: Brain,
      title: "Pensamento Crítico",
      description: "Desenvolvimento de análise crítica e capacidade de reflexão em ambos os idiomas."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative pt-20 pb-16 text-white overflow-hidden"
        style={{
          background: heroBackground?.type === 'gradient' 
            ? `linear-gradient(135deg, ${heroBackground.gradientColors?.join(', ') || '#475569, #64748b'})`
            : heroBackground?.type === 'color'
            ? heroBackground.solidColor
            : heroBackground?.type === 'image' && heroBackground.imageUrl
            ? `url(${heroBackground.imageUrl})`
            : 'linear-gradient(135deg, #475569, #64748b)',
          backgroundSize: heroBackground?.type === 'image' ? heroBackground.size : 'auto',
          backgroundPosition: heroBackground?.type === 'image' ? heroBackground.position : 'center',
          backgroundRepeat: heroBackground?.type === 'image' ? heroBackground.repeat : 'no-repeat',
          opacity: heroBackground?.opacity || 1
        }}
      >
        {/* Background Image Layer */}
        {heroBackground?.type === 'image' && heroImage && (
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <img 
                src={heroImage}
                alt="Programa Bilíngue OSE"
                className="w-full h-full object-cover opacity-30"
                style={{
                  objectPosition: getImagePosition('hero')?.objectPosition || 'center',
                  objectFit: getImagePosition('hero')?.objectFit || 'cover',
                  transform: `scale(${getImagePosition('hero')?.scale || 1})`,
                  opacity: getImagePosition('hero')?.opacity || 0.3,
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
          </div>
        )}

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Global <span className="text-school-orange">Citizens</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Educação Bilíngue Integral
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Formando cidadãos globais conscientes
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Na OSE, a educação bilíngue é mais que uma metodologia - é uma janela para o mundo. 
                <strong className="text-school-orange"> As aulas são diárias após as aulas tradicionais e são opcionais</strong>, 
                oferecendo uma imersão completa no idioma inglês e preparando nossos alunos 
                para serem verdadeiros cidadãos globais.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Educação que <span className="text-school-orange">Transforma</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Uma jornada rumo à educação bilíngue que forma cidadãos globais 
              preparados para os desafios do futuro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-school-orange text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <DragImagePosition
                src={images[0] || newImages.img23}
                alt="Aula de inglês no programa bilíngue"
                className="w-full h-48 rounded-lg shadow-lg"
                editable={isAuthenticated}
                initialPosition={{
                  x: getImagePosition('gallery-0')?.horizontalPosition || 0,
                  y: getImagePosition('gallery-0')?.verticalPosition || 0
                }}
                onPositionChange={(position: { x: number; y: number }) => {
                  const currentPos = getImagePosition('gallery-0') || {
                    objectPosition: 'center center',
                    horizontalPosition: 0,
                    verticalPosition: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'none',
                    objectFit: 'cover' as const
                  };
                  updateImagePosition('gallery-0', {
                    ...currentPos,
                    objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                    horizontalPosition: position.x,
                    verticalPosition: position.y
                  });
                }}
              />
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={images[0] || newImages.img23}
                    onImageSelect={(url) => updateImage(0, url)}
                    className="absolute inset-0"
                  />
                  <ImagePositionControls
                    currentPosition={getImagePosition('gallery-0')}
                    onPositionChange={(position) => updateImagePosition('gallery-0', position)}
                    className="absolute inset-0"
                  />
                </>
              )}
            </div>
            <div className="relative">
              <DragImagePosition
                src={images[1] || newImages.img24}
                alt="Atividades culturais internacionais"
                className="w-full h-48 rounded-lg shadow-lg"
                editable={isAuthenticated}
                initialPosition={{
                  x: getImagePosition('gallery-1')?.horizontalPosition || 0,
                  y: getImagePosition('gallery-1')?.verticalPosition || 0
                }}
                onPositionChange={(position: { x: number; y: number }) => {
                  const currentPos = getImagePosition('gallery-1') || {
                    objectPosition: 'center center',
                    horizontalPosition: 0,
                    verticalPosition: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'none',
                    objectFit: 'cover' as const
                  };
                  updateImagePosition('gallery-1', {
                    ...currentPos,
                    objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                    horizontalPosition: position.x,
                    verticalPosition: position.y
                  });
                }}
              />
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={images[1] || newImages.img24}
                    onImageSelect={(url) => updateImage(1, url)}
                    className="absolute inset-0"
                  />
                  <ImagePositionControls
                    currentPosition={getImagePosition('gallery-1')}
                    onPositionChange={(position) => updateImagePosition('gallery-1', position)}
                    className="absolute inset-0"
                  />
                </>
              )}
            </div>
            <div className="relative">
              <DragImagePosition
                src={images[2] || newImages.img25}
                alt="Intercâmbio cultural e cidadania global"
                className="w-full h-48 rounded-lg shadow-lg"
                editable={isAuthenticated}
                initialPosition={{
                  x: getImagePosition('gallery-2')?.horizontalPosition || 0,
                  y: getImagePosition('gallery-2')?.verticalPosition || 0
                }}
                onPositionChange={(position: { x: number; y: number }) => {
                  const currentPos = getImagePosition('gallery-2') || {
                    objectPosition: 'center center',
                    horizontalPosition: 0,
                    verticalPosition: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'none',
                    objectFit: 'cover' as const
                  };
                  updateImagePosition('gallery-2', {
                    ...currentPos,
                    objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                    horizontalPosition: position.x,
                    verticalPosition: position.y
                  });
                }}
              />
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={images[2] || newImages.img25}
                    onImageSelect={(url) => updateImage(2, url)}
                    className="absolute inset-0"
                  />
                  <ImagePositionControls
                    currentPosition={getImagePosition('gallery-2')}
                    onPositionChange={(position) => updateImagePosition('gallery-2', position)}
                    className="absolute inset-0"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Forme um Cidadão Global
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            O Programa Bilíngue da OSE prepara seu filho para os desafios de um mundo globalizado, 
            desenvolvendo fluência autêntica e consciência cultural.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange hover:bg-gray-100 font-semibold px-8 py-3"
          >
            Saiba Mais Sobre o Programa
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}