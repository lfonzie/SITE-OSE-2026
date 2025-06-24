import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Music, Dumbbell, Globe, TreePine, Clock } from "lucide-react";

export default function Integral() {
  useEffect(() => {
    updateSEO({
      title: "Integral Flex - Período Integral Flexível | a OSE",
      description: "Integral Flex na OSE: período integral flexível das 12h às 17h30. Desenvolvimento integral com apoio acadêmico, nutrição e atividades complementares.",
      keywords: "período integral sorocaba, integral flex, desenvolvimento integral, apoio acadêmico"
    });
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Apoio Acadêmico",
      description: "Vai além da mera assistência nas tarefas escolares. Fornecemos apoio acadêmico individualizado, facilitando o aprendizado profundo com estratégias adaptadas às necessidades de cada aluno."
    },
    {
      icon: Heart,
      title: "Nutrição e Bem-Estar",
      description: "Cardápio planejado por nutricionistas, assegurando que cada refeição e lanche seja nutricionalmente balanceado e contribua para a saúde e desempenho acadêmico dos alunos."
    },
    {
      icon: Music,
      title: "Musicalização e Arte",
      description: "A arte e a música são fundamentais para o desenvolvimento emocional, social e cognitivo. Utilizamos essas disciplinas como ferramentas de ensino para enriquecer a experiência educacional."
    },
    {
      icon: Dumbbell,
      title: "Atividades Físicas e Relaxamento",
      description: "Oferecemos atividades que variam desde técnicas de relaxamento até exercícios de expressão corporal, visando a melhoria da saúde mental e física dos alunos."
    },
    {
      icon: Globe,
      title: "Educação Bilíngue e Cultural",
      description: "Inclui ensino bilíngue diário e passeios culturais que expandem o horizonte educacional, tornando nossos alunos cidadãos verdadeiramente globais."
    },
    {
      icon: TreePine,
      title: "Educação Ambiental",
      description: "Ensinamos sobre responsabilidade ecológica e promovemos práticas sustentáveis que podem ser aplicadas no dia a dia, incutindo valores de sustentabilidade."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Integral <span className="text-school-orange">Flex</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Desenvolvendo <strong>mentes criativas</strong> e <strong>corpos saudáveis</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                O Integral Flex da OSE é onde a educação se estende além da sala de aula. 
                Nossos alunos vivenciam um programa completo de desenvolvimento integral das 12h às 17h30.
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
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Clock className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">12h00 às 17h30</p>
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
              Desenvolvimento <span className="text-school-orange">Integral</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Das 12h às 17h30, oferecemos um programa completo que vai além do apoio acadêmico, 
              promovendo o desenvolvimento integral de cada aluno
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

          {/* Educational Approach */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Desenvolvimento Holístico
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  O <strong>Integral Flex</strong> vai além da educação tradicional, oferecendo uma 
                  abordagem que considera todos os aspectos do desenvolvimento infantil e juvenil.
                </p>
                <p>
                  Acreditamos que o <strong>equilíbrio entre corpo e mente</strong> é crucial para um 
                  desenvolvimento saudável. Nosso programa oferece atividades diversificadas que 
                  contribuem para a formação integral do aluno.
                </p>
                <p>
                  A <strong>sustentabilidade</strong> é um valor que queremos incutir em nossos alunos. 
                  Por meio da educação ambiental, ensinamos sobre responsabilidade ecológica.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Conheça o Integral Flex
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/attached_assets/0934_1750717790206.jpg" 
                alt="Atividades do Integral Flex"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/0905_1750717790206.jpg" 
                alt="Apoio acadêmico"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/0700_1750717790204.jpg" 
                alt="Atividades complementares"
                className="w-full h-48 object-cover rounded-lg shadow-lg col-span-2"
              />
            </div>
          </div>

          {/* Program Benefits */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-50 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Leitura e Jogo Educativo
              </h3>
              <p className="text-xl text-slate-600">
                Aprendizado Divertido e Engajante
              </p>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-slate-600 mb-6">
                Acreditamos que o aprendizado pode ser divertido. O programa inclui diversas 
                atividades de leitura e jogos educativos que, além de engajar os alunos, 
                contribuem para o desenvolvimento de habilidades sociais e cognitivas.
              </p>
              <p className="text-lg text-slate-600">
                Em um mundo globalizado, ser bilíngue é uma habilidade valiosa. O Integral Flex 
                inclui ensino bilíngue diário, além de passeios culturais que expandem o horizonte 
                educacional.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Parceria de Excelência
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Em parceria com organizações renomadas no desenvolvimento integral
            </p>
            <div className="flex justify-center items-center mt-8">
              <img 
                src="/attached_assets/logo-acm-sao-paulo_1750779294901.png" 
                alt="ACM São Paulo"
                className="h-20"
              />
            </div>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}