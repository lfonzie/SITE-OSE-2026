import { CheckCircle, Heart, Award, Users } from "lucide-react";

export default function WhyOSESection() {
  const reasons = [
    {
      icon: Award,
      title: "100 Anos de Tradição",
      description: "a OSE possui um diferencial que poucos colégios no Brasil têm: tradição secular e rica história educacional."
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
    <section id="why-ose" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Por que estudar <span className="text-school-orange">na OSE?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Conheça os diferenciais que fazem da OSE a escolha ideal para a educação do seu filho
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <reason.icon className="text-school-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 relative rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/attached_assets/1092_1750717790205.jpg')"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-school-orange/90 to-school-brown/90" />
          </div>
          <div className="relative p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Venha conhecer a OSE
            </h3>
            <p className="text-xl mb-6 opacity-95">
              Agende uma visita e descubra por que somos referência em educação há mais de 100 anos
            </p>
            <button 
              className="bg-white text-school-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Agendar Visita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}