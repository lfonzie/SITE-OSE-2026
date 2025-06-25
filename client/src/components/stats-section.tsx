
import { Users, Calendar, Trophy, BookOpen } from "lucide-react";

const stats = [
  { 
    number: "100", 
    label: "Anos de Tradição", 
    description: "Desde 1924",
    icon: Calendar,
    bgColor: "bg-school-orange/10",
    color: "text-school-orange"
  },
  { 
    number: "700", 
    label: "Alunos", 
    description: "Do Infantil ao Médio",
    icon: Users,
    bgColor: "bg-school-brown/10", 
    color: "text-school-brown"
  },
  { 
    number: "98%", 
    label: "Aprovação Vestibular", 
    description: "Índice de sucesso",
    icon: Trophy,
    bgColor: "bg-school-orange/10",
    color: "text-school-orange"
  },
  { 
    number: "50+", 
    label: "Professores", 
    description: "Especializados",
    icon: BookOpen,
    bgColor: "bg-school-brown/10",
    color: "text-school-brown"
  }
];

export default function StatsSection() {
  return (
    <section id="stats" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${stat.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`${stat.color}`} size={32} />
                </div>
                <h3 className="text-4xl font-bold text-slate-800">{stat.number}</h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
