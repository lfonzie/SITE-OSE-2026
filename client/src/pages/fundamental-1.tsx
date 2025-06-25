import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import { useVisualComposer } from '@/hooks/useVisualComposer';

// Usando imagens da pasta public/images
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img16;
const img2 = newImages.img17;
const img3 = newImages.img18;
const img4 = newImages.img19;
const img5 = newImages.img20;
const img6 = newImages.img21;

export default function Fundamental1() {
  const { VisualComposerComponent } = useVisualComposer('Fundamental I');
  useEffect(() => {
    updateSEO({
      title: "Ensino Fundamental I - Anos Iniciais | OSE",
      description: "Ensino Fundamental I na OSE: desenvolvendo mentes curiosas e corações compassivos. Educação integral para crianças de 6 a 10 anos.",
      keywords: "ensino fundamental I sorocaba, anos iniciais, educação infantil, desenvolvimento cognitivo"
    });
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Desenvolvimento Emocional",
      description: "Cultivamos inteligência emocional e valores humanos fundamentais"
    },
    {
      icon: Target,
      title: "Aprendizagem Significativa",
      description: "Metodologias ativas que tornam o aprendizado prazeroso e efetivo"
    },
    {
      icon: Users,
      title: "Socialização Saudável",
      description: "Ambiente acolhedor que promove amizades duradouras e respeito mútuo"
    },
    {
      icon: Lightbulb,
      title: "Criatividade e Inovação",
      description: "Estímulo à criatividade através de projetos e atividades lúdicas"
    },
    {
      icon: BookOpen,
      title: "Base Acadêmica Sólida",
      description: "Fundamentos essenciais para uma trajetória escolar de sucesso"
    },
    {
      icon: Award,
      title: "Formação de Caráter",
      description: "Desenvolvimento de valores éticos e responsabilidade social"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={img1}
            alt="Ensino Fundamental I - OSE"
            className="w-full h-full object-cover opacity-30"
          />
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
                Ensino Fundamental <span className="text-school-orange">I</span>
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
                O Ensino Fundamental I da OSE é onde a jornada educacional se torna uma aventura 
                emocionante. Nossos pequenos alunos descobrem o prazer de aprender em um ambiente 
                acolhedor, seguro e estimulante.
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
              Anos Iniciais que <span className="text-school-orange">Inspiram</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Uma educação que respeita o desenvolvimento natural da criança, 
              estimulando curiosidade e construindo bases sólidas para o futuro
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

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-6">
            <OptimizedImage
              src={img2}
              alt="Atividades colaborativas no Fundamental I"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img3}
              alt="Projetos educacionais criativos"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img4}
              alt="Ambiente de aprendizado estimulante"
              className="w-full h-48 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Metodologia que <span className="text-school-orange">Encanta</span>
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  <strong>Aprendizagem Lúdica:</strong> Transformamos o aprender em brincadeira, 
                  respeitando o universo infantil e tornando cada descoberta uma alegria.
                </p>
                <p>
                  <strong>Desenvolvimento Integral:</strong> Cuidamos não apenas do aspecto cognitivo, 
                  mas também do emocional, social e físico de cada criança.
                </p>
                <p>
                  <strong>Acompanhamento Individual:</strong> Cada criança é única, por isso 
                  oferecemos atenção personalizada para potencializar suas habilidades.
                </p>
                <p>
                  <strong>Ambiente Acolhedor:</strong> Espaços seguros e estimulantes onde as 
                  crianças se sentem à vontade para explorar e crescer.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <OptimizedImage
                src={img5}
                alt="Desenvolvimento das crianças"
                className="w-full h-48 rounded-lg shadow-lg"
              />
              <OptimizedImage
                src={img6}
                alt="Atividades culturais e educativas"
                className="w-full h-48 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            O Melhor Começo para Seu Filho
          </h3>
          <p className="text-xl mb-8">
            Há 100 anos cuidando com carinho dos primeiros passos na educação
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange font-semibold px-8 py-3"
            onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
          >
            Agende uma Visita e Conheça Nossa Escola
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