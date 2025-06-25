import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import LegacySection from "@/components/legacy-section";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import UChatWidget from "@/components/uchat-widget";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import UChatWidget from "@/components/uchat-widget";
import { motion } from "framer-motion";

export default function Legacy() {
  useEffect(() => {
    updateSEO({
      title: "Legado - Colégio OSE",
      description: "Conheça a rica história e o legado de 100 anos do Colégio OSE na educação brasileira.",
      keywords: "legado, história, tradição, 100 anos, colégio ose"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Nosso <span className="text-school-orange">Legado</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              100 anos de tradição, excelência e formação de gerações que transformam o mundo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <Award className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Tradição</h3>
              <p className="text-slate-600">100 anos formando gerações com valores sólidos e excelência educacional.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Excelência</h3>
              <p className="text-slate-600">Reconhecimento pela qualidade do ensino e formação integral dos alunos.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Futuro</h3>
              <p className="text-slate-600">Preparando líderes para os desafios do século XXI.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
