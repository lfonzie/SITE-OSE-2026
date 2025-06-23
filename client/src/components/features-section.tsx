import { Laptop, Users, Globe, FlaskRound, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Laptop,
    title: "Tecnologia Educacional",
    description: "Salas inteligentes, plataforma digital e ferramentas modernas para potencializar o aprendizado.",
    color: "text-blue-400"
  },
  {
    icon: Users,
    title: "Turmas Reduzidas",
    description: "Atendimento personalizado com turmas de até 25 alunos para maior atenção individual.",
    color: "text-green-400"
  },
  {
    icon: Globe,
    title: "Programa Bilíngue",
    description: "Imersão no idioma inglês desde a educação infantil, preparando para um mundo globalizado.",
    color: "text-purple-400"
  },
  {
    icon: FlaskRound,
    title: "Laboratórios Modernos",
    description: "Laboratórios de ciências, informática e robótica para aprendizado prático e experimental.",
    color: "text-yellow-400"
  },
  {
    icon: Zap,
    title: "Esportes e Artes",
    description: "Desenvolvimento integral através de atividades esportivas, artísticas e culturais diversificadas.",
    color: "text-red-400"
  },
  {
    icon: Shield,
    title: "Ambiente Seguro",
    description: "Segurança 24h, câmeras de monitoramento e protocolos rigorosos para tranquilidade das famílias.",
    color: "text-cyan-400"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por que escolher o <span className="text-yellow-400">Colégio OSE?</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Nossos diferenciais fazem a diferença na formação dos nossos alunos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-slate-700/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-600 hover:bg-slate-700/70 transition-all"
              >
                <Icon className={`${feature.color} mb-6`} size={48} />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
