
import React, { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { Button } from "@/components/ui/button";
import { Award, Users, BookOpen, Trophy, Star, Building2, GraduationCap, Heart, Map } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import { newImages } from "@/lib/image-verification";
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';

const timeline = [
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
    description: "A OSE consolida-se como referência educacional em Sorocaba e região, com significativo crescimento no número de alunos.",
    icon: <Trophy size={24} />
  },
  {
    year: "1989",
    title: "OSE Uirapuru",
    description: "Arthur Fonseca Filho, Kiko Fonseca e Nelson Raul criam a OSE Uirapuru como extensão da OSE, unindo tradição e inovação pedagógica.",
    icon: <GraduationCap size={24} />
  },
  {
    year: "1997",
    title: "OSE Santa Rosália",
    description: "Inauguração da unidade OSE Santa Rosália na Avenida Roberto Simonsen, expandindo a presença da OSE para atender mais famílias da região.",
    icon: <Map size={24} />
  },
  {
    year: "1999",
    title: "Independência do Uirapuru",
    description: "A OSE Uirapuru torna-se administrativamente independente como Colégio Uirapuru, mantendo os princípios educacionais e colaboração com a OSE.",
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
    title: "Independência Santa Rosália",
    description: "A OSE Santa Rosália torna-se administrativamente independente como Colégio Santa Rosália, mantendo os princípios educacionais e colaboração com a OSE.",
    icon: <Award size={24} />
  },
  {
    year: "2011",
    title: "Nova Direção e Consolidação",
    description: "Kiko Fonseca assume a direção geral da OSE, promovendo modernização tecnológica e mantendo os valores tradicionais da instituição. Consolidação das unidades independentes.",
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

const historicalFigures = [
  {
    name: "Dr. Arthur Cyrillo Freire",
    role: "Fundador e Visionário",
    description: "Nascido em 1878, em Fortaleza. Advogado, educador, jornalista e ativista social. Promotor Público no Amazonas, advogado da Companhia Antártica Paulista e defensor dos trabalhadores das docas de Santos.",
    details: "Participou da Revolução Constitucionalista de 1932 e recebeu o título de Cidadão Sorocabano. Uma escola estadual em Sorocaba leva seu nome."
  },
  {
    name: "Professor Arthur Fonseca",
    role: "Diretor e Político",
    description: "Nascido em 1922, modernizou e expandiu a OSE. Vereador de Sorocaba (1947-1950), Secretário de Educação e Saúde (1969-1970) e Deputado Federal (1971-1975).",
    details: "Defensor da educação técnica, tem uma avenida em Sorocaba nomeada em sua homenagem."
  },
  {
    name: "Nelson Fonseca",
    role: "Gestor Financeiro",
    description: "Nascido em 1924, foi fundamental na gestão financeira e administrativa da OSE. Garantiu a sustentabilidade econômica e participou ativamente da comunidade sorocabana.",
    details: "O Centro de Educação Infantil (CEI) Nelson Fonseca leva seu nome em reconhecimento à sua contribuição educacional."
  }
];

const institutions = [
  {
    name: "OSE Uirapuru",
    period: "1989-1999",
    description: "Criado como extensão da OSE por Arthur Fonseca Filho, Kiko Fonseca e Nelson Raul. Iniciou com 130 alunos de 4 a 10 anos, focando na união entre tradição e inovação pedagógica.",
    impact: "Tornou-se referência em qualidade docente e formação continuada de professores."
  },
  {
    name: "OSE Santa Rosália",
    period: "1997-2010",
    description: "Inaugurada no bairro Santa Rosália, começou em uma casa na Av. Roberto Simonsen e depois se mudou para a Rua Manoel Pereira e Silva. Implantou o Ensino Fundamental II em 2004. Em 2010 tornou-se independente como Colégio Santa Rosália.",
    impact: "Expandiu a presença da OSE para uma região nobre de Sorocaba, atendendo mais famílias."
  },
  {
    name: "Faculdade IMAPES",
    period: "2000-2010",
    description: "Instituto Manchester Paulista de Ensino Superior oferecia cursos de Administração (RH e Comércio Exterior), Biblioteconomia e Química. Chegou a ter 1.500 alunos.",
    impact: "Formou profissionais qualificados e ampliou o legado educacional da OSE para o ensino superior."
  }
];

export default function Legacy() {
  const { isAuthenticated } = useAuth();
  
  const { 
    heroBackground,
    images, 
    updateImage, 
    updateHeroBackground
  } = usePageData('Legacy', {
    images: [newImages.horizontal2, newImages.horizontal3, newImages.horizontal4],
    heroBackground: {
      type: 'gradient',
      gradientColors: ['#475569', '#64748b'],
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
      title: "História da OSE - 100 Anos de Tradição | OSE",
      description: "Conheça a rica história da OSE: desde 1924, um século de excelência educacional em Sorocaba. Uma jornada de tradição, inovação e formação integral.",
      keywords: "história OSE, tradição educacional, 100 anos, legado, colégio tradicional sorocaba, Arthur Cyrillo Freire"
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
          backgroundSize: heroBackground?.type === 'image' ? heroBackground.size || 'cover' : 'auto',
          backgroundPosition: heroBackground?.type === 'image' ? heroBackground.position || 'center' : 'center',
          backgroundRepeat: heroBackground?.type === 'image' ? heroBackground.repeat || 'no-repeat' : 'no-repeat',
          opacity: heroBackground?.opacity || 1
        }}
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
              opacity: heroBackground.overlayOpacity || 0.7
            }}
          ></div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-left"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Um Século de <span className="text-school-orange">Legado</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl font-semibold mb-4 text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Tradição Secular de Ensino
              </motion.p>
              <motion.p 
                className="text-xl md:text-2xl mb-6 text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Desde 1924 • 100 Anos de Excelência
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95 text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                A Organização Sorocabana de Ensino celebra 100 anos de excelência educacional, 
                formando gerações de líderes e transformando vidas através da educação de qualidade.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* História Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fundada em 1924, a Organização Sorocabana de Ensino nasceu com o propósito de oferecer educação de qualidade para a comunidade sorocabana. Ao longo de um século, construímos uma trajetória sólida baseada em valores como excelência acadêmica, formação integral e inovação pedagógica.
              </p>
            </div>
            <div className="relative">
              <img
                src={images[0] || newImages.horizontal2}
                alt="História OSE"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {isAuthenticated && (
                <EnhancedImageSelector
                  currentImage={images[0] || newImages.horizontal2}
                  onImageSelect={(imageUrl) => updateImage(0, imageUrl)}
                  className="absolute inset-0"
                />
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
                  <div className={`p-4 rounded-xl shadow-lg border-l-4 ${
                    event.highlight 
                      ? 'bg-gradient-to-r from-school-orange/10 to-school-orange/5 border-school-orange' 
                      : 'bg-white border-slate-300'
                  }`}>
                    <div className={`text-2xl font-bold mb-2 ${
                      event.highlight ? 'text-school-orange' : 'text-slate-700'
                    }`}>
                      {event.year}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{event.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Desktop Layout: Two columns alternating */}
                <div className={`hidden md:flex md:items-center md:w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <div className={`p-6 rounded-xl shadow-lg border-l-4 ${
                      event.highlight 
                        ? 'bg-gradient-to-r from-school-orange/10 to-school-orange/5 border-school-orange' 
                        : 'bg-white border-slate-300'
                    }`}>
                      <div className={`text-3xl font-bold mb-2 ${
                        event.highlight ? 'text-school-orange' : 'text-slate-700'
                      }`}>
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3">{event.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{event.description}</p>
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
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative h-64 bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center">
                  <img
                    src={images[index + 1] || newImages.horizontal3}
                    alt={figure.name}
                    className="w-full h-full object-cover"
                  />
                  {isAuthenticated && (
                    <EnhancedImageSelector
                      currentImage={images[index + 1] || newImages.horizontal3}
                      onImageSelect={(imageUrl) => updateImage(index + 1, imageUrl)}
                      className="absolute inset-0"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{figure.name}</h3>
                  <p className="text-school-orange font-semibold mb-3">{figure.role}</p>
                  <p className="text-slate-600 mb-3">{figure.description}</p>
                  <p className="text-sm text-slate-500 italic">{figure.details}</p>
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
                className="bg-slate-50 rounded-xl p-4 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative h-32 md:h-48 bg-gradient-to-b from-slate-200 to-slate-300 rounded-lg mb-4 md:mb-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={images[index + 4] || newImages.horizontal4}
                    alt={institution.name}
                    className="w-full h-full object-cover"
                  />
                  {isAuthenticated && (
                    <EnhancedImageSelector
                      currentImage={images[index + 4] || newImages.horizontal4}
                      onImageSelect={(imageUrl) => updateImage(index + 4, imageUrl)}
                      className="absolute inset-0"
                    />
                  )}
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-slate-800 mb-2">{institution.name}</h3>
                <p className="text-school-orange font-semibold mb-3 md:mb-4 text-sm md:text-base">{institution.period}</p>
                <p className="text-slate-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{institution.description}</p>
                <div className="border-t border-slate-200 pt-3 md:pt-4">
                  <p className="text-xs md:text-sm text-slate-500 italic">{institution.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Junte-se a uma comunidade educacional centenária que continua transformando 
            vidas e construindo o futuro através da educação de excelência.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange hover:bg-gray-100 font-semibold px-8 py-3"
          >
            Conheça Nossa Proposta Educacional
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
