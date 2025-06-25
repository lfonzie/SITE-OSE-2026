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
import { Heart, Play, Users, BookOpen, Lightbulb, Target, Palette } from "lucide-react";
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

// Importando imagens para Educação Infantil
const img1 = "/images/0354_1750717790205.jpg";
export default function EducacaoInfantil() {
  useEffect(() => {
    updateSEO({
      title: "Educação Infantil - Colégio OSE",
      description: "Educação infantil de qualidade para crianças de 2 a 5 anos, com metodologia lúdica e desenvolvimento integral.",
      keywords: "educação infantil, berçário, maternal, pré-escola, desenvolvimento infantil"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Educação <span className="text-school-orange">Infantil</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Oferecemos um ambiente acolhedor e estimulante para o desenvolvimento integral das crianças de 2 a 5 anos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0312_1750717790204.jpg" alt="Ambiente Acolhedor" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Ambiente Acolhedor</h3>
                <p className="text-slate-600">Espaços seguros e adaptados para o desenvolvimento infantil.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0700_1750717790204.jpg" alt="Metodologia Lúdica" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Metodologia Lúdica</h3>
                <p className="text-slate-600">Aprendizado através de brincadeiras e atividades divertidas.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0905_1750717790206.jpg" alt="Desenvolvimento Integral" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Desenvolvimento Integral</h3>
                <p className="text-slate-600">Foco no desenvolvimento cognitivo, motor e socioemocional.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/1068_1750717790205.jpg" alt="Cuidado Especializado" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Cuidado Especializado</h3>
                <p className="text-slate-600">Profissionais qualificados para cada faixa etária.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/1092_1750717790205.jpg" alt="Atividades Diversas" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Atividades Diversas</h3>
                <p className="text-slate-600">Arte, música, movimento e muito mais.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Acompanhamento Familiar</h3>
                <p className="text-slate-600">Comunicação constante com as famílias sobre o desenvolvimento das crianças.</p>
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
