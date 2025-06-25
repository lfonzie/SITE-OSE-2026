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
import { Heart, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
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
const img1 = "/images/0934_1750717790206.jpg";
export default function Fundamental1() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Fundamental I - Colégio OSE",
      description: "Ensino fundamental I (1º ao 5º ano) com metodologia lúdica e desenvolvimento das competências básicas.",
      keywords: "ensino fundamental 1, alfabetização, matemática básica, desenvolvimento infantil"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Ensino Fundamental <span className="text-school-orange">I</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Do 1º ao 5º ano, desenvolvemos as competências fundamentais através de metodologia lúdica e personalizada.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/1105_1750717790206.jpg" alt="Alfabetização" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Alfabetização</h3>
                <p className="text-slate-600">Processo de alfabetização com metodologia comprovada.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0581_1750717790206.jpg" alt="Matemática" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Matemática Lúdica</h3>
                <p className="text-slate-600">Desenvolvimento do raciocínio lógico através de jogos.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0491_1750717790207.jpg" alt="Ciências" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Ciências Naturais</h3>
                <p className="text-slate-600">Descoberta do mundo através de experimentos.</p>
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
