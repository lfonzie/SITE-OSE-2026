import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Brain, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

// Importando imagens para Fundamental II
const img1 = "/images/0023_1750717790208.jpg";
export default function Fundamental2() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Fundamental II - Colégio OSE",
      description: "Ensino fundamental II (6º ao 9º ano) com aprofundamento das disciplinas e preparação para o ensino médio.",
      keywords: "ensino fundamental 2, adolescência, preparação ensino médio, desenvolvimento acadêmico"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Ensino Fundamental <span className="text-school-orange">II</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Do 6º ao 9º ano, aprofundamos o conhecimento e preparamos nossos alunos para os desafios do ensino médio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0378_1750717790208.jpg" alt="Aprofundamento" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Aprofundamento</h3>
                <p className="text-slate-600">Desenvolvimento de conceitos mais complexos em todas as disciplinas.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/1285_1750717790208.jpg" alt="Projetos" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Projetos Interdisciplinares</h3>
                <p className="text-slate-600">Integração de conhecimentos através de projetos práticos.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0023_1750719589611.jpg" alt="Preparação" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Preparação</h3>
                <p className="text-slate-600">Base sólida para o ensino médio e vestibulares.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
