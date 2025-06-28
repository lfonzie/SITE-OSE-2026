import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Heart, Globe, Brain, Monitor, Gamepad2, Users, Target, Lightbulb, Calculator, PenTool, Clock } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import DragImagePosition from '@/components/DragImagePosition';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { useAuth } from '@/contexts/AuthContext';

// Importando imagens para página Code OSE
import { newImages } from "@/lib/image-verification";

export default function CodeOSE() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('CODE.OSE');

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
  } = usePageData('CODE.OSE', {
    heroImage: newImages.img16,
    images: [newImages.img16, newImages.img17, newImages.img18],
    heroBackground: {
      type: 'image',
      imageUrl: newImages.img16,
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
      title: "CODE.OSE - Programação no Fundamental I | OSE",
      description: "Alfabetização digital integrada ao currículo do Ensino Fundamental I. Programação como componente fundamental da educação moderna.",
      keywords: "programação, code ose, alfabetização digital, ensino fundamental, tecnologia educacional, OSE sorocaba"
    });
  }, []);

  const pillars = [
    {
      icon: Brain,
      title: "Pensamento Computacional",
      description: "Desenvolvimento de lógica estruturada, decomposição de problemas e análise crítica para resolução de desafios complexos.",
      color: "bg-blue-500"
    },
    {
      icon: Gamepad2,
      title: "Aprendizado Lúdico",
      description: "Construção de jogos, animações e histórias interativas, transformando cada aula em uma aventura de descobertas.",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "Equidade e Inclusão",
      description: "Programação acessível para todos os alunos, independente de origem socioeconômica ou gênero, promovendo diversidade tecnológica.",
      color: "bg-purple-500"
    },
    {
      icon: Target,
      title: "Integração Curricular",
      description: "Programação integrada às demais disciplinas, criando conexões significativas entre tecnologia, matemática, ciências e linguagem.",
      color: "bg-red-500"
    }
  ];

  const aplicacoes = [
    {
      title: "Exploração Espacial",
      description: "Missões Apollo e busca por vida extraterrestre",
      icon: Rocket,
      color: "from-blue-500 to-purple-500",
      areas: ["Navegação espacial", "Comunicação", "Análise de dados", "Simulações"]
    },
    {
      title: "Medicina Avançada",
      description: "Genoma humano e diagnósticos por IA", 
      icon: Heart,
      color: "from-red-500 to-pink-500",
      areas: ["Sequenciamento genético", "Diagnóstico por imagem", "Cirurgia robótica", "Telemedicina"]
    },
    {
      title: "Cinema e Animação",
      description: "De Jurassic Park à Pixar",
      icon: Monitor,
      color: "from-purple-500 to-indigo-500",
      areas: ["Efeitos visuais", "Modelagem 3D", "Renderização", "Animação digital"]
    }
  ];

  const competencias = [
    {
      title: "Resolução de Problemas",
      description: "Análise sistemática e criação de soluções",
      icon: Lightbulb
    },
    {
      title: "Colaboração Digital",
      description: "Trabalho em equipe em projetos tecnológicos",
      icon: Users
    },
    {
      title: "Criatividade Tecnológica",
      description: "Expressão artística através da programação",
      icon: PenTool
    },
    {
      title: "Comunicação",
      description: "Apresentação de ideias e projetos digitais",
      icon: Globe
    }
  ];

  const cronograma = [
    { serie: "1º Ano", description: "Introdução ao pensamento computacional" },
    { serie: "2º Ano", description: "Primeiros comandos e sequências lógicas" },
    { serie: "3º Ano", description: "Criação de jogos simples e animações" },
    { serie: "4º Ano", description: "Projetos interdisciplinares complexos" },
    { serie: "5º Ano", description: "Desenvolvimento de aplicações completas" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative py-20 text-white overflow-hidden"
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
                alt="CODE.OSE"
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
              opacity: heroBackground.overlayOpacity || 0.7
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
              <span className="text-school-orange">{"{CODE.OSE}"}</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Linguagem de Programação - Ensino Fundamental I
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              <strong>Alfabetização Digital</strong> Integrada
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              Preparando cidadãos digitais através da educação tecnológica integrada. 
              Em uma era digitalmente avançada, o {"{CODE.OSE}"} é um componente fundamental 
              da grade curricular do Ensino Fundamental I.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Years Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Progressão do Programa</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cronograma.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.serie}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features - Pilares */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Pilares do <span className="text-school-orange">{"{CODE.OSE}"}</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Fundamentos que transformam a forma como as crianças pensam e resolvem problemas
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

      {/* Aplicações no Mundo Real */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Programação</span> Transformando o Mundo
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-4">
              Inspire-se com as aplicações reais da programação
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Descobra como a programação revoluciona diferentes setores da sociedade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {aplicacoes.map((aplicacao, index) => {
              const Icon = aplicacao.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.2} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-school-orange/20 h-full">
                    <div className={`bg-gradient-to-r ${aplicacao.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{aplicacao.title}</h3>
                    <p className="text-lg text-school-orange font-semibold mb-4">{aplicacao.description}</p>
                    <div className="space-y-2">
                      {aplicacao.areas.map((area, i) => (
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

      {/* Competências Desenvolvidas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Competências</span> do Século 21
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Habilidades essenciais desenvolvidas através da programação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {competencias.map((competencia, index) => {
              const Icon = competencia.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center h-full">
                    <div className="bg-school-orange text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">{competencia.title}</h4>
                    <p className="text-sm text-slate-600">{competencia.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-lg text-slate-700 text-center">
              O {"{CODE.OSE}"} desenvolve habilidades críticas através de uma abordagem envolvente onde os alunos 
              programam algoritmos, constroem websites e criam seus próprios jogos, preparando-os para um futuro digital.
            </p>
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Metodologia Inovadora</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Aprendizado baseado em projetos e gamificação
            </p>
          </div>

          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Dados que Inspiram</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-school-orange rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-slate-700">64% das meninas no 3º ao 5º ano querem aprender programação</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-school-orange rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-slate-700">7 milhões de vagas exigem habilidades de programação</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-school-orange rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-slate-700">Alfabetização digital é tão fundamental quanto ler e escrever</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-school-orange rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-slate-700">Preparação para um mundo cada vez mais digital</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Abordagem Pedagógica</h3>
                <p className="text-slate-600 mb-6">
                  O currículo abrange material alinhado com os padrões nacionais da BNCC, 
                  tornando a aprendizagem do código uma aventura estimulante e contextualizada.
                </p>
                <p className="text-slate-600">
                  Através de projetos práticos, jogos educacionais e desafios colaborativos, 
                  os alunos desenvolvem não apenas habilidades técnicas, mas também 
                  pensamento crítico e criatividade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Alfabetização Digital para o Futuro
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            O {"{CODE.OSE}"} prepara seus filhos para um mundo digital, desenvolvendo 
            pensamento computacional e habilidades fundamentais do século 21.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange hover:bg-gray-100 font-semibold px-8 py-3"
          >
            Conheça o Programa Completo
          </Button>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <DragImagePosition
                src={images[0] || newImages.img16}
                alt="Alunos programando"
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
                    currentImage={images[0] || newImages.img16}
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
                src={images[1] || newImages.img17}
                alt="Atividades de programação"
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
                    currentImage={images[1] || newImages.img17}
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
                src={images[2] || newImages.img18}
                alt="Tecnologia na educação"
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
                    currentImage={images[2] || newImages.img18}
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