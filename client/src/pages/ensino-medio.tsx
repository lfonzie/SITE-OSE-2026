
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  Target, 
  Lightbulb,
  Calendar,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Globe,
  Briefcase
} from "lucide-react";

export default function EnsinoMedio() {
  useEffect(() => {
    updateSEO({
      title: "Novo Ensino Médio - Preparando para o Futuro | a OSE",
      description: "Novo Ensino Médio na OSE: educação personalizada e flexível com itinerários formativos. Formação integral preparando alunos para o futuro.",
      keywords: "novo ensino médio, itinerários formativos, educação personalizada, ensino médio OSE, formação geral básica"
    });
  }, []);

  const years = [
    { year: "1º Ano", path: "/ensino-medio/1-ano" },
    { year: "2º Ano", path: "/ensino-medio/2-ano" },
    { year: "3º Ano", path: "/ensino-medio/3-ano" }
  ];

  const itinerarios = [
    {
      title: "Narrativas do Mundo",
      description: "Linguagens e Humanidades",
      color: "bg-blue-500"
    },
    {
      title: "Rota Exata", 
      description: "Matemática e Ciências da Natureza",
      color: "bg-green-500"
    }
  ];

  const projetoVidaEsferas = [
    {
      title: "Esfera Pessoal",
      description: "Comportamentos, relações, hábitos",
      icon: Users
    },
    {
      title: "Esfera Cidadã",
      description: "Ética, atitudes",
      icon: Globe
    },
    {
      title: "Esfera Acadêmica", 
      description: "Estudos, pesquisas",
      icon: BookOpen
    },
    {
      title: "Esfera Profissional",
      description: "Trabalho, carreira",
      icon: Briefcase
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-school-orange via-orange-500 to-orange-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Novo Ensino Médio
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Preparando Alunos para o Futuro com Educação Personalizada e Flexível
            </p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              O Novo Ensino Médio na OSE representa uma revolução na forma como abordamos a educação.
              Com uma abordagem centrada no aluno e baseada na nova legislação, oferecemos uma experiência 
              educacional que é tanto abrangente quanto personalizada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navegação por Anos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {years.map((year, index) => (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full h-20 text-lg font-semibold border-2 border-school-orange hover:bg-school-orange hover:text-white transition-all duration-300"
                  onClick={() => window.location.href = year.path}
                >
                  {year.year}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formação Geral Básica */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Formação Geral Básica
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-slate-600">
              A Formação Geral Básica (FGB) constitui o cerne da educação no Novo Ensino Médio, 
              abrangendo 60% da carga horária total e oferecendo uma fundação sólida nas disciplinas essenciais.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <OptimizedImage 
                src="/images/ensino-medio-fgb.jpg" 
                alt="Formação Geral Básica"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-school-orange text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Base Curricular Sólida</h3>
                    <p className="text-slate-600">
                      Disciplinas essenciais como Matemática, Português e Ciências, 
                      integradas com competências da BNCC.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-school-orange text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Formação Equilibrada</h3>
                    <p className="text-slate-600">
                      Preparação abrangente para os desafios multifacetados do século 21.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Itinerários Formativos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Itinerários Formativos
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-slate-600 mb-4">
              Os Itinerários Formativos permitem aos alunos explorar suas paixões e interesses de forma mais aprofundada.
            </p>
            <p className="text-lg max-w-3xl mx-auto text-school-orange font-semibold">
              O grande diferencial do médio são os itinerários formativos: exatas ou humanas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {itinerarios.map((itinerario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-2 border-gray-100">
                  <CardHeader className={`${itinerario.color} text-white rounded-t-lg`}>
                    <CardTitle className="text-2xl text-center">{itinerario.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 text-center">
                    <p className="text-lg text-slate-600 mb-6">{itinerario.description}</p>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-600">
                          Educação relevante que responde às exigências do mundo atual 
                          e às ambições dos alunos
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projeto de Vida */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Projeto de Vida
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-slate-600">
              Uma inovação central do Novo Ensino Médio que visa desenvolver o autoprotagonismo 
              do aluno em diversas esferas da vida.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projetoVidaEsferas.map((esfera, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <esfera.icon size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">{esfera.title}</h3>
                    <p className="text-slate-600">{esfera.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amplia Eletivas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Amplia Eletivas
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-slate-600">
              Componentes curriculares que oferecem aos alunos a oportunidade de estudar 
              assuntos relevantes no mundo atual com abordagem prática e aplicada.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Interativas</h3>
                  <p className="text-slate-600">
                    Cursos altamente interativos e engajantes
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Práticas</h3>
                  <p className="text-slate-600">
                    Abordagem mais prática e aplicada ao aprendizado
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Relevantes</h3>
                  <p className="text-slate-600">
                    Assuntos extremamente relevantes no mundo atual
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-school-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transformação Educacional
            </h2>
            <p className="text-xl max-w-4xl mx-auto mb-8 opacity-95">
              O Novo Ensino Médio do Colégio OSE não é apenas uma etapa educacional, 
              mas uma jornada de autodescobrimento, crescimento e preparação para o futuro.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-school-orange hover:bg-gray-100">
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Avaliação Pedagógica
            </Button>
          </motion.div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
