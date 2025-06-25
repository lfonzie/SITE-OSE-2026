import { BookOpen, Heart, Users, Target, Lightbulb, Shield } from "lucide-react";

export default function PedagogicalProposalSection() {
  const proposals = [
    {
      icon: BookOpen,
      title: "Ensino Personalizado",
      description: "Metodologia que respeita o ritmo individual de cada aluno, promovendo aprendizado significativo e duradouro."
    },
    {
      icon: Heart,
      title: "Formação Humana",
      description: "Desenvolvimento de valores éticos, empáticos e sociais para formar cidadãos conscientes e responsáveis."
    },
    {
      icon: Users,
      title: "Aprendizagem Colaborativa",
      description: "Estímulo ao trabalho em equipe, cooperação e troca de experiências entre alunos e educadores."
    },
    {
      icon: Target,
      title: "Objetivos Claros",
      description: "Metas educacionais bem definidas com acompanhamento contínuo do desenvolvimento acadêmico."
    },
    {
      icon: Lightbulb,
      title: "Inovação Pedagógica",
      description: "Incorporação de tecnologias educacionais e metodologias ativas para potencializar o aprendizado."
    },
    {
      icon: Shield,
      title: "Ambiente Seguro",
      description: "Espaço protegido e acolhedor onde cada criança pode se expressar livremente e desenvolver sua autoestima."
    }
  ];

  return (
    <section id="proposta-pedagogica" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nossa <span className="text-school-orange">Proposta Pedagógica</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            A OSE desenvolve uma metodologia única que combina tradição educacional com inovação pedagógica, 
            preparando alunos para os desafios do futuro
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {proposals.map((proposal, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <proposal.icon className="text-school-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{proposal.title}</h3>
              <p className="text-slate-600 leading-relaxed">{proposal.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Educação Integral para o Século XXI
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Nossa proposta pedagógica fundamenta-se em <strong>100 anos de experiência educacional</strong>, 
              combinando tradição e inovação para formar cidadãos preparados para um mundo em constante transformação.
            </p>
            <p className="text-lg text-slate-600">
              Acreditamos que a educação vai além da transmissão de conhecimentos: ela deve formar pessoas 
              íntegras, críticas e capazes de transformar positivamente a sociedade em que vivem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}