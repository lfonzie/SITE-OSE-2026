import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Music, Dumbbell, Globe, TreePine, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

export default function Integral() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Integral - Colégio OSE",
      description: "Programa de ensino integral com atividades complementares e acompanhamento pedagógico especializado.",
      keywords: "ensino integral, período integral, atividades complementares, acompanhamento pedagógico"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Ensino <span className="text-school-orange">Integral</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Programa completo de ensino integral com atividades diversificadas e acompanhamento pedagógico especializado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Reforço Escolar</h3>
              <p className="text-slate-600">Acompanhamento pedagógico para consolidação do aprendizado.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Atividades Culturais</h3>
              <p className="text-slate-600">Arte, música, teatro e outras expressões culturais.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">⚽</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Esportes</h3>
              <p className="text-slate-600">Atividades esportivas para desenvolvimento físico e social.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
