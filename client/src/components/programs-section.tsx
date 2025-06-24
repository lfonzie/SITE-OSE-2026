import { useQuery } from "@tanstack/react-query";
import { Baby, Book, GraduationCap, ArrowRight, Check, Heart, Brain } from "lucide-react";
import type { Program } from "@shared/schema";

const iconMap = {
  baby: Baby,
  book: Book,
  "graduation-cap": GraduationCap,
  heart: Heart,
  brain: Brain,
};

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-600",
    text: "text-blue-600"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-600",
    text: "text-green-600"
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-600",
    text: "text-red-600"
  }
};

const getImageForProgram = (title: string) => {
  const imageMap: Record<string, string> = {
    'Educação Infantil': '/images/0354_1750717790205.jpg',
    'Ensino Fundamental I': '/images/0934_1750717790206.jpg',
    'Ensino Fundamental II': '/images/0023_1750717790208.jpg',
    'Ensino Médio': '/images/0312_1750719589609.jpg'
  };
  return imageMap[title] || '/images/0354_1750717790205.jpg';
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
    <section id="programas" className="py-20 bg-slate-50">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs?.map((program) => {
            const IconComponent = iconMap[program.icon as keyof typeof iconMap] || Book;
            const colors = colorMap[program.color as keyof typeof colorMap] || colorMap.blue;

            return (
              <div 
                key={program.id}
                className={`${colors.bg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border ${colors.border}`}
              >
                <div className="h-48 mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={getImageForProgram(program.title)}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
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
                <button 
                  className={`${colors.text} font-semibold hover:underline flex items-center`}
                  onClick={() => {
                    const pageMap: Record<string, string> = {
                      'Educação Infantil': '/educacao-infantil',
                      'Ensino Fundamental I': '/fundamental-1',
                      'Ensino Fundamental II': '/fundamental-2',
                      'Ensino Médio': '/ensino-medio'
                    };
                    const targetPage = pageMap[program.title];
                    if (targetPage) {
                      window.location.href = targetPage;
                    }
                  }}
                >
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