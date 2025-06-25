
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Users, BookOpen, Trophy, Star, Building2, GraduationCap, Heart, Map } from "lucide-react";
import { motion } from "framer-motion";

export default function Legacy() {
  useEffect(() => {
    updateSEO({
      title: "História da OSE - 100 Anos de Tradição | OSE",
      description: "Conheça a rica história da OSE: desde 1924, um século de excelência educacional em Sorocaba. Uma jornada de tradição, inovação e formação integral.",
      keywords: "história OSE, tradição educacional, 100 anos, legado, colégio tradicional sorocaba, Arthur Cyrillo Freire"
    });
  }, []);

  const timeline = [
    {
      year: "1924",
      title: "Fundação da Escola do Comércio de Sorocaba",
      description: "Em 22 de outubro, nasce a Escola do Comércio de Sorocaba na Rua Álvaro Soares. Pioneira no ensino comercial no interior de São Paulo, com currículo inovador e abordagem pedagógica diferenciada.",
      icon: <Star size={24} />,
      highlight: true
    },
    {
      year: "1936",
      title: "Chegada da Família Fonseca",
      description: "Dr. Arthur Cyrillo Freire, Dona Tercila Bosqueti Fonseca e seus filhos Arthur e Nelson Fonseca chegam de Santos e adquirem a pequena escola com apenas 42 alunos.",
      icon: <Users size={24} />
    },
    {
      year: "1941",
      title: "Mudança para a Rua Benedito Pires",
      description: "A escola se muda para um prédio maior. Em gesto simbólico, os próprios alunos carregam os móveis e carteiras até a nova sede, demonstrando o forte vínculo com a comunidade.",
      icon: <Building2 size={24} />
    },
    {
      year: "1946",
      title: "Nasce a OSE",
      description: "Inauguração do curso ginasial e oficialização como Organização Sorocabana de Ensino (OSE). Ampliação do currículo reflete a visão de educação abrangente e formação integral.",
      icon: <BookOpen size={24} />,
      highlight: true
    },
    {
      year: "1955",
      title: "Nova Sede na Rua da Penha",
      description: "Investimento em novo prédio moderno com mais de 40 salas de aula, quatro laboratórios de química, empresa júnior e o icônico pátio com a jabuticabeira.",
      icon: <Building2 size={24} />
    },
    {
      year: "1980",
      title: "Pico de Crescimento",
      description: "A OSE atinge mais de 2.000 alunos apenas na unidade central, consolidando-se como referência educacional em Sorocaba e região.",
      icon: <Trophy size={24} />
    },
    {
      year: "1989",
      title: "Colégio Uirapuru",
      description: "Arthur Fonseca Filho, Kiko Fonseca e Nelson Raul criam o Colégio Uirapuru como extensão da OSE, unindo tradição e inovação pedagógica.",
      icon: <GraduationCap size={24} />
    },
    {
      year: "1997",
      title: "OSE Santa Rosália",
      description: "Inauguração da unidade Santa Rosália na Avenida Roberto Simonsen, expandindo a presença da OSE para atender mais famílias da região.",
      icon: <Map size={24} />
    },
    {
      year: "1999",
      title: "Independência do Uirapuru",
      description: "O Colégio Uirapuru torna-se administrativamente independente, mantendo os princípios educacionais e colaboração com a OSE.",
      icon: <Award size={24} />
    },
    {
      year: "2000",
      title: "Faculdade IMAPES",
      description: "Criação da Faculdade IMAPES (Instituto Manchester Paulista de Ensino Superior), expandindo para o ensino superior com cursos de Administração, Biblioteconomia e Química.",
      icon: <GraduationCap size={24} />
    },
    {
      year: "2010",
      title: "Nova Direção",
      description: "Kiko Fonseca assume a direção geral da OSE, promovendo modernização tecnológica e mantendo os valores tradicionais da instituição.",
      icon: <Heart size={24} />
    },
    {
      year: "2024",
      title: "Centenário",
      description: "Celebração de 100 anos de excelência educacional, olhando para o futuro com a sabedoria de um século de tradição e inovação.",
      icon: <Trophy size={24} />,
      highlight: true
    }
  ];

  const historicalFigures = [
    {
      name: "Dr. Arthur Cyrillo Freire",
      role: "Fundador e Visionário",
      description: "Nascido em 1878, em Fortaleza. Advogado, educador, jornalista e ativista social. Promotor Público no Amazonas, advogado da Companhia Antártica Paulista e defensor dos trabalhadores das docas de Santos.",
      image: "/images/arthur_cyrilo.jpg",
      details: "Participou da Revolução Constitucionalista de 1932 e recebeu o título de Cidadão Sorocabano. Uma escola estadual em Sorocaba leva seu nome."
    },
    {
      name: "Professor Arthur Fonseca",
      role: "Diretor e Político",
      description: "Nascido em 1922, modernizou e expandiu a OSE. Vereador de Sorocaba (1947-1950), Secretário de Educação e Saúde (1969-1970) e Deputado Federal (1971-1975).",
      image: "/images/arthur_fonseca.jpg",
      details: "Defensor da educação técnica, tem uma avenida em Sorocaba nomeada em sua homenagem."
    },
    {
      name: "Nelson Fonseca",
      role: "Gestor Financeiro",
      description: "Nascido em 1924, foi fundamental na gestão financeira e administrativa da OSE. Garantiu a sustentabilidade econômica e participou ativamente da comunidade sorocabana.",
      image: "/images/nelson_fonseca.jpg",
      details: "O Centro de Educação Infantil (CEI) Nelson Fonseca leva seu nome em reconhecimento à sua contribuição educacional."
    }
  ];

  const institutions = [
    {
      name: "Colégio Uirapuru",
      period: "1989-1999",
      description: "Criado como extensão da OSE por Arthur Fonseca Filho, Kiko Fonseca e Nelson Raul. Iniciou com 130 alunos de 4 a 10 anos, focando na união entre tradição e inovação pedagógica.",
      image: "/images/uirapuru_college.jpg",
      impact: "Tornou-se referência em qualidade docente e formação continuada de professores."
    },
    {
      name: "OSE Santa Rosália",
      period: "1997-2010",
      description: "Inaugurada no bairro Santa Rosália, começou em uma casa na Av. Roberto Simonsen e depois se mudou para a Rua Manoel Pereira e Silva. Implantou o Ensino Fundamental II em 2004.",
      image: "/images/santa_rosalia.jpg",
      impact: "Expandiu a presença da OSE para uma região nobre de Sorocaba, atendendo mais famílias."
    },
    {
      name: "Faculdade IMAPES",
      period: "2000-2010",
      description: "Instituto Manchester Paulista de Ensino Superior oferecia cursos de Administração (RH e Comércio Exterior), Biblioteconomia e Química. Chegou a ter 1.500 alunos.",
      image: "/images/imapes.jpg",
      impact: "Formou profissionais qualificados e ampliou o legado educacional da OSE para o ensino superior."
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Um Século de <span className="text-school-orange">Excelência</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                <strong>1924 - 2024:</strong> 100 Anos de <strong>Tradição Educacional</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                A Organização Sorocabana de Ensino é uma instituição que há um século desempenha papel 
                fundamental na formação de milhares de estudantes em Sorocaba e região, contribuindo 
                para o desenvolvimento social, econômico e cultural da cidade.
              </p>
            </div>
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
              Uma jornada centenária de dedicação e inovação educacional
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`p-6 rounded-xl shadow-lg border-l-4 ${
                    event.highlight 
                      ? 'bg-gradient-to-r from-school-orange/10 to-school-orange/5 border-school-orange' 
                      : 'bg-white border-slate-300'
                  }`}>
                    <div className={`text-3xl font-bold mb-2 ${
                      event.highlight ? 'text-school-orange' : 'text-slate-700'
                    }`}>
                      {event.year}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{event.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
                  event.highlight ? 'bg-school-orange' : 'bg-slate-600'
                }`}>
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
              Grandes <span className="text-school-orange">Personalidades</span>
            </h2>
            <p className="text-xl text-slate-600">
              Os visionários que construíram nossa história
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {historicalFigures.map((figure, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="h-64 bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center">
                  <Users size={64} className="text-slate-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{figure.name}</h3>
                  <p className="text-school-orange font-semibold mb-3">{figure.role}</p>
                  <p className="text-slate-600 mb-3">{figure.description}</p>
                  <p className="text-sm text-slate-500 italic">{figure.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Institutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Instituições <span className="text-school-orange">Históricas</span>
            </h2>
            <p className="text-xl text-slate-600">
              Expandindo o legado educacional da OSE
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {institutions.map((institution, index) => (
              <motion.div 
                key={index}
                className="bg-slate-50 rounded-xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="h-48 bg-gradient-to-b from-slate-200 to-slate-300 rounded-lg mb-6 flex items-center justify-center">
                  <BookOpen size={48} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{institution.name}</h3>
                <p className="text-school-orange font-semibold mb-4">{institution.period}</p>
                <p className="text-slate-600 mb-4 leading-relaxed">{institution.description}</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 italic">{institution.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Impact */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Nosso <span className="text-school-orange">Impacto</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Cem anos formando profissionais que impulsionaram o crescimento de Sorocaba. 
              A OSE desempenhou papel crucial no desenvolvimento econômico e social da cidade, 
              mantendo-se como referência educacional através das gerações.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Excelência Acadêmica</h3>
              <p className="text-slate-600">Compromisso com ensino de alta qualidade, atualizado e relevante para formar cidadãos preparados.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Desenvolvimento Humano</h3>
              <p className="text-slate-600">Formação de cidadãos éticos, críticos e responsáveis, valorizando o desenvolvimento integral.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Inovação Constante</h3>
              <p className="text-slate-600">Busca contínua por novas metodologias e tecnologias educacionais, adaptando-se aos tempos.</p>
            </div>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
