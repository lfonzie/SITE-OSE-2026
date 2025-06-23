import { Laptop, Users, Globe, FlaskRound, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Laptop,
    title: "Google for Education",
    description: "Plataforma que transforma a maneira como educadores e alunos aprendem e colaboram, oferecendo educação interativa e colaborativa.",
    color: "text-blue-400"
  },
  {
    icon: Users,
    title: "Corpo Docente Experiente",
    description: "Equipe altamente qualificada com vasta experiência acadêmica e prática, sempre atualizada com as melhores práticas pedagógicas.",
    color: "text-green-400"
  },
  {
    icon: Globe,
    title: "Educação Bilíngue by MacMillan",
    description: "Currículo bilíngue que forma cidadãos globais, preparando alunos para interações multiculturais e proficiência linguística.",
    color: "text-purple-400"
  },
  {
    icon: FlaskRound,
    title: "{CODE.OSE} - Programação",
    description: "Linguagem de programação com foco em Inteligência Artificial na grade curricular do Ensino Fundamental I.",
    color: "text-yellow-400"
  },
  {
    icon: Zap,
    title: "Parceria com ACM",
    description: "Acesso exclusivo às instalações esportivas da ACM Unidade Centro com condições especiais para famílias OSE.",
    color: "text-red-400"
  },
  {
    icon: Shield,
    title: "Plataforma Amplia",
    description: "Solução integrada que oferece produtos e serviços de excelência, proporcionando ensino de qualidade e habilidades de vida.",
    color: "text-cyan-400"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-school-orange to-school-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Por que escolher <span className="text-white">a OSE?</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Nossos diferenciais fazem a diferença na formação dos nossos alunos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white/95 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-slate-800 backdrop-blur-sm"
              >
                <Icon className="text-school-orange mb-6" size={48} />
                <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
