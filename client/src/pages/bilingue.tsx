import { Globe, Users, BookOpen, Award, Target, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Import images
import img1 from '/images/0312_1750717790204.jpg';
import img2 from '/images/0354_1750717790205.jpg';
import img3 from '/images/0581_1750717790206.jpg';
import img4 from '/images/0700_1750717790204.jpg';

export default function Bilingue() {
  const features = [
    {
      icon: Globe,
      title: "Cidadania Global",
      description: "Formação de consciência cultural e perspectiva internacional, preparando alunos para um mundo globalizado."
    },
    {
      icon: Users,
      title: "Imersão Total",
      description: "Ambiente completamente bilíngue que promove fluência natural através da prática constante."
    },
    {
      icon: BookOpen,
      title: "MacMillan Education",
      description: "Material didático de excelência internacional com metodologia comprovada e reconhecida mundialmente."
    },
    {
      icon: Award,
      title: "Fluência Autêntica",
      description: "Desenvolvimento de competências comunicativas reais para uso prático em contextos diversos."
    },
    {
      icon: Target,
      title: "Metodologia Ativa",
      description: "Aprendizado através de projetos, experiências práticas e situações do cotidiano."
    },
    {
      icon: Brain,
      title: "Pensamento Crítico",
      description: "Desenvolvimento de análise crítica e capacidade de reflexão em ambos os idiomas."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Global <span className="text-school-orange">Citizens</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Educação Bilíngue Integral
              </h2>
              <p className="text-xl md:text-2xl mb-6">
                Formando cidadãos globais conscientes
              </p>
              <p className="text-lg mb-8 opacity-95">
                Nossa educação bilíngue integral com MacMillan Education oferece uma abordagem 
                holística e interdisciplinar, preparando alunos para um mundo interconectado.
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
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Globe className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">Educação Bilíngue</p>
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
              Educação que <span className="text-school-orange">Transforma</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Uma jornada rumo à educação bilíngue que forma cidadãos globais 
              preparados para os desafios do futuro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-school-orange text-white w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-6">
            <OptimizedImage
              src={img2}
              alt="Atividades bilíngues na OSE"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img3}
              alt="Material MacMillan Education"
              className="w-full h-48 rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img4}
              alt="Cidadania global em prática"
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