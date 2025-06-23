import { useQuery } from "@tanstack/react-query";
import { Baby, Book, GraduationCap, ArrowRight, Check } from "lucide-react";
import type { Program } from "@shared/schema";

const iconMap = {
  baby: Baby,
  book: Book,
  "graduation-cap": GraduationCap,
};

const colorMap = {
  blue: {
    bg: "bg-gradient-to-br from-orange-50 to-white",
    border: "border-orange-100",
    iconBg: "bg-school-orange",
    text: "text-school-orange"
  },
  green: {
    bg: "bg-gradient-to-br from-orange-50 to-white",
    border: "border-orange-100",
    iconBg: "bg-school-brown",
    text: "text-school-brown"
  },
  red: {
    bg: "bg-gradient-to-br from-orange-50 to-white",
    border: "border-orange-100",
    iconBg: "bg-school-orange",
    text: "text-school-orange"
  }
};

export default function ProgramsSection() {
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  if (isLoading) {
    return (
      <section id="programas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="programas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nossos <span className="text-school-orange">Programas</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Oferecemos uma educação completa desde a Educação Infantil até o Ensino Médio, 
            preparando nossos alunos para um futuro brilhante.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs?.map((program) => {
            const IconComponent = iconMap[program.icon as keyof typeof iconMap] || Book;
            const colors = colorMap[program.color as keyof typeof colorMap] || colorMap.blue;
            
            return (
              <div 
                key={program.id}
                className={`${colors.bg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border ${colors.border}`}
              >
                <div className={`${colors.iconBg} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <IconComponent size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{program.title}</h3>
                <p className="text-slate-600 mb-6">{program.description}</p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <Check className="text-school-brown mr-2" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`${colors.text} font-semibold hover:underline flex items-center`}>
                  Saiba Mais <ArrowRight className="ml-1" size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
