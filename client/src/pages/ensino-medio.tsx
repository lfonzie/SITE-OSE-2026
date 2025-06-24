import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Importando imagens para Ensino Médio
import img1 from "@assets/0312_1750719589609.jpg";
import img2 from "@assets/0354_1750719589610.jpg";
import img3 from "@assets/0491_1750719589611.jpg";
import img4 from "@assets/0541_1750719589611.jpg";
import img5 from "@assets/0581_1750719589610.jpg";
import img6 from "@assets/0700_1750719589609.jpg";

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
      icon: Lightbulb,
      title: "Desenvolvimento Integral",
      description: "Formação que vai além do acadêmico, desenvolvendo habilidades socioemocionais e competências para o século XXI."
    }
  ];

  const subjects = [
    { area: "Linguagens", disciplines: ["Português", "Literatura", "Inglês", "Espanhol", "Artes", "Educação Física"] },
    { area: "Matemática", disciplines: ["Matemática", "Matemática Aplicada", "Estatística", "Geometria"] },
    { area: "Ciências da Natureza", disciplines: ["Física", "Química", "Biologia", "Ciências Ambientais"] },
    { area: "Ciências Humanas", disciplines: ["História", "Geografia", "Filosofia", "Sociologia"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage
            src={img1}
            alt="Estudantes do Ensino Médio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Ensino Médio
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-lg">
              1º, 2º e 3º Série
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto drop-shadow-lg">
              Preparação Completa para o Futuro
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95 drop-shadow-lg">
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
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Preparação para o Futuro
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  O Ensino Médio na a OSE representa o <strong>ápice da formação básica</strong>, onde consolidamos 
                  todo o conhecimento adquirido e preparamos nossos jovens para os desafios universitários e profissionais.
                </p>
                <p>
                  Com foco em <strong>excelência acadêmica e desenvolvimento integral</strong>, oferecemos uma 
                  educação que forma cidadãos críticos, éticos e preparados para transformar o mundo.
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
            <div className="grid grid-cols-2 gap-4">
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
                className="w-full h-48 rounded-lg shadow-lg col-span-2"
              />
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

    </div>
  );
}