
import React, { useEffect } from 'react';
import { ArrowLeft, Users, Clock, BookOpen, Heart, Award, Star, Globe, Lightbulb } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-slate-50">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white">Educação Infantil</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Jardim I e II - Crescimento e Exploração
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Desenvolvendo mentes curiosas e corações compassivos
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Na Educação Infantil da OSE, cada criança é vista como um ser único e especial. 
                Oferecemos um ambiente rico em experiências que favorecem o desenvolvimento integral 
                através do brincar, explorando o mundo com curiosidade e alegria.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Diferenciais da Educação Infantil OSE
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Metodologia única que combina tradição e inovação no desenvolvimento infantil
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
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
                  <Users className="h-8 w-8 text-school-orange" />
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
                  <BookOpen className="h-8 w-8 text-school-orange" />
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
