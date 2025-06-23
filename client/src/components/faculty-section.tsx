import { useQuery } from "@tanstack/react-query";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Faculty } from "@shared/schema";

const colorMap = [
  "from-blue-50 to-white",
  "from-green-50 to-white", 
  "from-purple-50 to-white",
  "from-yellow-50 to-white"
];

const textColorMap = [
  "text-school-orange",
  "text-school-brown",
  "text-school-orange",
  "text-school-brown"
];

export default function FacultySection() {
  const { data: faculty, isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  if (isLoading) {
    return (
      <section id="professores" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="professores" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nossos <span className="text-school-orange">Professores</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Profissionais qualificados e apaixonados pela educação, dedicados ao sucesso de cada aluno
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty?.map((member, index) => (
            <div 
              key={member.id}
              className={`bg-gradient-to-br ${colorMap[index % colorMap.length]} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2`}
            >
              <img 
                src={member.image}
                alt={`${member.name} - ${member.position}`}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg" 
              />
              <h3 className="text-xl font-bold text-slate-800 mb-1 text-center">{member.name}</h3>
              <p className={`${textColorMap[index % textColorMap.length]} font-semibold mb-2 text-center`}>
                {member.position}
              </p>
              <p className="text-slate-600 text-sm text-center mb-4">{member.description}</p>
              {/* Contato removido conforme solicitação */}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-school-orange hover:bg-school-orange/90 text-white">
            Conheça Todo Nosso Corpo Docente
          </Button>
        </div>
      </div>
    </section>
  );
}
