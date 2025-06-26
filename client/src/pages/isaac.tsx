import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { CreditCard, ExternalLink, FileText, Calculator, Clock, Shield } from "lucide-react";
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

export default function Isaac() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('ISAAC');
  
  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('ISAAC', {
    heroImage: newImages.horizontal30,
    images: [newImages.horizontal30],
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal30,
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
      title: "ISAAC - Sistema Financeiro | Colégio OSE",
      description: "Portal financeiro ISAAC para consulta de mensalidades, boletos e informações financeiras",
      keywords: "isaac, financeiro, mensalidades, boletos, colégio ose"
    });
  }, []);

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
          backgroundSize: heroBackground?.type === 'image' ? heroBackground.size : 'auto',
          backgroundPosition: heroBackground?.type === 'image' ? heroBackground.position : 'center',
          backgroundRepeat: heroBackground?.type === 'image' ? heroBackground.repeat : 'no-repeat',
          opacity: heroBackground?.opacity || 1
        }}
      >
        {/* Background Image Layer */}
        {heroBackground?.type === 'image' && heroImage && (
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <img 
                src={heroImage}
                alt="ISAAC - Sistema Financeiro"
                className="w-full h-full object-cover opacity-30"
                style={{
                  objectPosition: getImagePosition('hero')?.objectPosition || 'center',
                  objectFit: getImagePosition('hero')?.objectFit || 'cover',
                  transform: `scale(${getImagePosition('hero')?.scale || 1})`,
                  opacity: getImagePosition('hero')?.opacity || 0.3,
                  filter: getImagePosition('hero')?.filter || 'none'
                }}
              />
              {isAuthenticated && (
                <>
                  <EnhancedImageSelector
                    currentImage={heroImage}
                    onImageSelect={updateHeroImage}
                    className="absolute inset-0"
                  />
                  <ImagePositionControls
                    currentPosition={getImagePosition('hero')}
                    onPositionChange={(position) => updateImagePosition('hero', position)}
                    className="absolute inset-0"
                  />
                </>
              )}
            </div>
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src={logos.isaac} 
                alt="ISAAC"
                className="h-32 mx-auto mb-4"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ISAAC
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Gerencie suas informações financeiras de forma simples e segura
            </p>
            <Button 
              onClick={() => window.open('https://isaac.com.br', '_blank')}
              className="bg-white text-school-brown hover:bg-gray-100 text-lg px-8 py-3"
            >
              Acessar Portal
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
              Serviços Disponíveis
            </h2>
            <p className="text-xl text-slate-600">
              Tudo que você precisa para acompanhar a vida financeira escolar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <FileText className="text-school-brown mb-4" size={48} />
                <CardTitle>Consulta de Mensalidades</CardTitle>
                <CardDescription>
                  Visualize o histórico completo de mensalidades e pagamentos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="text-school-brown mb-4" size={48} />
                <CardTitle>Emissão de Boletos</CardTitle>
                <CardDescription>
                  Gere segunda via de boletos e consulte datas de vencimento
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="text-school-brown mb-4" size={48} />
                <CardTitle>Histórico Financeiro</CardTitle>
                <CardDescription>
                  Acesse todo o histórico financeiro do aluno de forma organizada
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="text-school-brown mb-4" size={48} />
                <CardTitle>Ambiente Seguro</CardTitle>
                <CardDescription>
                  Suas informações protegidas com a mais alta segurança
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="text-school-brown mb-4" size={48} />
                <CardTitle>Múltiplas Formas de Pagamento</CardTitle>
                <CardDescription>
                  Pague com cartão, PIX, boleto ou débito automático
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <ExternalLink className="text-school-brown mb-4" size={48} />
                <CardTitle>Acesso Online</CardTitle>
                <CardDescription>
                  Disponível 24 horas por dia, 7 dias por semana
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
            Como Acessar o ISAAC
          </h2>

          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <p className="text-lg text-slate-700 mb-6">
              O acesso ao sistema financeiro é exclusivo para responsáveis financeiros 
              cadastrados no colégio.
            </p>

            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start">
                <div className="bg-school-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                <p>Acesse o portal ISAAC através do link fornecido</p>
              </div>
              <div className="flex items-start">
                <div className="bg-school-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                <p>Use seu CPF e senha cadastrados no colégio</p>
              </div>
              <div className="flex items-start">
                <div className="bg-school-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                <p>Consulte informações financeiras e emita boletos</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90"
                  onClick={() => window.open('https://isaac.com.br/', '_blank')}
                >
                  <ExternalLink className="mr-2" size={20} />
                  Acessar Portal ISAAC
                </Button>

            <p className="text-sm text-slate-600 mt-4">
              Problemas com acesso? Entre em contato com a secretaria: 
              <span className="font-semibold"> (15) 2101-3800</span>
            </p>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
      
      {/* Visual Composer */}
      <VisualComposerComponent />
    </div>
  );
}