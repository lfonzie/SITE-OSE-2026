import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Heart, Target, Users, Award, Star, Globe, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { newImages } from "@/lib/image-verification";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import DragImagePosition from '@/components/DragImagePosition';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { useAuth } from '@/contexts/AuthContext';
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";

export default function MissaoValores() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Missão e Valores');

  // Initialize page data with auto-save functionality
  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    updateImagePosition,
    getImagePosition 
  } = usePageData('Missão e Valores', {
    heroImage: newImages.horizontal5,
    images: [newImages.horizontal6, newImages.horizontal7, newImages.horizontal8],
    heroBackground: {
      type: 'gradient',
      gradientColors: ['#ff7f00', '#ff8f20'],
      opacity: 1,
      overlay: true,
      overlayColor: '#000000',
      overlayOpacity: 0.2,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  useEffect(() => {
    updateSEO({
      title: "Missão e Valores | a OSE",
      description: "Conheça a missão e valores do Colégio OSE. Formando líderes transformadores há 100 anos em Sorocaba.",
      keywords: "missão ose, valores colégio, educação sorocaba, líderes transformadores"
    });
  }, []);

  const valores = [
    {
      icon: Users,
      title: "Respeito",
      description: "Celebramos a diversidade e valorizamos cada voz. Estamos comprometidos em construir uma comunidade onde todos gostem de pertencer.",
      color: "bg-blue-500"
    },
    {
      icon: Star,
      title: "Entusiasmo",
      description: "Somos impulsionados por nossa paixão pela aprendizagem, curiosidade e inovação. Inspiramos uns aos outros com o exemplo e a alegria em nossas ações.",
      color: "bg-yellow-500"
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Nosso objetivo é a excelência em tudo o que fazemos. Continuamente buscamos o crescimento e aprimoramento, perpetuando a reputação de alto padrão de ensino que construímos em Sorocaba.",
      color: "bg-school-orange"
    },
    {
      icon: Target,
      title: "Responsabilidade",
      description: "Assumimos nossos compromissos e somos responsáveis por nossas ações. Priorizamos o uso consciente dos recursos, seja em nossa escola ou no planeta como um todo.",
      color: "bg-green-500"
    },
    {
      icon: Heart,
      title: "Bondade",
      description: "Valorizamos a compaixão e a justiça, sempre prontos para agir de maneira correta. Compartilhamos nosso tempo e habilidades com generosidade, fortalecendo os laços em nossa comunidade escolar e na cidade de Sorocaba.",
      color: "bg-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
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
            {heroBackground.type === 'color' && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: heroBackground.solidColor,
                  opacity: heroBackground.opacity || 1
                }}
              />
            )}
          </div>
        )}

        {/* Fallback gradient se não houver background configurado */}
        {!heroBackground && (
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #ff7f00, #ff8f20)'
            }}
          />
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
              backgroundColor: heroBackground.overlayColor || '#000000',
              opacity: heroBackground.overlayOpacity || 0.2
            }}
          />
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
                Missão e <span className="text-school-orange">Valores</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl font-semibold mb-4 text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Construindo um Legado de Excelência
              </motion.p>
              <motion.p 
                className="text-xl md:text-2xl mb-6 text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Desde 1924 • Tradição e Inovação
              </motion.p>
              <motion.p 
                className="text-lg mb-8 opacity-95 text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Nossa missão é formar cidadãos conscientes, críticos e transformadores, 
                capazes de contribuir para uma sociedade mais justa e sustentável, através 
                de uma educação de excelência pautada em valores éticos sólidos.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-school-orange rounded-full mb-6">
              <Target className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Nossa <span className="text-school-orange">Missão</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 rounded-2xl shadow-lg border border-orange-100">
              <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
                <p>
                  O Colégio OSE tem uma rica história em Sorocaba e uma reputação de desenvolver 
                  <strong className="text-school-orange"> líderes transformadores</strong>. A nossa missão é nutrir uma nova geração de líderes que não apenas prosperarão em suas próprias vidas, mas que também serão agentes de mudança, contribuindo para um mundo melhor.
                </p>

                <p>
                  Nós vemos além da mera concessão de um diploma. Firmemente acreditamos que a educação é um 
                  <strong className="text-school-brown"> processo holístico</strong> que engloba mais do que as matérias tradicionais. Nosso compromisso é formar cidadãos completos, que levam consigo a marca da diversidade, empatia e benevolência que tanto valorizamos.
                </p>

                <p>
                  Através da nossa longa história, e durante o difícil período de uma pandemia sem precedentes, reafirmamos nossa verdadeira essência de ser uma escola: um lugar onde os 
                  <strong className="text-school-orange"> valores são vividos e transmitidos</strong>.
                </p>

                <p>
                  Com salas de aula de última geração, educadores experientes e materiais didáticos inovadores, estamos preparados para enfrentar os desafios do presente e do futuro. Assim, continuamos a honrar nosso legado, sendo um 
                  <strong className="text-school-brown"> pilar de aprendizado e desenvolvimento</strong> na comunidade de Sorocaba.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-school-brown rounded-full mb-6">
              <Heart className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Nossos <span className="text-school-brown">Valores</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Os valores fundamentais que orientam todas as nossas ações e decisões educacionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`${valor.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{valor.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{valor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pilares Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-school-orange rounded-full mb-6">
              <Lightbulb className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Pilares <span className="text-school-orange">Educacionais</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Como nossos valores se traduzem em práticas educacionais transformadoras
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <div className="bg-school-orange text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Educação Integral</h3>
              <p className="text-slate-600">
                Formação que vai além do conhecimento acadêmico, desenvolvendo competências 
                socioemocionais e valores humanos.
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <div className="bg-school-brown text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Comunidade Escolar</h3>
              <p className="text-slate-600">
                Ambiente acolhedor onde todos pertencem, respeitando a diversidade e 
                promovendo a inclusão em todas as suas formas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-school-orange/10 to-school-brown/10 p-8 rounded-xl">
              <div className="bg-green-500 text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Visão Global</h3>
              <p className="text-slate-600">
                Preparação para os desafios globais, formando cidadãos conscientes e 
                responsáveis pelo futuro do planeta.
              </p>
            </div>
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
            Venha conhecer de perto como nossos valores e missão se traduzem em uma educação transformadora. 
            Junte-se a uma comunidade que há 100 anos forma líderes do futuro.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange hover:bg-gray-100 font-semibold px-8 py-3"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Conheça a OSE
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