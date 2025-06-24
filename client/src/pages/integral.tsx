
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Music, Dumbbell, Globe, TreePine, Clock } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Importando imagens para período integral
import img1 from "@assets/0934_1750717790206.jpg";
import img2 from "@assets/1105_1750717790206.jpg";
import img3 from "@assets/0581_1750717790206.jpg";
import img4 from "@assets/0491_1750717790207.jpg";
import img5 from "@assets/0541_1750717790207.jpg";
import img6 from "@assets/1295_1750717790207.jpg";

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
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Integral Flex
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Período Integral Flexível
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Um Programa de Desenvolvimento Integral
            </p>
            <div className="flex items-center justify-center mb-6">
              <Clock className="mr-3" size={32} />
              <span className="text-2xl font-semibold">12h00 às 17h30</span>
            </div>
            <p className="text-lg max-w-3xl mx-auto opacity-95">
              O Integral Flex é um programa exclusivo que expande a jornada educacional para além 
              da sala de aula, abrangendo aspectos que fazem do aprendizado uma experiência completa e holística.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Cultivando Mente, Corpo e Espírito
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Este programa foi desenvolvido para cultivar a mente, o corpo e o espírito do aluno, 
              proporcionando uma experiência educacional verdadeiramente integral.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="text-school-orange" size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
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
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
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
        </div>
      </section>

    </div>
  );
}
