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
import LogoutButton from '@/components/LogoutButton';


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
      title: "Ambiente Seguro e Acolhedor",
      description: "Criamos um ambiente onde cada criança se sente segura, respeitada e amada. Nossos espaços são cuidadosamente planejados para estimular a exploração e o descobrimento, com profissionais especializados que acompanham cada passo do desenvolvimento infantil. Promovemos a autoestima e a confiança através de atividades que valorizam as conquistas individuais."
    },
    {
      icon: BookOpen,
      title: "Coleção AMPLIA - Pedagogia de Excelência",
      description: "Utilizamos a renomada Coleção AMPLIA, que combina as melhores práticas educacionais mundiais com a realidade brasileira. Nossa metodologia estimula a curiosidade natural das crianças através de projetos interdisciplinares, brincadeiras dirigidas e atividades que desenvolvem múltiplas inteligências de forma lúdica e significativa."
    },
    {
      icon: Users,
      title: "Introdução ao Inglês de Forma Natural",
      description: "Oferecemos contato diário com o inglês através de músicas, jogos e atividades lúdicas. Nosso programa de inglês infantil respeita o desenvolvimento natural da linguagem, criando um ambiente bilíngue não-pressionado onde as crianças absorvem o idioma de forma espontânea e prazerosa."
    },
    {
      icon: Target,
      title: "Programa Socioemocional Especializado",
      description: "Desenvolvemos habilidades socioemocionais essenciais através do nosso programa específico para educação infantil. Trabalhamos autoconhecimento, empatia, resolução de conflitos e inteligência emocional de forma adaptada à faixa etária, preparando as crianças para relacionamentos saudáveis e enfrentamento de desafios."
    },
    {
      icon: Award,
      title: "Preparação para o Ensino Fundamental",
      description: "Nossa transição cuidadosa prepara as crianças para o próximo ciclo educacional. Desenvolvemos habilidades de pré-alfabetização, conceitos matemáticos básicos, coordenação motora e autonomia pessoal, garantindo que chegiem ao Ensino Fundamental I com confiança e bases sólidas para o aprendizado."
    },
    {
      icon: Lightbulb,
      title: "Estímulo à Criatividade e Expressão",
      description: "Valorizamos a expressão artística e criativa através de ateliês de artes, música, teatro e movimento. Nossas crianças exploram diferentes linguagens expressivas, desenvolvem coordenação motora fina e grossa, e descobrem seus talentos naturais em um ambiente estimulante e livre de julgamentos."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Visual Composer - floating edit button for authenticated users */}
      <VisualComposerComponent />
      
      {/* Logout button for authenticated users */}
      {isAuthenticated && <LogoutButton />}
      
      <Navigation />
      
      {/* Hero Section - Equal to Fund 1 */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <DragImagePosition
            src={heroImage || '/images/horizontal_1.png'}
            alt="Educação Infantil - OSE"
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
            <>
              <EnhancedImageSelector
                currentImage={heroImage || '/images/horizontal_1.png'}
                onImageSelect={updateHeroImage}
                className="absolute top-4 right-4 z-10"
              />
              <ImagePositionControls
                currentPosition={getImagePosition('hero-bg')}
                onPositionChange={(position) => updateImagePosition('hero-bg', position)}
                className="absolute top-4 left-4 z-10"
              />
            </>
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
                Educação <span className="text-school-orange">Infantil</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Desenvolvendo <strong>mentes curiosas</strong> e <strong>corações compassivos</strong>
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                A Educação Infantil da OSE é onde cada descoberta se torna uma nova aventura. 
                Para crianças de 4 a 6 anos, oferecemos um programa completo que combina 
                aprendizado lúdico e desenvolvimento socioemocional em um ambiente seguro e estimulante.
              </motion.p>

            </div>
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