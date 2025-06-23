import { Play, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("sobre");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative bg-gradient-to-br from-school-blue via-blue-600 to-school-green min-h-screen flex items-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-green-900/90"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjAuMSI+CiAgICA8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+CiAgPC9nPgo8L3N2Zz4=")`,
            backgroundRepeat: "repeat"
          }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Tradição Secular de Ensino:{" "}
            <span className="text-yellow-300">Celebrando 100 Anos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            A OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem: Tradição e uma rica história. Com uma equipe de professores experientes e aliados à nova plataforma Amplia, nosso compromisso é com a excelência no ensino e no desenvolvimento pessoal e emocional de cada aluno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold text-lg px-8 py-4 transform hover:scale-105 transition-all"
            >
              <Play className="mr-2" />
              Conheça Nossa Escola
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-school-blue font-bold text-lg px-8 py-4"
            >
              <Calendar className="mr-2" />
              Agendar Visita
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80 hover:text-white transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}
