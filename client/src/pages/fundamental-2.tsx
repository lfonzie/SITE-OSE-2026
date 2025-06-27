
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Brain, Users, Award, BookOpen, Target, Lightbulb, Star, Globe, Heart } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import { useAuth } from '@/contexts/AuthContext';
import DragImagePosition from '@/components/DragImagePosition';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import LogoutButton from '@/components/LogoutButton';

// Importando imagens para Fundamental II
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img7;
const img2 = newImages.img8;
const img3 = newImages.img9;
const img4 = newImages.img10;
const img5 = newImages.img11;
const img6 = newImages.img12;

export default function Fundamental2() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Fundamental II');
  
  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('Fundamental II', {
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
      title: "Ensino Fundamental II - Anos Finais | OSE",
      description: "Ensino Fundamental II na OSE: formando líderes conscientes para um mundo em transformação. 6º ao 9º ano com foco em cidadania e ética.",
      keywords: "ensino fundamental II sorocaba, anos finais, liderança, cidadania, ética"
    });
  }, []);

  const years = [
    { year: "6º Ano", description: "Transição e adaptação" },
    { year: "7º Ano", description: "Desenvolvimento cognitivo" },
    { year: "8º Ano", description: "Formação da identidade" },
    { year: "9º Ano", description: "Preparação para o futuro" }
  ];

  const features = [
    {
      icon: Brain,
      title: "Pensamento Crítico",
      description: "Desenvolvimento de habilidades analíticas e capacidade de questionar e refletir sobre o mundo."
    },
    {
      icon: Users,
      title: "Liderança e Cidadania",
      description: "Formação de jovens conscientes de seu papel na sociedade e preparados para liderar."
    },
    {
      icon: BookOpen,
      title: "Currículo Interdisciplinar",
      description: "Integração entre disciplinas para uma compreensão ampla e conectada do conhecimento."
    },
    {
      icon: Target,
      title: "Projeto de Vida",
      description: "Orientação para que cada aluno desenvolva seus objetivos pessoais e profissionais."
    }
  ];

  const differentials = [
    {
      icon: Star,
      title: "Metodologia Inovadora",
      description: "Abordagem pedagógica que combina tradição e inovação, preparando alunos para os desafios do século XXI."
    },
    {
      icon: Globe,
      title: "Visão Global",
      description: "Desenvolvimento de uma perspectiva internacional através de projetos e parcerias educacionais."
    },
    {
      icon: Heart,
      title: "Educação Socioemocional",
      description: "Programa estruturado para desenvolvimento de competências emocionais e sociais."
    },
    {
      icon: Lightbulb,
      title: "Inovação e Tecnologia",
      description: "Integração de ferramentas tecnológicas e metodologias ativas no processo de aprendizagem."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Admin Logout Button */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <LogoutButton />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        {heroBackground && (
          <div className="absolute inset-0">
            {heroBackground.type === 'image' && heroBackground.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${heroBackground.imageUrl})`,
                  backgroundPosition: heroBackground.position || 'center',
                  backgroundSize: heroBackground.size || 'cover',
                  backgroundRepeat: heroBackground.repeat || 'no-repeat',
                  opacity: heroBackground.opacity || 1
                }}
              />
            )}
            {heroBackground.type === 'gradient' && heroBackground.gradientColors && (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${heroBackground.gradientColors.join(', ')})`,
                  opacity: heroBackground.opacity || 1
                }}
              />
            )}
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
              opacity: heroBackground.overlayOpacity || 0.7
            }}
          ></div>
        )}

        <div className="relative z-10 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ensino Fundamental II
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Formando líderes conscientes para um mundo em transformação
              </span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-slate-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Do 6º ao 9º ano, nossos alunos desenvolvem pensamento crítico, liderança e cidadania em um ambiente que estimula a excelência acadêmica e o crescimento pessoal.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Years Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Anos do Ensino Fundamental II</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {years.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-4 rounded-xl text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.year}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Anos Finais que <span className="text-school-orange">Transformam</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Uma educação que desenvolve o pensamento crítico, a liderança e a consciência cidadã, 
              preparando jovens para os desafios do futuro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <div className="text-center p-6 h-full">
                    <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent size={32} className="text-school-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Preparando Líderes do Futuro
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  O Ensino Fundamental II é uma fase empolgante e transformadora onde nossos alunos 
                  passam por <strong>rápido desenvolvimento cognitivo e emocional</strong>. Nosso foco 
                  está além do currículo acadêmico.
                </p>
                <p>
                  Criamos um ambiente que promove <strong>autonomia, responsabilidade e pensamento crítico</strong>, 
                  essenciais para formar jovens conscientes e preparados para os desafios do futuro.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agendamento Avaliação Pedagógica
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <DragImagePosition
                  src={images[0] || img2}
                  alt="Estudantes do Fundamental II em atividades"
                  className="w-full h-32 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('philosophy-1')?.horizontalPosition || 0,
                    y: getImagePosition('philosophy-1')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('philosophy-1') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('philosophy-1', {
                      ...currentPos,
                      objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                      horizontalPosition: position.x,
                      verticalPosition: position.y
                    });
                  }}
                />
              </div>
              <div className="relative">
                <DragImagePosition
                  src={images[1] || img3}
                  alt="Atividades pedagógicas"
                  className="w-full h-32 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('philosophy-2')?.horizontalPosition || 0,
                    y: getImagePosition('philosophy-2')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('philosophy-2') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('philosophy-2', {
                      ...currentPos,
                      objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                      horizontalPosition: position.x,
                      verticalPosition: position.y
                    });
                  }}
                />
              </div>
              <div className="relative col-span-2">
                <DragImagePosition
                  src={images[2] || img4}
                  alt="Ambiente educacional"
                  className="w-full h-24 rounded-lg shadow-lg"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition('philosophy-3')?.horizontalPosition || 0,
                    y: getImagePosition('philosophy-3')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('philosophy-3') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('philosophy-3', {
                      ...currentPos,
                      objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                      horizontalPosition: position.x,
                      verticalPosition: position.y
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Currículo de Excelência
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Base Nacional Comum Curricular integrada com metodologias inovadoras
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Linguagens</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Língua Portuguesa avançada</li>
                <li>• Inglês intensivo</li>
                <li>• Arte e Educação Física</li>
                <li>• Produção textual</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Matemática</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Álgebra e Geometria</li>
                <li>• Resolução de problemas</li>
                <li>• Raciocínio lógico</li>
                <li>• Matemática aplicada</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Ciências Humanas</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• História e Geografia</li>
                <li>• Educação para cidadania</li>
                <li>• Estudos sociais</li>
                <li>• Filosofia aplicada</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Ciências da Natureza</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Ciências integradas</li>
                <li>• Laboratório de experiências</li>
                <li>• Educação ambiental</li>
                <li>• Método científico</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Ensino Religioso</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Valores éticos</li>
                <li>• Diversidade religiosa</li>
                <li>• Respeito e tolerância</li>
                <li>• Formação cidadã</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Projetos Especiais</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Projeto de vida</li>
                <li>• Protagonismo juvenil</li>
                <li>• Tecnologia educacional</li>
                <li>• Empreendedorismo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Diferenciais do Fundamental II OSE
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Metodologia única que combina excelência acadêmica com formação integral
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((differential, index) => {
              const IconComponent = differential.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <div className="bg-gradient-to-br from-school-orange/5 to-school-brown/5 p-8 rounded-xl text-center h-full">
                    <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent size={32} className="text-school-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{differential.title}</h3>
                    <p className="text-gray-600">{differential.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-school-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Venha Conhecer o Fundamental II OSE
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Agende uma visita e veja como podemos contribuir para a formação integral do seu filho
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-school-orange hover:bg-gray-50">
            Agendar Visita
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
