import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToNext = () => {
    const element = document.getElementById("stats");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src="/attached_assets/1295_1750717790207.jpg" 
          alt="Colégio OSE - Campus e estudantes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 via-slate-700/80 to-slate-600/85">
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            <span className="block">Tradição Secular de Ensino:</span>
            <span className="block text-white">Celebrando 100 Anos</span>
          </h1>
          <h2 className="text-lg md:text-xl text-white/95 mb-4 max-w-4xl mx-auto font-medium drop-shadow-xl">
            a OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem:
          </h2>
          <h3 className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-xl">
            Tradição e uma rica história.
          </h3>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-xl">
            Educando com excelência há mais de 100 anos em Sorocaba. Com base em valores éticos e formação integral, preparamos gerações para o sucesso e a cidadania.
          </p>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80 hover:text-white transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}