
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Phone, MapPin, Users, CheckCircle } from "lucide-react";

export default function Agendamento() {
  useEffect(() => {
    updateSEO({
      title: "Agende sua Visita | Colégio OSE",
      description: "Agende uma visita ao Colégio OSE e conheça nossa estrutura, metodologia e proposta pedagógica. Venha descobrir por que somos referência em educação há 100 anos.",
      keywords: "agendar visita, colégio ose, matrícula, conhecer escola, visita guiada, agendamento"
    });

    // Carregar script do Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup do script
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const beneficios = [
    {
      titulo: "Conheça Nossa Estrutura",
      descricao: "Visite nossas instalações modernas e bem equipadas",
      icone: <MapPin className="text-school-orange" size={24} />
    },
    {
      titulo: "Metodologia Exclusiva",
      descricao: "Entenda nossa proposta pedagógica e diferenciais",
      icone: <Users className="text-school-orange" size={24} />
    },
    {
      titulo: "Tire Suas Dúvidas",
      descricao: "Converse com nossa equipe pedagógica especializada",
      icone: <Phone className="text-school-orange" size={24} />
    },
    {
      titulo: "Processo de Matrícula",
      descricao: "Saiba como matricular seu filho na OSE",
      icone: <CheckCircle className="text-school-orange" size={24} />
    }
  ];

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
                Agende sua <span className="text-school-orange">Visita</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Conheça de perto nossa <strong>tradição</strong> e <strong>excelência</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                Venha conhecer o Colégio OSE! Agende uma visita personalizada e descubra por que 
                somos referência em educação há mais de 100 anos. Nossa equipe está pronta para 
                apresentar nossa estrutura, metodologia e proposta pedagógica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-school-orange font-semibold px-8 py-3"
                  onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  📅 Agendar Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white font-semibold px-8 py-3"
                  onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">Agende sua Visita</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios da Visita */}
      <section id="beneficios" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Por que <span className="text-school-orange">Visitar</span> a OSE?
            </h2>
            <p className="text-xl text-slate-600">
              Descubra todos os diferenciais que fazem da OSE a melhor escolha
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {beneficio.icone}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{beneficio.titulo}</h3>
                <p className="text-slate-600">{beneficio.descricao}</p>
              </div>
            ))}
          </div>

          {/* Informações da Visita */}
          <div className="bg-school-orange/10 border-l-4 border-school-orange p-6 rounded-r-lg">
            <div className="flex items-start">
              <Clock className="text-school-orange mt-1 mr-3 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Informações da Visita</h4>
                <p className="text-slate-700 mb-2">
                  <strong>Duração:</strong> Aproximadamente 1 hora
                </p>
                <p className="text-slate-700 mb-2">
                  <strong>Horários:</strong> Segunda a sexta, das 8h às 17h
                </p>
                <p className="text-slate-700">
                  <strong>Inclui:</strong> Tour pelas instalações, apresentação da proposta pedagógica e esclarecimento de dúvidas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Widget do Calendly */}
      <section id="agendamento" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Escolha o Melhor <span className="text-school-orange">Horário</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Selecione o dia e horário que melhor se adequa à sua agenda
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/colegioose/apresentacao?hide_gdpr_banner=1&primary_color=ffa500" 
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </div>
      </section>

      {/* Informações de Contato Alternativas */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Outras Formas de <span className="text-school-orange">Contato</span>
            </h2>
            <p className="text-xl text-slate-600">
              Prefere falar conosco diretamente? Utilize um dos canais abaixo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <Phone className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Telefone</h3>
              <p className="text-slate-600 mb-4">
                Ligue para nossa central de atendimento
              </p>
              <Button 
                className="bg-school-orange hover:bg-school-orange/90 text-white"
                onClick={() => window.open('tel:+551532332626', '_self')}
              >
                (15) 3233-2626
              </Button>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <MapPin className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Endereço</h3>
              <p className="text-slate-600 mb-4">
                R. Sorocaba, 423 - Centro, Sorocaba - SP
              </p>
              <Button 
                variant="outline"
                className="border-school-orange text-school-orange hover:bg-school-orange/10"
                onClick={() => window.open('https://maps.google.com/?q=R.+Sorocaba,+423+-+Centro,+Sorocaba+-+SP', '_blank')}
              >
                Ver no Mapa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Venha Conhecer a OSE
          </h3>
          <p className="text-xl mb-8">
            Há 100 anos formando cidadãos preparados para transformar o mundo
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange font-semibold px-8 py-3"
            onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Agendar Visita Agora
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
