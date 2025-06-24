import { useEffect } from "react";
import Navigation from "@/components/navigation";

import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, BookOpen, Users } from "lucide-react";

export default function Professores() {
  useEffect(() => {
    updateSEO({
      title: "Nossos Professores - Educadores Especializados | a OSE",
      description: "Conheça o corpo docente da OSE: educadores qualificados com mais de 100 anos de tradição em ensino de excelência.",
      keywords: "professores OSE, corpo docente, educadores qualificados, ensino sorocaba"
    });
  }, []);

  const teachers = [
    {
      name: "Profa. Maria Silva",
      position: "Coordenadora Pedagógica - Educação Infantil",
      specialization: "Pedagogia e Psicopedagogia",
      experience: "15 anos",
      description: "Especialista em desenvolvimento infantil e metodologias lúdicas de aprendizagem."
    },
    {
      name: "Prof. João Santos",
      position: "Professor de Matemática - Ensino Médio",
      specialization: "Matemática e Física",
      experience: "20 anos",
      description: "Mestre em Matemática Aplicada, focado em preparação para vestibulares."
    },
    {
      name: "Profa. Ana Costa",
      position: "Professora de Português - Fundamental II",
      specialization: "Letras e Literatura Brasileira",
      experience: "12 anos",
      description: "Doutora em Literatura, desenvolve projetos de leitura e escrita criativa."
    },
    {
      name: "Prof. Carlos Lima",
      position: "Professor de Ciências - Fundamental I",
      specialization: "Biologia e Ciências Naturais",
      experience: "18 anos",
      description: "Especialista em educação científica e experimentação prática."
    },
    {
      name: "Profa. Lucia Rodrigues",
      position: "Professora de Inglês - Todos os Níveis",
      specialization: "Letras - Inglês",
      experience: "14 anos",
      description: "Certificada em Cambridge, aplica metodologias comunicativas no ensino."
    },
    {
      name: "Prof. Roberto Ferreira",
      position: "Professor de História - Ensino Médio",
      specialization: "História e Ciências Sociais",
      experience: "22 anos",
      description: "Mestre em História do Brasil, especialista em preparação para vestibulares."
    }
  ];

  const qualities = [
    {
      icon: GraduationCap,
      title: "Formação Continuada",
      description: "Todos os nossos educadores participam regularmente de cursos de atualização e capacitação."
    },
    {
      icon: Award,
      title: "Excelência Reconhecida",
      description: "Corpo docente com especialização, mestrado e doutorado nas suas áreas de atuação."
    },
    {
      icon: BookOpen,
      title: "Metodologia Inovadora",
      description: "Aplicação de metodologias ativas e tecnologias educacionais modernas."
    },
    {
      icon: Users,
      title: "Relacionamento Próximo",
      description: "Acompanhamento individualizado e relacionamento próximo com alunos e famílias."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nossos Professores
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Educadores Especializados com Tradição de Excelência
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95">
              Conheça o corpo docente que faz da OSE referência em educação há mais de 100 anos. 
              Profissionais qualificados, comprometidos com a formação integral de cada aluno.
            </p>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Conheça Nossos Educadores
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Professores qualificados que combinam experiência, dedicação e paixão pelo ensino
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teachers.map((teacher, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-school-orange/10 flex items-center justify-center">
                    <GraduationCap className="text-school-orange" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{teacher.name}</h3>
                  <p className="text-school-orange font-medium">{teacher.position}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-slate-700">Formação: </span>
                    <span className="text-slate-600">{teacher.specialization}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Experiência: </span>
                    <span className="text-slate-600">{teacher.experience}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{teacher.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Qualities Section */}
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                O que torna nossos professores especiais
              </h3>
              <p className="text-xl text-slate-600">
                Diferenciais que fazem da OSE referência em qualidade educacional
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualities.map((quality, index) => (
                <div key={index} className="text-center">
                  <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <quality.icon className="text-school-orange" size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">{quality.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{quality.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-school-orange to-school-brown rounded-xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Venha conhecer nossa equipe
            </h3>
            <p className="text-xl mb-6 opacity-95">
              Agende uma visita e converse pessoalmente com nossos educadores
            </p>
            <Button 
              size="lg"
              className="bg-white text-school-orange hover:bg-gray-100"
              onClick={() => window.location.href = '/#contato'}
            >
              Agendar Visita
            </Button>
          </div>
        </div>
      </section>


    </div>
  );
}