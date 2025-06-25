import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import UChatWidget from "@/components/uchat-widget";
import WhyOSESection from "@/components/why-ose-section";
import UChatWidget from "@/components/uchat-widget";
import ContactSection from "@/components/contact-section";
import UChatWidget from "@/components/uchat-widget";
import { updateSEO } from "@/lib/seo";
import UChatWidget from "@/components/uchat-widget";
import { Button } from "@/components/ui/button";
import UChatWidget from "@/components/uchat-widget";
import { GraduationCap, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import UChatWidget from "@/components/uchat-widget";
import { OptimizedImage } from "@/components/ui/optimized-image";
import UChatWidget from "@/components/uchat-widget";
import { motion } from "framer-motion";
import UChatWidget from "@/components/uchat-widget";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import UChatWidget from "@/components/uchat-widget";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import UChatWidget from "@/components/uchat-widget";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import UChatWidget from "@/components/uchat-widget";

// Usando imagens da pasta public/images
const img1 = "/images/0312_1750719589609.jpg";
export default function EnsinoMedio() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Médio - Colégio OSE",
      description: "Preparação completa para vestibular e ENEM com excelência acadêmica e formação integral.",
      keywords: "ensino médio, vestibular, enem, preparação, excelência acadêmica"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Ensino <span className="text-school-orange">Médio</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Preparação completa para vestibular e ENEM com metodologia focada na excelência acadêmica e formação integral.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0354_1750719589610.jpg" alt="Preparação Vestibular" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Preparação para Vestibular</h3>
                <p className="text-slate-600">Metodologia especializada para os principais vestibulares do país.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0491_1750719589611.jpg" alt="ENEM" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Foco no ENEM</h3>
                <p className="text-slate-600">Preparação específica para o Exame Nacional do Ensino Médio.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0541_1750719589611.jpg" alt="Orientação Profissional" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Orientação Profissional</h3>
                <p className="text-slate-600">Apoio na escolha da carreira e universidade ideal.</p>
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
