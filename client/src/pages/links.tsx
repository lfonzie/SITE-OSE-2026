
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Users, Computer, Calendar, FileText, Camera, Shield, CreditCard, Bell } from "lucide-react";
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

  const links = [
    {
      title: "Portal do Aluno",
      description: "Acesse suas notas, faltas, cronograma e atividades",
      icon: Computer,
      url: "https://siga03.activesoft.com.br/login/?instituicao=COLEGIOOSE",
      color: "bg-blue-600"
    },
    {
      title: "Portal dos Pais",
      description: "Acompanhe o desenvolvimento escolar do seu filho",
      icon: Users,
      url: "/portal-pais",
      color: "bg-green-600"
    },
    {
      title: "AgendaEdu",
      description: "Portal de comunicação escolar integrada",
      icon: Calendar,
      url: "https://web.agendaedu.com/",
      color: "bg-orange-600"
    },
    {
      title: "Plurall",
      description: "Plataforma digital de exercícios e simulados",
      icon: BookOpen,
      url: "https://login.plurall.net/",
      color: "bg-purple-600"
    },
    {
      title: "Lista de Materiais",
      description: "Consulte a lista de materiais escolares por série",
      icon: FileText,
      url: "/lista-material",
      color: "bg-indigo-600"
    },
    {
      title: "Álbum OSE",
      description: "Galeria de fotos e eventos do colégio",
      icon: Camera,
      url: "/album-ose",
      color: "bg-pink-600"
    },
    {
      title: "Segurança Escolar",
      description: "Informações sobre protocolos de segurança",
      icon: Shield,
      url: "#seguranca",
      color: "bg-slate-600"
    },
    {
      title: "Portal Financeiro",
      description: "Gestão de mensalidades e pagamentos",
      icon: CreditCard,
      url: "#financeiro",
      color: "bg-emerald-600"
    },
    {
      title: "Central de Comunicados",
      description: "Receba informações importantes em tempo real",
      icon: Bell,
      url: "#comunicados",
      color: "bg-yellow-600"
    }
  ];

  const quickAccess = [
    {
      title: "Secretaria",
      info: "(15) 2101-3800",
      description: "Horário: Segunda a sexta, 7h às 17h"
    },
    {
      title: "WhatsApp",
      info: "(15) 99999-9999",
      description: "Atendimento rápido via WhatsApp"
    },
    {
      title: "E-mail",
      info: "contato@colegioose.com.br",
      description: "Envie suas dúvidas por e-mail"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Logout Button */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <LogoutButton />
        </div>
      )}
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
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
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Links <span className="text-school-orange">Úteis</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Acesso Rápido aos Portais OSE
              </span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Encontre rapidamente todos os portais e serviços digitais do Colégio OSE em um só lugar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Links Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Portais e Serviços Digitais
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Acesse todos os serviços digitais do Colégio OSE de forma rápida e organizada.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {links.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-school-orange">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${link.color} text-white p-3 rounded-lg`}>
                        <link.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{link.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 mb-4">
                      {link.description}
                    </CardDescription>
                    <Button
                      onClick={() => {
                        if (link.url.startsWith('http')) {
                          window.open(link.url, '_blank');
                        } else if (link.url.startsWith('#')) {
                          alert('Serviço em desenvolvimento');
                        } else {
                          window.location.href = link.url;
                        }
                      }}
                      className={`w-full ${link.color} hover:opacity-90 text-white`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Acesso Rápido
            </h2>
            <p className="text-xl text-slate-600">
              Informações de contato e atendimento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {quickAccess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-school-orange mb-2">
                      {item.info}
                    </p>
                    <p className="text-sm text-slate-600">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-school-orange to-orange-600 text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  Precisa de Ajuda?
                </CardTitle>
                <CardDescription className="text-orange-100 text-lg">
                  Nossa equipe está sempre disponível para auxiliar
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6 text-orange-100">
                  Se você está tendo dificuldades para acessar algum portal ou serviço, 
                  entre em contato conosco. Estamos aqui para ajudar!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-school-orange hover:bg-gray-100"
                  >
                    Falar com a Secretaria
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-school-orange"
                  >
                    Suporte Técnico
                  </Button>
                </div>
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
