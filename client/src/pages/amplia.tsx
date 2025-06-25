
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Brain, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

// Importando imagens para página Amplia
import { logos, newImages } from "@/lib/image-verification";
const img1 = newImages.img4;
const img5 = newImages.img5;
const img6 = newImages.img6;

export default function Amplia() {
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
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={img1}
            alt="Amplia - Plataforma de Ensino"
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
                <span className="text-school-orange">Amplia</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Plataforma de Ensino Completa
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Currículo contextualizado e inovador
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Ao proporcionar um currículo completo, incluindo habilidades acadêmicas e socioemocionais, 
                o Amplia oferece material contextualizado com tecnologia educacional de ponta.
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
              Pilares da <span className="text-school-orange">Educação Completa</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Nossa plataforma é fundamentada em três pilares essenciais 
              para a formação integral do aluno
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
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
            <OptimizedImage
              src={newImages.img24}
              alt="Material didático Amplia"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={newImages.img25}
              alt="Tecnologia educacional"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={newImages.img26}
              alt="Metodologia Amplia"
              className="w-full h-48 rounded-lg shadow-lg"
            />
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
              <OptimizedImage 
                src={img5} 
                alt="Material didático Amplia"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage 
                src={img6} 
                alt="Tecnologia educacional"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage 
                src={img1} 
                alt="Metodologia Amplia"
                className="w-full h-48 object-cover rounded-lg shadow-lg col-span-2"
              />
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
