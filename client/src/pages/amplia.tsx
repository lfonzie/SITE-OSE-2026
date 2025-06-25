
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

export default function Amplia() {
  useEffect(() => {
    updateSEO({
      title: "Programa Amplia - Colégio OSE",
      description: "Conheça o programa Amplia do Colégio OSE, desenvolvido para ampliar horizontes e desenvolver habilidades complementares.",
      keywords: "programa amplia, atividades complementares, desenvolvimento, habilidades"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Programa <span className="text-school-orange">Amplia</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Desenvolvemos habilidades complementares através de atividades que ampliam os horizontes educacionais dos nossos alunos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/1105_1750717790206.jpg" alt="Programa Amplia" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Atividades Complementares</h3>
                <p className="text-slate-600">Desenvolvemos talentos através de programas especializados.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/1068_1750717790205.jpg" alt="Desenvolvimento" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Desenvolvimento Integral</h3>
                <p className="text-slate-600">Formação completa que vai além da sala de aula.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/1092_1750717790205.jpg" alt="Habilidades" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Novas Habilidades</h3>
                <p className="text-slate-600">Preparamos para os desafios do século XXI.</p>
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
