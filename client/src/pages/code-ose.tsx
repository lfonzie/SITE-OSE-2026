
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Heart, Globe, Brain, Monitor, Gamepad2, Users, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";

// Importando imagens para página Code OSE
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img16;
const img2 = newImages.img17;
const img3 = newImages.img18;

export default function CodeOSE() {
  useEffect(() => {
    updateSEO({
      title: "CODE.OSE - Programação no Fundamental I | OSE",
      description: "Alfabetização digital integrada ao currículo do Ensino Fundamental I. Programação como componente fundamental da educação moderna.",
      keywords: "programação, code ose, alfabetização digital, ensino fundamental, tecnologia educacional, OSE sorocaba"
    });
  }, []);

  const applications = [
    {
      icon: Rocket,
      title: "Exploração Espacial",
      description: "Da missão Apollo à busca por vida extraterrestre, a programação impulsiona a exploração espacial moderna.",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      title: "Aplicações Médicas",
      description: "Decifrando o genoma humano e criando tecnologias médicas revolucionárias com IA e diagnósticos avançados.",
      color: "bg-red-500"
    },
    {
      icon: Monitor,
      title: "Cinema e Animação",
      description: "De Jurassic Park à Pixar, a programação trouxe dinossauros à vida e criou mundos fantásticos no cinema.",
      color: "bg-purple-500"
    }
  ];

  const skills = [
    {
      icon: Brain,
      title: "Pensamento Computacional",
      description: "Desenvolvimento de lógica, resolução de problemas e pensamento crítico desde cedo"
    },
    {
      icon: Gamepad2,
      title: "Aprendizado Lúdico",
      description: "Construção de jogos, animações e histórias, tornando cada lição uma aventura"
    },
    {
      icon: Users,
      title: "Equidade e Inclusão",
      description: "Programação acessível para todos, independente de origem ou gênero"
    },
    {
      icon: Target,
      title: "Integração Curricular",
      description: "Programação integrada a outras disciplinas, tornando o aprendizado contextual"
    }
  ];

  const benefits = [
    "64% das meninas no 3º ao 5º ano querem aprender programação",
    "7 milhões de vagas exigem habilidades de programação",
    "Alfabetização digital é tão fundamental quanto ler e escrever",
    "Preparação para um mundo cada vez mais digital"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="absolute inset-0">
          <img 
            src={img1}
            alt="CODE.OSE Programação"
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
                <span className="text-school-orange">{"{CODE.OSE}"}</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Linguagem de Programação
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Alfabetização Digital Integrada ao Ensino Fundamental I
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Em uma era digitalmente avançada, o {"{CODE.OSE}"} não é uma matéria opcional; 
                é um componente fundamental da grade curricular do Ensino Fundamental I no Colégio OSE.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Programação <span className="text-school-orange">Transformando o Mundo</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Descubra como a programação revoluciona diferentes áreas da sociedade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {applications.map((app, index) => {
              const Icon = app.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.2} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full border-2 border-transparent hover:border-school-orange/20">
                    <div className={`${app.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{app.title}</h3>
                    <p className="text-slate-600">{app.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Integração Curricular</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Mais do que uma matéria isolada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center h-full">
                    <div className="bg-school-orange text-white w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon size={28} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-3">{skill.title}</h4>
                    <p className="text-sm text-slate-600">{skill.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Preparation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Preparando para o <span className="text-school-orange">Futuro</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Alfabetização Digital é Alfabetização Básica
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Dados que Inspiram</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-3 h-3 bg-school-orange rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Habilidades do Século 21</h3>
              <p className="text-slate-600 mb-6">
                Construindo habilidades críticas através de uma abordagem envolvente onde os alunos 
                programam algoritmos, constroem websites e criam seus próprios jogos.
              </p>
              <p className="text-slate-600">
                O currículo abrange material alinhado com os padrões nacionais, tornando a 
                aprendizagem do código uma aventura estimulante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-school-orange to-school-brown text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Criando Cidadãos Globais Digitais
            </h2>
            <p className="text-xl mb-8 opacity-95 max-w-4xl mx-auto">
              O {"{CODE.OSE}"} não é apenas uma adição ao currículo tradicional; é uma transformação 
              na forma como vemos a educação e preparamos nossos jovens para o futuro.
            </p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Estamos criando não apenas estudantes, mas cidadãos globais prontos para enfrentar 
              os desafios e as oportunidades do mundo digital.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <OptimizedImage
              src={img1}
              alt="Alunos programando"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img2}
              alt="Atividades de programação"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img3}
              alt="Tecnologia na educação"
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
