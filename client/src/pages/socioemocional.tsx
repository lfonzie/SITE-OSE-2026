import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Users, Target, Award, BookOpen, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import { newImages } from "@/lib/image-verification";

export default function SocioEmocional() {
  useEffect(() => {
    updateSEO({
      title: "Programa SócioEmocional | a OSE",
      description: "Programa educacional da OSE voltado para o desenvolvimento socioemocional dos estudantes, formando cidadãos conscientes e emocionalmente inteligentes.",
      keywords: "programa socioemocional, inteligência emocional, desenvolvimento integral, habilidades sociais, educação OSE"
    });
  }, []);

  const pillars = [
    {
      icon: Heart,
      title: "Autoconhecimento",
      description: "Identificação e compreensão das próprias emoções, fortalezas e limitações"
    },
    {
      icon: Shield,
      title: "Autocontrole",
      description: "Regulação emocional e comportamental diante de diferentes situações"
    },
    {
      icon: Users,
      title: "Empatia",
      description: "Capacidade de compreender e se conectar com os sentimentos dos outros"
    },
    {
      icon: Target,
      title: "Relacionamento",
      description: "Habilidades para construir e manter relacionamentos saudáveis e positivos"
    }
  ];

  const segments = [
    {
      title: "Educação Infantil e Anos Iniciais",
      description: "Foco nos pilares da inteligência emocional através de atividades lúdicas e dinâmicas",
      features: [
        "Identificação e gestão de emoções",
        "Materiais lúdicos adaptados",
        "Livros ilustrados e jogos colaborativos",
        "Ambientes seguros para expressão de sentimentos"
      ],
      icon: Heart
    },
    {
      title: "Anos Finais do Ensino Fundamental",
      description: "Desenvolvimento de habilidades essenciais através de projetos práticos e metodologias ativas",
      features: [
        "Pensamento crítico e perseverança",
        "Comunicação e colaboração",
        "Proatividade e curiosidade",
        "Projetos práticos e jogos em grupo"
      ],
      icon: Brain
    },
    {
      title: "Ensino Médio",
      description: "Preparação para a vida adulta com foco em autoconhecimento e escolhas responsáveis",
      features: [
        "Autoconhecimento e autorregulação",
        "Orientação para escolhas profissionais",
        "Enfrentamento de pressões sociais",
        "Debates e reflexões estruturadas"
      ],
      icon: Target
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Prevenção de Bullying",
      description: "Criação de ambientes mais respeitosos e inclusivos"
    },
    {
      icon: Heart,
      title: "Bem-estar Emocional",
      description: "Redução de ansiedade e depressão entre os estudantes"
    },
    {
      icon: Award,
      title: "Melhora Acadêmica",
      description: "Impacto positivo no desempenho escolar e aprendizado"
    },
    {
      icon: Users,
      title: "Relações Interpessoais",
      description: "Fortalecimento dos vínculos sociais e familiares"
    },
    {
      icon: Lightbulb,
      title: "Escolhas Responsáveis",
      description: "Desenvolvimento da capacidade de tomar decisões conscientes"
    },
    {
      icon: BookOpen,
      title: "Cidadania Consciente",
      description: "Formação de cidadãos críticos e socialmente responsáveis"
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
            src={newImages.horizontal33}
            alt="Programa Socioemocional OSE"
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
                Programa <span className="text-school-orange">SócioEmocional</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Formação Integral do Ser Humano
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Desenvolvimento integral do ser humano
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Programa educacional voltado para o desenvolvimento de competências socioemocionais, 
                formando cidadãos conscientes e emocionalmente inteligentes.
              </motion.p>

            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">Inteligência Emocional</p>
                  <p className="text-white/60 text-sm">Desenvolvimento Integral</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Pilares da <span className="text-school-orange">Inteligência Emocional</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Nosso programa é fundamentado em quatro pilares essenciais para o desenvolvimento 
              socioemocional completo dos estudantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{pillar.title}</h3>
                  <p className="text-slate-600">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}