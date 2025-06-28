import { GraduationCap, Award, BookOpen, Users, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Use new image paths from updated folder
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img1;
const img2 = newImages.img2;
const img3 = newImages.img3;

interface Professor {
  id: string;
  nome: string;
  disciplina: string;
  formacao: string;
  experiencia: string;
  sobre: string;
  foto: string;
}

// Dados dos professores de fallback (caso a API não funcione)
const professoresFallback = [
  {
    id: '1',
    nome: "Prof. João Silva",
    disciplina: "Matemática",
    formacao: "Mestre em Matemática - USP",
    experiencia: "15 anos de experiência",
    sobre: "Especialista em metodologias ativas para o ensino de matemática, com foco no desenvolvimento do raciocínio lógico.",
    foto: img1
  },
  {
    id: '2',
    nome: "Profa. Maria Santos",
    disciplina: "Português",
    formacao: "Doutora em Letras - UNICAMP",
    experiencia: "20 anos de experiência",
    sobre: "Especializada em literatura brasileira e produção textual, promovendo o amor pela leitura e escrita.",
    foto: img2
  },
  {
    id: '3',
    nome: "Prof. Carlos Lima",
    disciplina: "Física",
    formacao: "Mestre em Física - UNESP",
    experiencia: "12 anos de experiência",
    sobre: "Apaixonado por ensinar física através de experimentos práticos e aplicações do cotidiano.",
    foto: img3
  },
  {
    id: '4',
    nome: "Profa. Ana Costa",
    disciplina: "Química",
    formacao: "Doutora em Química - USP",
    experiencia: "18 anos de experiência",
    sobre: "Especialista em química orgânica e inorgânica, utilizando laboratório para aprendizado prático.",
    foto: "/images/0023_1750717790208.jpg"
  },
  {
    id: '5',
    nome: "Prof. Roberto Ferreira",
    disciplina: "História",
    formacao: "Mestre em História - PUC-SP",
    experiencia: "16 anos de experiência",
    sobre: "Dedicado ao ensino de história brasileira e mundial, conectando passado e presente.",
    foto: "/images/0312_1750717790204.jpg"
  },
  {
    id: '6',
    nome: "Profa. Lúcia Oliveira",
    disciplina: "Geografia",
    formacao: "Especialista em Geografia - UNESP",
    experiencia: "14 anos de experiência",
    sobre: "Focada em geografia humana e física, utilizando tecnologia e mapas interativos.",
    foto: "/images/0354_1750717790205.jpg"
  },
  {
    id: '7',
    nome: "Prof. Paulo Mendes",
    disciplina: "Biologia",
    formacao: "Doutor em Biologia - USP",
    experiencia: "22 anos de experiência",
    sobre: "Especialista em biologia molecular e ecologia, promovendo consciência ambiental.",
    foto: "/images/0378_1750717790208.jpg"
  },
  {
    id: '8',
    nome: "Profa. Fernanda Rocha",
    disciplina: "Inglês",
    formacao: "Mestre em Linguística - UNICAMP",
    experiencia: "10 anos de experiência",
    sobre: "Certificada Cambridge, especializada em metodologia comunicativa e preparação para exames internacionais.",
    foto: "/images/0491_1750717790207.jpg"
  },
  {
    id: '9',
    nome: "Prof. Marcos Almeida",
    disciplina: "Educação Física",
    formacao: "Especialista em Educação Física - USP",
    experiencia: "13 anos de experiência",
    sobre: "Focado no desenvolvimento motor e formação de valores através do esporte.",
    foto: "/images/0541_1750717790207.jpg"
  },
  {
    id: '10',
    nome: "Profa. Juliana Campos",
    disciplina: "Artes",
    formacao: "Mestre em Artes Visuais - UNESP",
    experiencia: "11 anos de experiência",
    sobre: "Especializada em artes visuais e história da arte, estimulando a criatividade dos alunos.",
    foto: "/images/0581_1750717790206.jpg"
  },
  {
    id: '11',
    nome: "Prof. Eduardo Barbosa",
    disciplina: "Filosofia",
    formacao: "Doutor em Filosofia - USP",
    experiencia: "19 anos de experiência",
    sobre: "Especialista em ética e filosofia política, desenvolvendo pensamento crítico nos estudantes.",
    foto: "/images/0700_1750717790204.jpg"
  },
  {
    id: '12',
    nome: "Profa. Carla Nascimento",
    disciplina: "Sociologia",
    formacao: "Mestre em Sociologia - UNICAMP",
    experiencia: "8 anos de experiência",
    sobre: "Focada em sociologia contemporânea e direitos humanos, formando cidadãos conscientes.",
    foto: "/images/1092_1750717790205.jpg"
  },
  // Adicione mais professores aqui...
  {
    id: '13',
    nome: "Prof. Ricardo Souza",
    disciplina: "Informática",
    formacao: "Mestre em Ciência da Computação - USP",
    experiencia: "9 anos de experiência",
    sobre: "Especialista em programação e tecnologia educacional, preparando alunos para o futuro digital.",
    foto: "/images/1105_1750717790206.jpg"
  },
  {
    id: '14',
    nome: "Profa. Sandra Martins",
    disciplina: "Psicologia",
    formacao: "Doutora em Psicologia - PUC-SP",
    experiencia: "17 anos de experiência",
    sobre: "Especializada em psicologia educacional e desenvolvimento socioemocional dos estudantes.",
    foto: "/images/1285_1750717790208.jpg"
  },
  {
    id: '15',
    nome: "Prof. Gustavo Pereira",
    disciplina: "Espanhol",
    formacao: "Mestre em Letras Hispânicas - USP",
    experiencia: "7 anos de experiência",
    sobre: "Nativo de Buenos Aires, especializado em cultura hispano-americana e preparação para DELE.",
    foto: "/images/1295_1750717790207.jpg"
  }
  // Continue adicionando mais professores até completar 50+
];

const professoresDefault: Professor[] = [
  {
    id: '1',
    nome: 'Samanta Chibau Mileze',
    disciplina: 'Coordenadora Pedagógica',
    formacao: 'Pedagogia - Universidade de Sorocaba',
    experiencia: '15 anos de experiência em educação',
    foto: '/images/samanta.jpg'
  },
  {
    id: '2',
    nome: 'Fernando Silva',
    disciplina: 'Matemática e Física',
    formacao: 'Licenciatura em Matemática - USP',
    experiencia: '12 anos de experiência em ensino',
    foto: '/images/fernando.jpeg'
  },
  {
    id: '3',
    nome: 'Edna Santos',
    disciplina: 'Língua Portuguesa',
    formacao: 'Letras - PUC-SP',
    experiencia: '20 anos de experiência em educação',
    foto: '/images/edna.jpg'
  }
];

export default function Professores() {
  const { isAuthenticated } = useAuth();
  const { VisualComposerComponent } = useVisualComposer('Professores');
  const [professores, setProfessores] = useState<Professor[]>(professoresDefault);

  const { 
    heroImage, 
    heroBackground,
    images, 
    updateHeroImage, 
    updateImage, 
    updateHeroBackground,
    getImagePosition, 
    updateImagePosition 
  } = usePageData('Professores', {
    heroImage: img1,
    images: [img2, img3],
    heroBackground: {
      type: 'image',
      imageUrl: img1,
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.7,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  // Carregar professores da API
  useEffect(() => {
    const loadProfessores = async () => {
      try {
        const response = await fetch('/api/professores');
        if (response.ok) {
          const data = await response.json();
          // Converter para o formato esperado pela interface
          const professoresFormatted = data.map((prof: any) => ({
            id: prof.id.toString(),
            nome: prof.nome,
            disciplina: prof.disciplina,
            formacao: prof.formacao,
            experiencia: prof.experiencia,
            sobre: prof.sobre || '',
            foto: prof.foto
          }));
          setProfessores(professoresFormatted);
        }
      } catch (error) {
        console.error('Erro ao carregar professores:', error);
        // Fallback para localStorage se a API falhar
        const savedProfessores = localStorage.getItem('professores-data');
        if (savedProfessores) {
          setProfessores(JSON.parse(savedProfessores));
        }
      }
    };

    loadProfessores();
  }, []);

  const diferenciais = [
    {
      icon: GraduationCap,
      title: "Formação Especializada",
      description: "Professores com graduação, especialização e pós-graduação em suas áreas de atuação."
    },
    {
      icon: Award,
      title: "Excelência Reconhecida",
      description: "Corpo docente com especialização, mestrado e doutorado nas suas áreas de atuação."
    },
    {
      icon: BookOpen,
      title: "Metodologia Inovadora",
      description: "Aplicação de metodologias ativas e tecnologias educacionais modernas."
    },
    {
      icon: Users,
      title: "Relacionamento Próximo",
      description: "Acompanhamento individualizado e relacionamento próximo com alunos e famílias."
    },
    {
      icon: Target,
      title: "Foco no Resultado",
      description: "Compromisso com o desenvolvimento integral e sucesso acadêmico dos estudantes."
    },
    {
      icon: Heart,
      title: "Paixão pelo Ensino",
      description: "Dedicação genuína à educação e ao crescimento pessoal de cada aluno."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 text-white overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nossos Professores
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Conheça nossa equipe de educadores dedicados e experientes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mural de Professores */}
      <section id="mural" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-school-brown mb-4">
              Mural dos <span className="text-school-orange">Professores</span>
            </h2>
            <p className="text-xl text-school-brown max-w-4xl mx-auto">
              Conheça nossos educadores especialistas, cada um dedicado ao sucesso e desenvolvimento integral de nossos alunos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {professores.map((professor) => (
              <div 
                key={professor.id}
                className="bg-white border-2 border-school-orange/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6"
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <OptimizedImage
                      src={professor.foto}
                      alt={`${professor.nome} - Professor de ${professor.disciplina}`}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-school-orange shadow-lg"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-school-brown mb-2">
                    {professor.nome}
                  </h3>

                  <p className="text-school-orange font-semibold text-lg mb-3">
                    {professor.disciplina}
                  </p>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-school-brown font-medium">
                      {professor.formacao}
                    </p>
                    <p className="text-sm text-school-brown/70">
                      {professor.experiencia}
                    </p>
                  </div>

                  <p className="text-sm text-school-brown leading-relaxed">
                    {professor.sobre}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-school-brown mb-6">
              Nossa equipe conta com mais de 50 professores especialistas comprometidos com a excelência educacional.
            </p>
            <Button 
              className="bg-school-orange text-white font-semibold px-8 py-3"
              onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
            >
              Conheça Toda Nossa Equipe Pessoalmente
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-school-brown mb-4">
              Diferenciais dos Nossos <span className="text-school-orange">Educadores</span>
            </h2>
            <p className="text-xl text-school-brown max-w-4xl mx-auto">
              Professores qualificados que combinam experiência, dedicação e paixão pelo ensino
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {diferenciais.map((diferencial, index) => {
              const Icon = diferencial.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-school-orange/10">
                  <div className="bg-school-orange text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-school-brown mb-4">{diferencial.title}</h3>
                  <p className="text-school-brown">{diferencial.description}</p>
                </div>
              );
            })}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-6">
            <OptimizedImage
              src={img1}
              alt="Corpo docente especializado"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img2}
              alt="Educadores qualificados"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img3}
              alt="Metodologia inovadora"
              className="w-full h-48 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Professores Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-slate-600">
              Profissionais dedicados ao crescimento e desenvolvimento de nossos alunos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professores.map((professor, index) => (
              <motion.div
                key={professor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-slate-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                  <OptimizedImage
                    src={professor.foto}
                    alt={professor.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {professor.nome}
                </h3>
                <p className="text-school-orange font-medium mb-2">
                  {professor.disciplina}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {professor.formacao}
                </p>
                <p className="text-slate-600 text-sm">
                  {professor.experiencia}
                </p>
              </motion.div>
            ))}
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