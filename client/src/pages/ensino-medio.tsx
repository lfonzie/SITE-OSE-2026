import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Target, Award, Lightbulb, Brain, Heart, Globe, Calculator, Microscope, PenTool } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

// Importando imagens para página Ensino Médio
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img7;
const img2 = newImages.img8;
const img3 = newImages.img9;

export default function EnsinoMedio() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Médio - Novo Ensino Médio | a OSE",
      description: "Novo Ensino Médio na OSE: educação personalizada e flexível com itinerários formativos, formação geral básica e projetos integradores.",
      keywords: "novo ensino médio, itinerários formativos, educação personalizada, ENEM, vestibular, OSE sorocaba"
    });
  }, []);

  const pillars = [
    {
      icon: BookOpen,
      title: "Formação Geral Básica",
      description: "60% da carga horária com disciplinas essenciais alinhadas à BNCC, oferecendo uma fundação sólida em Matemática, Português e Ciências.",
      color: "bg-blue-500"
    },
    {
      icon: Target,
      title: "Projetos Integradores",
      description: "Pedra angular da abordagem interdisciplinar, permitindo aplicação prática do conhecimento e desenvolvimento de pensamento crítico.",
      color: "bg-green-500"
    },
    {
      icon: Globe,
      title: "Itinerários Formativos",
      description: "Exploração aprofundada de paixões e interesses com modelos específicos e integrados para atender necessidades educacionais e de carreira.",
      color: "bg-purple-500"
    },
    {
      icon: Heart,
      title: "Projeto de Vida",
      description: "Desenvolvimento do autoprotagonismo em esferas pessoal, acadêmica, profissional e cidadã, servindo como mapa orientador para o futuro.",
      color: "bg-red-500"
    }
  ];

  const itinerarios = [
    {
      title: "Narrativas do Mundo",
      description: "Linguagens e Ciências Humanas",
      icon: PenTool,
      color: "from-blue-500 to-purple-500",
      areas: ["Português", "História", "Geografia", "Filosofia", "Sociologia", "Inglês", "Artes"]
    },
    {
      title: "Rota Exata",
      description: "Matemática e Ciências da Natureza", 
      icon: Calculator,
      color: "from-green-500 to-blue-500",
      areas: ["Matemática", "Física", "Química", "Biologia"]
    }
  ];

  const projetoVida = [
    {
      title: "Esfera Pessoal",
      description: "Comportamentos, relações, hábitos",
      icon: Heart
    },
    {
      title: "Esfera Cidadã", 
      description: "Ética, atitudes",
      icon: Users
    },
    {
      title: "Esfera Acadêmica",
      description: "Estudos, pesquisas", 
      icon: BookOpen
    },
    {
      title: "Esfera Profissional",
      description: "Trabalho, carreira",
      icon: Target
    }
  ];

  const years = [
    { year: "1º Ano", description: "Base sólida e introdução aos itinerários" },
    { year: "2º Ano", description: "Aprofundamento e projetos práticos" },
    { year: "3º Ano", description: "Preparação ENEM e definição profissional" }
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
            alt="Ensino Médio OSE"
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
                <span className="text-school-orange">Novo Ensino Médio</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Preparando Alunos para o Futuro
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Educação Personalizada e Flexível
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                O Novo Ensino Médio na OSE representa uma revolução na forma como abordamos a educação. 
                Com uma abordagem centrada no aluno e baseada na nova legislação, oferecemos uma experiência 
                educacional que é tanto abrangente quanto personalizada.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Years Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Anos do Ensino Médio</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {years.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.year}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Pilares do <span className="text-school-orange">Novo Ensino Médio</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Modelo híbrido que une base comum robusta à flexibilidade de itinerários formativos
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

      {/* Itinerários Formativos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Itinerários Formativos</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              O grande diferencial do Ensino Médio são os itinerários formativos: Exatas ou Humanas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {itinerarios.map((itinerario, index) => {
              const Icon = itinerario.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.2} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-school-orange/20 h-full">
                    <div className={`bg-gradient-to-r ${itinerario.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{itinerario.title}</h3>
                    <p className="text-lg text-school-orange font-semibold mb-4">{itinerario.description}</p>
                    <div className="space-y-2">
                      {itinerario.areas.map((area, i) => (
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

      {/* Projeto de Vida */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Projeto de Vida</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Desenvolvimento do autoprotagonismo em diversas esferas da vida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {projetoVida.map((esfera, index) => {
              const Icon = esfera.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center h-full">
                    <div className="bg-school-orange text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">{esfera.title}</h4>
                    <p className="text-sm text-slate-600">{esfera.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-lg text-slate-700 text-center">
              Este é um processo continuado que ajuda o aluno a planejar e tomar decisões conscientes sobre seu futuro. 
              Ele serve como um mapa orientador que é revisitado e adaptado ao longo do curso.
            </p>
          </div>
        </div>
      </section>

      {/* Eletivas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Amplia Eletivas</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Componentes curriculares altamente interativos e engajantes
            </p>
          </div>

          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
            <p className="text-lg text-slate-700 mb-6">
              As Eletivas são componentes curriculares que oferecem aos alunos a oportunidade de estudar 
              assuntos que estão fora do currículo padrão, mas que são extremamente relevantes no mundo atual.
            </p>
            <p className="text-slate-600">
              Estes cursos são desenvolvidos para serem altamente interativos e engajantes, 
              fornecendo uma abordagem mais prática e aplicada ao aprendizado.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <OptimizedImage
              src={img1}
              alt="Novo Ensino Médio na OSE"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img2}
              alt="Projetos integradores"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img3}
              alt="Itinerários formativos"
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