
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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

  // Galeria de imagens da OSE
  const albumImages = [
    {
      id: 1,
      src: newImages.horizontal1,
      title: "Campus OSE - Vista Principal",
      description: "Vista panorâmica do campus principal da OSE"
    },
    {
      id: 2,
      src: newImages.horizontal2,
      title: "Estudantes em Atividade",
      description: "Alunos em momento de aprendizagem colaborativa"
    },
    {
      id: 3,
      src: newImages.horizontal3,
      title: "Laboratório de Ciências",
      description: "Espaço moderno para experimentos e descobertas"
    },
    {
      id: 4,
      src: newImages.horizontal4,
      title: "Biblioteca",
      description: "Centro de conhecimento e pesquisa"
    },
    {
      id: 5,
      src: newImages.horizontal5,
      title: "Pátio Escolar",
      description: "Espaço de convivência e recreação"
    },
    {
      id: 6,
      src: newImages.horizontal6,
      title: "Sala de Aula Moderna",
      description: "Ambiente preparado para o aprendizado do século XXI"
    },
    {
      id: 7,
      src: newImages.horizontal7,
      title: "Atividades Esportivas",
      description: "Desenvolvimento físico e trabalho em equipe"
    },
    {
      id: 8,
      src: newImages.horizontal8,
      title: "Laboratório de Informática",
      description: "Tecnologia a serviço da educação"
    },
    {
      id: 9,
      src: newImages.horizontal9,
      title: "Auditório",
      description: "Espaço para eventos e apresentações"
    },
    {
      id: 10,
      src: newImages.horizontal10,
      title: "Área de Convivência",
      description: "Espaços que promovem integração e excelência educacional"
    }
  ];

  useEffect(() => {
    updateSEO({
      title: "Álbum OSE - Galeria de Fotos | Colégio OSE",
      description: "Conheça o Colégio OSE através de nossa galeria de fotos. Veja nossos espaços, atividades educacionais e momentos especiais de 100 anos de tradição.",
      keywords: "álbum OSE, galeria fotos, campus colégio, instalações educacionais, tradição centenária, sorocaba"
    });
  }, []);

  const openModal = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setSelectedImage(imageIndex);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % albumImages.length;
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? albumImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
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
              Álbum OSE
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Galeria de Fotos | 100 Anos de História
              </span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Explore os espaços, atividades e momentos especiais que fazem da OSE uma instituição centenária de excelência.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Nossa Galeria de Fotos
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore os espaços, atividades e momentos especiais que fazem da vida na OSE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albumImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 text-white hover:text-school-orange transition-all duration-300"
                        onClick={() => openModal(index)}
                      >
                        <ZoomIn className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2">{image.title}</h3>
                    <p className="text-sm text-slate-600">{image.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <Dialog open={selectedImage !== null} onOpenChange={() => closeModal()}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <div className="relative">
              <img
                src={albumImages[currentImageIndex].src}
                alt={albumImages[currentImageIndex].title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                onClick={prevImage}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                onClick={nextImage}
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
              
              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                onClick={closeModal}
              >
                <X className="w-6 h-6" />
              </Button>
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                <h3 className="font-semibold text-lg">{albumImages[currentImageIndex].title}</h3>
                <p className="text-sm opacity-90">{albumImages[currentImageIndex].description}</p>
                <p className="text-xs opacity-75 mt-2">
                  {currentImageIndex + 1} de {albumImages.length}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
