import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
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
  const { heroImage, images, updateHeroImage, updateImage, getImagePosition, updateImagePosition } = usePageData('Programa Integral', {
    heroImage: '/images/horizontal_1.png',
    images: ['/images/horizontal_2.png', '/images/horizontal_3.png', '/images/horizontal_4.png']
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <DragImagePosition
            src={heroImage || newImages.horizontal29}
            alt="Integral Flex - Período Integral"
            className="w-full h-full opacity-30"
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
              currentImage={heroImage || newImages.horizontal29}
              onImageSelect={updateHeroImage}
              className="absolute top-4 right-4 z-10"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-700/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Integral <span className="text-school-orange">Flex</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Desenvolvendo <strong>mentes criativas</strong> e <strong>corpos saudáveis</strong>
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                O Integral Flex da OSE é onde a educação se estende além da sala de aula. 
                Nossos alunos vivenciam um programa completo de desenvolvimento integral das 12h às 17h30.
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
                  src={newImages.horizontal30}
                  alt="Atividades do Integral Flex"
                  className="w-full h-48 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('hero-grid-0')?.horizontalPosition || 0,
                    y: getImagePosition('hero-grid-0')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('hero-grid-0') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('hero-grid-0', {
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
                      currentImage={newImages.horizontal30}
                      onImageSelect={(url) => updateImage(0, url)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <ImagePositionControls
                      currentPosition={getImagePosition('hero-grid-0')}
                      onPositionChange={(newPosition) => updateImagePosition('hero-grid-0', newPosition)}
                      className="absolute bottom-2 right-2 z-10"
                    />
                  </>
                )}
              </div>
              <div className="relative">
                <DragImagePosition
                  src={newImages.horizontal31}
                  alt="Apoio acadêmico"
                  className="w-full h-48 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('hero-grid-1')?.horizontalPosition || 0,
                    y: getImagePosition('hero-grid-1')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('hero-grid-1') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('hero-grid-1', {
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
                      currentImage={newImages.horizontal31}
                      onImageSelect={(url) => updateImage(1, url)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <ImagePositionControls
                      currentPosition={getImagePosition('hero-grid-1')}
                      onPositionChange={(newPosition) => updateImagePosition('hero-grid-1', newPosition)}
                      className="absolute bottom-2 right-2 z-10"
                    />
                  </>
                )}
              </div>
              <div className="relative col-span-2">
                <DragImagePosition
                  src={newImages.horizontal32}
                  alt="Atividades complementares"
                  className="w-full h-48 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('hero-grid-2')?.horizontalPosition || 0,
                    y: getImagePosition('hero-grid-2')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('hero-grid-2') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('hero-grid-2', {
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
                      currentImage={newImages.horizontal32}
                      onImageSelect={(url) => updateImage(2, url)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <ImagePositionControls
                      currentPosition={getImagePosition('hero-grid-2')}
                      onPositionChange={(newPosition) => updateImagePosition('hero-grid-2', newPosition)}
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