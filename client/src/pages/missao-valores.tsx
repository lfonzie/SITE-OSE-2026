import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { updateSEO } from "@/lib/seo";
import { Heart, Target, Users, Award, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import UChatWidget from "@/components/uchat-widget";

export default function MissaoValores() {
  useEffect(() => {
    updateSEO({
      title: "Missão e Valores - Colégio OSE",
      description: "Conheça a missão, visão e valores que norteiam o Colégio OSE há mais de 100 anos, formando cidadãos éticos e responsáveis.",
      keywords: "missão, valores, visão, ética, educação, formação, cidadania"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Missão e <span className="text-school-orange">Valores</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Há mais de 100 anos, o Colégio OSE se dedica à formação integral de cidadãos éticos, responsáveis e preparados para os desafios do futuro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <Target className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Missão</h3>
              <p className="text-slate-600 leading-relaxed">
                Promover educação de excelência, formando cidadãos críticos, éticos e responsáveis, 
                preparados para contribuir positivamente com a sociedade.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <Globe className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Visão</h3>
              <p className="text-slate-600 leading-relaxed">
                Ser reconhecida como referência em educação, mantendo nossa tradição centenária 
                e inovando constantemente em metodologias pedagógicas.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <Heart className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Valores</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Ética e Integridade</li>
                <li>• Excelência Educacional</li>
                <li>• Respeito e Diversidade</li>
                <li>• Responsabilidade Social</li>
                <li>• Inovação e Tradição</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
