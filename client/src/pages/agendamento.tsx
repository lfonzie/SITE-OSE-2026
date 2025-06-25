
import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import UChatWidget from "@/components/uchat-widget";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Phone, MapPin, Users, CheckCircle } from "lucide-react";

export default function Agendamento() {
  useEffect(() => {
    updateSEO({
      title: "Agendar Visita - Colégio OSE",
      description: "Agende uma visita ao Colégio OSE e conheça nossa estrutura, metodologia e tradição de 100 anos em educação.",
      keywords: "agendar visita, conhecer escola, colégio ose, tour escolar"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Agende sua <span className="text-school-orange">Visita</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Venha conhecer o Colégio OSE pessoalmente e descobrir por que somos referência em educação há mais de 100 anos.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <CheckCircle className="text-school-orange mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Entre em contato conosco
              </h2>
              <p className="text-slate-600">
                Nossa equipe está pronta para recebê-los e apresentar toda nossa estrutura
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-school-orange" size={24} />
                  <div>
                    <p className="font-semibold text-slate-800">(11) 3208-3222</p>
                    <p className="text-slate-600">Secretaria</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="text-school-orange" size={24} />
                  <div>
                    <p className="font-semibold text-slate-800">Rua Marcos Arruda, 729</p>
                    <p className="text-slate-600">Belenzinho, São Paulo - SP</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="text-school-orange" size={24} />
                  <div>
                    <p className="font-semibold text-slate-800">Segunda a Sexta</p>
                    <p className="text-slate-600">7h às 18h</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => window.open('tel:+551132083222', '_self')}
                >
                  <Phone className="mr-2" size={20} />
                  Ligar Agora
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-school-orange text-school-orange hover:bg-school-orange hover:text-white"
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                >
                  WhatsApp
                </Button>
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
