
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { newImages } from "@/lib/image-verification";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContatoPage() {
  const { isAuthenticated } = useAuth();

  const { 
    heroBackground,
    updateHeroBackground,
  } = usePageData('Contato', {
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal13,
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.8,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  useEffect(() => {
    updateSEO({
      title: "Contato - Colégio OSE | Entre em Contato Conosco",
      description: "Entre em contato com o Colégio OSE. Informações, telefone, endereço e formulário de contato. Estamos prontos para atendê-lo em Sorocaba/SP.",
      keywords: "contato colégio ose, telefone ose, endereço ose sorocaba, formulário contato escola"
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Admin Logout Button */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <LogoutButton />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden flex items-center">
        {/* Background Image */}
        {heroBackground && (
          <div className="absolute inset-0">
            {heroBackground.type === 'image' && heroBackground.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${heroBackground.imageUrl})`,
                  backgroundPosition: heroBackground.position || 'center',
                  backgroundSize: heroBackground.size || 'cover',
                  backgroundRepeat: heroBackground.repeat || 'no-repeat',
                  opacity: heroBackground.opacity || 1
                }}
              />
            )}
          </div>
        )}

        {/* Hero Background Manager */}
        {isAuthenticated && (
          <HeroBackgroundManager
            currentBackground={heroBackground}
            onBackgroundChange={updateHeroBackground}
            className="absolute inset-0"
          />
        )}

        {/* Overlay */}
        {heroBackground?.overlay && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: heroBackground.overlayColor || '#1e293b',
              opacity: heroBackground.overlayOpacity || 0.8
            }}
          ></div>
        )}

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Entre em <span className="text-school-orange">Contato</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Estamos aqui para <strong>esclarecer suas dúvidas</strong> e <strong>ajudar você</strong>
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl mx-auto">
              Nossa equipe está pronta para atendê-lo e fornecer todas as informações 
              necessárias sobre nossa proposta educacional centenária.
            </p>
          </div>
        </div>
      </section>

      {/* Informações Rápidas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-school-brown mb-2">Endereço</h3>
              <p className="text-school-brown">
                Rua da Penha, 620<br />
                Centro - Sorocaba, SP<br />
                CEP: 18010-002
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-school-brown text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-bold text-school-brown mb-2">Telefone</h3>
              <p className="text-school-brown">
                (15) 2101-3800
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-school-brown mb-2">E-mail</h3>
              <p className="text-school-brown">
                info@colegioose.com.br
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-school-brown mb-2">Horário</h3>
              <p className="text-school-brown">
                Segunda a Sexta<br />
                7h às 18h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato Principal */}
      <ContactSection />
    </div>
  );
}
