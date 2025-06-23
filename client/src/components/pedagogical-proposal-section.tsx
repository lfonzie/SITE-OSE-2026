import { Brain, Users, BookOpen, Target } from "lucide-react";

export default function PedagogicalProposalSection() {
  const pillars = [
    {
      icon: Brain,
      title: "Desenvolvimento Socioemocional",
      description: "Laboratório de Inteligência de Vida que cultiva inteligência emocional, empatia e resiliência."
    },
    {
      icon: Target,
      title: "Metodologia Ativa",
      description: "Combinamos tradição e inovação, incentivando o protagonismo do aluno em seu aprendizado."
    },
    {
      icon: BookOpen,
      title: "Formação Integral",
      description: "Currículo que desenvolve não apenas conhecimento acadêmico, mas também valores éticos e cidadania."
    },
    {
      icon: Users,
      title: "Pedagogia Colaborativa",
      description: "Ambiente que promove colaboração, pensamento crítico e preparação para os desafios contemporâneos."
    }
  ];

  return (
    <section id="pedagogical-proposal" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nossa <span className="text-school-orange">Proposta Pedagógica</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Uma educação que combina tradição centenária com metodologias modernas, 
            focada no desenvolvimento integral de cada aluno
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="mb-6">
              <img 
                src="/attached_assets/0354_1750717790205.jpg" 
                alt="Professora da OSE auxiliando aluno - metodologia personalizada"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Educação que Transforma
            </h3>
            <div className="space-y-4 text-slate-600">
              <p className="text-lg">
                Nossa proposta pedagógica baseia-se em <strong>100 anos de experiência educacional</strong>, 
                sempre adaptando-se às necessidades contemporâneas sem perder nossos valores fundamentais.
              </p>
              <p>
                Acreditamos que cada aluno é único e merece uma educação que respeite seu ritmo de 
                aprendizagem, estimule sua curiosidade natural e desenvolva seu potencial máximo.
              </p>
              <p>
                <strong>a OSE</strong> prepara seus alunos não apenas para provas e vestibulares, 
                mas para a vida, formando cidadãos críticos, éticos e preparados para os desafios do futuro.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-lg">
                <div className="bg-school-orange text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <pillar.icon size={20} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{pillar.title}</h4>
                <p className="text-sm text-slate-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Diferenciais */}
        <div className="bg-slate-50 rounded-xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Nossos Diferenciais Pedagógicos
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">EN</span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Ensino Bilíngue</h4>
              <p className="text-slate-600">
                Aulas diárias de inglês com metodologia flexível e opcional, 
                proporcionando introdução natural à língua estrangeira.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Inteligência Emocional</h4>
              <p className="text-slate-600">
                Laboratório de Inteligência de Vida focado no desenvolvimento 
                socioemocional e construção de habilidades para a vida.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Tecnologia Educacional</h4>
              <p className="text-slate-600">
                Programação e recursos tecnológicos integrados ao currículo, 
                preparando alunos para o mundo digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}