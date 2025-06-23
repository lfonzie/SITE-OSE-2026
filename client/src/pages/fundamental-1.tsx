import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Calculator, Palette, UserCheck, BookOpen } from "lucide-react";

export default function Fundamental1() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Fundamental I - Anos Iniciais | a OSE",
      description: "Ensino Fundamental I na OSE: desenvolvendo mentes curiosas e corações compassivos. 1º ao 5º ano com foco em habilidades sociais e emocionais.",
      keywords: "ensino fundamental I sorocaba, anos iniciais, desenvolvimento acadêmico, habilidades sociais"
    });
  }, []);

  const competencies = [
    {
      icon: MessageCircle,
      title: "Capacidade Verbal",
      description: "Priorizamos o desenvolvimento da linguagem como base para todas as outras formas de aprendizado, fomentando comunicação, pensamento crítico e imaginação."
    },
    {
      icon: Users,
      title: "Socialização",
      description: "Enfatizamos atividades que cultivam empatia, colaboração e consciência social para formar cidadãos conscientes e solidários."
    },
    {
      icon: Calculator,
      title: "Operações Mentais",
      description: "Os alunos se tornam fluentes em matemática, desenvolvendo capacidade de aplicar conceitos numéricos na vida cotidiana com abordagens práticas e lúdicas."
    },
    {
      icon: Palette,
      title: "Capital Cultural",
      description: "Ampliamos os horizontes culturais apresentando variedade de artes, histórias e tradições para uma educação mais rica e diversificada."
    },
    {
      icon: UserCheck,
      title: "Autonomia",
      description: "Encorajamos os alunos a serem protagonistas do próprio aprendizado com atividades que exigem decisões e pensamento independente."
    },
    {
      icon: BookOpen,
      title: "Currículo Tradicional",
      description: "Disciplinas fundamentais como Matemática, Português, História, Geografia, além de Educação Física, Inglês, Ciências, Artes e Música."
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
              Ensino Fundamental I
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Anos Iniciais - 1º ao 5º ano
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Desenvolvendo Mentes Curiosas e Corações Compassivos
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95">
              O Ensino Fundamental I representa um período crítico e fascinante na jornada educacional. 
              Focamos não apenas no desenvolvimento acadêmico, mas também nas habilidades sociais, emocionais e culturais.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Competências Desenvolvidas
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Nossa metodologia abrange seis pilares fundamentais para o desenvolvimento integral dos alunos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {competencies.map((competency, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <competency.icon className="text-school-orange" size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{competency.title}</h4>
                <p className="text-slate-600 leading-relaxed">{competency.description}</p>
              </div>
            ))}
          </div>

          {/* Educational Approach */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="mb-6">
                <img 
                  src="/attached_assets/0312_1750717790204.jpg" 
                  alt="Alunos do Fundamental I em sala de aula"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Nossa Abordagem Educacional
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  <strong>a OSE</strong> prioriza o desenvolvimento da linguagem, que é a base para 
                  todas as outras formas de aprendizado. Utilizamos uma variedade de leituras e 
                  atividades escritas que fomentam não só a habilidade de comunicação, mas também 
                  o pensamento crítico e a imaginação.
                </p>
                <p>
                  Acreditamos que a educação vai além dos livros. Enfatizamos atividades que cultivam 
                  empatia, colaboração e consciência social. Nosso objetivo é formar não só alunos 
                  bem preparados academicamente, mas também cidadãos conscientes e solidários.
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
                Diferenciais do Fundamental I
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-school-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>Programação:</strong> Introdução ao pensamento computacional integrado ao currículo
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-school-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>Educação Socioemocional:</strong> Desenvolvimento de habilidades para a vida
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-school-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>Ensino Bilíngue:</strong> Opções de aprendizado de inglês adaptadas à idade
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-school-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>Integral Flex:</strong> Aprendizado abrangente que atende necessidades individuais
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Section */}
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Currículo Completo e Equilibrado
              </h3>
              <p className="text-xl text-slate-600">
                Base sólida para o desenvolvimento intelectual e social
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Núcleo Básico</h4>
                <p className="text-sm text-slate-600">Matemática, Português, História, Geografia</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Artes e Cultura</h4>
                <p className="text-sm text-slate-600">Artes Visuais, Música, Educação Cultural</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Ciências</h4>
                <p className="text-sm text-slate-600">Ciências Naturais, Experimentação</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Desenvolvimento</h4>
                <p className="text-sm text-slate-600">Educação Física, Inglês, Socioemocional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}