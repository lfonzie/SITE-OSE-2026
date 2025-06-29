import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { Book, ExternalLink, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logos, newImages } from "@/lib/image-verification";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import { useAuth } from '@/contexts/AuthContext';
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

export default function Arvore() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Árvore');
  
  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('Árvore', {
    heroImage: newImages.horizontal31,
    images: [newImages.horizontal31],
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal31,
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
      title: "Árvore - Livros Digitais | Colégio OSE",
      description: "Plataforma de livros digitais Árvore - Uma biblioteca completa para nossos alunos",
      keywords: "árvore, livros digitais, leitura, biblioteca digital, colégio ose"
    });
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white/90 to-blue-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/30 via-green-400/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/25 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src={logos.arvore} 
                alt="Árvore"
                className="h-32 mx-auto mb-4"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Árvore
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Uma biblioteca completa ao alcance dos nossos alunos
            </p>
            <Button 
              onClick={() => window.open('https://www.arvore.com.br', '_blank')}
              className="bg-white text-school-orange hover:bg-gray-100 text-lg px-8 py-3"
            >
              Acessar Plataforma
              <ExternalLink className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Recursos da Plataforma
            </h2>
            <p className="text-xl text-slate-600">
              Tudo que você precisa para uma experiência de leitura completa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
              <CardHeader>
                <Book className="text-school-orange mb-4" size={48} />
                <CardTitle>Biblioteca Digital</CardTitle>
                <CardDescription>
                  Acesso a milhares de livros digitais de diversos gêneros e níveis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
              <CardHeader>
                <Users className="text-school-orange mb-4" size={48} />
                <CardTitle>Leitura Social</CardTitle>
                <CardDescription>
                  Compartilhe experiências de leitura com colegas e professores
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg">
              <CardHeader>
                <Clock className="text-school-orange mb-4" size={48} />
                <CardTitle>Acesso 24/7</CardTitle>
                <CardDescription>
                  Leia quando e onde quiser, no computador, tablet ou celular
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            Como Acessar
          </h2>

          <div className="bg-white/30 backdrop-blur-lg rounded-lg p-8 mb-8 border border-white/20 shadow-lg">
            <p className="text-lg text-slate-700 mb-6">
              Todos os nossos alunos têm acesso gratuito à plataforma Árvore. 
              Use suas credenciais do colégio para fazer login.
            </p>

            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                <p>Acesse o site da Árvore ou baixe o aplicativo</p>
              </div>
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                <p>Use seu login e senha fornecidos pelo colégio</p>
              </div>
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                <p>Explore a biblioteca e comece a ler!</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => window.open('https://www.arvore.com.br', '_blank')}
            className="bg-school-orange hover:bg-school-orange/90 text-white text-lg px-8 py-3"
          >
            Acessar Árvore
            <ExternalLink className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
      
      {/* Visual Composer */}
      <VisualComposerComponent />
    </div>
  );
}