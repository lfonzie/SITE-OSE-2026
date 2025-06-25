import { GraduationCap, Award, BookOpen, Users, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Import images
import img1 from '/images/0905_1750717790206.jpg';
import img2 from '/images/0934_1750717790206.jpg';
import img3 from '/images/1068_1750717790205.jpg';

// Dados dos professores - expandir conforme necessário
const professores = [
  {
    id: 1,
    nome: "Prof. João Silva",
    disciplina: "Matemática",
    formacao: "Mestre em Matemática - USP",
    experiencia: "15 anos de experiência",
    sobre: "Especialista em metodologias ativas para o ensino de matemática, com foco no desenvolvimento do raciocínio lógico.",
    foto: "/images/0905_1750717790206.jpg"
  },
  {
    id: 2,
    nome: "Profa. Maria Santos",
    disciplina: "Português",
    formacao: "Doutora em Letras - UNICAMP",
    experiencia: "20 anos de experiência",
    sobre: "Especializada em literatura brasileira e produção textual, promovendo o amor pela leitura e escrita.",
    foto: "/images/0934_1750717790206.jpg"
  },
  {
    id: 3,
    nome: "Prof. Carlos Lima",
    disciplina: "Física",
    formacao: "Mestre em Física - UNESP",
    experiencia: "12 anos de experiência",
    sobre: "Apaixonado por ensinar física através de experimentos práticos e aplicações do cotidiano.",
    foto: "/images/1068_1750717790205.jpg"
  },
  {
    id: 4,
    nome: "Profa. Ana Costa",
    disciplina: "Química",
    formacao: "Doutora em Química - USP",
    experiencia: "18 anos de experiência",
    sobre: "Especialista em química orgânica e inorgânica, utilizando laboratório para aprendizado prático.",
    foto: "/images/0023_1750717790208.jpg"
  },
  {
    id: 5,
    nome: "Prof. Roberto Ferreira",
    disciplina: "História",
    formacao: "Mestre em História - PUC-SP",
    experiencia: "16 anos de experiência",
    sobre: "Dedicado ao ensino de história brasileira e mundial, conectando passado e presente.",
    foto: "/images/0312_1750717790204.jpg"
  },
  {
    id: 6,
    nome: "Profa. Lúcia Oliveira",
    disciplina: "Geografia",
    formacao: "Especialista em Geografia - UNESP",
    experiencia: "14 anos de experiência",
    sobre: "Focada em geografia humana e física, utilizando tecnologia e mapas interativos.",
    foto: "/images/0354_1750717790205.jpg"
  },
  {
    id: 7,
    nome: "Prof. Paulo Mendes",
    disciplina: "Biologia",
    formacao: "Doutor em Biologia - USP",
    experiencia: "22 anos de experiência",
    sobre: "Especialista em biologia molecular e ecologia, promovendo consciência ambiental.",
    foto: "/images/0378_1750717790208.jpg"
  },
  {
    id: 8,
    nome: "Profa. Fernanda Rocha",
    disciplina: "Inglês",
    formacao: "Mestre em Linguística - UNICAMP",
    experiencia: "10 anos de experiência",
    sobre: "Certificada Cambridge, especializada em metodologia comunicativa e preparação para exames internacionais.",
    foto: "/images/0491_1750717790207.jpg"
  },
  {
    id: 9,
    nome: "Prof. Marcos Almeida",
    disciplina: "Educação Física",
    formacao: "Especialista em Educação Física - USP",
    experiencia: "13 anos de experiência",
    sobre: "Focado no desenvolvimento motor e formação de valores através do esporte.",
    foto: "/images/0541_1750717790207.jpg"
  },
  {
    id: 10,
    nome: "Profa. Juliana Campos",
    disciplina: "Artes",
    formacao: "Mestre em Artes Visuais - UNESP",
    experiencia: "11 anos de experiência",
    sobre: "Especializada em artes visuais e história da arte, estimulando a criatividade dos alunos.",
    foto: "/images/0581_1750717790206.jpg"
  },
  {
    id: 11,
    nome: "Prof. Eduardo Barbosa",
    disciplina: "Filosofia",
    formacao: "Doutor em Filosofia - USP",
    experiencia: "19 anos de experiência",
    sobre: "Especialista em ética e filosofia política, desenvolvendo pensamento crítico nos estudantes.",
    foto: "/images/0700_1750717790204.jpg"
  },
  {
    id: 12,
    nome: "Profa. Carla Nascimento",
    disciplina: "Sociologia",
    formacao: "Mestre em Sociologia - UNICAMP",
    experiencia: "8 anos de experiência",
    sobre: "Focada em sociologia contemporânea e direitos humanos, formando cidadãos conscientes.",
    foto: "/images/1092_1750717790205.jpg"
  },
  // Adicione mais professores aqui...
  {
    id: 13,
    nome: "Prof. Ricardo Souza",
    disciplina: "Informática",
    formacao: "Mestre em Ciência da Computação - USP",
    experiencia: "9 anos de experiência",
    sobre: "Especialista em programação e tecnologia educacional, preparando alunos para o futuro digital.",
    foto: "/images/1105_1750717790206.jpg"
  },
  {
    id: 14,
    nome: "Profa. Sandra Martins",
    disciplina: "Psicologia",
    formacao: "Doutora em Psicologia - PUC-SP",
    experiencia: "17 anos de experiência",
    sobre: "Especializada em psicologia educacional e desenvolvimento socioemocional dos estudantes.",
    foto: "/images/1285_1750717790208.jpg"
  },
  {
    id: 15,
    nome: "Prof. Gustavo Pereira",
    disciplina: "Espanhol",
    formacao: "Mestre em Letras Hispânicas - USP",
    experiencia: "7 anos de experiência",
    sobre: "Nativo de Buenos Aires, especializado em cultura hispano-americana e preparação para DELE.",
    foto: "/images/1295_1750717790207.jpg"
  }
  // Continue adicionando mais professores até completar 50+
];

export default function Professores() {
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
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Nossos <span className="text-school-orange">Professores</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Educadores <strong>especializados</strong> e <strong>comprometidos</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                Conheça o corpo docente da OSE: profissionais qualificados com mais de 100 anos 
                de tradição em educação, dedicados ao desenvolvimento integral e sucesso acadêmico 
                de cada aluno.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-school-orange font-semibold px-8 py-3"
                  onClick={() => window.location.href = '/agendamento'}
                >
                  📅 Agende uma Visita
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white font-semibold px-8 py-3"
                  onClick={() => document.getElementById('mural')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">Nossos Professores</p>
                </div>
              </div>
            </div>
          </div>
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

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}