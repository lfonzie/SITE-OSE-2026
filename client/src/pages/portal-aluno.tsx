import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import UChatWidget from "@/components/uchat-widget";
import { updateSEO } from "@/lib/seo";

export default function PortalAluno() {
  useEffect(() => {
    updateSEO({
      title: "Portal do Aluno - Colégio OSE",
      description: "Acesse suas notas, atividades, horários e materiais de estudo no portal do aluno.",
      keywords: "portal aluno, notas, atividades, horários, material didático"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Portal do <span className="text-school-orange">Aluno</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Acompanhe seu desempenho acadêmico, acesse materiais de estudo e mantenha-se atualizado com as atividades escolares.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Em Desenvolvimento</h2>
            <p className="text-slate-600 mb-6">
              O Portal do Aluno está sendo desenvolvido e estará disponível em breve com todas as funcionalidades.
            </p>
            <div className="text-school-orange font-medium">
              Em caso de dúvidas, entre em contato com a secretaria.
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <UChatWidget />
    </div>
  );
}