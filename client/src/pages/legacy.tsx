import React, { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award, Users, BookOpen, Trophy, Star, Building2, GraduationCap, Heart, Map, Edit, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import DragImagePosition from '@/components/DragImagePosition';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { useAuth } from '@/contexts/AuthContext';
import { newImages } from "@/lib/image-verification";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';


const initialTimeline = [
  {
    year: "1924",
    title: "Fundação da Escola do Comércio de Sorocaba",
    description: "Em 22 de outubro, nasce a Escola do Comércio de Sorocaba na Rua Álvaro Soares. Pioneira no ensino comercial no interior de São Paulo, com currículo inovador e abordagem pedagógica diferenciada.",
    icon: <Star size={24} />,
    highlight: true
  },
  {
    year: "1936",
    title: "Chegada da Família Fonseca",
    description: "Dr. Arthur Cyrillo Freire, Dona Tercila Bosqueti Fonseca e seus filhos Arthur e Nelson Fonseca chegam de Santos e adquirem a pequena escola com apenas 42 alunos.",
    icon: <Users size={24} />
  },
  {
    year: "1941",
    title: "Mudança para a Rua Benedito Pires",
    description: "A escola se muda para um prédio maior. Em gesto simbólico, os próprios alunos carregam os móveis e carteiras até a nova sede, demonstrando o forte vínculo com a comunidade.",
    icon: <Building2 size={24} />
  },
  {
    year: "1946",
    title: "Nasce a OSE",
    description: "Inauguração do curso ginasial e oficialização como Organização Sorocabana de Ensino (OSE). Ampliação do currículo reflete a visão de educação abrangente e formação integral.",
    icon: <BookOpen size={24} />,
    highlight: true
  },
  {
    year: "1955",
    title: "Nova Sede na Rua da Penha",
    description: "Investimento em novo prédio moderno com mais de 40 salas de aula, quatro laboratórios de química, empresa júnior e o icônico pátio com a jabuticabeira.",
    icon: <Building2 size={24} />
  },
  {
    year: "1980",
    title: "Pico de Crescimento",
    description: "A OSE atinge mais de 2.000 alunos apenas na unidade central, consolidando-se como referência educacional em Sorocaba e região.",
    icon: <Trophy size={24} />
  },
  {
    year: "1989",
    title: "Colégio Uirapuru",
    description: "Arthur Fonseca Filho, Kiko Fonseca e Nelson Raul criam o Colégio Uirapuru como extensão da OSE, unindo tradição e inovação pedagógica.",
    icon: <GraduationCap size={24} />
  },
  {
    year: "1997",
    title: "OSE Santa Rosália",
    description: "Inauguração da unidade Santa Rosália na Avenida Roberto Simonsen, expandindo a presença da OSE para atender mais famílias da região.",
    icon: <Map size={24} />
  },
  {
    year: "1999",
    title: "Independência do Uirapuru",
    description: "O Colégio Uirapuru torna-se administrativamente independente, mantendo os princípios educacionais e colaboração com a OSE.",
    icon: <Award size={24} />
  },
  {
    year: "2000",
    title: "Faculdade IMAPES",
    description: "Criação da Faculdade IMAPES (Instituto Manchester Paulista de Ensino Superior), expandindo para o ensino superior com cursos de Administração, Biblioteconomia e Química.",
    icon: <GraduationCap size={24} />
  },
  {
    year: "2010",
    title: "Nova Direção",
    description: "Kiko Fonseca assume a direção geral da OSE, promovendo modernização tecnológica e mantendo os valores tradicionais da instituição.",
    icon: <Heart size={24} />
  },
  {
    year: "2024",
    title: "Centenário",
    description: "Celebração de 100 anos de excelência educacional, olhando para o futuro com a sabedoria de um século de tradição e inovação.",
    icon: <Trophy size={24} />,
    highlight: true
  }
];

const initialHistoricalFigures = [
  {
    name: "Dr. Arthur Cyrillo Freire",
    role: "Fundador e Visionário",
    description: "Nascido em 1878, em Fortaleza. Advogado, educador, jornalista e ativista social. Promotor Público no Amazonas, advogado da Companhia Antártica Paulista e defensor dos trabalhadores das docas de Santos.",
    image: newImages.horizontal7,
    details: "Participou da Revolução Constitucionalista de 1932 e recebeu o título de Cidadão Sorocabano. Uma escola estadual em Sorocaba leva seu nome."
  },
  {
    name: "Professor Arthur Fonseca",
    role: "Diretor e Político",
    description: "Nascido em 1922, modernizou e expandiu a OSE. Vereador de Sorocaba (1947-1950), Secretário de Educação e Saúde (1969-1970) e Deputado Federal (1971-1975).",
    image: newImages.horizontal8,
    details: "Defensor da educação técnica, tem uma avenida em Sorocaba nomeada em sua homenagem."
  },
  {
    name: "Nelson Fonseca",
    role: "Gestor Financeiro",
    description: "Nascido em 1924, foi fundamental na gestão financeira e administrativa da OSE. Garantiu a sustentabilidade econômica e participou ativamente da comunidade sorocabana.",
    image: newImages.horizontal9,
    details: "O Centro de Educação Infantil (CEI) Nelson Fonseca leva seu nome em reconhecimento à sua contribuição educacional."
  }
];

const initialInstitutions = [
  {
    name: "Colégio Uirapuru",
    period: "1989-1999",
    description: "Criado como extensão da OSE por Arthur Fonseca Filho, Kiko Fonseca e Nelson Raul. Iniciou com 130 alunos de 4 a 10 anos, focando na união entre tradição e inovação pedagógica.",
    image: newImages.horizontal10,
    impact: "Tornou-se referência em qualidade docente e formação continuada de professores."
  },
  {
    name: "OSE Santa Rosália",
    period: "1997-2010",
    description: "Inaugurada no bairro Santa Rosália, começou em uma casa na Av. Roberto Simonsen e depois se mudou para a Rua Manoel Pereira e Silva. Implantou o Ensino Fundamental II em 2004.",
    image: newImages.horizontal11,
    impact: "Expandiu a presença da OSE para uma região nobre de Sorocaba, atendendo mais famílias."
  },
  {
    name: "Faculdade IMAPES",
    period: "2000-2010",
    description: "Instituto Manchester Paulista de Ensino Superior oferecia cursos de Administração (RH e Comércio Exterior), Biblioteconomia e Química. Chegou a ter 1.500 alunos.",
    image: newImages.horizontal12,
    impact: "Formou profissionais qualificados e ampliou o legado educacional da OSE para o ensino superior."
  }
];

export default function Legacy() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Legado OSE');
  const { toast } = useToast();

  // Estados de edição
  const [editingTimeline, setEditingTimeline] = useState<number | null>(null);
  const [editingFigure, setEditingFigure] = useState<number | null>(null);
  const [editingInstitution, setEditingInstitution] = useState<number | null>(null);

  // Estados editáveis para o conteúdo
  const [timeline, setTimeline] = useState(initialTimeline);
  const [historicalFigures, setHistoricalFigures] = useState(initialHistoricalFigures);
  const [institutions, setInstitutions] = useState(initialInstitutions);

  // Estados temporários para edição
  const [tempData, setTempData] = useState<any>({});

  // Initialize page data with auto-save functionality
  const { 
    pageData,
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('Legado OSE', {
    heroImage: newImages.horizontal1,
    images: [newImages.horizontal2, newImages.horizontal3, newImages.horizontal4],
    heroBackground: {
      type: 'gradient' as const,
      gradientColors: ['#475569', '#64748b'],
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.8,
      position: 'center',
      size: 'cover' as const,
      repeat: 'no-repeat' as const
    }
  });

  const [content, setContent] = useState({
    title: "Um Século de Excelência",
    subtitle: "1924 - 2024: 100 Anos de Tradição Educacional",
    description: "A Organização Sorocabana de Ensino é uma instituição que há um século desempenha papel fundamental na formação de milhares de estudantes em Sorocaba e região, contribuindo para o desenvolvimento social, econômico e cultural da cidade.",
    historyTitle: "Nossa História",
    historyText: "Fundada em 1924, a Organização Sorocabana de Ensino nasceu com o propósito de oferecer educação de qualidade para a comunidade sorocabana. Ao longo de um século, construímos uma trajetória sólida baseada em valores como excelência acadêmica, formação integral e inovação pedagógica.",
    milestonesTitle: "Marcos Importantes",
    valuesTitle: "Nossos Valores",
    valuesDescription: "Os pilares que sustentam nossa filosofia educacional há 100 anos"
  });

  const updateContent = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    updateSEO({
      title: "História da OSE - 100 Anos de Tradição | OSE",
      description: "Conheça a rica história da OSE: desde 1924, um século de excelência educacional em Sorocaba. Uma jornada de tradição, inovação e formação integral.",
      keywords: "história OSE, tradição educacional, 100 anos, legado, colégio tradicional sorocaba, Arthur Cyrillo Freire"
    });
  }, []);

  // Funções de edição para timeline
  const startEditingTimeline = (index: number) => {
    setEditingTimeline(index);
    setTempData({ ...timeline[index] });
  };

  const saveTimelineEdit = () => {
    if (editingTimeline !== null) {
      const newTimeline = [...timeline];
      newTimeline[editingTimeline] = { ...tempData, icon: timeline[editingTimeline].icon };
      setTimeline(newTimeline);
      setEditingTimeline(null);
      toast({
        title: "Texto atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    }
  };

  const cancelEdit = () => {
    setEditingTimeline(null);
    setEditingFigure(null);
    setEditingInstitution(null);
    setTempData({});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="py-20 text-white overflow-hidden relative"
        style={{
          backgroundImage: `linear-gradient(rgba(71, 85, 105, 0.6), rgba(100, 116, 139, 0.6)), url('${heroImage || newImages.horizontal1}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
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
            {isAuthenticated && editingTimeline === null ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => {
                      setTempData(content);
                      setEditingTimeline(-1); // Use -1 for hero editing
                    }}
                  >
                    <Edit size={16} className="mr-2" />
                    Editar Conteúdo
                  </Button>
                </div>
              </div>
            ) : null}

            {editingTimeline === -1 ? (
              <div className="space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Input
                  value={tempData.title || content.title}
                  onChange={(e) => setTempData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Título da página"
                />
                <Input
                  value={tempData.subtitle || content.subtitle}
                  onChange={(e) => setTempData(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Subtítulo da página"
                />
                <Textarea
                  value={tempData.description || content.description}
                  onChange={(e) => setTempData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[100px]"
                  placeholder="Descrição da página"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-600 border-green-600 text-white hover:bg-green-700"
                    onClick={() => {
                      setContent(prev => ({ ...prev, ...tempData }));
                      setEditingTimeline(null);
                      toast({
                        title: "Conteúdo atualizado",
                        description: "As alterações foram salvas com sucesso."
                      });
                    }}
                  >
                    <Save size={16} className="mr-2" />
                    Salvar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-600 border-red-600 text-white hover:bg-red-700"
                    onClick={cancelEdit}
                  >
                    <X size={16} className="mr-2" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline">
                  Um Século de <span className="text-orange-500">Excelência</span>
                </h1>
                <h2 className="text-xl md:text-2xl text-white/90 mb-6 font-body">
                  {content.subtitle}
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl font-body whitespace-pre-line">
                  {content.description}
                </p>
              </>
            )}
          </div>
        </div>

        {isAuthenticated && (
          <div className="absolute top-4 right-4 z-20">
            <EnhancedImageSelector
              currentImage={heroImage || newImages.horizontal1}
              onImageSelect={updateHeroImage}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
            />
          </div>
        )}
      </section>

      {/* História Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {content.historyTitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {content.historyText}
              </p>
            </div>
            <div className="relative">
              {isAuthenticated ? (
                <DragImagePosition
                  src={images[0] || newImages.horizontal2}
                  alt="História OSE"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  editable={true}
                  initialPosition={{
                    x: getImagePosition('history-image')?.horizontalPosition || 0,
                    y: getImagePosition('history-image')?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition('history-image') || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      borderRadius: 0,
                      objectFit: 'cover' as const
                    };
                    updateImagePosition('history-image', {
                      ...currentPos,
                      horizontalPosition: position.x,
                      verticalPosition: position.y
                    });
                  }}
                />
              ) : (
                <img
                  src={images[0] || newImages.horizontal2}
                  alt="História OSE"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              )}
              {isAuthenticated && (
                <div className="absolute top-4 right-4">
                  <EnhancedImageSelector
                    currentImage={images[0] || newImages.horizontal2}
                    onImageSelect={(imageUrl) => updateImage(0, imageUrl)}
                    className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Linha do <span className="text-school-orange">Tempo</span>
            </h2>
            <p className="text-xl text-slate-600">
              Uma jornada centenária de dedicação e inovação educacional
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line - Desktop (center) and Mobile (left) */}
            <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-px h-full w-0.5 bg-school-orange"></div>

            {timeline.map((event, index) => (
              <motion.div 
                key={index}
                className="relative flex items-start mb-12 md:mb-16"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Mobile Layout: Single column with left timeline */}
                <div className="block md:hidden w-full pl-16">
                  <div className={`p-4 rounded-xl shadow-lg border-l-4 relative ${
                    event.highlight 
                      ? 'bg-gradient-to-r from-school-orange/10 to-school-orange/5 border-school-orange' 
                      : 'bg-white border-slate-300'
                  }`}>
                    {/* Botão de edição para admin */}
                    {isAuthenticated && editingTimeline !== index && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 p-1 h-8 w-8"
                        onClick={() => startEditingTimeline(index)}
                      >
                        <Edit size={12} />
                      </Button>
                    )}

                    {editingTimeline === index ? (
                      <div className="space-y-3">
                        <Input
                          value={tempData.year || ''}
                          onChange={(e) => setTempData({...tempData, year: e.target.value})}
                          className="text-lg font-bold"
                          placeholder="Ano"
                        />
                        <Input
                          value={tempData.title || ''}
                          onChange={(e) => setTempData({...tempData, title: e.target.value})}
                          className="text-lg font-bold"
                          placeholder="Título"
                        />
                        <Textarea
                          value={tempData.description || ''}
                          onChange={(e) => setTempData({...tempData, description: e.target.value})}
                          className="text-sm"
                          placeholder="Descrição"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveTimelineEdit}>
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
                        <div className={`text-2xl font-bold mb-2 ${
                          event.highlight ? 'text-school-orange' : 'text-slate-700'
                        }`}>
                          {event.year}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{event.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Desktop Layout: Two columns alternating */}
                <div className={`hidden md:flex md:items-center md:w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <div className={`p-6 rounded-xl shadow-lg border-l-4 relative ${
                      event.highlight 
                        ? 'bg-gradient-to-r from-school-orange/10 to-school-orange/5 border-school-orange' 
                        : 'bg-white border-slate-300'
                    }`}>
                      {/* Botão de edição para admin */}
                      {isAuthenticated && editingTimeline !== index && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 p-1 h-8 w-8"
                          onClick={() => startEditingTimeline(index)}
                        >
                          <Edit size={12} />
                        </Button>
                      )}

                      {editingTimeline === index ? (
                        <div className="space-y-3">
                          <Input
                            value={tempData.year || ''}
                            onChange={(e) => setTempData({...tempData, year: e.target.value})}
                            className="text-2xl font-bold"
                            placeholder="Ano"
                          />
                          <Input
                            value={tempData.title || ''}
                            onChange={(e) => setTempData({...tempData, title: e.target.value})}
                            className="text-xl font-bold"
                            placeholder="Título"
                          />
                          <Textarea
                            value={tempData.description || ''}
                            onChange={(e) => setTempData({...tempData, description: e.target.value})}
                            placeholder="Descrição"
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={saveTimelineEdit}>
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
                          <div className={`text-3xl font-bold mb-2 ${
                            event.highlight ? 'text-school-orange' : 'text-slate-700'
                          }`}>
                            {event.year}
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-3">{event.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{event.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot - Mobile (left) and Desktop (center) */}
                <div className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg 
                  left-0 md:left-1/2 md:transform md:-translate-x-1/2 ${
                  event.highlight ? 'bg-school-orange' : 'bg-slate-600'
                }`}>
                  <div className="text-sm md:text-base">
                    {event.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Figures */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Grandes <span className="text-school-orange">Personalidades</span>
            </h2>
            <p className="text-xl text-slate-600">
              Os visionários que construíram nossa história
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {historicalFigures.map((figure, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Botão de edição para admin */}
                {isAuthenticated && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 z-10 p-1 h-8 w-8 bg-white/90"
                    onClick={() => {
                      setEditingFigure(editingFigure === index ? null : index);
                      if (editingFigure !== index) {
                        setTempData({ ...figure });
                      }
                    }}
                  >
                    <Edit size={12} />
                  </Button>
                )}

                <div className="h-64 bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center relative overflow-hidden">
                  {isAuthenticated ? (
                    <DragImagePosition
                      src={figure.image}
                      alt={figure.name}
                      className="w-full h-full object-cover"
                      editable={true}
                      initialPosition={{
                        x: getImagePosition(`figure-${index}`)?.horizontalPosition || 0,
                        y: getImagePosition(`figure-${index}`)?.verticalPosition || 0
                      }}
                      onPositionChange={(position: { x: number; y: number }) => {
                        const currentPos = getImagePosition(`figure-${index}`) || {
                          objectPosition: 'center center',
                          horizontalPosition: 0,
                          verticalPosition: 0,
                          scale: 1,
                          opacity: 1,
                          filter: 'none',
                          borderRadius: 0,
                          objectFit: 'cover' as const
                        };
                        updateImagePosition(`figure-${index}`, {
                          ...currentPos,
                          horizontalPosition: position.x,
                          verticalPosition: position.y
                        });
                      }}
                    />
                  ) : (
                    <img
                      src={figure.image}
                      alt={figure.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {isAuthenticated && (
                    <div className="absolute top-2 left-2">
                      <EnhancedImageSelector
                        currentImage={figure.image}
                        onImageSelect={(url) => {
                          const newFigures = [...historicalFigures];
                          newFigures[index] = { ...newFigures[index], image: url };
                          setHistoricalFigures(newFigures);
                        }}
                        className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {editingFigure === index ? (
                    <div className="space-y-3">
                      <Input
                        value={tempData.name || ''}
                        onChange={(e) => setTempData({...tempData, name: e.target.value})}
                        className="font-bold"
                        placeholder="Nome"
                      />
                      <Input
                        value={tempData.role || ''}
                        onChange={(e) => setTempData({...tempData, role: e.target.value})}
                        className="text-school-orange"
                        placeholder="Função"
                      />
                      <Textarea
                        value={tempData.description || ''}
                        onChange={(e) => setTempData({...tempData, description: e.target.value})}
                        placeholder="Descrição"
                        rows={3}
                      />
                      <Textarea
                        value={tempData.details || ''}
                        onChange={(e) => setTempData({...tempData, details: e.target.value})}
                        placeholder="Detalhes"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => {
                          const newFigures = [...historicalFigures];
                          newFigures[index] = tempData;
                          setHistoricalFigures(newFigures);
                          setEditingFigure(null);
                          toast({
                            title: "Personalidade atualizada",
                            description: "As alterações foram salvas."
                          });
                        }}>
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
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{figure.name}</h3>
                      <p className="text-school-orange font-semibold mb-3">{figure.role}</p>
                      <p className="text-slate-600 mb-3">{figure.description}</p>
                      <p className="text-sm text-slate-500 italic">{figure.details}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Institutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Instituições <span className="text-school-orange">Históricas</span>
            </h2>
            <p className="text-xl text-slate-600">
              Expandindo o legado educacional da OSE
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {institutions.map((institution, index) => (
              <motion.div 
                key={index}
                className="bg-slate-50 rounded-xl p-4 md:p-8 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Botão de edição para admin */}
                {isAuthenticated && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 z-10 p-1 h-8 w-8 bg-white/90"
                    onClick={() => {
                      setEditingInstitution(editingInstitution === index ? null : index);
                      if (editingInstitution !== index) {
                        setTempData({ ...institution });
                      }
                    }}
                  >
                    <Edit size={12} />
                  </Button>
                )}

                <div className="h-32 md:h-48 bg-gradient-to-b from-slate-200 to-slate-300 rounded-lg mb-4 md:mb-6 flex items-center justify-center relative overflow-hidden">
                  {isAuthenticated ? (
                    <DragImagePosition
                      src={institution.image || newImages.horizontal10}
                      alt={institution.name}
                      className="w-full h-full object-cover rounded-lg"
                      editable={true}
                      initialPosition={{
                        x: getImagePosition(`institution-${index}`)?.horizontalPosition || 0,
                        y: getImagePosition(`institution-${index}`)?.verticalPosition || 0
                      }}
                      onPositionChange={(position: { x: number; y: number }) => {
                        const currentPos = getImagePosition(`institution-${index}`) || {
                          objectPosition: 'center center',
                          horizontalPosition: 0,
                          verticalPosition: 0,
                          scale: 1,
                          opacity: 1,
                          filter: 'none',
                          borderRadius: 0,
                          objectFit: 'cover' as const
                        };
                        updateImagePosition(`institution-${index}`, {
                          ...currentPos,
                          horizontalPosition: position.x,
                          verticalPosition: position.y
                        });
                      }}
                    />
                  ) : (
                    <img
                      src={institution.image || newImages.horizontal10}
                      alt={institution.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  {isAuthenticated && (
                    <div className="absolute top-2 left-2">
                      <EnhancedImageSelector
                        currentImage={institution.image || newImages.horizontal10}
                        onImageSelect={(url) => {
                          const newInstitutions = [...institutions];
                          newInstitutions[index] = { ...newInstitutions[index], image: url };
                          setInstitutions(newInstitutions);
                        }}
                        className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                </div>

                {editingInstitution === index ? (
                  <div className="space-y-3">
                    <Input
                      value={tempData.name || ''}
                      onChange={(e) => setTempData({...tempData, name: e.target.value})}
                      className="font-bold"
                      placeholder="Nome"
                    />
                    <Input
                      value={tempData.period || ''}
                      onChange={(e) => setTempData({...tempData, period: e.target.value})}
                      className="text-school-orange"
                      placeholder="Período"
                    />
                    <Textarea
                      value={tempData.description || ''}
                      onChange={(e) => setTempData({...tempData, description: e.target.value})}
                      placeholder="Descrição"
                      rows={3}
                    />
                    <Textarea
                      value={tempData.impact || ''}
                      onChange={(e) => setTempData({...tempData, impact: e.target.value})}
                      placeholder="Impacto"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => {
                        const newInstitutions = [...institutions];
                        newInstitutions[index] = tempData;
                        setInstitutions(newInstitutions);
                        setEditingInstitution(null);
                        toast({
                          title: "Instituição atualizada",
                          description: "As alterações foram salvas."
                        });
                      }}>
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
                    <h3 className="text-lg md:text-2xl font-bold text-slate-800 mb-2">{institution.name}</h3>
                    <p className="text-school-orange font-semibold mb-3 md:mb-4 text-sm md:text-base">{institution.period}</p>
                    <p className="text-slate-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{institution.description}</p>
                    <div className="border-t border-slate-200 pt-3 md:pt-4">
                      <p className="text-xs md:text-sm text-slate-500 italic">{institution.impact}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why OSE Section */}
      <WhyOSESection />

      {/* Contact Section */}
      <ContactSection />

      {/* Visual Composer */}
      {isAuthenticated && (
        <VisualComposerComponent />
      )}
    </div>
  );
}