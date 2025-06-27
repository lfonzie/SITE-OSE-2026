import React from 'react';
import { ArrowLeft, Users, Clock, BookOpen, Heart } from 'lucide-react';
import { Link } from 'wouter';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useInlineTextEditor } from '@/hooks/useInlineTextEditor';
import { useInlineImageEditor } from '@/hooks/useInlineImageEditor';
import { useInlineHeroEditor } from '@/hooks/useInlineHeroEditor';
import { usePageData } from '@/hooks/usePageData';
import { newImages } from '@/lib/image-verification';

export default function EducacaoInfantil() {
  const { InlineTextEditor } = useInlineTextEditor();
  const { InlineImageEditor } = useInlineImageEditor();
  const { InlineHeroEditor } = useInlineHeroEditor();

  const { 
    pageData, 
    updateHeroImage,
    updateHeroBackground,
    heroImage,
    heroBackground 
  } = usePageData('Educacao Infantil', {
    heroImage: newImages.horizontal1,
    heroBackground: {
      type: 'gradient',
      gradientColors: ['#ff4f00', '#ff8533'],
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.6
    }
  });

  const [content, setContent] = React.useState({
    title: "Educação Infantil",
    subtitle: "Jardim I e II - 4 a 5 anos",
    description: "Um ambiente acolhedor e estimulante onde cada criança é valorizada em sua individualidade, desenvolvendo habilidades sociais, emocionais e cognitivas através do brincar.",
    methodology: "Nossa metodologia é baseada no desenvolvimento integral da criança, respeitando seu ritmo e estimulando sua curiosidade natural através de atividades lúdicas e educativas.",
    differentials: [
      {
        icon: Heart,
        title: "Ambiente Acolhedor",
        description: "Espaços pensados especialmente para o desenvolvimento infantil"
      },
      {
        icon: Users,
        title: "Turmas Reduzidas",
        description: "Atenção individualizada para cada criança"
      },
      {
        icon: Clock,
        title: "Horário Flexível",
        description: "Período integral ou meio período conforme a necessidade"
      },
      {
        icon: BookOpen,
        title: "Aprendizado Lúdico",
        description: "Desenvolvimento através do brincar e da experiência"
      }
    ]
  });

  const updateContent = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <InlineHeroEditor
        heroImage={heroImage}
        heroBackground={heroBackground}
        onHeroImageChange={updateHeroImage}
        onHeroBackgroundChange={updateHeroBackground}
        className="py-20 text-white overflow-hidden"
        saveKey="educacao_infantil_hero"
      >
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center mb-6">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Voltar
            </Link>
          </div>

          <div className="max-w-4xl">
            <InlineTextEditor
              value={content.title}
              onSave={(value) => updateContent('title', value)}
              as="h1"
              className="text-4xl md:text-6xl font-bold mb-4 font-headline"
              placeholder="Título da página"
              saveKey="educacao_infantil_title"
            />
            <InlineTextEditor
              value={content.subtitle}
              onSave={(value) => updateContent('subtitle', value)}
              as="h2"
              className="text-xl md:text-2xl text-white/90 mb-6 font-body"
              placeholder="Subtítulo da página"
              saveKey="educacao_infantil_subtitle"
            />
            <InlineTextEditor
              value={content.description}
              onSave={(value) => updateContent('description', value)}
              as="p"
              className="text-lg md:text-xl text-white/80 max-w-3xl font-body"
              placeholder="Descrição da educação infantil"
              multiline
              saveKey="educacao_infantil_description"
            />
          </div>
        </div>
      </InlineHeroEditor>

      {/* Methodology Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <InlineTextEditor
                value="Nossa Metodologia"
                onSave={() => {}}
                as="h2"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                saveKey="methodology_title"
              />
              <InlineTextEditor
                value={content.methodology}
                onSave={(value) => updateContent('methodology', value)}
                as="p"
                className="text-lg text-gray-600 leading-relaxed"
                multiline
                placeholder="Descrição da metodologia"
                saveKey="methodology_description"
              />
            </div>
            <div className="relative">
              <InlineImageEditor
                src={newImages.horizontal2}
                alt="Metodologia OSE"
                onImageChange={(src) => console.log('Image changed:', src)}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                saveKey="methodology_image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <InlineTextEditor
              value="Nossos Diferenciais"
              onSave={() => {}}
              as="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              saveKey="differentials_title"
            />
            <InlineTextEditor
              value="O que torna a educação infantil OSE especial"
              onSave={() => {}}
              as="p"
              className="text-xl text-gray-600"
              saveKey="differentials_subtitle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.differentials.map((differential, index) => {
              const IconComponent = differential.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent size={32} className="text-school-orange" />
                    </div>
                    <InlineTextEditor
                      value={differential.title}
                      onSave={(value) => {
                        const newDifferentials = [...content.differentials];
                        newDifferentials[index].title = value;
                        updateContent('differentials', newDifferentials);
                      }}
                      as="h3"
                      className="text-xl font-bold text-gray-900"
                      saveKey={`differential_title_${index}`}
                    />
                    <InlineTextEditor
                      value={differential.description}
                      onSave={(value) => {
                        const newDifferentials = [...content.differentials];
                        newDifferentials[index].description = value;
                        updateContent('differentials', newDifferentials);
                      }}
                      as="p"
                      className="text-gray-600"
                      multiline
                      saveKey={`differential_description_${index}`}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <InlineTextEditor
              value="Nossos Espaços"
              onSave={() => {}}
              as="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              saveKey="gallery_title"
            />
            <InlineTextEditor
              value="Ambientes especialmente projetados para o desenvolvimento infantil"
              onSave={() => {}}
              as="p"
              className="text-xl text-gray-600"
              saveKey="gallery_subtitle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[newImages.horizontal3, newImages.horizontal4, newImages.horizontal5].map((image, index) => (
              <div key={index} className="relative group">
                <InlineImageEditor
                  src={image}
                  alt={`Espaço ${index + 1}`}
                  onImageChange={(src) => console.log('Gallery image changed:', src)}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  saveKey={`gallery_image_${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-school-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <InlineTextEditor
            value="Venha Conhecer Nossa Escola"
            onSave={() => {}}
            as="h2"
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            saveKey="cta_title"
          />
          <InlineTextEditor
            value="Agende uma visita e veja como podemos contribuir para o desenvolvimento do seu filho"
            onSave={() => {}}
            as="p"
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            multiline
            saveKey="cta_description"
          />
          <Button size="lg" variant="secondary" className="bg-white text-school-orange hover:bg-gray-50">
            Agendar Visita
          </Button>
        </div>
      </section>
    </div>
  );
}