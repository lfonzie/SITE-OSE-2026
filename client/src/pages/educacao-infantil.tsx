
import React, { useEffect } from 'react';
import { ArrowLeft, Users, Clock, BookOpen, Heart, Award, Star, Globe, Lightbulb, Baby, GraduationCap } from 'lucide-react';
import { Link } from 'wouter';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { newImages } from '@/lib/image-verification';
import { updateSEO } from '@/lib/seo';
import SEO from '@/components/SEO';

export default function EducacaoInfantil() {
  const { isAuthenticated } = useAuth();

  const { 
    heroBackground,
    updateHeroBackground
  } = usePageData('Educacao Infantil', {
    heroBackground: {
      type: 'gradient',
      gradientColors: ['#475569', '#64748b'],
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
      title: "Educação Infantil - Colégio OSE | Jardim I e II",
      description: "Educação Infantil na OSE: ambiente seguro e acolhedor para crianças de 4 a 6 anos, com pedagogia respeitosa e desenvolvimento integral.",
      keywords: "educação infantil, jardim I, jardim II, desenvolvimento infantil, pedagogia finlandesa, OSE sorocaba"
    });
  }, []);

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-school-orange" />,
      title: "Ambiente Seguro e Acolhedor",
      description: "Espaços especialmente preparados para crianças de 4 a 6 anos, com foco na segurança e no bem-estar emocional."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-school-orange" />,
      title: "Pedagogia Finlandesa e Aprendizado Integral",
      description: "Metodologia que respeita o ritmo de cada criança, priorizando o desenvolvimento global através do brincar."
    },
    {
      icon: <Globe className="h-8 w-8 text-school-orange" />,
      title: "Programa de Inglês com Introdução Natural",
      description: "Imersão lúdica no idioma inglês através de jogos, músicas e brincadeiras adequadas à faixa etária."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-school-orange" />,
      title: "Desenvolvimento Socioemocional como Prioridade",
      description: "Foco no desenvolvimento da inteligência emocional, autonomia e habilidades sociais fundamentais."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Educação Infantil - Colégio OSE",
    "url": "https://colegioose.com.br/educacao-infantil",
    "description": "Educação Infantil no Colégio OSE com pedagogia finlandesa, ambiente seguro e desenvolvimento integral para crianças de 4 a 6 anos em Sorocaba.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Colégio OSE",
      "url": "https://colegioose.com.br"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "children aged 4-6"
    },
    "educationalLevel": "Educação Infantil",
    "teaches": [
      "Desenvolvimento Socioemocional",
      "Pedagogia Finlandesa",
      "Introdução ao Inglês",
      "Desenvolvimento Integral"
    ]
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Educação Infantil - Colégio OSE | Pedagogia Finlandesa e Desenvolvimento Integral em Sorocaba"
        description="Educação Infantil no Colégio OSE com metodologia finlandesa, ambiente seguro e acolhedor. Desenvolvimento integral para crianças de 4 a 6 anos com programa de inglês e foco socioemocional em Sorocaba."
        keywords="educação infantil sorocaba, pedagogia finlandesa, escola infantil particular sorocaba, desenvolvimento infantil, jardim I jardim II, programa socioemocional infantil, inglês para crianças"
        canonical="https://colegioose.com.br/educacao-infantil"
        ogTitle="Educação Infantil - Colégio OSE | Pedagogia Finlandesa em Sorocaba"
        ogDescription="Educação Infantil com metodologia finlandesa e desenvolvimento integral. Ambiente seguro e acolhedor para crianças de 4 a 6 anos no Colégio OSE."
        ogImage="https://colegioose.com.br/images/LogoOSE100anos.png"
        structuredData={structuredData}
      />
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-orange-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/25 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={{
          background: heroBackground?.type === 'gradient' 
            ? `linear-gradient(135deg, ${heroBackground.gradientColors?.join(', ') || '#475569, #64748b'})`
            : heroBackground?.type === 'color'
            ? heroBackground.solidColor
            : heroBackground?.type === 'image' && heroBackground.imageUrl
            ? `url(${heroBackground.imageUrl})`
            : 'linear-gradient(135deg, #475569, #64748b)',
          backgroundSize: heroBackground?.type === 'image' ? heroBackground.size || 'cover' : 'auto',
          backgroundPosition: heroBackground?.type === 'image' ? heroBackground.position || 'center' : 'center',
          backgroundRepeat: heroBackground?.type === 'image' ? heroBackground.repeat || 'no-repeat' : 'no-repeat',
          opacity: heroBackground?.opacity || 1
        }}
      >
        {/* Hero Background Manager - Único componente para gerenciar o hero */}
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
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/20 max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Educação <span className="text-school-orange">Infantil</span>
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Jardim I e II - Crescimento e Exploração na Primeira Infância
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Desenvolvendo <strong>mentes curiosas</strong> e <strong>corações compassivos</strong>
            </p>
            <p className="text-lg mb-8 text-slate-300 max-w-3xl">
              Na Educação Infantil da OSE, cada criança é vista como um ser único e especial. 
              Oferecemos um ambiente rico em experiências que favorecem o desenvolvimento integral 
              através do brincar, explorando o mundo com curiosidade e alegria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Diferenciais da Educação Infantil OSE
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Metodologia única que combina tradição e inovação no desenvolvimento infantil
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/30 border border-white/40 p-6 shadow-xl shadow-black/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossas Turmas
            </h2>
            <p className="text-xl text-gray-600">
              Grupos organizados por faixa etária para melhor desenvolvimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-school-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Baby className="h-8 w-8 text-school-orange" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Jardim I</h3>
                <p className="text-gray-600 mb-4">4 anos completos</p>
                <p className="text-gray-700 leading-relaxed">
                  Foco na adaptação escolar, desenvolvimento da autonomia, 
                  coordenação motora e primeiras interações sociais em grupo.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-school-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-school-orange" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Jardim II</h3>
                <p className="text-gray-600 mb-4">5 anos completos</p>
                <p className="text-gray-700 leading-relaxed">
                  Preparação para o Ensino Fundamental com desenvolvimento da 
                  pré-escrita, raciocínio lógico e habilidades de comunicação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
