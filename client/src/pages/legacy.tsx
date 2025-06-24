import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import LegacySection from "@/components/legacy-section";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

export default function Legacy() {
  useEffect(() => {
    updateSEO({
      title: "Nosso Legado - 100 Anos de Tradição | a OSE",
      description: "Conheça a rica história da OSE: 100 anos de tradição educacional desde 1924. Valores que permanecem, excelência que se renova.",
      keywords: "história OSE, tradição educacional, 100 anos, legado, colégio tradicional sorocaba"
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Nosso <span className="text-school-orange">Legado</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Construindo <strong>futuro</strong> com base na <strong>tradição</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                Desde 1924, a OSE representa mais que uma escola - somos guardiões de 
                uma tradição educacional que atravessa gerações, moldando líderes e cidadãos exemplares.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-school-orange font-semibold px-8 py-3"
                  onClick={() => window.location.href = '/agendamento'}
                >
                  📅 Agende uma Visita
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white font-semibold px-8 py-3"
                  onClick={() => document.getElementById('legado')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Award className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">100 Anos de Tradição</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LegacySection />

      <WhyOSESection />
      
      <ContactSection />

    </div>
  );
}