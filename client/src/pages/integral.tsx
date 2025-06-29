import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import SEO from '@/components/SEO';
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Music, Dumbbell, Globe, TreePine, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import { newImages } from "@/lib/image-verification";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import { useAuth } from '@/contexts/AuthContext';
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

export default function Integral() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Programa Integral');

  // Initialize page data with auto-save functionality
  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    getImagePosition, 
    updateImagePosition 
  } = usePageData('Integral', {
    heroImage: newImages.horizontal30,
    images: [newImages.horizontal30, newImages.horizontal31, newImages.horizontal32],
    heroBackground: {
      type: 'gradient',
      gradientColors: ['#475569', '#64748b'],
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.8,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  useEffect(() => {
    updateSEO({
      title: "Integral Flex - Período Integral Flexível | a OSE",
      description: "Integral Flex na OSE: período integral flexível das 12h às 17h30. Desenvolvimento integral com apoio acadêmico, nutrição e atividades complementares.",
      keywords: "período integral sorocaba, integral flex, desenvolvimento integral, apoio acadêmico"
    });
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Apoio Acadêmico",
      description: "Vai além da mera assistência nas tarefas escolares. Fornecemos apoio acadêmico individualizado, facilitando o aprendizado profundo com estratégias adaptadas às necessidades de cada aluno."
    },
    {
      icon: Heart,
      title: "Nutrição e Bem-Estar",
      description: "Cardápio planejado por nutricionistas, assegurando que cada refeição e lanche seja nutricionalmente balanceado e contribui para a saúde e desempenho acadêmico dos alunos."
    },
    {
      icon: Music,
      title: "Musicalização e Arte",
      description: "A arte e a música são fundamentais para o desenvolvimento emocional, social e cognitivo. Utilizamos essas disciplinas como ferramentas de ensino para enriquecer a experiência educacional."
    },
    {
      icon: Dumbbell,
      title: "Atividades Físicas e Relaxamento",
      description: "Oferecemos atividades que variam desde técnicas de relaxamento até exercícios de expressão corporal, visando a melhoria da saúde mental e física dos alunos."
    },
    {
      icon: Globe,
      title: "Educação Bilíngue e Cultural",
      description: "Inclui ensino bilíngue diário e passeios culturais que expandem o horizonte educacional, tornando nossos alunos cidadãos verdadeiramente globais."
    },
    {
      icon: TreePine,
      title: "Educação Ambiental",
      description: "Ensinamos sobre responsabilidade ecológica e promovemos práticas sustentáveis que podem ser aplicadas no dia a dia, incutindo valores de sustentabilidade."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Programa Integral Flex - Colégio OSE",
    "url": "https://colegioose.com.br/integral",
    "description": "Programa Integral Flex no Colégio OSE com desenvolvimento integral, atividades extracurriculares, apoio pedagógico e educação bilíngue em período flexível em Sorocaba.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Colégio OSE",
      "url": "https://colegioose.com.br"
    },
    "hasOfferingCatalog": {
      "@type": "OfferingCatalog",
      "name": "Programa Integral Flex",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Apoio Pedagógico Personalizado",
          "description": "Acompanhamento individualizado para reforço escolar"
        },
        {
          "@type": "Course",
          "name": "Atividades Culturais e Esportivas",
          "description": "Desenvolvimento integral através de atividades diversificadas"
        }
      ]
    },
    "teaches": [
      "Desenvolvimento Integral",
      "Apoio Pedagógico",
      "Atividades Extracurriculares",
      "Educação Bilíngue",
      "Práticas Sustentáveis",
      "Formação Cultural"
    ]
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Programa Integral Flex - Colégio OSE | Desenvolvimento Integral em Período Flexível"
        description="Programa Integral Flex no Colégio OSE com apoio pedagógico personalizado, atividades extracurriculares, educação bilíngue e desenvolvimento integral em horário flexível para alunos em Sorocaba."
        keywords="programa integral sorocaba, período integral flexível, apoio pedagógico, atividades extracurriculares, escola integral particular sorocaba, desenvolvimento integral criança"
        canonical="https://colegioose.com.br/integral"
        ogTitle="Programa Integral Flex - Colégio OSE | Apoio Pedagógico e Atividades Extracurriculares"
        ogDescription="Programa Integral Flex com desenvolvimento completo do aluno. Apoio pedagógico, atividades culturais e esportivas em período flexível no Colégio OSE."
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
            className="text-left max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Integral <span className="text-school-orange">Flex</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Período Integral Flexível
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Desenvolvendo <strong>mentes criativas</strong> e <strong>corpos saudáveis</strong>
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              O Integral Flex da OSE é onde a educação se estende além da sala de aula. 
              Nossos alunos vivenciam um programa completo de desenvolvimento integral das 12h às 17h30.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Desenvolvimento <span className="text-school-orange">Integral</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Das 12h às 17h30, oferecemos um programa completo que vai além do apoio acadêmico, 
              promovendo o desenvolvimento integral de cada aluno
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

          {/* Educational Approach */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Desenvolvimento Holístico
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  O <strong>Integral Flex</strong> vai além da educação tradicional, oferecendo uma 
                  abordagem que considera todos os aspectos do desenvolvimento infantil e juvenil.
                </p>
                <p>
                  Acreditamos que o <strong>equilíbrio entre corpo e mente</strong> é crucial para um 
                  desenvolvimento saudável. Nosso programa oferece atividades diversificadas que 
                  contribuem para a formação integral do aluno.
                </p>
                <p>
                  A <strong>sustentabilidade</strong> é um valor que queremos incutir em nossos alunos. 
                  Por meio da educação ambiental, ensinamos sobre responsabilidade ecológica.
                </p>
              </div>
              <div className="mt-8">

              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <DragImagePosition
                  src={images[0] || newImages.horizontal30}
                  alt="Atividades do Integral Flex"
                  className="w-full h-48 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('integral-gallery-0')?.horizontalPosition || 0,
                    y: getImagePosition('integral-gallery-0')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('integral-gallery-0') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('integral-gallery-0', {
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
                      currentImage={images[0] || newImages.horizontal30}
                      onImageSelect={(url) => updateImage(0, url)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <ImagePositionControls
                      currentPosition={getImagePosition('integral-gallery-0')}
                      onPositionChange={(newPosition) => updateImagePosition('integral-gallery-0', newPosition)}
                      className="absolute bottom-2 right-2 z-10"
                    />
                  </>
                )}
              </div>
              <div className="relative">
                <DragImagePosition
                  src={images[1] || newImages.horizontal31}
                  alt="Apoio acadêmico"
                  className="w-full h-48 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('integral-gallery-1')?.horizontalPosition || 0,
                    y: getImagePosition('integral-gallery-1')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('integral-gallery-1') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('integral-gallery-1', {
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
                      currentImage={images[1] || newImages.horizontal31}
                      onImageSelect={(url) => updateImage(1, url)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <ImagePositionControls
                      currentPosition={getImagePosition('integral-gallery-1')}
                      onPositionChange={(newPosition) => updateImagePosition('integral-gallery-1', newPosition)}
                      className="absolute bottom-2 right-2 z-10"
                    />
                  </>
                )}
              </div>
              <div className="relative col-span-2">
                <DragImagePosition
                  src={images[2] || newImages.horizontal32}
                  alt="Atividades complementares"
                  className="w-full h-48 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('integral-gallery-2')?.horizontalPosition || 0,
                    y: getImagePosition('integral-gallery-2')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('integral-gallery-2') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('integral-gallery-2', {
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
                      currentImage={images[2] || newImages.horizontal32}
                      onImageSelect={(url) => updateImage(2, url)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <ImagePositionControls
                      currentPosition={getImagePosition('integral-gallery-2')}
                      onPositionChange={(newPosition) => updateImagePosition('integral-gallery-2', newPosition)}
                      className="absolute bottom-2 right-2 z-10"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Program Benefits */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-50 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Leitura e Jogo Educativo
              </h3>
              <p className="text-xl text-slate-600">
                Aprendizado Divertido e Engajante
              </p>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-slate-600 mb-6">
                Acreditamos que o aprendizado pode ser divertido. O programa inclui diversas 
                atividades de leitura e jogos educativos que, além de engajar os alunos, 
                contribuem para o desenvolvimento de habilidades sociais e cognitivas.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Em um mundo globalizado, ser bilíngue é uma habilidade valiosa. O Integral Flex 
                inclui ensino bilíngue diário, além de passeios culturais que expandem o horizonte 
                educacional.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Cronograma do <span className="text-school-orange">Integral Flex</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Das 12h às 17h30, uma programação completa e estruturada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-school-orange" />
                <h3 className="text-xl font-bold text-slate-800">12h - 13h30</h3>
              </div>
              <p className="text-slate-600">
                Almoço nutritivo e momento de socialização
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-school-orange" />
                <h3 className="text-xl font-bold text-slate-800">13h30 - 15h</h3>
              </div>
              <p className="text-slate-600">
                Apoio acadêmico personalizado e lição de casa
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="w-6 h-6 text-school-orange" />
                <h3 className="text-xl font-bold text-slate-800">15h - 16h</h3>
              </div>
              <p className="text-slate-600">
                Atividades físicas e momento de relaxamento
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-school-orange" />
                <h3 className="text-xl font-bold text-slate-800">16h - 16h30</h3>
              </div>
              <p className="text-slate-600">
                Lanche saudável e nutritivo
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-6 h-6 text-school-orange" />
                <h3 className="text-xl font-bold text-slate-800">16h30 - 17h30</h3>
              </div>
              <p className="text-slate-600">
                Atividades culturais, artísticas e educação bilíngue
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <TreePine className="w-6 h-6 text-school-orange" />
                <h3 className="text-xl font-bold text-slate-800">Durante o dia</h3>
              </div>
              <p className="text-slate-600">
                Educação ambiental e sustentabilidade integradas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Desenvolvimento Integral Completo
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            O Integral Flex oferece muito mais que apoio acadêmico - é um programa completo 
            de desenvolvimento que prepara seu filho para a vida.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange hover:bg-gray-100 font-semibold px-8 py-3"
          >
            Conheça o Programa Integral
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />

      {/* Visual Composer */}
      <VisualComposerComponent />
    </div>
  );
}