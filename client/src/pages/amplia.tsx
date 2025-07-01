import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Target, Globe, Lightbulb, Heart, Shield, Brain } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import DragImagePosition from '@/components/DragImagePosition';
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

// Importando imagens para página Amplia
import { logos, newImages } from "@/lib/image-verification";
const img1 = newImages.img4;
const img5 = newImages.img5;
const img6 = newImages.img6;

export default function Amplia() {
  const { isAuthenticated } = useAuth();

  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('Amplia', {
    heroImage: img1,
    images: [newImages.img24, newImages.img25, newImages.img26, img5, img6, img1],
    heroBackground: {
      type: 'image',
      imageUrl: img1,
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
      title: "Amplia - Plataforma de Ensino | a OSE",
      description: "Plataforma Amplia na OSE: currículo completo com habilidades acadêmicas e socioemocionais, material contextualizado e tecnologia educacional.",
      keywords: "plataforma amplia, material didático, BNCC, ensino fundamental, ensino médio sorocaba"
    });
  }, []);

  const pillars = [
    {
      icon: Brain,
      title: "Habilidades Acadêmicas",
      description: "Formamos alunos que dominam tecnicamente os conteúdos e são capazes de articular na prática o conhecimento adquirido, aplicando-o à realidade do mundo além da sala de aula."
    },
    {
      icon: Users,
      title: "Habilidades Socioemocionais",
      description: "Desenvolvemos habilidades como trabalho em equipe, perseverança, proatividade e criatividade, estimulando a inteligência emocional e o pensamento crítico."
    },
    {
      icon: Award,
      title: "Cidadania",
      description: "Formamos cidadãos completos que desenvolvem valores democráticos, cidadania digital, empreendedorismo social e compreendem seu papel na sociedade."
    }
  ];

  const resources = [
    {
      title: "Material Didático Contextualizado",
      description: "Alinhado à Base Nacional Comum Curricular (BNCC)"
    },
    {
      title: "Avaliações Institucionais",
      description: "Simulados preparatórios para ENEM e vestibulares"
    },
    {
      title: "Recursos Digitais",
      description: "100% alinhados ao material didático"
    },
    {
      title: "Plurall",
      description: "Plataforma líder de aprendizagem digital no país"
    }
  ];

  const segments = [
    {
      title: "Educação Infantil",
      description: "Baseada no ensino finlandês, promove ação proativa da criança, crescimento individual e social, exploração do 'aprender brincando' e junção da atividade lúdica com o real.",
      features: ["Campos de experiências BNCC", "Metodologia finlandesa", "Aprender brincando", "Desenvolvimento integral"]
    },
    {
      title: "Ensino Fundamental I",
      description: "Capacidade de leitura e escrita, fluência em raciocínio analítico, apreensão de capital cultural, construção da autonomia e desenvolvimento da socialização.",
      features: ["Trabalho investigativo", "Interdisciplinaridade", "Conexão com cotidiano", "Turma da Amplia"]
    },
    {
      title: "Ensino Fundamental II",
      description: "Desenvolvimento da capacidade de aprender, raciocínio matemático, conhecimento de mundo e formação do pensamento crítico para cidadania consciente.",
      features: ["Conceitos essenciais", "Investigação e reflexão", "Raciocínio lógico", "Pensamento científico"]
    },
    {
      title: "Ensino Médio",
      description: "Formação ética e autônoma, preparação para estudos superiores e mercado de trabalho, compreensão do mundo e valorização da diversidade sociocultural.",
      features: ["Simulados ENEM", "Vídeoaulas QR Code", "Novo Ensino Médio", "Formação integral"]
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-orange-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/25 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
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
              <span className="text-school-orange">Amplia</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Plataforma de Ensino Completa
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              <strong>Currículo contextualizado</strong> e inovador
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              Ao proporcionar um currículo completo, incluindo habilidades acadêmicas e socioemocionais, 
              o Amplia oferece material contextualizado com tecnologia educacional de ponta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pilares da <span className="text-school-orange">Educação Completa</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Nossa plataforma é fundamentada em três pilares essenciais 
                para a formação integral do aluno
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  <div className="bg-school-orange text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{pillar.title}</h3>
                  <p className="text-slate-600">{pillar.description}</p>
                </div>
              );
            })}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group">
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={images[0] || newImages.img24}
                    onImageSelect={(imageUrl) => updateImage(0, imageUrl)}
                    className="absolute top-2 right-2 z-10"
                  />
                  <DragImagePosition
                    currentPosition={getImagePosition(0)}
                    onPositionChange={(position) => updateImagePosition(0, position)}
                    className="absolute inset-0"
                  />
                </>
              )}
              <OptimizedImage
                src={images[0] || newImages.img24}
                alt="Material didático Amplia"
                className="w-full h-48 rounded-lg shadow-lg"
                style={{
                  objectPosition: getImagePosition(0)?.objectPosition || 'center center',
                  objectFit: getImagePosition(0)?.objectFit || 'cover',
                  transform: `scale(${getImagePosition(0)?.scale || 1})`,
                  opacity: getImagePosition(0)?.opacity || 1,
                  filter: getImagePosition(0)?.filter || 'none'
                }}
              />
            </div>
            <div className="relative group">
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={images[1] || newImages.img25}
                    onImageSelect={(imageUrl) => updateImage(1, imageUrl)}
                    className="absolute top-2 right-2 z-10"
                  />
                  <DragImagePosition
                    currentPosition={getImagePosition(1)}
                    onPositionChange={(position) => updateImagePosition(1, position)}
                    className="absolute inset-0"
                  />
                </>
              )}
              <OptimizedImage
                src={images[1] || newImages.img25}
                alt="Tecnologia educacional"
                className="w-full h-48 rounded-lg shadow-lg"
                style={{
                  objectPosition: getImagePosition(1)?.objectPosition || 'center center',
                  objectFit: getImagePosition(1)?.objectFit || 'cover',
                  transform: `scale(${getImagePosition(1)?.scale || 1})`,
                  opacity: getImagePosition(1)?.opacity || 1,
                  filter: getImagePosition(1)?.filter || 'none'
                }}
              />
            </div>
            <div className="relative group">
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={images[2] || newImages.img26}
                    onImageSelect={(imageUrl) => updateImage(2, imageUrl)}
                    className="absolute top-2 right-2 z-10"
                  />
                  <DragImagePosition
                    currentPosition={getImagePosition(2)}
                    onPositionChange={(position) => updateImagePosition(2, position)}
                    className="absolute inset-0"
                  />
                </>
              )}
              <OptimizedImage
                src={images[2] || newImages.img26}
                alt="Metodologia Amplia"
                className="w-full h-48 rounded-lg shadow-lg"
                style={{
                  objectPosition: getImagePosition(2)?.objectPosition || 'center center',
                  objectFit: getImagePosition(2)?.objectFit || 'cover',
                  transform: `scale(${getImagePosition(2)?.scale || 1})`,
                  opacity: getImagePosition(2)?.opacity || 1,
                  filter: getImagePosition(2)?.filter || 'none'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Resources Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-50 rounded-xl p-8 md:p-12 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Recursos da Plataforma
              </h3>
              <p className="text-xl text-slate-600">
                Tecnologia e Conteúdo de Excelência
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg text-center">
                  <h4 className="font-bold text-slate-800 mb-2">{resource.title}</h4>
                  <p className="text-sm text-slate-600">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Approach */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Educação Contextualizada
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  As demandas da educação contemporânea se transformam constantemente. 
                  Os alunos buscam entender o <strong>porquê de estudar cada conteúdo</strong> 
                  e solicitam recursos integrados ao aprendizado.
                </p>
                <p>
                  A <strong>Plataforma Amplia</strong> facilita a vida de educadores ao fazer 
                  com que eles e os alunos falem a mesma língua e estejam alinhados em 
                  anseios e exigências.
                </p>
                <p>
                  Por ser totalmente contextualizada, o aluno torna-se muito mais preparado 
                  não só para o <strong>ENEM</strong>, mas também para o mercado de trabalho e para a vida.
                </p>
              </div>

            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                {isAuthenticated && (
                  <>
                    <EnhancedImageSelector
                      currentImage={images[3] || img5}
                      onImageSelect={(imageUrl) => updateImage(3, imageUrl)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <DragImagePosition
                      currentPosition={getImagePosition(3)}
                      onPositionChange={(position) => updateImagePosition(3, position)}
                      className="absolute inset-0"
                    />
                  </>
                )}
                <OptimizedImage 
                  src={images[3] || img5} 
                  alt="Material didático Amplia"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                  style={{
                    objectPosition: getImagePosition(3)?.objectPosition || 'center center',
                    objectFit: getImagePosition(3)?.objectFit || 'cover',
                    transform: `scale(${getImagePosition(3)?.scale || 1})`,
                    opacity: getImagePosition(3)?.opacity || 1,
                    filter: getImagePosition(3)?.filter || 'none'
                  }}
                />
              </div>
              <div className="relative group">
                {isAuthenticated && (
                  <>
                    <EnhancedImageSelector
                      currentImage={images[4] || img6}
                      onImageSelect={(imageUrl) => updateImage(4, imageUrl)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <DragImagePosition
                      currentPosition={getImagePosition(4)}
                      onPositionChange={(position) => updateImagePosition(4, position)}
                      className="absolute inset-0"
                    />
                  </>
                )}
                <OptimizedImage 
                  src={images[4] || img6} 
                  alt="Tecnologia educacional"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                  style={{
                    objectPosition: getImagePosition(4)?.objectPosition || 'center center',
                    objectFit: getImagePosition(4)?.objectFit || 'cover',
                    transform: `scale(${getImagePosition(4)?.scale || 1})`,
                    opacity: getImagePosition(4)?.opacity || 1,
                    filter: getImagePosition(4)?.filter || 'none'
                  }}
                />
              </div>
              <div className="relative group col-span-2">
                {isAuthenticated && (
                  <>
                    <EnhancedImageSelector
                      currentImage={images[5] || img1}
                      onImageSelect={(imageUrl) => updateImage(5, imageUrl)}
                      className="absolute top-2 right-2 z-10"
                    />
                    <DragImagePosition
                      currentPosition={getImagePosition(5)}
                      onPositionChange={(position) => updateImagePosition(5, position)}
                      className="absolute inset-0"
                    />
                  </>
                )}
                <OptimizedImage 
                  src={images[5] || img1} 
                  alt="Metodologia Amplia"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                  style={{
                    objectPosition: getImagePosition(5)?.objectPosition || 'center center',
                    objectFit: getImagePosition(5)?.objectFit || 'cover',
                    transform: `scale(${getImagePosition(5)?.scale || 1})`,
                    opacity: getImagePosition(5)?.opacity || 1,
                    filter: getImagePosition(5)?.filter || 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Segments Section */}
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Metodologia por Segmento
              </h3>
              <p className="text-xl text-slate-600">
                Conheça a Trajetória Educacional Completa
              </p>
            </div>

            {segments.map((segment, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-slate-800 mb-4">{segment.title}</h4>
                <p className="text-slate-600 mb-6">{segment.description}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {segment.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-school-orange rounded-full mr-3"></div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Plataforma de Excelência
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Desenvolvida em parceria com especialistas em educação
            </p>
            <div className="flex justify-center items-center mt-8">
              <img 
                src="/images/AMPLIA_Logotipo-versoes_1750779294903_1750801133345.png" 
                alt="Amplia"
                className="h-20"
              />
            </div>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}