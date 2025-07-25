import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, BookOpen, Users } from 'lucide-react';
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import LogoutButton from '@/components/LogoutButton';

export default function BolsasInscricao() {
  const { isAuthenticated } = useSecureAuth();
  const { VisualComposerComponent } = useVisualComposer('Bolsas 2026');

  // Initialize page data with auto-save functionality
  const { 
    heroBackground,
    updateHeroBackground
  } = usePageData('Bolsas 2026', {
    heroBackground: {
      type: 'image',
      imageUrl: '/images/horizontal_4.png',
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
      title: "Prova de Bolsas 2026 - Colégio OSE Sorocaba",
      description: "Inscreva-se na prova de bolsas 2026 do Colégio OSE. Provas no dia 4 de outubro: 9h (Ensino Médio) e 14h (Fundamental II). Matemática e Português.",
      keywords: "prova de bolsas sorocaba, colégio ose bolsa estudo, ensino fundamental médio sorocaba, escola particular desconto"
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* SEO */}
      <SEO 
        title="Prova de Bolsas 2026 - Colégio OSE Sorocaba"
        description="Inscreva-se na prova de bolsas 2026 do Colégio OSE. Provas no dia 4 de outubro: 9h (Ensino Médio) e 14h (Fundamental II). Matemática e Português."
        keywords="prova de bolsas sorocaba, colégio ose bolsa estudo, ensino fundamental médio sorocaba, escola particular desconto"
        ogImage="/images/bolsas-2026-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Prova de Bolsas 2026 - Colégio OSE",
          "description": "Processo seletivo para bolsas de estudo no Colégio OSE",
          "startDate": "2026-10-04",
          "location": {
            "@type": "Place",
            "name": "Colégio OSE",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Sorocaba, 150",
              "addressLocality": "Sorocaba", 
              "addressRegion": "SP",
              "postalCode": "18000-000",
              "addressCountry": "BR"
            }
          },
          "organizer": {
            "@type": "EducationalOrganization",
            "name": "Colégio OSE"
          }
        }}
      />

      {/* Background Management for Admin */}
      {isAuthenticated && (
        <HeroBackgroundManager 
          heroBackground={heroBackground}
          updateHeroBackground={updateHeroBackground}
        />
      )}

      {/* Visual Composer */}
      {isAuthenticated && <VisualComposerComponent />}
      
      {/* Admin Logout Button */}
      {isAuthenticated && <LogoutButton />}

      {/* Background overlay with animated orbs */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic background based on admin settings or default gradient */}
        <div 
          className="absolute inset-0"
          style={
            heroBackground?.type === 'image' && heroBackground.imageUrl
              ? {
                  backgroundImage: `url(${heroBackground.imageUrl})`,
                  backgroundSize: heroBackground.size || 'cover',
                  backgroundPosition: heroBackground.position || 'center',
                  backgroundRepeat: heroBackground.repeat || 'no-repeat',
                  opacity: heroBackground.opacity || 1,
                }
              : {
                  background: `linear-gradient(135deg, 
                    rgba(251, 146, 60, 0.95) 0%, 
                    rgba(249, 115, 22, 0.9) 25%, 
                    rgba(234, 88, 12, 0.85) 50%, 
                    rgba(194, 65, 12, 0.8) 75%, 
                    rgba(154, 52, 18, 0.75) 100%)`,
                }
          }
        />
        
        {/* Overlay */}
        {heroBackground?.overlay && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: heroBackground.overlayColor || '#1e293b',
              opacity: heroBackground.overlayOpacity || 0.8,
            }}
          />
        )}

        {/* Animated floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-600/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-10 w-80 h-80 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-600/20 to-orange-400/20 rounded-full blur-2xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Prova de Bolsas
                <span className="block text-amber-300">2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
                Colégio OSE
              </p>
            </motion.div>
          </div>
        </section>

        {/* Informações da Prova */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Informações da Prova
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <AnimatedCard delay={0.1}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <Calendar className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Data</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-amber-100 text-lg font-semibold">
                      4 de outubro (sábado)
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <Clock className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Horários</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-amber-100">
                      <strong>Ensino Médio:</strong> 9h
                    </p>
                    <p className="text-amber-100">
                      <strong>Fundamental II:</strong> 14h
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <BookOpen className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Matérias</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-amber-100">Matemática</p>
                    <p className="text-amber-100">Português</p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <Users className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Segmentos</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-amber-100 text-sm">Ensino Fundamental II</p>
                    <p className="text-amber-100 text-sm">Ensino Médio</p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Formulário de Inscrição */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Inscrição
              </h2>
              <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                Preencha o formulário abaixo para se inscrever na prova de bolsas 2026
              </p>
            </motion.div>

            <AnimatedCard delay={0.2}>
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 overflow-hidden">
                <CardContent className="p-0">
                  {/* Formulário do Forms.app */}
                  <div className="w-full overflow-hidden">
                    <iframe 
                      allowtransparency="true" 
                      allowFullScreen={true} 
                      allow="geolocation; microphone; camera" 
                      src="https://trfyo43h.forms.app/form/6882db63040c8be61e1a2b3c" 
                      frameBorder="0" 
                      style={{
                        width: '100%', 
                        height: '600px', 
                        border: 'none',
                        display: 'block'
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </section>

        {/* Por que escolher a OSE */}
        <WhyOSESection />

        {/* Proposta Pedagógica */}
        <PedagogicalProposalSection />

        {/* Contato */}
        <ContactSection />
      </div>
    </div>
  );
}