import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

// Usando imagens da pasta public/images
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img20;
const img2 = newImages.img21;
const img3 = newImages.img22;
const img4 = newImages.img23;
const img5 = newImages.img24;
const img6 = newImages.img25;

export default function EnsinoMedio() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Médio - Preparação para o Futuro | OSE",
      description: "Ensino Médio na OSE: formação integral, preparação para vestibulares e desenvolvimento de projetos de vida. Educação de excelência há 100 anos.",
      keywords: "ensino médio sorocaba, preparação vestibular, projeto de vida, formação integral"
    });
  }, []);

  const features = [
    {
      icon: Target,
      title: "Projeto de Vida",
      description: "Orientação personalizada para descobrir vocações e construir um futuro promissor"
    },
    {
      icon: GraduationCap,
      title: "Preparação Vestibular",
      description: "Metodologia focada nos principais exames e universidades do país"
    },
    {
      icon: Users,
      title: "Liderança e Protagonismo",
      description: "Desenvolvimento de competências para liderar e transformar a sociedade"
    },
    {
      icon: Lightbulb,
      title: "Pensamento Crítico",
      description: "Estímulo ao raciocínio lógico e análise crítica da realidade"
    },
    {
      icon: BookOpen,
      title: "Excelência Acadêmica",
      description: "Corpo docente especializado e metodologias inovadoras de ensino"
    },
    {
      icon: Award,
      title: "Formação Integral",
      description: "Desenvolvimento de valores éticos e responsabilidade social"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Ensino <span className="text-school-orange">Médio</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Preparação para o futuro com <strong>excelência acadêmica</strong> e <strong>formação integral</strong>
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                No Ensino Médio da OSE, preparamos nossos alunos não apenas para os vestibulares, 
                mas para a vida. Com metodologia inovadora e foco no desenvolvimento integral, 
                formamos cidadãos críticos e preparados para os desafios do século XXI.
              </motion.p>

            </div>
            <div className="relative">
              <OptimizedImage
                src={img1}
                alt="Alunos do Ensino Médio da OSE"
                className="w-full h-96 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Diferenciais do Nosso <span className="text-school-orange">Ensino Médio</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Uma educação que vai além do tradicional, preparando jovens para os desafios do futuro
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
              alt="Alunos do Ensino Médio em atividades"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img3}
              alt="Preparação para vestibulares"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img4}
              alt="Projetos de vida"
              className="w-full h-48 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Excelência que <span className="text-school-orange">Transforma</span>
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  <strong>Metodologia Inovadora:</strong> Combinamos tradição centenária com as mais 
                  modernas práticas pedagógicas para garantir uma aprendizagem significativa.
                </p>
                <p>
                  <strong>Professores Especialistas:</strong> Corpo docente altamente qualificado 
                  com experiência em preparação para os principais vestibulares do país.
                </p>
                <p>
                  <strong>Ambiente Inspirador:</strong> Espaços modernos e recursos tecnológicos 
                  que estimulam a criatividade e o desenvolvimento acadêmico.
                </p>
                <p>
                  <strong>Acompanhamento Individual:</strong> Orientação personalizada para cada 
                  aluno desenvolver seu máximo potencial.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <OptimizedImage
                src={img5}
                alt="Laboratórios modernos"
                className="w-full h-48 rounded-lg shadow-lg"
              />
              <OptimizedImage
                src={img6}
                alt="Ambiente de estudos"
                className="w-full h-48 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
            Prepare-se para o Futuro com a OSE
          </h3>
          <p className="text-xl mb-8 text-slate-600">
            Há 100 anos formando cidadãos preparados para transformar o mundo
          </p>
          <Button 
            size="lg"
            className="bg-school-orange text-white font-semibold px-8 py-3"
            onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
          >
            Agende sua Visita e Conheça Nossa Proposta
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}