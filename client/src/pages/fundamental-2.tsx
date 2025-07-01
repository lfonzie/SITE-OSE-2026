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

import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';

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
    images: [img2, img3, img4, img5, img6, img1],
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Ensino Fundamental II - Colégio OSE",
    "url": "https://colegioose.com.br/fundamental-2",
    "description": "Ensino Fundamental Anos Finais no Colégio OSE com pensamento crítico, liderança e currículo interdisciplinar para adolescentes de 11 a 14 anos em Sorocaba.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Colégio OSE",
      "url": "https://colegioose.com.br"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "adolescents aged 11-14"
    },
    "educationalLevel": "Ensino Fundamental II",
    "teaches": [
      "Pensamento Crítico",
      "Liderança e Cidadania",
      "Currículo Interdisciplinar",
      "Projeto de Vida",
      "Metodologia Inovadora",
      "Educação Socioemocional"
    ]
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Ensino Fundamental II - Colégio OSE | Anos Finais com Pensamento Crítico em Sorocaba"
        description="Ensino Fundamental II no Colégio OSE com desenvolvimento do pensamento crítico, liderança e projeto de vida. Metodologia inovadora e currículo interdisciplinar para adolescentes de 11 a 14 anos."
        keywords="ensino fundamental 2 sorocaba, anos finais, pensamento crítico, liderança adolescente, escola fundamental particular sorocaba, projeto de vida, currículo interdisciplinar"
        canonical="https://colegioose.com.br/fundamental-2"
        ogTitle="Ensino Fundamental II - Colégio OSE | Pensamento Crítico e Liderança"
        ogDescription="Ensino Fundamental Anos Finais com pensamento crítico e projeto de vida. Formação de líderes conscientes para adolescentes de 11 a 14 anos no Colégio OSE."
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
              Ensino Fundamental <span className="text-school-orange">II</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                6º ao 9º Ano - Formando Líderes Conscientes
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Formando <strong>líderes conscientes</strong> para um <strong>mundo em transformação</strong>
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              Do 6º ao 9º ano, nossos alunos desenvolvem pensamento crítico, liderança e cidadania 
              em um ambiente que estimula a excelência acadêmica e o crescimento pessoal, preparando-os 
              para os desafios do futuro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Years Navigation */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Anos do Ensino Fundamental II</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Estrutura organizada por faixa etária para melhor desenvolvimento
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
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
                Anos Finais que <span className="text-school-orange">Transformam</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Uma educação que desenvolve o pensamento crítico, a liderança e a consciência cidadã, 
                preparando jovens para os desafios do futuro.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1 text-center h-full">
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
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="backdrop-blur-lg bg-white/25 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
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
              <div className="relative group">
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
                {isAuthenticated && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EnhancedImageSelector
                      currentImage={images[0] || img2}
                      onImageSelect={(newImage) => updateImage(0, newImage)}
                      className="absolute inset-0"
                    />
                  </div>
                )}
              </div>
              <div className="relative group">
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
                {isAuthenticated && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EnhancedImageSelector
                      currentImage={images[1] || img3}
                      onImageSelect={(newImage) => updateImage(1, newImage)}
                      className="absolute inset-0"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Highlights */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Currículo de Excelência
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Base Nacional Comum Curricular integrada com metodologias inovadoras
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Linguagens</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Língua Portuguesa avançada</li>
                <li>• Inglês intensivo</li>
                <li>• Arte e Educação Física</li>
                <li>• Produção textual</li>
              </ul>
            </div>

            <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Matemática</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Álgebra e Geometria</li>
                <li>• Resolução de problemas</li>
                <li>• Raciocínio lógico</li>
                <li>• Matemática aplicada</li>
              </ul>
            </div>

            <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Ciências Humanas</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• História e Geografia</li>
                <li>• Educação para cidadania</li>
                <li>• Estudos sociais</li>
                <li>• Filosofia aplicada</li>
              </ul>
            </div>

            <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Ciências da Natureza</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Ciências integradas</li>
                <li>• Laboratório de experiências</li>
                <li>• Educação ambiental</li>
                <li>• Método científico</li>
              </ul>
            </div>

            <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Tecnologia e Inovação</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Programação e robótica</li>
                <li>• Ferramentas digitais</li>
                <li>• Pensamento computacional</li>
                <li>• Projetos inovadores</li>
              </ul>
            </div>

            <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
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
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Diferenciais do Fundamental II OSE
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Metodologia única que combina excelência acadêmica com formação integral
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((differential, index) => {
              const IconComponent = differential.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <div className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1 text-center h-full">
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
    </div>
  );
}