
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Users, BookOpen, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Legacy() {
  useEffect(() => {
    updateSEO({
      title: "Nosso Legado - 100 Anos de Tradição | a OSE",
      description: "Conheça a rica história da OSE: 100 anos de tradição educacional desde 1924. Valores que permanecem, excelência que se renova.",
      keywords: "história OSE, tradição educacional, 100 anos, legado, colégio tradicional sorocaba"
    });
  }, []);

  const timeline = [
    {
      year: "1924",
      title: "Fundação da OSE",
      description: "Nascimento da Organização Sorocabana de Ensino, com o sonho de transformar vidas através da educação.",
      icon: <Star size={24} />
    },
    {
      year: "1950",
      title: "Expansão dos Cursos",
      description: "Ampliação da oferta educacional com novos segmentos e metodologias inovadoras para a época.",
      icon: <BookOpen size={24} />
    },
    {
      year: "1975",
      title: "Reconhecimento Regional",
      description: "Consolidação como referência educacional em Sorocaba e região, formando líderes e cidadãos exemplares.",
      icon: <Award size={24} />
    },
    {
      year: "2000",
      title: "Era Digital",
      description: "Modernização tecnológica e incorporação de recursos digitais no processo de ensino-aprendizagem.",
      icon: <Trophy size={24} />
    },
    {
      year: "2024",
      title: "Centenário",
      description: "Celebração de 100 anos de excelência educacional, olhando para o futuro com a sabedoria do passado.",
      icon: <Users size={24} />
    }
  ];

  const historicalFigures = [
    {
      name: "Arthur Cyrilo",
      role: "Fundador e Visionário",
      description: "Idealizador da OSE, dedicou sua vida à construção de uma educação transformadora.",
      image: "/images/arthur_cyrilo.jpg"
    },
    {
      name: "Arthur Fonseca",
      role: "Diretor Pedagógico",
      description: "Responsável pela implementação das primeiras metodologias inovadoras da instituição.",
      image: "/images/arthur_fonseca.jpg"
    },
    {
      name: "Nelson Fonseca",
      role: "Gestor Educacional",
      description: "Liderou a expansão e modernização da OSE durante décadas de crescimento.",
      image: "/images/nelson_fonseca.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/horizontal_1.png"
            alt="História da OSE"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-700/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nosso <span className="text-school-orange">Legado</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              <strong>100 Anos</strong> construindo <strong>futuro</strong> com base na <strong>tradição</strong>
            </p>
            <p className="text-lg mb-8 opacity-90 max-w-4xl mx-auto">
              Desde 1924, a OSE representa mais que uma escola - somos guardiões de 
              uma tradição educacional que atravessa gerações, moldando líderes e cidadãos exemplares.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Linha do <span className="text-school-orange">Tempo</span>
            </h2>
            <p className="text-xl text-slate-600">
              Uma jornada de 100 anos de excelência educacional
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-school-orange"></div>
            
            {timeline.map((event, index) => (
              <motion.div 
                key={index}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-school-orange">
                    <div className="text-3xl font-bold text-school-orange mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{event.title}</h3>
                    <p className="text-slate-600">{event.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-school-orange rounded-full flex items-center justify-center text-white shadow-lg">
                  {event.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Figures */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Grandes <span className="text-school-orange">Líderes</span>
            </h2>
            <p className="text-xl text-slate-600">
              Personalidades que moldaram nossa história
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {historicalFigures.map((figure, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center">
                  <Users size={64} className="text-slate-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{figure.name}</h3>
                  <p className="text-school-orange font-semibold mb-3">{figure.role}</p>
                  <p className="text-slate-600">{figure.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Institutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Nossas <span className="text-school-orange">Raízes</span>
            </h2>
            <p className="text-xl text-slate-600">
              Instituições que marcaram nossa trajetória
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Uirapuru */}
            <div className="text-center">
              <div className="bg-school-orange/10 p-8 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Colégio Uirapuru</h3>
                <div className="h-48 bg-gradient-to-b from-slate-200 to-slate-300 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen size={48} className="text-slate-400" />
                </div>
                <p className="text-slate-600">
                  Uma das primeiras unidades da OSE, o Colégio Uirapuru foi pioneiro em metodologias 
                  inovadoras e formação integral dos estudantes.
                </p>
              </div>
            </div>

            {/* Santa Rosália */}
            <div className="text-center">
              <div className="bg-school-orange/10 p-8 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Colégio Santa Rosália</h3>
                <div className="h-48 bg-gradient-to-b from-slate-200 to-slate-300 rounded-lg mb-4 flex items-center justify-center">
                  <Award size={48} className="text-slate-400" />
                </div>
                <p className="text-slate-600">
                  Reconhecido pela excelência acadêmica e formação de valores, o Santa Rosália 
                  consolidou a reputação da OSE na educação de qualidade.
                </p>
              </div>
            </div>

            {/* IMAPES */}
            <div className="text-center">
              <div className="bg-school-orange/10 p-8 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">IMAPES</h3>
                <div className="h-48 bg-gradient-to-b from-slate-200 to-slate-300 rounded-lg mb-4 flex items-center justify-center">
                  <Trophy size={48} className="text-slate-400" />
                </div>
                <p className="text-slate-600">
                  Instituto de formação profissionalizante que ampliou os horizontes educacionais 
                  da OSE, preparando jovens para o mercado de trabalho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
