import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Calendar, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';
import ContactSection from '@/components/contact-section';
import { newImages } from "@/lib/image-verification";
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

export default function Bolsas2025Page() {
  const { isAuthenticated } = useAuth();

  const { 
    heroBackground,
    updateHeroBackground,
  } = usePageData('Bolsas 2026', {
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal15,
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
      title: "Bolsas de Estudo 2026 - Colégio OSE | Prova em 4 de Outubro",
      description: "Bolsas de Estudo 2026 do Colégio OSE. Prova em 4 de outubro. Inscrições começam no início de agosto. Tradição centenária em educação de excelência.",
      keywords: "bolsas 2026, prova outubro, colégio ose, bolsa de estudos, sorocaba, inscrições agosto"
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
      <section className="relative min-h-screen overflow-hidden flex items-center">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Bolsas de Estudo <span className="text-school-orange">2026</span>
            </motion.h1>

            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-school-orange mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Data da Prova</h3>
                  <p className="text-3xl font-bold text-school-orange">4 de Outubro</p>
                  <p className="text-slate-600 mt-2">Sábado</p>
                </div>

                <div className="text-center">
                  <Clock className="w-16 h-16 text-school-orange mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Inscrições</h3>
                  <p className="text-3xl font-bold text-school-orange">Início de Agosto</p>
                  <p className="text-slate-600 mt-2">Em breve</p>
                </div>
              </div>

              <div className="text-center border-t pt-6">
                <Award className="w-12 h-12 text-school-orange mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Colégio OSE - 100 Anos de Tradição
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Uma oportunidade única de fazer parte de uma instituição centenária 
                  que forma líderes e cidadãos conscientes há mais de um século em Sorocaba.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Informações Importantes */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
            <span className="text-school-orange">Informações</span> Importantes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <Calendar className="w-12 h-12 text-school-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Prova</h3>
              <p className="text-slate-600">
                A prova será realizada no dia <strong>4 de outubro (sábado)</strong> 
                nas dependências do Colégio OSE.
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <Clock className="w-12 h-12 text-school-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Inscrições</h3>
              <p className="text-slate-600">
                As inscrições para as bolsas de estudo 2026 
                começam no <strong>início de agosto</strong>.
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <Award className="w-12 h-12 text-school-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Tradição</h3>
              <p className="text-slate-600">
                100 anos de excelência educacional formando 
                líderes e cidadãos conscientes em Sorocaba.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <ContactSection />
    </div>
  );
}