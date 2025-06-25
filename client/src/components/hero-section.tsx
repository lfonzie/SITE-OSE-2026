import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("sobre");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/0023_1750717790208.jpg" 
          alt="Colégio OSE - Campus e estudantes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-school-brown/90 via-school-orange/80 to-white/85">
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl animate-fade-in">
            <span className="block text-white">
              Tradição Secular de Ensino:
            </span>
            <span className="block text-white">
              Celebrando 100 Anos
            </span>
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={scrollToAbout}
              className="bg-school-orange hover:bg-school-orange/90 text-white px-8 py-3 text-lg font-semibold shadow-lg"
            >
              Conheça Nossa História
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/agendamento'}
              className="border-white text-white hover:bg-white hover:text-school-orange px-8 py-3 text-lg font-semibold"
            >
              Agende uma Visita
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={scrollToAbout} className="text-white/80 hover:text-white transition-colors">
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}