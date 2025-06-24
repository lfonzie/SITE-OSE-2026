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
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Nossos <span className="text-yellow-300">Professores</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Educadores Especializados
              </h2>
              <p className="text-xl md:text-2xl mb-6">
                Mais de 100 anos de tradição em ensino
              </p>
              <p className="text-lg mb-8 opacity-95">
                Conheça o corpo docente da OSE: educadores qualificados e experientes 
                comprometidos com a excelência acadêmica e formação integral dos alunos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-school-orange hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
                >
                  📅 Agende uma Visita
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-school-orange font-semibold px-8 py-3"
                  onClick={() => document.getElementById('detalhes')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Conheça a Equipe
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">Educadores Especialistas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="detalhes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Educadores <span className="text-school-orange">Especialistas</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Professores qualificados que combinam experiência, dedicação e paixão pelo ensino
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {diferenciais.map((diferencial, index) => {
              const Icon = diferencial.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-school-orange text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{diferencial.title}</h3>
                  <p className="text-slate-600">{diferencial.description}</p>
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