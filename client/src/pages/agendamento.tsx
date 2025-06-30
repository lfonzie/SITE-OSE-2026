
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

    // Implementação simplificada do Calendly usando iframe direto
    const initializeCalendly = () => {
      const container = document.querySelector('.calendly-container');
      if (container) {
        // Limpar conteúdo anterior
        container.innerHTML = '';
        
        // Criar iframe diretamente
        const iframe = document.createElement('iframe');
        iframe.src = 'https://calendly.com/colegioose/apresentacao?embed_domain=colegioose.com.br&embed_type=Inline&hide_gdpr_banner=1&primary_color=ff8c00';
        iframe.style.cssText = 'width: 100%; height: 700px; border: none; border-radius: 12px;';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.title = 'Agendar Visita - Colégio OSE';
        
        // Adicionar iframe ao container
        container.appendChild(iframe);
        console.log('Calendly iframe loaded successfully');
      }
    };

    // Inicializar após um pequeno delay
    const timer = setTimeout(initializeCalendly, 500);
    
    return () => {
      clearTimeout(timer);
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

      {/* Hero Section */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #475569, #64748b)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1
        }}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: '#1e293b',
            opacity: 0.7
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/20 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Agende sua <span className="text-school-orange">Visita</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Conheça de Perto Nossa Tradição e Excelência
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Descubra por que somos <strong>referência</strong> há mais de <strong>100 anos</strong>
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              Venha conhecer o Colégio OSE! Agende uma visita personalizada e descubra nossa 
              estrutura moderna, metodologia inovadora e proposta pedagógica que forma cidadãos 
              preparados para transformar o mundo.
            </p>
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
              className="calendly-container" 
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
