import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
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
import LogoutButton from '@/components/LogoutButton';

// Usando imagens da pasta public/images
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img16;
const img2 = newImages.img17;
const img3 = newImages.img18;
const img4 = newImages.img19;
const img5 = newImages.img20;
const img6 = newImages.img21;

export default function Fundamental1() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Fundamental I');

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
  } = usePageData('Fundamental I', {
    heroImage: img1,
    images: [img2, img3, img4],
    heroBackground: {
      type: 'image',
      imageUrl: img1,
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.7,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  useEffect(() => {
    updateSEO({
      title: "Ensino Fundamental I - Anos Iniciais | OSE",
      description: "Ensino Fundamental I na OSE: desenvolvendo mentes curiosas e corações compassivos. Educação integral para crianças de 6 a 10 anos.",
      keywords: "ensino fundamental I sorocaba, anos iniciais, educação infantil, desenvolvimento cognitivo"
    });
  }, []);

  const years = [
    { year: "1º Ano", description: "Alfabetização e letramento com foco lúdico" },
    { year: "2º Ano", description: "Consolidação da leitura e escrita" },
    { year: "3º Ano", description: "Aprofundamento e autonomia nos estudos" },
    { year: "4º Ano", description: "Desenvolvimento do pensamento crítico" },
    { year: "5º Ano", description: "Preparação para o Fundamental II" }
  ];

  const features = [
    {
      icon: Heart,
      title: "Desenvolvimento Emocional",
      description: "Cultivamos inteligência emocional e valores humanos fundamentais",
      color: "bg-red-500"
    },
    {
      icon: Target,
      title: "Aprendizagem Significativa",
      description: "Metodologias ativas que tornam o aprendizado prazeroso e efetivo",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Socialização Saudável",
      description: "Ambiente acolhedor que promove amizades duradouras e respeito mútuo",
      color: "bg-green-500"
    },
    {
      icon: Lightbulb,
      title: "Criatividade e Inovação",
      description: "Estímulo à criatividade através de projetos e atividades lúdicas",
      color: "bg-yellow-500"
    },
    {
      icon: BookOpen,
      title: "Base Acadêmica Sólida",
      description: "Fundamentos essenciais para uma trajetória escolar de sucesso",
      color: "bg-purple-500"
    },
    {
      icon: Award,
      title: "Formação de Caráter",
      description: "Desenvolvimento de valores éticos e responsabilidade social",
      color: "bg-orange-500"
    }
  ];

  const metodologia = [
    {
      title: "Aprendizagem Lúdica",
      description: "Transformamos o aprender em brincadeira, respeitando o universo infantil"
    },
    {
      title: "Desenvolvimento Integral",
      description: "Cuidamos dos aspectos cognitivo, emocional, social e físico"
    },
    {
      title: "Acompanhamento Individual",
      description: "Atenção personalizada para potencializar as habilidades de cada criança"
    },
    {
      title: "Ambiente Acolhedor",
      description: "Espaços seguros e estimulantes para explorar e crescer"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Ensino Fundamental I - Colégio OSE",
    "url": "https://colegioose.com.br/fundamental-1",
    "description": "Ensino Fundamental Anos Iniciais no Colégio OSE com metodologia lúdica, desenvolvimento emocional e base acadêmica sólida para crianças de 6 a 10 anos em Sorocaba.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Colégio OSE",
      "url": "https://colegioose.com.br"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "children aged 6-10"
    },
    "educationalLevel": "Ensino Fundamental I",
    "teaches": [
      "Desenvolvimento Emocional",
      "Aprendizagem Significativa",
      "Socialização Saudável",
      "Criatividade e Inovação",
      "Base Acadêmica Sólida",
      "Formação de Caráter"
    ]
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Ensino Fundamental I - Colégio OSE | Anos Iniciais com Metodologia Lúdica em Sorocaba"
        description="Ensino Fundamental I no Colégio OSE com aprendizagem lúdica, desenvolvimento emocional e base acadêmica sólida. Metodologia ativa para crianças de 6 a 10 anos em ambiente acolhedor e estimulante."
        keywords="ensino fundamental 1 sorocaba, anos iniciais, metodologia lúdica, desenvolvimento emocional criança, escola fundamental particular sorocaba, aprendizagem significativa, formação de caráter"
        canonical="https://colegioose.com.br/fundamental-1"
        ogTitle="Ensino Fundamental I - Colégio OSE | Metodologia Lúdica e Desenvolvimento Integral"
        ogDescription="Ensino Fundamental Anos Iniciais com metodologia lúdica e desenvolvimento emocional. Base acadêmica sólida para crianças de 6 a 10 anos no Colégio OSE."
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
        style={(() => {
          const baseStyle: React.CSSProperties = {
            opacity: heroBackground?.opacity || 1
          };

          if (heroBackground?.type === 'gradient') {
            return {
              ...baseStyle,
              backgroundImage: `linear-gradient(135deg, ${heroBackground.gradientColors?.join(', ') || '#475569, #64748b'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            };
          }

          if (heroBackground?.type === 'image' && heroBackground.imageUrl) {
            return {
              ...baseStyle,
              backgroundImage: `url(${heroBackground.imageUrl})`,
              backgroundSize: heroBackground.size || 'cover',
              backgroundPosition: heroBackground.position || 'center',
              backgroundRepeat: heroBackground.repeat || 'no-repeat'
            };
          }

          if (heroBackground?.type === 'color') {
            return {
              ...baseStyle,
              backgroundColor: heroBackground.solidColor || '#475569'
            };
          }

          return {
            ...baseStyle,
            backgroundImage: 'linear-gradient(135deg, #475569, #64748b)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          };
        })()}
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
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/20 max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ensino Fundamental <span className="text-school-orange">I</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                1º ao 5º Ano - Desenvolvendo Mentes Curiosas
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Desenvolvendo <strong>mentes curiosas</strong> e <strong>corações compassivos</strong>
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              O Ensino Fundamental I da OSE é onde a jornada educacional se torna uma aventura 
              emocionante. Nossos pequenos alunos descobrem o prazer de aprender em um ambiente 
              acolhedor, seguro e estimulante.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Years Navigation */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Anos do Ensino Fundamental I</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Estrutura organizada por faixa etária para melhor desenvolvimento
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {years.map((item, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/30 border border-white/40 p-6 rounded-xl text-center shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.year}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Anos Iniciais que <span className="text-school-orange">Inspiram</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Uma educação que respeita o desenvolvimento natural da criança, 
                estimulando curiosidade e construindo bases sólidas para o futuro
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1 h-full">
                    <div className={`${feature.color} text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-school-orange">Metodologia que Encanta</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Transformando o aprendizado em descoberta através de práticas pedagógicas inovadoras
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {metodologia.map((item, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-6 rounded-xl shadow-xl shadow-black/10 text-center h-full border-l-4 border-l-school-orange hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="backdrop-blur-lg bg-white/25 border border-white/30 p-8 rounded-xl shadow-xl shadow-black/10">
            <p className="text-lg text-slate-700 text-center">
              Cada criança é única, por isso oferecemos atenção personalizada para potencializar suas habilidades 
              em um ambiente seguro e estimulante onde podem explorar e crescer plenamente.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <DragImagePosition
                src={images[0] || img2}
                alt="Atividades colaborativas no Fundamental I"
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
                    currentImage={images[0] || img2}
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
                src={images[1] || img3}
                alt="Projetos educacionais criativos"
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
                    currentImage={images[1] || img3}
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
                src={images[2] || img4}
                alt="Ambiente de aprendizado estimulante"
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
                    currentImage={images[2] || img4}
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

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            O Melhor Começo para Seu Filho
          </h3>
          <p className="text-xl mb-8">
            Há 100 anos cuidando com carinho dos primeiros passos na educação
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange font-semibold px-8 py-3"
            onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
          >
            Agende uma Visita e Conheça Nossa Escola
          </Button>
        </div>
      </section>

    {/* Seções padrão */}
    <div className="backdrop-blur-sm bg-white/20 border-b border-white/10">
      <WhyOSESection />
    </div>

    <div className="backdrop-blur-md bg-white/25 border-b border-white/20 shadow-sm">
      <PedagogicalProposalSection />
    </div>

    <div className="backdrop-blur-sm bg-white/15 border-b border-white/10">
      <FeaturesSection />
    </div>

    <div className="backdrop-blur-sm bg-white/20 border-b border-white/10">
      <TestimonialsSection />
    </div>

    <div className="backdrop-blur-lg bg-white/40 border-t border-white/30 shadow-lg">
      <ContactSection />
    </div>
  );
}