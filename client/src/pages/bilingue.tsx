import { Globe, Users, BookOpen, Award, Target, Brain } from 'lucide-react';
import UChatWidget from "@/components/uchat-widget";
import { Button } from '@/components/ui/button';
import UChatWidget from "@/components/uchat-widget";
import Navigation from '@/components/navigation';
import UChatWidget from "@/components/uchat-widget";
import WhyOSESection from '@/components/why-ose-section';
import UChatWidget from "@/components/uchat-widget";
import ContactSection from '@/components/contact-section';
import UChatWidget from "@/components/uchat-widget";
import { OptimizedImage } from '@/components/ui/optimized-image';
import UChatWidget from "@/components/uchat-widget";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import UChatWidget from "@/components/uchat-widget";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import UChatWidget from "@/components/uchat-widget";

export default function Bilingue() {
  useEffect(() => {
    updateSEO({
      title: "Programa Bilíngue - Colégio OSE",
      description: "Programa de educação bilíngue português-inglês que prepara os alunos para um mundo globalizado.",
      keywords: "programa bilíngue, inglês, educação internacional, fluência, globalização"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Programa <span className="text-school-orange">Bilíngue</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Desenvolvemos a fluência em inglês através de metodologia imersiva, preparando nossos alunos para um mundo globalizado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0312_1750717790204.jpg" alt="Ensino Bilíngue" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Metodologia Imersiva</h3>
                <p className="text-slate-600">Aprendizado natural através de imersão total no idioma.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0354_1750717790205.jpg" alt="Fluência" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Fluência Garantida</h3>
                <p className="text-slate-600">Desenvolvimento completo das habilidades linguísticas.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0581_1750717790206.jpg" alt="Certificação" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Certificação Internacional</h3>
                <p className="text-slate-600">Preparação para exames de proficiência reconhecidos.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <img src="/images/0700_1750717790204.jpg" alt="Futuro Global" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Preparação Global</h3>
                <p className="text-slate-600">Formação para oportunidades internacionais.</p>
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
