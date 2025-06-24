
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Users, Target, Award, BookOpen, Shield, Lightbulb } from "lucide-react";

export default function SocioEmocional() {
  useEffect(() => {
    updateSEO({
      title: "Programa SócioEmocional | a OSE",
      description: "Programa educacional da OSE voltado para o desenvolvimento socioemocional dos estudantes, formando cidadãos conscientes e emocionalmente inteligentes.",
      keywords: "programa socioemocional, inteligência emocional, desenvolvimento integral, habilidades sociais, educação OSE"
    });
  }, []);

  const pillars = [
    {
      icon: Heart,
      title: "Autoconhecimento",
      description: "Identificação e compreensão das próprias emoções, fortalezas e limitações"
    },
    {
      icon: Shield,
      title: "Autocontrole",
      description: "Regulação emocional e comportamental diante de diferentes situações"
    },
    {
      icon: Users,
      title: "Empatia",
      description: "Capacidade de compreender e se conectar com os sentimentos dos outros"
    },
    {
      icon: Target,
      title: "Relacionamento",
      description: "Habilidades para construir e manter relacionamentos saudáveis e positivos"
    }
  ];

  const segments = [
    {
      title: "Educação Infantil e Anos Iniciais",
      description: "Foco nos pilares da inteligência emocional através de atividades lúdicas e dinâmicas",
      features: [
        "Identificação e gestão de emoções",
        "Materiais lúdicos adaptados",
        "Livros ilustrados e jogos colaborativos",
        "Ambientes seguros para expressão de sentimentos"
      ],
      icon: Heart
    },
    {
      title: "Anos Finais do Ensino Fundamental",
      description: "Desenvolvimento de habilidades essenciais através de projetos práticos e metodologias ativas",
      features: [
        "Pensamento crítico e perseverança",
        "Comunicação e colaboração",
        "Proatividade e curiosidade",
        "Projetos práticos e jogos em grupo"
      ],
      icon: Brain
    },
    {
      title: "Ensino Médio",
      description: "Preparação para a vida adulta com foco em autoconhecimento e escolhas responsáveis",
      features: [
        "Autoconhecimento e autorregulação",
        "Orientação para escolhas profissionais",
        "Enfrentamento de pressões sociais",
        "Debates e reflexões estruturadas"
      ],
      icon: Target
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Prevenção de Bullying",
      description: "Criação de ambientes mais respeitosos e inclusivos"
    },
    {
      icon: Heart,
      title: "Bem-estar Emocional",
      description: "Redução de ansiedade e depressão entre os estudantes"
    },
    {
      icon: Award,
      title: "Melhora Acadêmica",
      description: "Impacto positivo no desempenho escolar e aprendizado"
    },
    {
      icon: Users,
      title: "Relações Interpessoais",
      description: "Fortalecimento dos vínculos sociais e familiares"
    },
    {
      icon: Lightbulb,
      title: "Escolhas Responsáveis",
      description: "Desenvolvimento da capacidade de tomar decisões conscientes"
    },
    {
      icon: BookOpen,
      title: "Cidadania Consciente",
      description: "Formação de cidadãos críticos e socialmente responsáveis"
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
              Programa SócioEmocional
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Desenvolvendo Cidadãos Conscientes
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Formação integral que vai além do ensino acadêmico tradicional
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95">
              Cultivamos habilidades emocionais e sociais essenciais para os desafios do século XXI, 
              valorizando as singularidades dos alunos em um contexto sociocultural.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Nossa Visão Educacional
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              O programa educacional da OSE é uma iniciativa voltada para o desenvolvimento 
              socioemocional de estudantes, da educação infantil ao ensino médio, formando 
              cidadãos conscientes e preparados para os desafios contemporâneos.
            </p>
          </div>

          {/* Pillars Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <pillar.icon className="text-school-orange" size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{pillar.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Educational Approach */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Metodologia Inovadora
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  Nossa abordagem pedagógica inovadora promove um <strong>ambiente de aprendizado colaborativo</strong>, 
                  integrando escola, família e comunidade em um processo educacional integral.
                </p>
                <p>
                  Utilizamos materiais desenvolvidos com especialistas, incluindo recursos lúdicos e interativos, 
                  com personagens que dialogam com a realidade dos estudantes.
                </p>
                <p>
                  O programa oferece <strong>formação contínua para educadores</strong> e recursos para 
                  integrar famílias no processo educativo, fortalecendo toda a rede de apoio.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/attached_assets/1068_1750717790205.jpg" 
                alt="Programa SócioEmocional em ação"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/1092_1750717790205.jpg" 
                alt="Desenvolvimento integral"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/1105_1750717790206.jpg" 
                alt="Ambiente colaborativo"
                className="w-full h-48 object-cover rounded-lg shadow-lg col-span-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Estrutura por Segmento
            </h3>
            <p className="text-xl text-slate-600">
              Metodologia adaptada para cada faixa etária e suas necessidades específicas
            </p>
          </div>
          
          <div className="space-y-8">
            {segments.map((segment, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-50 to-white p-8 rounded-xl shadow-lg">
                <div className="grid lg:grid-cols-4 gap-6 items-center">
                  <div className="text-center lg:text-left">
                    <div className="bg-school-orange/10 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto lg:mx-0">
                      <segment.icon className="text-school-orange" size={36} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800">{segment.title}</h4>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-slate-600 mb-4">{segment.description}</p>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      {segment.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-school-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-school-orange/10 to-school-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Benefícios do Programa
            </h3>
            <p className="text-xl text-slate-600">
              Impactos positivos comprovados no desenvolvimento integral dos estudantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-school-orange/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="text-school-orange" size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
