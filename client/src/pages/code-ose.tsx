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
import { Code, Rocket, Heart, Monitor, Gamepad2, Brain } from "lucide-react";
import UChatWidget from "@/components/uchat-widget";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import UChatWidget from "@/components/uchat-widget";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

export default function CodeOSE() {
  useEffect(() => {
    updateSEO({
      title: "Code OSE - Programação - Colégio OSE",
      description: "Programa de ensino de programação e tecnologia que prepara os alunos para o futuro digital.",
      keywords: "programação, código, tecnologia, coding, desenvolvimento, futuro digital"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              <span className="text-school-orange">Code</span> OSE
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Programa inovador de ensino de programação que desenvolve o pensamento computacional e prepara nossos alunos para o futuro digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">💻</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Programação</h3>
              <p className="text-slate-600">
                Aprendizado de linguagens como Python, JavaScript e Scratch através de projetos práticos.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Robótica</h3>
              <p className="text-slate-600">
                Desenvolvimento de projetos com robótica educacional e automação.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-school-orange text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Game Design</h3>
              <p className="text-slate-600">
                Criação de jogos digitais e aplicações interativas.
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
