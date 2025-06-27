import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Home, Camera, GraduationCap, School, Users, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { newImages } from "@/lib/image-verification";
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

export default function Links() {
  const { isAuthenticated } = useAuth();

  const { 
    heroImage, 
    heroBackground,
    updateHeroBackground
  } = usePageData('Links', {
    heroImage: newImages.horizontal30,
    images: [newImages.horizontal30],
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal30,
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.7,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  useEffect(() => {
    updateSEO({
      title: "Links Úteis - Colégio OSE | Acesso Rápido aos Portais",
      description: "Acesse rapidamente todos os portais e serviços digitais do Colégio OSE. Portal do Aluno, Portal dos Pais, AgendaEdu, Plurall e muito mais.",
      keywords: "links úteis, portais, colégio ose, portal aluno, portal pais, agendaedu, plurall, serviços digitais"
    });
  }, []);

  const quickLinks = [
    {
      title: "Site Oficial",
      description: "Portal principal do Colégio OSE",
      icon: Home,
      url: "https://colegioose.com.br",
      color: "bg-blue-600"
    },
    {
      title: "Álbum de Fotos",
      description: "Galeria de momentos especiais da OSE",
      icon: Camera,
      url: "/albumose",
      color: "bg-pink-600"
    },
    {
      title: "Educação Infantil",
      description: "Informações sobre nosso segmento infantil",
      icon: Sparkles,
      url: "/educacao-infantil",
      color: "bg-purple-600"
    },
    {
      title: "Fundamental I",
      description: "Anos iniciais do ensino fundamental",
      icon: School,
      url: "/fundamental-1",
      color: "bg-green-600"
    },
    {
      title: "Fundamental II",
      description: "Anos finais do ensino fundamental",
      icon: Users,
      url: "/fundamental-2",
      color: "bg-orange-600"
    },
    {
      title: "Ensino Médio",
      description: "Preparação para o futuro acadêmico",
      icon: GraduationCap,
      url: "/ensino-medio",
      color: "bg-red-600"
    },
    {
      title: "Legado OSE",
      description: "100 anos de tradição educacional",
      icon: Calendar,
      url: "/legacy",
      color: "bg-slate-600"
    }
  ];

  const handleNavigation = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

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
      <section className="relative min-h-[60vh] overflow-hidden">
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
            {heroBackground.type === 'gradient' && heroBackground.gradientColors && (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${heroBackground.gradientColors.join(', ')})`,
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
              opacity: heroBackground.overlayOpacity || 0.7
            }}
          ></div>
        )}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Links Úteis
              <span className="block text-base sm:text-lg md:text-xl font-normal text-orange-100 mt-2">
                Acesso rápido aos principais conteúdos da OSE
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Navegue rapidamente pelos nossos segmentos educacionais e portais principais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Navegação Rápida
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Acesse diretamente as principais seções e informações do Colégio OSE.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                      onClick={() => handleNavigation(link.url)}>
                  <CardHeader className="text-center pb-3">
                    <div className={`${link.color} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-slate-800 group-hover:text-school-orange transition-colors">
                      {link.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-slate-600 mb-4 text-sm sm:text-base">
                      {link.description}
                    </CardDescription>
                    <Button 
                      size="sm"
                      className="w-full bg-school-orange hover:bg-school-orange/90 text-white"
                    >
                      {link.url.startsWith('http') ? (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Acessar
                        </>
                      ) : (
                        'Ver Mais'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Optimization Notice */}
      <section className="py-8 sm:py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-school-orange/10 to-blue-50 border-school-orange/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">
                  📱 Otimizado para Mobile
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Esta página foi especialmente otimizada para dispositivos móveis, 
                  proporcionando uma navegação rápida e intuitiva em qualquer tela.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}