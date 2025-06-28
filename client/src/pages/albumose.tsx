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

  // Dados autênticos do álbum OSE organizados por ano
  const albumData = {
    "2025": [
      { title: "FESTA JUNINA 2025", link: "https://photos.app.goo.gl/TJUiJtZmTxAXStpr5" },
      { title: "PETZOO 2025", link: "https://photos.app.goo.gl/9zdK3NX3VCF9StRz6" },
      { title: "DIA DA FAMÍLIA 2025", link: "https://photos.app.goo.gl/KL1Qzeo543NjoBwv7" },
      { title: "PLANETARIO / RIO TIETE 2025", link: "https://photos.app.goo.gl/niRigCStmmYK8JM86" },
      { title: "CARNAVAL MANHÃ", link: "https://photos.app.goo.gl/P1PJdRw2RaA6oUHq6" },
      { title: "CARNAVAL TARDE", link: "https://photos.app.goo.gl/cpgyF59fTfLha5z58" }
    ],
    "2024": [
      { title: "CAFÉ FORMANDOS 2024", link: "https://photos.app.goo.gl/3GCCuwHddujvLtSj8" },
      { title: "GINCANA 2024 - DIA 1", link: "https://photos.app.goo.gl/xvcTxxeiUdsYtTLu9" },
      { title: "GINCANA 2024 - DIA 2", link: "https://photos.app.goo.gl/u38gnZiTzudgmc4v8" },
      { title: "GINCANA 2024 - DIA 3", link: "https://photos.app.goo.gl/Zj775GDwXfPgtY2cA" },
      { title: "GINCANA 2024 - DIA 4", link: "https://photos.app.goo.gl/M2nnN7Qa42Uy3zQJ8" },
      { title: "SEMANA DA CRIANÇA FUND 1", link: "https://photos.app.goo.gl/ensityrEGGoe3SFi7" },
      { title: "FESTIVAL CULTURAL 2024", link: "https://photos.app.goo.gl/acnxVtpaiWnSs2Tz6" },
      { title: "HOPI HARI FUND 2", link: "https://photos.app.goo.gl/XsRG7hLr32qCQAas8" },
      { title: "FESTA JUNINA 2024", link: "https://photos.app.goo.gl/1Lq2dLXSV4j6bN4n8" },
      { title: "SISTEMA MONETÁRIO - 2o A FUND. I", link: "https://photos.app.goo.gl/TUi5fpgmprhwEFR37" },
      { title: "Parque Carlos Botelho - 7 Anos 2024", link: "https://photos.app.goo.gl/Xkg2LXySKfHtM6RHA" },
      { title: "DIA DA FAMÍLIA - 2024", link: "https://photos.app.goo.gl/5LBjeAJBmSCQCzHz8" },
      { title: "FUND II: Museu da Língua Portuguesa / Pinacoteca", link: "https://photos.google.com/share/AF1QipNhE6DZDEqXZKjp6ALctVH1UiVQpxvVniLrB4P80MWJciNLEzBVHVT8DRVZcc9-Rg?key=LVBfTnN6bUYtOUdaZFBQRzVFdXdFMHBpS1R3MXhB" },
      { title: "INFANTIL/FUND I: ANIMÁLIA", link: "https://photos.app.goo.gl/ydWAW2UwApWwrkra6" }
    ],
    "2023": [
      { title: "FESTIVAL CULTURAL 2023", link: "https://bit.ly/FestivalOSE2023" },
      { title: "FÉRIAS JULHO 2023", link: "https://bit.ly/FeriasOSE23" },
      { title: "DIA DOS PAIS 2023", link: "https://bit.ly/DiaDosPais23OSE" },
      { title: "FESTA JUNINA 2023", link: "https://bit.ly/FestaJuninaOSE2023_" },
      { title: "SÍTIO SANTA ROSA EF1 2023", link: "https://bit.ly/SitioSantaRosaOSE" },
      { title: "PARQUE ESTADUAL CARLOS BOTELHO EF2 2023", link: "https://bit.ly/OSECarlosBotelho23" },
      { title: "FEIRA DE CIÊNCIAS 2023 E.M.", link: "https://bit.ly/CienciasOseNEnsinoMedio" },
      { title: "MUSEU DA ENERGIA EF2 2023", link: "https://bit.ly/MuseuEnergiaOSE" },
      { title: "VISITA À FEIRA 2°A EF1", link: "https://bit.ly/OSE2aFeira" },
      { title: "DIA DA FAMÍLIA 2023", link: "https://bit.ly/OSEFamilia23" }
    ]
  };

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
      <section 
        className="relative min-h-[70vh] flex items-center justify-center text-white"
        style={{
          background: heroBackground?.type === 'gradient' 
            ? `linear-gradient(135deg, ${heroBackground.gradientColors?.join(', ') || '#475569, #64748b'})`
            : undefined,
          backgroundImage: heroBackground?.type === 'image' 
            ? `url(${heroBackground.imageUrl})`
            : undefined,
          backgroundSize: heroBackground?.size || 'cover',
          backgroundPosition: heroBackground?.position || 'center',
          backgroundRepeat: heroBackground?.repeat || 'no-repeat',
          opacity: heroBackground?.opacity || 1
        }}
      >
        {/* Background Manager for Admin */}
        {isAuthenticated && (
          <HeroBackgroundManager
            heroBackground={heroBackground}
            onUpdateBackground={updateHeroBackground}
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
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
          {Object.entries(albumData).map(([year, albums], yearIndex) => (
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
                {albums.map((album, index) => (
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
          ))}
        </div>
      </section>

      {/* Why OSE Section */}
      <WhyOSESection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}