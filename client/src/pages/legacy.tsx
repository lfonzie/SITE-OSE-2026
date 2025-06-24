
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import LegacySection from "@/components/legacy-section";

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
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Nosso Legado
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto drop-shadow-xl">
            100 Anos de Tradição e Excelência Educacional
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-95 drop-shadow-xl">
            Desde 1924, a OSE representa mais que uma escola - somos guardiões de 
            uma tradição educacional que atravessa gerações.
          </p>
        </div>
      </section>

      <LegacySection />
      
    </div>
  );
}
