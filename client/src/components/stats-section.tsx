import { Users, Calendar, Trophy, BookOpen } from "lucide-react";

const stats = [
  { number: "100", label: "Anos de Tradição", description: "Desde 1924" },
  { number: "700", label: "Alunos", description: "Do Infantil ao Médio" },
  { number: "95%", label: "Aprovação Vestibular", description: "Índice de sucesso" },
  { number: "40+", label: "Professores", description: "Especializados" }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${stat.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`text-3xl ${stat.color}`} size={32} />
                </div>
                <h3 className="text-4xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}