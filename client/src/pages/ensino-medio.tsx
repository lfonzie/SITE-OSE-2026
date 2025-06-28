import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Target, Award, Lightbulb, Brain, Heart, Globe, Calculator, Microscope, PenTool } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import DragImagePosition from '@/components/DragImagePosition';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { useAuth } from '@/contexts/AuthContext';

// Importando imagens para página Ensino Médio
import { newImages } from "@/lib/image-verification";

export default function EnsinoMedio() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Ensino Médio');

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
  } = usePageData('Ensino Médio', {
    heroImage: newImages.img7,
    images: [newImages.img7, newImages.img8, newImages.img9],
    heroBackground: {
      type: 'image',
      imageUrl: newImages.img7,
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
      title: "Ensino Médio - Novo Ensino Médio | a OSE",
      description: "Novo Ensino Médio na OSE: educação personalizada e flexível com itinerários formativos, formação geral básica e projetos integradores.",
      keywords: "novo ensino médio, itinerários formativos, educação personalizada, ENEM, vestibular, OSE sorocaba"
    });
  }, []);

  const pillars = [
    {
      icon: BookOpen,
      title: "Formação Geral Básica",
      description: "60% da carga horária com disciplinas essenciais alinhadas à BNCC, oferecendo uma fundação sólida em Matemática, Português e Ciências.",
      color: "bg-blue-500"
    },
    {
      icon: Target,
      title: "Projetos Integradores",
      description: "Pedra angular da abordagem interdisciplinar, permitindo aplicação prática do conhecimento e desenvolvimento de pensamento crítico.",
      color: "bg-green-500"
    },
    {
      icon: Globe,
      title: "Itinerários Formativos",
      description: "Exploração aprofundada de paixões e interesses com modelos específicos e integrados para atender necessidades educacionais e de carreira.",
      color: "bg-purple-500"
    },
    {
      icon: Heart,
      title: "Projeto de Vida",
      description: "Desenvolvimento do autoprotagonismo em esferas pessoal, acadêmica, profissional e cidadã, servindo como mapa orientador para o futuro.",
      color: "bg-red-500"
    }
  ];

  const itinerarios = [
    {
      title: "Narrativas do Mundo",
      description: "Linguagens e Ciências Humanas",
      icon: PenTool,
      color: "from-blue-500 to-purple-500",
      areas: ["Português", "História", "Geografia", "Filosofia", "Sociologia", "Inglês", "Artes"]
    },
    {
      title: "Rota Exata",
      description: "Matemática e Ciências da Natureza", 
      icon: Calculator,
      color: "from-green-500 to-blue-500",
      areas: ["Matemática", "Física", "Química", "Biologia"]
    }
  ];

  const projetoVida = [
    {
      title: "Esfera Pessoal",
      description: "Comportamentos, relações, hábitos",
      icon: Heart
    },
    {
      title: "Esfera Cidadã", 
      description: "Ética, atitudes",
      icon: Users
    },
    {
      title: "Esfera Acadêmica",
      description: "Estudos, pesquisas", 
      icon: BookOpen
    },
    {
      title: "Esfera Profissional",
      description: "Trabalho, carreira",
      icon: Target
    }
  ];

  const years = [
    { year: "1ª Série", description: "Base sólida e introdução aos itinerários" },
    { year: "2ª Série", description: "Aprofundamento e projetos práticos" },
    { year: "3ª Série", description: "Preparação ENEM e definição profissional" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
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
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-school-orange">Novo Ensino Médio</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                1ª, 2ª e 3ª Séries - Preparação para o Futuro
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Preparando Alunos para o Futuro
            </p>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Educação Personalizada e Flexível
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl mx-auto">
              O Novo Ensino Médio na OSE representa uma revolução na forma como abordamos a educação. 
              Com uma abordagem centrada no aluno e baseada na nova legislação, oferecemos uma experiência 
              educacional que é tanto abrangente quanto personalizada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Years Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Séries do Ensino Médio</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {years.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.year}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Pilares do <span className="text-school-orange">Novo Ensino Médio</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Modelo híbrido que une base comum robusta à flexibilidade de itinerários formativos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className={`${pillar.color} text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{pillar.title}</h3>
                    <p className="text-slate-600">{pillar.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Itinerários Formativos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Itinerários Formativos</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-4">
              
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore caminhos personalizados que fazem sentido para suas ambições pessoais e profissionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {itinerarios.map((itinerario, index) => {
              const Icon = itinerario.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.2} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-school-orange/20 h-full">
                    <div className={`bg-gradient-to-r ${itinerario.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{itinerario.title}</h3>
                    <p className="text-lg text-school-orange font-semibold mb-4">{itinerario.description}</p>
                    <div className="space-y-2">
                      {itinerario.areas.map((area, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-school-orange rounded-full mr-3"></div>
                          <span className="text-slate-600">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projeto de Vida */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Projeto de Vida</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Desenvolvimento do autoprotagonismo em diversas esferas da vida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {projetoVida.map((esfera, index) => {
              const Icon = esfera.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center h-full">
                    <div className="bg-school-orange text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">{esfera.title}</h4>
                    <p className="text-sm text-slate-600">{esfera.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-lg text-slate-700 text-center">
              Este é um processo continuado que ajuda o aluno a planejar e tomar decisões conscientes sobre seu futuro. 
              Ele serve como um mapa orientador que é revisitado e adaptado ao longo do curso.
            </p>
          </div>
        </div>
      </section>

      {/* Eletivas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Amplia Eletivas</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Componentes curriculares altamente interativos e engajantes
            </p>
          </div>

          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
            <p className="text-lg text-slate-700 mb-6">
              As Eletivas são componentes curriculares que oferecem aos alunos a oportunidade de estudar 
              assuntos que estão fora do currículo padrão, mas que são extremamente relevantes no mundo atual.
            </p>
            <p className="text-slate-600">
              Estes cursos são desenvolvidos para serem altamente interativos e engajantes, 
              fornecendo uma abordagem mais prática e aplicada ao aprendizado.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <DragImagePosition
                src={images[0] || newImages.img7}
                alt="Novo Ensino Médio na OSE"
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
                    currentImage={images[0] || newImages.img7}
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
                src={images[1] || newImages.img8}
                alt="Projetos integradores"
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
                    currentImage={images[1] || newImages.img8}
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
                src={images[2] || newImages.img9}
                alt="Itinerários formativos"
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
                    currentImage={images[2] || newImages.img9}
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

      <WhyOSESection />
      <ContactSection />

      {/* Visual Composer */}
      <VisualComposerComponent />
    </div>
  );
}