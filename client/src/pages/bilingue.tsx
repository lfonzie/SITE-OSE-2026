import { Globe, Users, BookOpen, Award, Target, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import WhyOSESection from '@/components/why-ose-section';
import PedagogicalProposalSection from '@/components/pedagogical-proposal-section';
import FeaturesSection from '@/components/features-section';
import TestimonialsSection from '@/components/testimonials-section';
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
import SEO from '@/components/SEO';

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
      "description": "Material didático de excelência internacional com metodologia comprovada e reconhecida mundialmente."
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Programa Bilíngue - Colégio OSE",
    "url": "https://colegioose.com.br/bilingue",
    "description": "Programa Bilíngue Global Citizens no Colégio OSE com immersão natural no inglês, metodologia Cambridge e formação para cidadania global em Sorocaba.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Colégio OSE",
      "url": "https://colegioose.com.br"
    },
    "hasOfferingCatalog": {
      "@type": "OfferingCatalog",
      "name": "Global Citizens Program",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Imersão Natural no Inglês",
          "description": "Aprendizado contextualizado e natural da língua inglesa"
        },
        {
          "@type": "Course",
          "name": "Metodologia Cambridge",
          "description": "Currículo internacional de excelência reconhecida"
        }
      ]
    },
    "teaches": [
      "Inglês Imersivo",
      "Metodologia Cambridge",
      "Cidadania Global",
      "Competências Interculturais",
      "Comunicação Internacional"
    ]
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Programa Bilíngue Global Citizens - Colégio OSE | Imersão em Inglês em Sorocaba"
        description="Programa Bilíngue Global Citizens no Colégio OSE com imersão natural em inglês, metodologia Cambridge e formação para cidadania global. Educação bilíngue de excelência em Sorocaba."
        keywords="programa bilíngue sorocaba, global citizens, metodologia cambridge, imersão inglês, escola bilíngue particular sorocaba, cidadania global, educação internacional"
        canonical="https://colegioose.com.br/bilingue"
        ogTitle="Programa Bilíngue Global Citizens - Colégio OSE | Metodologia Cambridge"
        ogDescription="Programa Bilíngue com imersão natural em inglês e metodologia Cambridge. Formação para cidadania global no Colégio OSE."
        ogImage="https://colegioose.com.br/images/LogoOSE100anos.png"
        structuredData={structuredData}
      />
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-orange-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/25 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={{
          ...(heroBackground?.type === 'gradient' && {
            backgroundImage: `linear-gradient(135deg, ${heroBackground.gradientColors?.join(', ') || '#475569, #64748b'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }),
          ...(heroBackground?.type === 'image' && heroBackground.imageUrl && {
            backgroundImage: `url(${heroBackground.imageUrl})`,
            backgroundSize: heroBackground.size || 'cover',
            backgroundPosition: heroBackground.position || 'center',
            backgroundRepeat: heroBackground.repeat || 'no-repeat'
          }),
          ...(heroBackground?.type === 'color' && {
            backgroundColor: heroBackground.solidColor || '#475569'
          }),
          ...(!heroBackground?.type && {
            backgroundImage: 'linear-gradient(135deg, #475569, #64748b)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }),
          opacity: heroBackground?.opacity || 1
        }}
      >
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

        <div className="relative z-10 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl p-8 shadow-lg text-left max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Global <span className="text-school-orange">Citizens</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Educação Bilíngue Integral
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Formando cidadãos globais conscientes
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              Na OSE, a educação bilíngue é mais que uma metodologia - é uma janela para o mundo. 
              <strong className="text-school-orange"> As aulas são diárias após as aulas tradicionais e são opcionais</strong>, 
              oferecendo uma imersão completa no idioma inglês e preparando nossos alunos 
              para serem verdadeiros cidadãos globais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 backdrop-blur-lg bg-white/20 border border-white/20 rounded-xl p-8 shadow-lg">
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
                <div key={index} className="backdrop-blur-lg bg-white/30 border border-white/20 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/40">
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
          <div className="grid md:grid-cols-3 gap-6 backdrop-blur-lg bg-white/20 border border-white/20 rounded-xl p-6 shadow-lg">
            <div className="relative backdrop-blur-md bg-white/20 rounded-lg overflow-hidden border border-white/20">
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
            <div className="relative backdrop-blur-md bg-white/20 rounded-lg overflow-hidden border border-white/20">
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
            <div className="relative backdrop-blur-md bg-white/20 rounded-lg overflow-hidden border border-white/20">
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
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-gradient-to-r from-school-orange/80 to-school-brown/80 border border-white/20 rounded-xl p-12 shadow-lg text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Forme um Cidadão Global
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              O Programa Bilíngue da OSE prepara seu filho para os desafios de um mundo globalizado, 
              desenvolvendo fluência autêntica e consciência cultural.
            </p>
            <Button 
              size="lg" 
              className="bg-white/90 text-school-orange hover:bg-white font-semibold px-8 py-3 backdrop-blur-sm"
            >
              Saiba Mais Sobre o Programa
            </Button>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <PedagogicalProposalSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}