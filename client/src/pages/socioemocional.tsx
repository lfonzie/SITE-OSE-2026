import { useEffect } from "react";
import Navigation from "@/components/navigation";
import ContactSection from "@/components/contact-section";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Heart, Users, Lightbulb, Shield, Target, Award, BookOpen, Smile, Brain } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import { useAuth } from '@/contexts/AuthContext';
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

// Importando imagens para Programa Socioemocional  
import { newImages } from "@/lib/image-verification";

export default function Socioemocional() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Programa Socioemocional');

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
  } = usePageData('Programa Socioemocional', {
    heroImage: newImages.img26,
    images: [newImages.img27, newImages.img28, newImages.img29],
    heroBackground: {
      type: 'gradient',
      gradientColors: ['#475569', '#64748b'],
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.8,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });
  useEffect(() => {
    updateSEO({
      title: "Programa SócioEmocional | a OSE",
      description: "Programa educacional da OSE voltado para o desenvolvimento socioemocional dos estudantes, formando cidadãos conscientes e emocionalmente inteligentes.",
      keywords: "programa socioemocional, inteligência emocional, desenvolvimento integral, habilidades sociais, educação OSE"
    });
  }, []);

  const competencias = [
    {
      icon: Heart,
      title: "Autoconhecimento",
      description: "Compreensão das próprias emoções, fortalezas e limitações"
    },
    {
      icon: Heart,
      title: "Autorregulação",
      description: "Gestão emocional e comportamental diante de diferentes situações"
    },
    {
      icon: Users,
      title: "Empatia",
      description: "Capacidade de compreender e se conectar com os sentimentos dos outros"
    },
    {
      icon: Brain,
      title: "Pensamento Crítico",
      description: "Análise reflexiva e questionamento construtivo da realidade"
    },
    {
      icon: Target,
      title: "Colaboração",
      description: "Habilidades para trabalhar em equipe e construir relacionamentos saudáveis"
    },
    {
      icon: Lightbulb,
      title: "Criatividade",
      description: "Desenvolvimento da capacidade inovadora e proativa"
    }
  ];

  const segmentos = [
    {
      title: "Educação Infantil",
      description: "Foco na identificação de emoções básicas através de histórias e personagens",
      features: [
        "Emoções básicas: alegria, tristeza, raiva, medo, amor",
        "Histórias e personagens lúdicos",
        "Espaço seguro para expressão emocional",
        "Atividades adaptadas à faixa etária"
      ],
      icon: Heart,
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Ensino Fundamental - Anos Iniciais (1º ao 3º ano)",
      description: "Desenvolvimento de habilidades socioemocionais fundamentais",
      features: [
        "Autoconhecimento e autorregulação",
        "Empatia e relacionamento",
        "Emoções complexas: frustração e ciúme",
        "Atividades lúdicas e reflexivas"
      ],
      icon: Heart,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Ensino Fundamental - Anos Finais (4º ao 9º ano)",
      description: "Ênfase em competências avançadas e projetos colaborativos",
      features: [
        "Criatividade e colaboração",
        "Pensamento crítico e proatividade",
        "Projetos que estimulam debates",
        "Desenvolvimento de questionamentos"
      ],
      icon: Brain,
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Ensino Médio",
      description: "Apoio ao autoconhecimento e gestão de pressões sociais",
      features: [
        "Autoconhecimento aprofundado",
        "Gestão de pressões sociais",
        "Escolhas profissionais",
        "Projetos de vida"
      ],
      icon: Heart,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const recursos = [
    {
      icon: Heart,
      title: "Materiais Didáticos",
      description: "Livros físicos e digitais, séries, músicas e jogos adaptados a cada faixa etária"
    },
    {
      icon: Users,
      title: "Formação de Educadores",
      description: "Treinamentos e mentorias pedagógicas para professores, garantindo a qualidade das aulas"
    },
    {
      icon: Heart,
      title: "Participação das Famílias",
      description: "Atividades que promovem o diálogo socioemocional em casa, fortalecendo a parceria escola-família"
    }
  ];

  const beneficios = [
    {
      icon: Heart,
      title: "Saúde Mental",
      description: "Melhoria da saúde mental e estabilidade emocional dos alunos"
    },
    {
      icon: Heart,
      title: "Prevenção de Problemas",
      description: "Redução de problemas comportamentais, como bullying e ansiedade"
    },
    {
      icon: Target,
      title: "Competências Profissionais",
      description: "Desenvolvimento de competências para o mercado de trabalho e convivência social"
    },
    {
      icon: Users,
      title: "Fortalecimento de Vínculos",
      description: "Fortalecimento de laços entre escola, alunos e famílias, promovendo respeito às diferenças"
    }
  ];

  const diferenciais = [
    "Abordagem lúdica e adequada a cada fase do desenvolvimento",
    "Espaços de reflexão sem julgamentos, incentivando o diálogo",
    "Integração com a BNCC e foco na formação integral",
    "Envolvimento ativo de professores e famílias"
  ];

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-orange-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/25 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
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
              opacity: heroBackground.overlayOpacity || 0.8
            }}
          ></div>
        )}

        <div className="relative z-10 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/20 max-w-4xl"
          >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Programa <span className="text-school-orange">Socioemocional</span>
                <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                  Desenvolvendo Competências para a Vida
                </span>
              </h1>
              <motion.p 
                className="text-xl md:text-2xl text-slate-200 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Desenvolvimento Integral da Educação Infantil ao Ensino Médio
              </motion.p>
              <motion.p 
                className="text-lg text-slate-200 mb-8 opacity-95"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                O Programa Socioemocional da nossa escola é uma iniciativa integrada ao currículo escolar, 
                voltada para o desenvolvimento integral de alunos da Educação Infantil ao Ensino Médio. 
                Com aulas semanais, o programa promove habilidades essenciais para a vida.
              </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Objetivos Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Objetivos</span> do Programa
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Criando cidadãos conscientes e emocionalmente inteligentes
            </p>
          </div>

          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 p-8 md:p-12 rounded-xl">
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              O programa busca <strong>criar um ambiente acolhedor de fala e escuta</strong>, incentivando os alunos a 
              compreenderem e gerirem suas emoções, construírem relacionamentos saudáveis e desenvolverem 
              competências socioemocionais que complementem o aprendizado acadêmico.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              A proposta valoriza a <strong>formação de cidadãos conscientes</strong>, respeitando as singularidades 
              de cada indivíduo e promovendo uma educação alinhada às demandas de um mundo em transformação.
            </p>
          </div>
        </div>
      </section>

      {/* Competências Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Competências</span> Desenvolvidas
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Habilidades essenciais para os desafios do século XXI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competencias.map((competencia, index) => {
              const Icon = competencia.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center h-full">
                    <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{competencia.title}</h3>
                    <p className="text-slate-600">{competencia.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metodologia por Segmento */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Metodologia</span> por Segmento
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Atividades adaptadas a cada faixa etária com recursos lúdicos e práticos
            </p>
          </div>

          <div className="space-y-8">
            {segmentos.map((segmento, index) => {
              const Icon = segmento.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.2} className="w-full">
                  <div className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-white/20">
                    <div className="flex items-start gap-6">
                      <div className={`bg-gradient-to-r ${segmento.color} text-white w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">{segmento.title}</h3>
                        <p className="text-lg text-slate-600 mb-6">{segmento.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {segmento.features.map((feature, i) => (
                            <div key={i} className="flex items-center">
                              <div className="w-2 h-2 bg-school-orange rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recursos e Materiais */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Recursos</span> e Materiais
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Ferramentas pedagógicas especializadas para cada etapa do desenvolvimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recursos.map((recurso, index) => {
              const Icon = recurso.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center h-full">
                    <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{recurso.title}</h3>
                    <p className="text-slate-600">{recurso.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>



      {/* Benefícios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Benefícios</span> do Programa
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Impactos positivos na vida dos estudantes e da comunidade escolar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => {
              const Icon = beneficio.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center h-full border-2 border-transparent hover:border-school-orange/20">
                    <div className="bg-school-orange text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-3">{beneficio.title}</h4>
                    <p className="text-sm text-slate-600">{beneficio.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impacto e Diferenciais */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Impacto */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                <span className="text-school-orange">Impacto</span> na Comunidade
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                O programa transforma a escola em um <strong>espaço de acolhimento</strong>, onde os alunos 
                aprendem a enfrentar desafios com confiança e empatia.
              </p>
              <p className="text-slate-600">
                Por meio de culminâncias anuais, como apresentações e portfólios, celebramos o progresso 
                dos estudantes, envolvendo toda a comunidade escolar.
              </p>
            </div>

            {/* Diferenciais */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                <span className="text-school-orange">Diferenciais</span> do Programa
              </h3>
              <div className="space-y-4">
                {diferenciais.map((diferencial, index) => (
                  <div key={index} className="flex items-start">
                    <Heart className="text-school-orange w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-600">{diferencial}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compromisso Final */}
          <div className="mt-16 bg-gradient-to-r from-school-orange to-school-brown text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nosso Compromisso
            </h2>
            <p className="text-xl mb-8 opacity-95 max-w-4xl mx-auto">
              O Programa Socioemocional da nossa escola é um compromisso com a formação de 
              indivíduos emocionalmente inteligentes, preparados para construir um futuro 
              mais colaborativo e consciente.
            </p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Investimos no desenvolvimento integral de cada aluno, respeitando suas singularidades 
              e promovendo uma educação transformadora.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Formando Cidadãos Emocionalmente Inteligentes
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            O Programa Socioemocional da OSE prepara seus filhos para enfrentar os desafios 
            da vida com inteligência emocional, empatia e consciência social.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-school-orange hover:bg-gray-100 font-semibold px-8 py-3"
          >
            Conheça Nosso Programa
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}