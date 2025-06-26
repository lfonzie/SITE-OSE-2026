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
      title: "Ambiente Seguro e Respeitoso para o Desenvolvimento Emocional",
      description: "A segurança e o desenvolvimento emocional são primordiais em nossa abordagem. Criamos espaços acolhedores onde as crianças podem crescer individualmente e socialmente, fortalecendo sua autoestima e sua percepção sobre si e seu lugar no mundo."
    },
    {
      icon: BookOpen,
      title: "Coleção AMPLIA: Pedagogia Finlandesa e Aprendizado Integral",
      description: "Combinando as melhores práticas da educação finlandesa e brasileira, nossa coleção incentiva a participação ativa da criança e valoriza seu crescimento pessoal e social. Utilizamos abordagens lúdicas e práticas para estimular a curiosidade e a criatividade, oferecendo um desenvolvimento equilibrado e completo."
    },
    {
      icon: Users,
      title: "Aulas Diárias de Inglês: Aprendizado Flexível e Opcional",
      description: "Oferecemos aulas diárias de inglês, proporcionando uma introdução ponderada à língua estrangeira. Esta opção, disponível mediante um custo adicional, permite que seu filho se beneficie de um ensino de idiomas sem a pressão de um ambiente bilíngue."
    },
    {
      icon: Target,
      title: "Desenvolvimento Socioemocional",
      description: "Nossa abordagem centrada no aluno busca cultivar inteligência emocional, empoderando crianças e jovens a compreender e gerir suas emoções de forma eficaz. Além disso, promovemos a construção de habilidades essenciais como empatia e resiliência, preparando-os para enfrentar os desafios da vida de maneira equilibrada e consciente."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Visual Composer - floating edit button for authenticated users */}
      <VisualComposerComponent />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage || '/images/horizontal_1.png'}
            alt="Educação Infantil OSE"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-800/70"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Educação <span className="text-school-orange">Infantil</span>
                <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                  Jardim I e Jardim II - Crescimento e Exploração na Primeira Infância
                </span>
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed">
                Para os grupos de Jardim I e Jardim II, destinados a crianças de 4 a 6 anos, 
                oferecemos uma abordagem única que foca no desenvolvimento socioemocional e cognitivo.
              </p>
              <p className="text-lg text-white/90 mb-8">
                Nosso currículo é cuidadosamente planejado para estimular o crescimento pessoal e social 
                de cada aluno, proporcionando uma base sólida para as futuras etapas educacionais.
              </p>
              
            </motion.div>

            
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