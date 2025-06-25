


export default function WhyOSESection() {
  const reasons = [
    {
      image: "/images/0354_1750717790205.jpg",
      title: "100 Anos de Tradição",
      description: "A OSE possui um diferencial que poucos colégios no Brasil têm: tradição secular e rica história educacional."
    },
    {
      image: "/images/0312_1750717790204.jpg",
      title: "Formação Integral",
      description: "Educamos com base em valores éticos sólidos, preparando gerações para o sucesso e a cidadania."
    },
    {
      image: "/images/0700_1750717790204.jpg",
      title: "Ambiente Acolhedor",
      description: "Criamos espaços seguros onde cada aluno pode crescer individualmente e socialmente."
    },
    {
      image: "/images/0905_1750717790206.jpg",
      title: "Excelência Reconhecida",
      description: "98% de satisfação das famílias comprova nosso compromisso com a qualidade educacional."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Por que escolher <span className="text-school-orange">a OSE</span>?
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-slate-600">
            Conheça os diferenciais que fazem da OSE a escolha ideal para a educação do seu filho.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={reason.image} 
                  alt={reason.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  {reason.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 md:p-12 text-center shadow-lg border border-gray-100">
          <h3 className="text-3xl font-bold mb-4 text-slate-800">
            Venha conhecer a OSE
          </h3>
          <p className="text-xl mb-6 text-slate-600">
            Agende uma visita e descubra por que somos referência em educação há mais de 100 anos
          </p>
          <button
            className="bg-school-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-school-orange/90 transition-colors shadow-lg"
            onClick={() => window.location.href = '/agendamento'}
          >
            Agendar Visita
          </button>
        </div>
      </div>
    </section>
  );
}