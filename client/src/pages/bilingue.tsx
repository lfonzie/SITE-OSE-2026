import { Globe, Users, BookOpen, Award, Target, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

// Import images
import { newImages } from "@/lib/image-verification";
const img1 = newImages.horizontal1;
const img2 = newImages.horizontal2;
const img3 = newImages.horizontal3;
const img4 = newImages.horizontal4;

export default function Bilingue() {
  const features = [
    {
      icon: Globe,
      title: "Cidadania Global",
      description: "Formação de consciência cultural e perspectiva internacional, preparando alunos para um mundo globalizado."
    },
    {
      icon: Users,
      title: "Imersão Total",
      description: "Ambiente completamente bilíngue que promove fluência natural através da prática constante."
    },
    {
      icon: BookOpen,
      title: "MacMillan Education",
      description: "Material didático de excelência internacional com metodologia comprovada e reconhecida mundialmente."
    },
    {
      icon: Award,
      title: "Fluência Autêntica",
      description: "Desenvolvimento de competências comunicativas reais para uso prático em contextos diversos."
    },
    {
      icon: Target,
      title: "Metodologia Ativa",
      description: "Aprendizado através de projetos, experiências práticas e situações do cotidiano."
    },
    {
      icon: Brain,
      title: "Pensamento Crítico",
      description: "Desenvolvimento de análise crítica e capacidade de reflexão em ambos os idiomas."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={img1}
            alt="Educação Bilíngue - Global Citizens"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-700/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Global <span className="text-school-orange">Citizens</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Educação Bilíngue Integral
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Formando cidadãos globais conscientes
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Na OSE, a educação bilíngue é mais que uma metodologia - é uma janela para o mundo. 
                <strong className="text-school-orange"> As aulas são diárias após as aulas tradicionais</strong>, 
                oferecendo uma imersão completa no idioma inglês e preparando nossos alunos 
                para serem verdadeiros cidadãos globais.
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
              Educação que <span className="text-school-orange">Transforma</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Uma jornada rumo à educação bilíngue que forma cidadãos globais 
              preparados para os desafios do futuro
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
              alt="Atividades bilíngues na OSE"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img3}
              alt="Material MacMillan Education"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img4}
              alt="Cidadania global em prática"
              className="w-full h-48 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}