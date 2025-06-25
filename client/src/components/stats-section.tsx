
import { Users, Calendar, Trophy, BookOpen } from "lucide-react";
import { AnimatedCounter } from "@/components/animated/AnimatedCounter";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

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
              <AnimatedCard key={index} delay={index * 0.1} direction="up">
                <div className="text-center">
                  <AnimatedIcon 
                    className={`${stat.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}
                    delay={index * 0.15}
                    bounce={true}
                  >
                    <IconComponent className={`${stat.color}`} size={32} />
                  </AnimatedIcon>
                  <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                    <AnimatedCounter 
                      to={parseInt(stat.number.replace(/[^0-9]/g, '')) || 0} 
                      suffix={stat.number.replace(/[0-9]/g, '')}
                      duration={2}
                    />
                  </div>
                  <div className="text-lg font-semibold text-slate-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-slate-500">
                    {stat.description}
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
