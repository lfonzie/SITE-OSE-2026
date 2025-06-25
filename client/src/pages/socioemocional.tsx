import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Users, Target, Award, BookOpen, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

export default function Socioemocional() {
  useEffect(() => {
    updateSEO({
      title: "Programa Socioemocional - Colégio OSE",
      description: "Desenvolvimento das competências socioemocionais para formação integral dos estudantes.",
      keywords: "socioemocional, competências, desenvolvimento, inteligência emocional, formação integral"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Programa <span className="text-school-orange">Socioemocional</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Desenvolvemos competências socioemocionais essenciais para a formação integral dos nossos estudantes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">💭</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Autoconhecimento</h3>
              <p className="text-slate-600">
                Desenvolvimento da consciência sobre sentimentos, emoções e valores pessoais.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Habilidades Sociais</h3>
              <p className="text-slate-600">
                Construção de relacionamentos saudáveis e comunicação efetiva.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Tomada de Decisões</h3>
              <p className="text-slate-600">
                Desenvolvimento de responsabilidade e capacidade de fazer escolhas conscientes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
