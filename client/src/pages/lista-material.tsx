import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BookOpen, Backpack, Palette } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { useAuth } from '@/contexts/AuthContext';
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import { usePageData } from '@/hooks/usePageData';
import LogoutButton from '@/components/LogoutButton';
import MaterialListManager from '@/components/MaterialListManager';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Usando imagens da pasta public/images
const img1 = "/images/0934_1750717790206.jpg";
const img2 = "/images/1105_1750717790206.jpg";
const img3 = "/images/0581_1750717790206.jpg";
const img4 = "/images/0491_1750717790207.jpg";
const img5 = "/images/0541_1750717790207.jpg";

export default function ListaMaterial() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Lista de Material');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const { 
    heroImage, 
    images, 
    updateHeroImage, 
    updateImage, 
    getImagePosition, 
    updateImagePosition 
  } = usePageData('Lista de Material', {
    heroImage: img1,
    images: [img2, img3, img4, img5]
  });

  const { data: materialLists = [] } = useQuery({
    queryKey: ['/api/material-lists'],
    queryFn: async () => {
      const response = await fetch('/api/material-lists');
      return response.json();
    }
  });

  useEffect(() => {
    updateSEO({
      title: "Lista de Material Escolar | Colégio OSE",
      description: "Confira a lista de material escolar por segmento. Materiais organizados para o sucesso acadêmico dos nossos alunos.",
      keywords: "lista material, material escolar, colégio ose, educação infantil, fundamental, ensino médio"
    });
  }, []);

  const segmentos = [
    {
      titulo: "Educação Infantil",
      descricao: "Material lúdico e pedagógico para os primeiros anos",
      icone: <Palette className="text-school-orange" size={40} />,
      series: ["Jardim I", "Jardim II"],
      imagem: "/images/12.png"
    },
    {
      titulo: "Fundamental I",
      descricao: "Material completo para os anos iniciais",
      icone: <BookOpen className="text-school-orange" size={40} />,
      series: ["1º Ano", "2º Ano", "3º Ano", "4º Ano", "5º Ano"],
      imagem: "/images/6.png"
    },
    {
      titulo: "Fundamental II",
      descricao: "Material específico para os anos finais",
      icone: <Backpack className="text-school-orange" size={40} />,
      series: ["6º Ano", "7º Ano", "8º Ano", "9º Ano"],
      imagem: "/images/9.png"
    },
    {
      titulo: "Ensino Médio",
      descricao: "Material preparatório para vestibular e ENEM",
      icone: <FileText className="text-school-orange" size={40} />,
      series: ["1ª Série", "2ª Série", "3ª Série"],
      imagem: "/images/2.png"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Logout button for authenticated users */}
      {isAuthenticated && <LogoutButton />}
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <DragImagePosition
            src={heroImage || img1}
            alt="Lista de Material OSE"
            className="w-full h-full opacity-30"
            editable={isAuthenticated}
            initialPosition={{
              x: getImagePosition('hero')?.horizontalPosition || 0,
              y: getImagePosition('hero')?.verticalPosition || 0
            }}
            onPositionChange={(position: { x: number; y: number }) => {
              const currentPos = getImagePosition('hero') || {
                objectPosition: 'center center',
                horizontalPosition: 0,
                verticalPosition: 0,
                scale: 1,
                opacity: 1,
                filter: 'none',
                objectFit: 'cover' as const
              };
              updateImagePosition('hero', {
                ...currentPos,
                objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                horizontalPosition: position.x,
                verticalPosition: position.y
              });
            }}
          />
          {isAuthenticated && (
            <>
              <EnhancedImageSelector
                currentImage={heroImage || img1}
                onImageSelect={updateHeroImage}
                className="absolute top-2 right-2 z-10"
              />
              <ImagePositionControls
                currentPosition={getImagePosition('hero')}
                onPositionChange={(position) => updateImagePosition('hero', position)}
                className="absolute inset-0"
              />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-700/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Lista de <span className="text-school-orange">Material</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Material <strong>organizado</strong> para o <strong>sucesso acadêmico</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                Confira as listas de material escolar por segmento. Materiais cuidadosamente 
                selecionados para apoiar o desenvolvimento educacional e criativo dos nossos alunos.
              </p>
              </div>
          </div>
        </div>
      </section>

      {/* Informações Importantes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Informações <span className="text-school-orange">Importantes</span>
            </h2>
            <p className="text-xl text-slate-600">
              Tudo que você precisa saber sobre o material escolar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <Calendar className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Prazo</h3>
              <p className="text-slate-600">
                Listas disponíveis a partir de dezembro para o ano letivo seguinte
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <Download className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Download</h3>
              <p className="text-slate-600">
                Baixe as listas em PDF para facilitar suas compras
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <FileText className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Organização</h3>
              <p className="text-slate-600">
                Material organizado por disciplina e período letivo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Listas por Segmento */}
      <section id="listas" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Listas por <span className="text-school-orange">Segmento</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Selecione o segmento para acessar a lista de material específica
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {segmentos.map((segmento, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <DragImagePosition
                    src={segmento.imagem} 
                    alt={`Material ${segmento.titulo}`}
                    className="w-full h-full"
                    editable={isAuthenticated}
                    initialPosition={{
                      x: getImagePosition(`segmento-${index}`)?.horizontalPosition || 0,
                      y: getImagePosition(`segmento-${index}`)?.verticalPosition || 0
                    }}
                    onPositionChange={(position: { x: number; y: number }) => {
                      const currentPos = getImagePosition(`segmento-${index}`) || {
                        objectPosition: 'center center',
                        horizontalPosition: 0,
                        verticalPosition: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'none',
                        objectFit: 'cover' as const
                      };
                      updateImagePosition(`segmento-${index}`, {
                        ...currentPos,
                        objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                        horizontalPosition: position.x,
                        verticalPosition: position.y
                      });
                    }}
                  />
                  {isAuthenticated && (
                    <>
                      <EnhancedImageSelector
                        currentImage={segmento.imagem}
                        onImageSelect={(url) => {
                          // Update the segmento image
                          segmentos[index].imagem = url;
                        }}
                        className="absolute top-2 right-2 z-10"
                      />
                      <ImagePositionControls
                        currentPosition={getImagePosition(`segmento-${index}`)}
                        onPositionChange={(position) => updateImagePosition(`segmento-${index}`, position)}
                        className="absolute inset-0"
                      />
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 left-4">
                    {segmento.icone}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{segmento.titulo}</h3>
                  <p className="text-slate-600 mb-6">{segmento.descricao}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {segmento.series.map((serie, serieIndex) => (
                      <Button 
                        key={serieIndex}
                        size="sm"
                        variant="outline"
                        className="border-school-orange text-school-orange hover:bg-school-orange hover:text-white"
                        onClick={() => alert(`Lista do ${serie} será disponibilizada em dezembro`)}
                      >
                        <Download className="mr-1" size={12} />
                        {serie}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aviso */}
          <div className="mt-12 bg-school-orange/10 border-l-4 border-school-orange p-6 rounded-r-lg">
            <div className="flex items-start">
              <FileText className="text-school-orange mt-1 mr-3 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Importante</h4>
                <p className="text-slate-700">
                As listas de material para 2026 estarão disponíveis a partir de dezembro de 2025. 
                Fique atento aos nossos canais de comunicação para mais informações.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dicas para Pais */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Dicas para <span className="text-school-orange">Pais</span>
            </h2>
            <p className="text-xl text-slate-600">
              Como organizar e economizar na compra do material escolar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Planeje com Antecedência</h4>
                  <p className="text-slate-600">Baixe a lista assim que disponível e compare preços em diferentes fornecedores.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Reaproveite Materiais</h4>
                  <p className="text-slate-600">Verifique quais materiais do ano anterior ainda podem ser utilizados.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Compras Coletivas</h4>
                  <p className="text-slate-600">Organize compras em grupo com outros pais para conseguir melhores preços.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <OptimizedImage 
                src={img5} 
                alt="Organização de material escolar"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Material List Management for Admin */}
      {isAuthenticated && (
        <section className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Gerenciar <span className="text-school-orange">Links dos Materiais</span>
              </h2>
              <p className="text-lg text-slate-600">
                Configure os links do Google Drive para cada ano/série
              </p>
            </div>
            <MaterialListManager />
          </div>
        </section>
      )}

      <WhyOSESection />
      <ContactSection />

      {/* Visual Composer */}
      <VisualComposerComponent />
    </div>
  );
}