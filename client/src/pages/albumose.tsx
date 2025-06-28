
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { newImages } from "@/lib/image-verification";
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { useQuery } from "@tanstack/react-query";
import type { AlbumEvent } from "@shared/schema";

export default function AlbumOSE() {
  const { isAuthenticated } = useAuth();
  
  const { 
    heroBackground,
    updateHeroBackground,
  } = usePageData('Album OSE', {
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal1,
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
      title: "Álbum OSE - Colégio OSE | Memórias e Momentos Especiais",
      description: "Reviva os melhores momentos da OSE através de nosso álbum de fotos. Passeios, festivais, formaturas e atividades educacionais dos alunos.",
      keywords: "álbum ose, fotos colégio, eventos escolares, passeios educativos, festa junina, gincana, festival cultural"
    });
  }, []);

  // Buscar eventos do álbum da API
  const { data: albumEvents = [], isLoading } = useQuery<AlbumEvent[]>({
    queryKey: ["/api/album-events"],
  });

  // Organizar eventos por ano (mais recente primeiro)
  const albumData = albumEvents.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push({ title: event.title, link: event.photoLink });
    return acc;
  }, {} as Record<string, { title: string; link: string }[]>);

  // Ordenar anos do mais recente para o mais antigo
  const sortedYears = Object.keys(albumData).sort((a, b) => parseInt(b) - parseInt(a));

  const handleAlbumClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
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
      <section className="relative min-h-[70vh] overflow-hidden">
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
          />
        )}
        
        <div className="relative z-10 container mx-auto px-4 flex items-center justify-center text-white min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center items-center mb-6">
              <Camera className="h-16 w-16 text-amber-400 mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                Álbum OSE
              </h1>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-200 max-w-4xl mx-auto">
              Reviva os melhores momentos e memórias da nossa comunidade escolar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Albums Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Carregando eventos...</p>
            </div>
          ) : sortedYears.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-xl text-slate-600">Nenhum evento cadastrado ainda.</p>
            </div>
          ) : (
            sortedYears.map((year, yearIndex) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: yearIndex * 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center mb-8">
                  <Calendar className="h-8 w-8 text-amber-600 mr-3" />
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                    {year}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {albumData[year].map((album, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-amber-200 cursor-pointer group"
                            onClick={() => handleAlbumClick(album.link)}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-slate-800 group-hover:text-amber-700 transition-colors">
                            <span className="text-lg font-semibold">
                              {album.title}
                            </span>
                            <ExternalLink className="h-5 w-5 text-amber-600 group-hover:text-amber-700" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            variant="outline" 
                            className="w-full group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAlbumClick(album.link);
                            }}
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Ver Fotos
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Why OSE Section */}
      <WhyOSESection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
