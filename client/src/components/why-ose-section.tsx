import { CheckCircle, Heart, Award, Users } from "lucide-react";

export default function WhyOSESection() {
  const reasons = [
    {
      icon: Award,
      title: "100 Anos de Tradição",
      description: "A OSE possui um diferencial que poucos colégios no Brasil têm: tradição secular e rica história educacional."
    },
    {
      icon: Heart,
      title: "Formação Integral",
      description: "Educamos com base em valores éticos sólidos, preparando gerações para o sucesso e a cidadania."
    },
    {
      icon: Users,
      title: "Ambiente Acolhedor",
      description: "Criamos espaços seguros onde cada aluno pode crescer individualmente e socialmente."
    },
    {
      icon: CheckCircle,
      title: "Excelência Reconhecida",
      description: "98% de satisfação das famílias comprova nosso compromisso com a qualidade educacional."
    }
  ];

  return (
    <section id="why-ose" className="py-20 bg-gradient-to-r from-school-orange to-school-brown text-white relative">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl">
            Por que escolher <span className="text-white">a OSE</span>?
          </h2>
          <p className="text-xl max-w-4xl mx-auto opacity-95 drop-shadow-xl">
            Conheça os diferenciais que fazem da OSE a escolha ideal para a educação do seu filho.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <reason.icon className="text-school-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/20 rounded-xl p-8 md:p-12 text-white text-center shadow-xl">
          <h3 className="text-3xl font-bold mb-4 drop-shadow-md">
            Venha conhecer a OSE
          </h3>
          <p className="text-xl mb-6 drop-shadow-sm">
            Agende uma visita e descubra por que somos referência em educação há mais de 100 anos
          </p>
          <button
            className="bg-white text-school-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Agendar Visita
          </button>
        </div>
      </div>
    </section>
  );
}
import { Star, Users, Award, BookOpen, Shield, Target } from "lucide-react";

export default function WhyOSESection() {
  const reasons = [
    {
      icon: Star,
      title: "100 Anos de Tradição",
      description: "Legado educacional consolidado desde 1924 em Sorocaba"
    },
    {
      icon: Users,
      title: "Corpo Docente Qualificado",
      description: "Professores especializados e comprometidos com a excelência"
    },
    {
      icon: Award,
      title: "Metodologia Inovadora",
      description: "Ensino contextualizado com as melhores práticas pedagógicas"
    },
    {
      icon: BookOpen,
      title: "Formação Integral",
      description: "Desenvolvimento acadêmico, social e emocional completo"
    },
    {
      icon: Shield,
      title: "Ambiente Seguro",
      description: "Estrutura adequada e ambiente acolhedor para aprendizagem"
    },
    {
      icon: Target,
      title: "Preparação para o Futuro",
      description: "Foco em competências essenciais para o século XXI"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-school-orange/5 to-school-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Por que Estudar na <span className="text-school-orange">OSE</span>?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubra os diferenciais que fazem da OSE a escolha ideal para a educação do seu filho
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Icon className="text-school-orange" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{reason.title}</h3>
                <p className="text-slate-600">{reason.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Venha Conhecer Nossa Escola
            </h3>
            <p className="text-slate-600 mb-6">
              Agende uma visita e conheça de perto nossa estrutura, metodologia e equipe pedagógica
            </p>
            <button 
              onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
              className="bg-school-orange hover:bg-school-orange/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              📅 Agendar Visita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
