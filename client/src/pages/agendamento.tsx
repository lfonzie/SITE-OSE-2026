
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
      keywords: "agendar visita, colégio ose, matrícula, conhecer escola, visita guiada, agendamento",
      additionalMeta: [
        {
          httpEquiv: "Content-Security-Policy",
          content: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://sdk.dfktv2.com https://www.uchat.com.au https://assets.calendly.com; frame-src 'self' https://www.youtube.com https://www.google.com https://calendly.com https://www.uchat.com.au https://sdk.dfktv2.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:;"
        }
      ]
    });

    // Limpar widgets existentes
    const existingWidgets = document.querySelectorAll('.calendly-inline-widget');
    existingWidgets.forEach(widget => {
      widget.innerHTML = '';
    });

    // Verificar se o script já existe
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!existingScript) {
      // Carregar script do Calendly
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        console.log('Calendly script loaded successfully');
        // Inicializar widget após o script carregar
        setTimeout(() => {
          if (window.Calendly) {
            window.Calendly.initInlineWidget({
              url: 'https://calendly.com/colegioose/apresentacao?hide_gdpr_banner=1&primary_color=ff8c00',
              parentElement: document.querySelector('.calendly-inline-widget'),
              prefill: {},
              utm: {}
            });
          }
        }, 100);
      };
      script.onerror = () => {
        console.error('Failed to load Calendly script');
      };
      document.head.appendChild(script);
    } else {
      // Se o script já existe, inicializar widget
      setTimeout(() => {
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/colegioose/apresentacao?hide_gdpr_banner=1&primary_color=ff8c00',
            parentElement: document.querySelector('.calendly-inline-widget'),
            prefill: {},
            utm: {}
          });
        }
      }, 100);
    }
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
    <div className="min-h-screen relative">
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-orange-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/25 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-tr from-emerald-400/15 via-cyan-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-bl from-rose-400/20 via-orange-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '8s'}}></div>
      </div>

      <Navigation />

      {/* Hero Section with Glass Effect */}
      <section className="relative pt-20 pb-16 backdrop-blur-lg bg-white/20 border-b border-white/20 shadow-sm text-slate-800 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
                Agende sua <span className="text-school-orange">Visita</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-slate-700">
                Conheça de perto nossa <strong>tradição</strong> e <strong>excelência</strong>
              </p>
              <p className="text-lg mb-8 text-slate-600">
                Venha conhecer o Colégio OSE! Agende uma visita personalizada e descubra por que 
                somos referência em educação há mais de 100 anos. Nossa equipe está pronta para 
                apresentar nossa estrutura, metodologia e proposta pedagógica.
              </p>
              
            </div>
            <div className="relative">
              <div className="w-full h-96 backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="text-school-orange mx-auto mb-4" size={80} />
                  <p className="text-slate-700 text-lg font-medium">Agende sua Visita</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios da Visita */}
      <section id="beneficios" className="py-16 backdrop-blur-md bg-white/25 border-b border-white/20 shadow-sm">
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
              <div key={index} className="backdrop-blur-md bg-white/40 border border-white/20 p-6 rounded-xl text-center hover:bg-white/50 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {beneficio.icone}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{beneficio.titulo}</h3>
                <p className="text-slate-600">{beneficio.descricao}</p>
              </div>
            ))}
          </div>

          {/* Informações da Visita */}
          <div className="backdrop-blur-md bg-school-orange/20 border border-school-orange/30 border-l-4 border-l-school-orange p-6 rounded-r-lg">
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
      <section id="agendamento" className="py-16 backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Escolha o Melhor <span className="text-school-orange">Horário</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Selecione o dia e horário que melhor se adequa à sua agenda
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-xl shadow-lg overflow-hidden">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/colegioose/apresentacao?hide_gdpr_banner=1&primary_color=ff8c00" 
              style={{ minWidth: '320px', height: '700px', position: 'relative' }}
            >
              {/* Loading placeholder */}
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-school-orange mx-auto mb-4"></div>
                  <p className="text-slate-600">Carregando calendário...</p>
                </div>
              </div>
            </div>
            
            {/* Fallback caso o widget não carregue */}
            <noscript>
              <div className="p-8 text-center">
                <p className="text-slate-600 mb-4">
                  O widget de agendamento requer JavaScript para funcionar.
                </p>
                <Button 
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
                >
                  Abrir Calendly em Nova Aba
                </Button>
              </div>
            </noscript>
            
            {/* Link direto como backup */}
            <div className="p-4 text-center border-t">
              <p className="text-sm text-slate-500 mb-2">
                Problemas com o agendamento online?
              </p>
              <Button 
                variant="outline"
                className="border-school-orange text-school-orange hover:bg-school-orange/10"
                onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
              >
                Abrir Agendamento Diretamente
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Informações de Contato Alternativas */}
      <section className="py-16 backdrop-blur-md bg-white/25 border-b border-white/20 shadow-sm">
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
            <div className="backdrop-blur-md bg-white/40 border border-white/20 p-8 rounded-xl text-center hover:bg-white/50 transition-all duration-300">
              <Phone className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Telefone</h3>
              <p className="text-slate-600 mb-4">
                Ligue para nossa central de atendimento
              </p>
              <Button 
                className="bg-school-orange hover:bg-school-orange/90 text-white"
                onClick={() => window.open('tel:+551521013800', '_self')}
              >
                (15) 2101-3800
              </Button>
            </div>

            <div className="backdrop-blur-md bg-white/40 border border-white/20 p-8 rounded-xl text-center hover:bg-white/50 transition-all duration-300">
              <MapPin className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Endereço</h3>
              <p className="text-slate-600 mb-4">
                Rua da Penha, 620 - Centro, Sorocaba - SP, 18010-002
              </p>
              <Button 
                variant="outline"
                className="border-school-orange text-school-orange hover:bg-school-orange/10"
                onClick={() => window.open('https://maps.app.goo.gl/XWhG1sB8yZokULtY8', '_blank')}
              >
                Ver no Mapa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 backdrop-blur-lg bg-gradient-to-r from-school-orange/80 to-school-brown/80 border-b border-white/20 shadow-sm text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Venha Conhecer a OSE
          </h3>
          <p className="text-xl mb-8">
            Há 100 anos formando cidadãos preparados para transformar o mundo
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange font-semibold px-8 py-3 hover:bg-white/90"
            onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Agendar Visita Agora
          </Button>
        </div>
      </section>

      <div className="backdrop-blur-md bg-white/25 border-b border-white/20 shadow-sm">
        <WhyOSESection />
      </div>
      <div className="backdrop-blur-lg bg-white/40 border-t border-white/30 shadow-lg">
        <ContactSection />
      </div>
    </div>
  );
}
