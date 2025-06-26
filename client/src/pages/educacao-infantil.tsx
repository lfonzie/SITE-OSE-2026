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
      description: "A segurança física e emocional são pilares fundamentais de nossa proposta pedagógica. Criamos ambientes cuidadosamente planejados onde as crianças se sentem protegidas e valorizadas, permitindo que explorem suas identidades e desenvolvam autoconfiança. Nossos espaços são pensados para promover interações positivas, onde cada criança pode expressar-se livremente e construir relacionamentos saudáveis com colegas e educadores."
    },
    {
      icon: BookOpen,
      title: "Pedagogia Finlandesa e Aprendizado Integral",
      description: "Nossa metodologia combina as reconhecidas práticas da educação finlandesa com elementos da pedagogia brasileira, criando uma abordagem educacional equilibrada e contextualizada. Utilizamos estratégias lúdicas e práticas pedagógicas inovadoras para despertar a curiosidade natural e estimular a criatividade. Através de jogos, brincadeiras dirigidas, arte e exploração sensorial, oferecemos um desenvolvimento completo que abrange aspectos cognitivos, motores, sociais e emocionais."
    },
    {
      icon: Users,
      title: "Programa de Inglês: Introdução Natural ao Idioma",
      description: "Oferecemos aulas diárias de inglês como parte de nosso compromisso com a educação global. Nossa abordagem para o ensino de língua estrangeira é natural e descontraída, introduzindo o idioma através de músicas, histórias, jogos e atividades práticas que fazem parte do cotidiano escolar. Este programa, disponível mediante investimento adicional, proporciona às crianças uma familiarização gradual e prazerosa com o inglês."
    },
    {
      icon: Target,
      title: "Desenvolvimento Socioemocional como Prioridade",
      description: "Nossa abordagem centrada na criança busca cultivar a inteligência emocional desde os primeiros anos escolares. Trabalhamos para que cada aluno desenvolva a capacidade de reconhecer, compreender e expressar suas emoções de forma saudável e construtiva. Promovemos ativamente o desenvolvimento de habilidades socioemocionais essenciais como empatia, colaboração, resiliência e autocontrole."
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
                <strong>Crescimento</strong> e <strong>exploração</strong> na primeira infância
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Para os grupos de Jardim I e Jardim II, destinados a crianças de 4 a 6 anos, oferecemos uma 
                abordagem educacional única que prioriza o desenvolvimento integral da criança. Nosso foco está 
                no crescimento socioemocional e cognitivo, respeitando o ritmo individual de cada aluno.
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

          <div className="grid md:grid-cols-2 gap-8">
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
            {[0, 1, 2].map((index) => (
              <AnimatedCard 
                key={index}
                delay={index * 0.1}
                direction="up"
                hover={true}
                scale={true}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <DragImagePosition
                    src={images[index] || `/images/horizontal_${index + 3}.png`}
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
                        currentImage={images[index] || `/images/horizontal_${index + 3}.png`}
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