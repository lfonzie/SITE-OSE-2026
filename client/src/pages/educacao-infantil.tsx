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
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        {/* Background Image */}
        <InlineHeroEditor
          heroImage={heroImage}
          heroBackground={heroBackground}
          onHeroImageChange={updateHeroImage}
          onHeroBackgroundChange={updateHeroBackground}
          className="absolute inset-0"
          saveKey="educacao_infantil_hero"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-700/80"></div>
        </InlineHeroEditor>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-4xl md:text-6xl font-bold mb-6"
              placeholder="Título da página"
              saveKey="educacao_infantil_title"
            />
            <InlineTextEditor
              value={content.subtitle}
              onSave={(value) => updateContent('subtitle', value)}
              as="h2"
              className="text-2xl md:text-3xl font-semibold mb-4"
              placeholder="Subtítulo da página"
              saveKey="educacao_infantil_subtitle"
            />
            <InlineTextEditor
              value={content.description}
              onSave={(value) => updateContent('description', value)}
              as="p"
              className="text-xl md:text-2xl mb-6"
              placeholder="Descrição da educação infantil"
              multiline
              saveKey="educacao_infantil_description"
            />
          </div>
        </div>
      </section>

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

      {/* Approach Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <InlineTextEditor
              value="Nossa Abordagem Pedagógica"
              onSave={() => {}}
              as="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              saveKey="approach_title"
            />
            <InlineTextEditor
              value="Metodologia baseada no desenvolvimento integral da criança"
              onSave={() => {}}
              as="p"
              className="text-xl text-gray-600 max-w-4xl mx-auto"
              saveKey="approach_subtitle"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Heart size={32} />
              </div>
              <InlineTextEditor
                value="Pedagogia Finlandesa"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="approach_1_title"
              />
              <InlineTextEditor
                value="Metodologia que prioriza o bem-estar e desenvolvimento natural da criança"
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="approach_1_description"
              />
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <BookOpen size={32} />
              </div>
              <InlineTextEditor
                value="Aprender Brincando"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="approach_2_title"
              />
              <InlineTextEditor
                value="O brincar como principal ferramenta de aprendizagem e desenvolvimento"
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="approach_2_description"
              />
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl text-center">
              <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Users size={32} />
              </div>
              <InlineTextEditor
                value="Socialização"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="approach_3_title"
              />
              <InlineTextEditor
                value="Desenvolvimento de habilidades sociais e emocionais essenciais"
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="approach_3_description"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <InlineTextEditor
              value="Campos de Experiências BNCC"
              onSave={() => {}}
              as="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              saveKey="curriculum_title"
            />
            <InlineTextEditor
              value="Desenvolvemos todas as competências previstas na Base Nacional Comum Curricular"
              onSave={() => {}}
              as="p"
              className="text-xl text-gray-600 max-w-4xl mx-auto"
              saveKey="curriculum_subtitle"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <InlineTextEditor
                value="O eu, o outro e o nós"
                onSave={() => {}}
                as="h4"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="curriculum_1_title"
              />
              <InlineTextEditor
                value="Desenvolvimento da identidade, autonomia e convivência social respeitosa"
                onSave={() => {}}
                as="p"
                className="text-gray-600 mb-4"
                multiline
                saveKey="curriculum_1_description"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <InlineTextEditor
                value="Corpo, gestos e movimentos"
                onSave={() => {}}
                as="h4"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="curriculum_2_title"
              />
              <InlineTextEditor
                value="Exploração do corpo como forma de comunicação, expressão e aprendizagem"
                onSave={() => {}}
                as="p"
                className="text-gray-600 mb-4"
                multiline
                saveKey="curriculum_2_description"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <InlineTextEditor
                value="Traços, sons, cores e formas"
                onSave={() => {}}
                as="h4"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="curriculum_3_title"
              />
              <InlineTextEditor
                value="Desenvolvimento da criatividade e expressão artística através das linguagens"
                onSave={() => {}}
                as="p"
                className="text-gray-600 mb-4"
                multiline
                saveKey="curriculum_3_description"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <InlineTextEditor
                value="Escuta, fala, pensamento e imaginação"
                onSave={() => {}}
                as="h4"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="curriculum_4_title"
              />
              <InlineTextEditor
                value="Ampliação do universo discursivo e desenvolvimento da linguagem oral e escrita"
                onSave={() => {}}
                as="p"
                className="text-gray-600 mb-4"
                multiline
                saveKey="curriculum_4_description"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg md:col-span-2">
              <InlineTextEditor
                value="Espaços, tempos, quantidades, relações e transformações"
                onSave={() => {}}
                as="h4"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="curriculum_5_title"
              />
              <InlineTextEditor
                value="Desenvolvimento do raciocínio lógico e compreensão do mundo físico e social"
                onSave={() => {}}
                as="p"
                className="text-gray-600 mb-4"
                multiline
                saveKey="curriculum_5_description"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <InlineTextEditor
              value="Horários e Organização"
              onSave={() => {}}
              as="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              saveKey="schedule_title"
            />
            <InlineTextEditor
              value="Rotina estruturada que respeita o ritmo das crianças"
              onSave={() => {}}
              as="p"
              className="text-xl text-gray-600 max-w-4xl mx-auto"
              saveKey="schedule_subtitle"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <InlineTextEditor
                value="Jardim I (4 anos)"
                onSave={() => {}}
                as="h3"
                className="text-2xl font-bold text-gray-900 mb-4"
                saveKey="schedule_1_title"
              />
              <div className="space-y-3">
                <InlineTextEditor
                  value="Manhã: 7h30 às 11h30"
                  onSave={() => {}}
                  as="p"
                  className="text-gray-700 font-semibold"
                  saveKey="schedule_1_morning"
                />
                <InlineTextEditor
                  value="Tarde: 13h30 às 17h30"
                  onSave={() => {}}
                  as="p"
                  className="text-gray-700 font-semibold"
                  saveKey="schedule_1_afternoon"
                />
                <InlineTextEditor
                  value="Integral: 7h30 às 17h30"
                  onSave={() => {}}
                  as="p"
                  className="text-gray-700 font-semibold"
                  saveKey="schedule_1_integral"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <InlineTextEditor
                value="Jardim II (5 anos)"
                onSave={() => {}}
                as="h3"
                className="text-2xl font-bold text-gray-900 mb-4"
                saveKey="schedule_2_title"
              />
              <div className="space-y-3">
                <InlineTextEditor
                  value="Manhã: 7h30 às 11h30"
                  onSave={() => {}}
                  as="p"
                  className="text-gray-700 font-semibold"
                  saveKey="schedule_2_morning"
                />
                <InlineTextEditor
                  value="Tarde: 13h30 às 17h30"
                  onSave={() => {}}
                  as="p"
                  className="text-gray-700 font-semibold"
                  saveKey="schedule_2_afternoon"
                />
                <InlineTextEditor
                  value="Integral: 7h30 às 17h30"
                  onSave={() => {}}
                  as="p"
                  className="text-gray-700 font-semibold"
                  saveKey="schedule_2_integral"
                />
              </div>
            </div>
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

      {/* Why Choose OSE Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <InlineTextEditor
              value="Por que escolher a OSE?"
              onSave={() => {}}
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-6 text-slate-800"
              saveKey="why_ose_title"
            />
            <InlineTextEditor
              value="Conheça os diferenciais que fazem da OSE a escolha ideal para a educação do seu filho."
              onSave={() => {}}
              as="p"
              className="text-xl max-w-4xl mx-auto text-slate-600"
              saveKey="why_ose_subtitle"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-school-orange" />
              </div>
              <InlineTextEditor
                value="100 Anos de Tradição"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="why_ose_1_title"
              />
              <InlineTextEditor
                value="A OSE possui um diferencial que poucos colégios no Brasil têm: tradição secular e rica história educacional."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="why_ose_1_description"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-school-orange" />
              </div>
              <InlineTextEditor
                value="Formação Integral"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="why_ose_2_title"
              />
              <InlineTextEditor
                value="Educamos com base em valores éticos sólidos, preparando gerações para o sucesso e a cidadania."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="why_ose_2_description"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} className="text-school-orange" />
              </div>
              <InlineTextEditor
                value="Ambiente Acolhedor"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="why_ose_3_title"
              />
              <InlineTextEditor
                value="Criamos espaços seguros onde cada criança pode crescer individualmente e socialmente."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="why_ose_3_description"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-school-orange" />
              </div>
              <InlineTextEditor
                value="Excelência Reconhecida"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="why_ose_4_title"
              />
              <InlineTextEditor
                value="98% de satisfação das famílias comprova nosso compromisso com a qualidade educacional."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="why_ose_4_description"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <InlineTextEditor
              value="Diferenciais da Educação Infantil OSE"
              onSave={() => {}}
              as="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              saveKey="differentials_main_title"
            />
            <InlineTextEditor
              value="Metodologia única que combina tradição e inovação no desenvolvimento infantil"
              onSave={() => {}}
              as="p"
              className="text-xl text-gray-600 max-w-4xl mx-auto"
              saveKey="differentials_main_subtitle"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-school-orange/5 to-school-brown/5 p-8 rounded-xl">
              <InlineTextEditor
                value="Pedagogia Finlandesa"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="diff_1_title"
              />
              <InlineTextEditor
                value="Metodologia que prioriza o bem-estar e desenvolvimento natural da criança, respeitando seu ritmo único de aprendizagem."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="diff_1_description"
              />
            </div>

            <div className="bg-gradient-to-br from-school-orange/5 to-school-brown/5 p-8 rounded-xl">
              <InlineTextEditor
                value="Turmas Reduzidas"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="diff_2_title"
              />
              <InlineTextEditor
                value="Máximo de 15 alunos por turma, garantindo atenção personalizada e acompanhamento individual de cada criança."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="diff_2_description"
              />
            </div>

            <div className="bg-gradient-to-br from-school-orange/5 to-school-brown/5 p-8 rounded-xl">
              <InlineTextEditor
                value="Espaços Especializados"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="diff_3_title"
              />
              <InlineTextEditor
                value="Ambientes projetados especificamente para a educação infantil, com mobiliário adequado e recursos pedagógicos específicos."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="diff_3_description"
              />
            </div>

            <div className="bg-gradient-to-br from-school-orange/5 to-school-brown/5 p-8 rounded-xl">
              <InlineTextEditor
                value="Programa Bilíngue"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="diff_4_title"
              />
              <InlineTextEditor
                value="Introdução natural ao inglês através de atividades lúdicas e imersão cultural desde os primeiros anos."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="diff_4_description"
              />
            </div>

            <div className="bg-gradient-to-br from-school-orange/5 to-school-brown/5 p-8 rounded-xl">
              <InlineTextEditor
                value="Acompanhamento Psicopedagógico"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="diff_5_title"
              />
              <InlineTextEditor
                value="Profissionais especializados em desenvolvimento infantil acompanham cada criança em seu processo de aprendizagem."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="diff_5_description"
              />
            </div>

            <div className="bg-gradient-to-br from-school-orange/5 to-school-brown/5 p-8 rounded-xl">
              <InlineTextEditor
                value="Parceria com as Famílias"
                onSave={() => {}}
                as="h3"
                className="text-xl font-bold text-gray-900 mb-4"
                saveKey="diff_6_title"
              />
              <InlineTextEditor
                value="Comunicação diária e envolvimento ativo das famílias no processo educativo através de plataformas digitais."
                onSave={() => {}}
                as="p"
                className="text-gray-600"
                multiline
                saveKey="diff_6_description"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <InlineTextEditor
              value="O que as famílias dizem"
              onSave={() => {}}
              as="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              saveKey="testimonials_title"
            />
            <InlineTextEditor
              value="Depoimentos de pais que confiam na educação OSE"
              onSave={() => {}}
              as="p"
              className="text-xl text-gray-600 max-w-4xl mx-auto"
              saveKey="testimonials_subtitle"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={newImages.horizontal2}
                  alt="Mãe satisfeita"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <InlineTextEditor
                    value="Ana Paula Silva"
                    onSave={() => {}}
                    as="h4"
                    className="font-bold text-gray-900"
                    saveKey="testimonial_1_name"
                  />
                  <InlineTextEditor
                    value="Mãe do João - Jardim II"
                    onSave={() => {}}
                    as="p"
                    className="text-sm text-gray-600"
                    saveKey="testimonial_1_role"
                  />
                </div>
              </div>
              <InlineTextEditor
                value="Meu filho desenvolveu muito na OSE. O carinho dos professores e a metodologia diferenciada fizeram toda a diferença. Ele ama ir para a escola todos os dias!"
                onSave={() => {}}
                as="p"
                className="text-gray-700 italic"
                multiline
                saveKey="testimonial_1_text"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={newImages.horizontal3}
                  alt="Pai satisfeito"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <InlineTextEditor
                    value="Carlos Eduardo Santos"
                    onSave={() => {}}
                    as="h4"
                    className="font-bold text-gray-900"
                    saveKey="testimonial_2_name"
                  />
                  <InlineTextEditor
                    value="Pai da Maria - Jardim I"
                    onSave={() => {}}
                    as="p"
                    className="text-sm text-gray-600"
                    saveKey="testimonial_2_role"
                  />
                </div>
              </div>
              <InlineTextEditor
                value="A estrutura da escola e o preparo dos profissionais nos impressionaram desde o primeiro dia. Nossa filha se adaptou rapidamente e está florescendo!"
                onSave={() => {}}
                as="p"
                className="text-gray-700 italic"
                multiline
                saveKey="testimonial_2_text"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={newImages.horizontal4}
                  alt="Família feliz"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <InlineTextEditor
                    value="Família Oliveira"
                    onSave={() => {}}
                    as="h4"
                    className="font-bold text-gray-900"
                    saveKey="testimonial_3_name"
                  />
                  <InlineTextEditor
                    value="Pais do Pedro - Jardim II"
                    onSave={() => {}}
                    as="p"
                    className="text-sm text-gray-600"
                    saveKey="testimonial_3_role"
                  />
                </div>
              </div>
              <InlineTextEditor
                value="Escolhemos a OSE pela tradição e não nos arrependemos. O desenvolvimento socioemocional do nosso filho tem sido excepcional."
                onSave={() => {}}
                as="p"
                className="text-gray-700 italic"
                multiline
                saveKey="testimonial_3_text"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <InlineTextEditor
            value="Entre em Contato"
            onSave={() => {}}
            as="h2"
            className="text-3xl font-bold text-slate-800 mb-8"
            saveKey="contact_title"
          />
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <InlineTextEditor
              value="Telefone: (15) 2101-3800"
              onSave={() => {}}
              as="p"
              className="text-lg text-slate-600 mb-4"
              saveKey="contact_phone"
            />
            <InlineTextEditor
              value="WhatsApp: (15) 2101-3812"
              onSave={() => {}}
              as="p"
              className="text-lg text-slate-600 mb-4"
              saveKey="contact_whatsapp"
            />
            <InlineTextEditor
              value="Horário de atendimento: Segunda a sexta, das 7h às 17h"
              onSave={() => {}}
              as="p"
              className="text-slate-600"
              saveKey="contact_hours"
            />
          </div>
        </div>
      </section>
    </div>
  );
}