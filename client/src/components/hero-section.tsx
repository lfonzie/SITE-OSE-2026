import { useEffect, useState } from "react";
import { ArrowRight, Play, Award, Users, BookOpen, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { newImages } from "@/lib/image-verification";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import OptimizedImage from '@/components/OptimizedImage';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // Estados para edição inline
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  
  // Conteúdo editável
  const [heroContent, setHeroContent] = useState({
    title: "Tradição Secular de Ensino:",
    subtitle: "Celebrando 100 Anos",
    description: "A OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem:\nTradição e uma rica história.\n\nEducando com excelência há mais de 100 anos em Sorocaba. Com base em valores éticos e formação integral, preparamos gerações para o sucesso e a cidadania."
  });
  
  // Estados temporários para edição
  const [tempTitle, setTempTitle] = useState("");
  const [tempSubtitle, setTempSubtitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const { 
    updateHeroBackground,
    heroBackground 
  } = usePageData('Home', {
    heroBackground: {
      type: 'gradient',
      gradientColors: ['#475569', '#64748b'],
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.8,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  const scrollToNext = () => {
    const element = document.getElementById("stats");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Funções de edição
  const startEditingTitle = () => {
    setTempTitle(heroContent.title);
    setIsEditingTitle(true);
  };

  const startEditingSubtitle = () => {
    setTempSubtitle(heroContent.subtitle);
    setIsEditingSubtitle(true);
  };

  const startEditingDescription = () => {
    setTempDescription(heroContent.description);
    setIsEditingDescription(true);
  };

  const saveTitle = () => {
    setHeroContent(prev => ({ ...prev, title: tempTitle }));
    setIsEditingTitle(false);
    toast({
      title: "Título atualizado",
      description: "O título foi salvo automaticamente."
    });
  };

  const saveSubtitle = () => {
    setHeroContent(prev => ({ ...prev, subtitle: tempSubtitle }));
    setIsEditingSubtitle(false);
    toast({
      title: "Subtítulo atualizado", 
      description: "O subtítulo foi salvo automaticamente."
    });
  };

  const saveDescription = () => {
    setHeroContent(prev => ({ ...prev, description: tempDescription }));
    setIsEditingDescription(false);
    toast({
      title: "Descrição atualizada",
      description: "A descrição foi salva automaticamente."
    });
  };

  const cancelEdit = () => {
    setIsEditingTitle(false);
    setIsEditingSubtitle(false);
    setIsEditingDescription(false);
    setTempTitle("");
    setTempSubtitle("");
    setTempDescription("");
  };

  return (
    <section 
      id="hero" 
      className="relative py-20 text-white overflow-hidden"
      style={(() => {
        const baseStyle: React.CSSProperties = {
          opacity: heroBackground?.opacity || 1
        };
        
        if (heroBackground?.type === 'gradient') {
          return {
            ...baseStyle,
            backgroundImage: `linear-gradient(135deg, ${heroBackground.gradientColors?.join(', ') || '#475569, #64748b'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          };
        }
        
        if (heroBackground?.type === 'image' && heroBackground.imageUrl) {
          return {
            ...baseStyle,
            backgroundImage: `url(${heroBackground.imageUrl})`,
            backgroundSize: heroBackground.size || 'cover',
            backgroundPosition: heroBackground.position || 'center',
            backgroundRepeat: heroBackground.repeat || 'no-repeat'
          };
        }
        
        if (heroBackground?.type === 'color') {
          return {
            ...baseStyle,
            backgroundColor: heroBackground.solidColor || '#475569'
          };
        }
        
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(135deg, #475569, #64748b)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
      })()}
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
            opacity: heroBackground.overlayOpacity || 0.8
          }}
        ></div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Glass morphism container */}
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20">
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isEditingTitle ? (
              <div className="space-y-3 mb-6">
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="text-2xl md:text-4xl font-bold text-center text-black"
                  placeholder="Título principal"
                  autoFocus
                />
                <div className="flex gap-2 justify-center">
                  <Button size="sm" onClick={saveTitle}>
                    <Save size={12} className="mr-1" />
                    Salvar
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    <X size={12} className="mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl font-headline">
                <motion.span 
                  className="block text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {heroContent.title}
                </motion.span>
                <motion.span 
                  className="block text-white"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {heroContent.subtitle}
                </motion.span>
                {isAuthenticated && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8 bg-white/90"
                    onClick={startEditingTitle}
                  >
                    <Edit size={12} />
                  </Button>
                )}
              </h1>
            )}
          </motion.div>
          <div className="relative group">
            {isEditingDescription ? (
              <div className="space-y-3 mb-8">
                <Textarea
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  className="text-lg text-center text-black min-h-[120px]"
                  placeholder="Descrição principal"
                  rows={4}
                />
                <div className="flex gap-2 justify-center">
                  <Button size="sm" onClick={saveDescription}>
                    <Save size={12} className="mr-1" />
                    Salvar
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    <X size={12} className="mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-xl font-body whitespace-pre-line">
                  {heroContent.description}
                </p>
                {isAuthenticated && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8 bg-white/90"
                    onClick={startEditingDescription}
                  >
                    <Edit size={12} />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}