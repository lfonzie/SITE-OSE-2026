import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import UChatWidget from "@/components/uchat-widget";
import { updateSEO } from "@/lib/seo";

export default function PortalPais() {
  useEffect(() => {
    updateSEO({
      title: "Portal dos Pais - Colégio OSE",
      description: "Acompanhe o desenvolvimento acadêmico de seu filho, comunicações da escola e informações financeiras.",
      keywords: "portal pais, acompanhamento, comunicação escolar, financeiro"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Portal dos <span className="text-school-orange">Pais</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Acompanhe de perto o desenvolvimento de seu filho e mantenha-se conectado com a vida escolar.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Em Desenvolvimento</h2>
            <p className="text-slate-600 mb-6">
              O Portal dos Pais está sendo desenvolvido e estará disponível em breve com todas as funcionalidades.
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