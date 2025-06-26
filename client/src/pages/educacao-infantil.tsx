import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
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


// Usando imagens da pasta public/images

export default function EducacaoInfantil() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Educação Infantil');
  
  // Initialize page data with auto-save functionality
  const { heroImage, images, updateHeroImage, updateImage, getImagePosition, updateImagePosition } = usePageData('Educação Infantil', {
    heroImage: '/images/horizontal_1.png',
    images: ['/images/horizontal_2.png', '/images/horizontal_3.png', '/images/horizontal_4.png']
  });

  useEffect(() => {
    updateSEO({
      title: "Educação Infantil - Primeiros Passos | OSE",
      description: "Educação Infantil na OSE: desenvolvendo mentes curiosas e corações compassivos. Ambiente acolhedor para crianças de 2 a 5 anos.",
      keywords: "educação infantil sorocaba, berçário, maternal, pré-escola, desenvolvimento infantil"
    });
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Desenvolvimento Emocional",
      description: "Cultivamos a inteligência emocional desde os primeiros anos."
    },
    {
      icon: Users,
      title: "Socialização",
      description: "Ambientes que promovem a interação e o trabalho em equipe."
    },
    {
      icon: Award,
      title: "Reconhecimento Individual",
      description: "Cada criança é única e merece atenção especial."
    },
    {
      icon: BookOpen,
      title: "Alfabetização Lúdica",
      description: "Aprendizado através de brincadeiras e descobertas."
    },
    {
      icon: Target,
      title: "Objetivos Claros",
      description: "Metas de desenvolvimento adaptadas a cada faixa etária."
    },
    {
      icon: Lightbulb,
      title: "Criatividade",
      description: "Estímulo à imaginação e expressão artística."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Visual Composer - floating edit button for authenticated users */}
      <VisualComposerComponent />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage || '/images/horizontal_1.png'}
            alt="Educação Infantil OSE"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/60 to-slate-700/60"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                Educação <span className="text-school-orange">Infantil</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Onde cada descoberta é uma aventura e cada sorriso é uma conquista. 
                Na OSE, cultivamos o amor pelo aprender desde os primeiros passos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-school-orange hover:bg-school-orange/90 text-white px-8 py-4 rounded-full font-semibold text-lg">
                  Agendar Visita
                </Button>
                <Button variant="outline" className="border-school-brown text-school-brown hover:bg-school-brown hover:text-white px-8 py-4 rounded-full font-semibold text-lg">
                  Conhecer Programa
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <DragImagePosition
                  src={images[0] || '/images/horizontal_2.png'}
                  alt="Educação Infantil OSE"
                  className="w-full h-full object-cover"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('hero-main')?.horizontalPosition || 0,
                    y: getImagePosition('hero-main')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('hero-main') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('hero-main', {
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
                      currentImage={images[0] || '/images/horizontal_2.png'}
                      onImageSelect={(url) => updateImage(0, url)}
                      className="absolute top-4 right-4 z-10"
                    />
                    <ImagePositionControls
                      currentPosition={getImagePosition('hero-main')}
                      onPositionChange={(position) => updateImagePosition('hero-main', position)}
                      className="absolute inset-0"
                    />
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Nossos <span className="text-school-orange">Diferenciais</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Uma educação que respeita o tempo e as características únicas de cada criança.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard 
                key={index}
                delay={index * 0.1}
                direction="up"
                hover={true}
                scale={true}
              >
                <div className="bg-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                  <AnimatedIcon delay={index * 0.1 + 0.3}>
                    <div className="w-16 h-16 bg-school-orange rounded-full flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </AnimatedIcon>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Nossos <span className="text-school-orange">Espaços</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ambientes pensados especialmente para o desenvolvimento infantil.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map((index) => (
              <AnimatedCard 
                key={index}
                delay={index * 0.1}
                direction="up"
                hover={true}
                scale={true}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <DragImagePosition
                    src={images[index] || `/images/horizontal_${index + 2}.png`}
                    alt={`Espaço ${index + 1} - Educação Infantil`}
                    className="w-full h-full object-cover"
                    editable={isAuthenticated}
                    initialPosition={{
                      x: getImagePosition(`gallery-${index}`)?.horizontalPosition || 0,
                      y: getImagePosition(`gallery-${index}`)?.verticalPosition || 0
                    }}
                    onPositionChange={(position: { x: number; y: number }) => {
                      const currentPos = getImagePosition(`gallery-${index}`) || {
                        objectPosition: 'center center',
                        horizontalPosition: 0,
                        verticalPosition: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'none',
                        objectFit: 'cover' as const
                      };
                      updateImagePosition(`gallery-${index}`, {
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
                        currentImage={images[index] || `/images/horizontal_${index + 2}.png`}
                        onImageSelect={(url) => updateImage(index, url)}
                        className="absolute top-2 right-2 z-10"
                      />
                      <ImagePositionControls
                        currentPosition={getImagePosition(`gallery-${index}`)}
                        onPositionChange={(position) => updateImagePosition(`gallery-${index}`, position)}
                        className="absolute inset-0"
                      />
                    </>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}