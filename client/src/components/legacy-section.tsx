import { Calendar, Award, Users, BookOpen } from "lucide-react";

export default function LegacySection() {
  return (
    <section id="legacy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Conheça Nosso <span className="text-school-orange">Legado</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            A OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem: 
            <strong> Tradição e uma rica história</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png" 
              alt="Colégio OSE - 100 Anos"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-800">
              Tradição Secular de Ensino
            </h3>
            <div className="space-y-4 text-slate-600">
              <p className="text-lg">
                <strong>Desde 1924</strong>, nossa instituição representa mais que uma escola - 
                somos guardiões de uma tradição educacional que atravessa gerações.
              </p>
              <p>
                Educamos com base em <strong>valores éticos sólidos</strong> e formação integral, 
                preparando cada aluno não apenas academicamente, mas para a vida e a cidadania.
              </p>
              <p>
                Nossa <strong>rica história</strong> é construída dia após dia por educadores 
                dedicados, famílias comprometidas e alunos que levam nossos valores para o mundo.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Nossa Jornada Centenária
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">1924</h4>
              <p className="text-slate-600">Fundação do Colégio OSE</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">1950-1980</h4>
              <p className="text-slate-600">Consolidação e expansão</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">1990-2010</h4>
              <p className="text-slate-600">Modernização pedagógica</p>
            </div>
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">2024</h4>
              <p className="text-slate-600">100 Anos de excelência</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-school-orange to-school-brown rounded-xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">
            Valores que Permanecem
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-3">Tradição</h4>
              <p>100 anos de história construindo o futuro da educação</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Excelência</h4>
              <p>Compromisso com a qualidade em cada aspecto educacional</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Formação Integral</h4>
              <p>Preparando cidadãos críticos e éticos para a sociedade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}