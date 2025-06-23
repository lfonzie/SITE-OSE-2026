import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Target, Users, BookOpen, Award, TrendingUp } from "lucide-react";

export default function EnsinoMedio() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Médio - Preparação para o Futuro | a OSE",
      description: "Ensino Médio na OSE: preparação completa para vestibulares e vida universitária. Excelência acadêmica com formação cidadã.",
      keywords: "ensino médio sorocaba, vestibular, ENEM, preparação universitária, ensino médio particular"
    });
  }, []);

  const features = [
    {
      icon: GraduationCap,
      title: "Preparação Vestibular",
      description: "Metodologia focada nos principais vestibulares e ENEM, com simulados regulares e acompanhamento individual do desempenho."
    },
    {
      icon: Target,
      title: "Projeto de Vida",
      description: "Orientação vocacional e desenvolvimento de projeto de vida, auxiliando na escolha profissional e planejamento futuro."
    },
    {
      icon: Users,
      title: "Protagonismo Jovem",
      description: "Incentivo ao protagonismo estudantil através de liderança, projetos sociais e participação ativa na comunidade escolar."
    },
    {
      icon: BookOpen,
      title: "Currículo Completo",
      description: "Base curricular nacional complementada com disciplinas eletivas, aprofundamento em áreas de interesse e preparação específica."
    },
    {
      icon: Award,
      title: "Excelência Acadêmica",
      description: "Alto índice de aprovação em universidades públicas e privadas, com acompanhamento personalizado de cada estudante."
    },
    {
      icon: TrendingUp,
      title: "Desenvolvimento Integral",
      description: "Formação que vai além do acadêmico, desenvolvendo habilidades socioemocionais e competências para o século XXI."
    }
  ];

  const subjects = [
    { area: "Linguagens", disciplines: ["Português", "Literatura", "Inglês", "Espanhol", "Artes", "Educação Física"] },
    { area: "Matemática", disciplines: ["Matemática", "Matemática Aplicada", "Estatística", "Geometria"] },
    { area: "Ciências da Natureza", disciplines: ["Física", "Química", "Biologia", "Ciências Ambientais"] },
    { area: "Ciências Humanas", disciplines: ["História", "Geografia", "Filosofia", "Sociologia"] }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ensino Médio
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              1º, 2º e 3º Série
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Preparação Completa para o Futuro
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95">
              No Ensino Médio da OSE, preparamos nossos estudantes não apenas para os vestibulares, 
              mas para a vida universitária e profissional, formando cidadãos críticos e preparados 
              para os desafios do mundo contemporâneo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Formação Completa para o Futuro
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Nossa proposta pedagógica para o Ensino Médio combina excelência acadêmica com formação cidadã, 
              preparando jovens para os desafios universitários e profissionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="text-school-orange" size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Educational Approach */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="mb-6">
                <img 
                  src="/attached_assets/0541_1750717790207.jpg" 
                  alt="Aluna do Ensino Médio concentrada nos estudos"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Excelência que Prepara para a Vida
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  Com mais de <strong>100 anos de tradição educacional</strong>, a OSE desenvolveu 
                  uma metodologia única que combina preparação acadêmica rigorosa com formação 
                  humana integral.
                </p>
                <p>
                  Nossos estudantes do Ensino Médio são protagonistas de seu aprendizado, 
                  desenvolvendo autonomia, pensamento crítico e responsabilidade social que 
                  os acompanharão por toda a vida.
                </p>
                <p>
                  <strong>a OSE</strong> mantém alto índice de aprovação nos principais vestibulares 
                  do país, reflexo de nossa metodologia consolidada e acompanhamento personalizado.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agendamento Avaliação Pedagógica
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold text-slate-800 mb-6">
                Nossos Resultados
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Aprovação Vestibulares</span>
                  <span className="text-2xl font-bold text-school-orange">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Universidades Públicas</span>
                  <span className="text-2xl font-bold text-school-orange">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">ENEM - Média Acima Nacional</span>
                  <span className="text-2xl font-bold text-school-orange">150pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Satisfação das Famílias</span>
                  <span className="text-2xl font-bold text-school-orange">98%</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-school-orange/10 rounded-lg">
                <p className="text-sm text-slate-600 font-medium">
                  "Tradição que prepara, inovação que transforma, resultados que comprovam."
                </p>
              </div>
            </div>
          </div>

          {/* Curriculum Section */}
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Matriz Curricular Completa
              </h3>
              <p className="text-xl text-slate-600">
                Base Nacional Comum Curricular + Aprofundamentos + Preparação Específica
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((subject, index) => (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <h4 className="font-bold text-slate-800 mb-4 text-center">{subject.area}</h4>
                  <ul className="space-y-2">
                    {subject.disciplines.map((discipline, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center">
                        <div className="w-2 h-2 bg-school-orange rounded-full mr-3"></div>
                        {discipline}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h5 className="font-bold text-slate-800 mb-2">Preparação ENEM</h5>
                  <p className="text-sm text-slate-600">Simulados, redação, estratégias específicas</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h5 className="font-bold text-slate-800 mb-2">Vestibulares Específicos</h5>
                  <p className="text-sm text-slate-600">FUVEST, UNICAMP, UNESP e outros</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h5 className="font-bold text-slate-800 mb-2">Orientação Vocacional</h5>
                  <p className="text-sm text-slate-600">Projeto de vida e escolha profissional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}