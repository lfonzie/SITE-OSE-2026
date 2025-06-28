
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Users, Computer, Target, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';

import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { logos, newImages } from "@/lib/image-verification";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import DragImagePosition from '@/components/DragImagePosition';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

export default function Plurall() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Plurall');
  
  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('Plurall', {
    heroImage: newImages.horizontal29,
    images: [newImages.horizontal29],
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal29,
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
      title: "Plurall - Colégio OSE | Plataforma Digital de Aprendizagem",
      description: "Acesse o Plurall do Colégio OSE para exercícios, simulados, videoaulas e muito mais conteúdo educacional digital.",
      keywords: "plurall, plataforma digital, exercícios online, simulados, colégio ose, sorocaba"
    });
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Exercícios Personalizados",
      description: "Milhares de exercícios adaptados ao seu nível de conhecimento"
    },
    {
      icon: Target,
      title: "Simulados",
      description: "Simulados completos para ENEM, vestibulares e avaliações escolares"
    },
    {
      icon: Computer,
      title: "Videoaulas",
      description: "Conteúdo audiovisual de alta qualidade com professores especialistas"
    },
    {
      icon: Users,
      title: "Trilhas de Aprendizagem",
      description: "Percursos personalizados baseados no seu desempenho"
    },
    {
      icon: Clock,
      title: "Estudo Programado",
      description: "Organização de estudos com cronogramas e metas"
    },
    {
      icon: Award,
      title: "Relatórios de Desempenho",
      description: "Acompanhamento detalhado do seu progresso acadêmico"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      
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

        {/* Admin Controls */}
        {isAuthenticated && (
          <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
            <HeroBackgroundManager
              currentBackground={heroBackground}
              onBackgroundChange={updateHeroBackground}
            />
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
              Plurall
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Plataforma Digital de Aprendizagem OSE
              </span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Acesse milhares de exercícios, simulados e videoaulas para potencializar seus estudos.
            </p>
            
            <Button
              size="lg"
              onClick={() => window.open('https://login.plurall.net/', '_blank')}
              className="bg-school-orange text-white hover:bg-school-orange/90 text-lg px-8 py-3"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Acessar Plurall
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Recursos da Plataforma
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              O Plurall oferece uma experiência completa de aprendizagem digital adaptada às suas necessidades.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-school-orange">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-school-orange/10 p-2 rounded-lg">
                        <feature.icon className="w-6 h-6 text-school-orange" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Access Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-800">
                  Como Acessar
                </CardTitle>
                <CardDescription className="text-lg">
                  Siga os passos para conectar-se à plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Primeiro Acesso
                    </h3>
                    <ol className="space-y-3 text-slate-600">
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                        <span>Receba suas credenciais de acesso da secretaria do colégio</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                        <span>Acesse login.plurall.net</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                        <span>Faça login com usuário e senha fornecidos</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                        <span>Explore os recursos e comece a estudar</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Suporte
                    </h3>
                    <div className="space-y-3">
                      <p className="text-slate-600">
                        <strong>Dúvidas técnicas:</strong><br />
                        Entre em contato com a secretaria do colégio
                      </p>
                      <p className="text-slate-600">
                        <strong>Telefone:</strong><br />
                        (15) 2101-3800
                      </p>
                      <p className="text-slate-600">
                        <strong>Horário de atendimento:</strong><br />
                        Segunda a sexta, das 7h às 17h
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-6 border-t">
                  <Button
                    size="lg"
                    onClick={() => window.open('https://login.plurall.net/', '_blank')}
                    className="bg-school-orange text-white hover:bg-school-orange/90"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Acessar Plurall Agora
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
