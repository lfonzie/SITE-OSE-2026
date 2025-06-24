import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Heart, Monitor, Gamepad2, Brain } from "lucide-react";

export default function CodeOSE() {
  useEffect(() => {
    updateSEO({
      title: "CODE OSE - Alfabetização Digital | a OSE",
      description: "CODE OSE: alfabetização digital integrada ao Ensino Fundamental I. Programação, pensamento computacional e preparação para o futuro digital.",
      keywords: "programação para crianças sorocaba, alfabetização digital, pensamento computacional, CODE OSE"
    });
  }, []);

  const applications = [
    {
      icon: Rocket,
      title: "Navegando pelo Universo",
      description: "Na década de 1960, a missão Apollo alcançou a Lua graças aos primeiros computadores. Hoje, cientistas utilizam programas complexos para analisar gravidade, mapear o cosmos e buscar novas formas de vida."
    },
    {
      icon: Heart,
      title: "Decifrando a Vida",
      description: "Na medicina, a ciência da computação permitiu decifrar o genoma humano, abrindo caminho para medicina personalizada, máquinas de ressonância magnética e diagnósticos assistidos por IA."
    },
    {
      icon: Monitor,
      title: "Trazendo a Imaginação à Vida",
      description: "O entretenimento foi transformado pela computação. De dinossauros em 'Jurassic Park' com robótica a mundos fantásticos da Pixar, a magia dos filmes é graças aos criativos digitais."
    }
  ];

  const features = [
    {
      icon: Code,
      title: "Integração Curricular",
      description: "CODE OSE não é um extra; é intrínseco à grade curricular do Ensino Fundamental I. A programação é integrada a outras disciplinas, tornando o aprendizado contextual e relevante."
    },
    {
      icon: Gamepad2,
      title: "Aprendizado Lúdico",
      description: "Utilizamos abordagem lúdica e interativa para tornar a programação envolvente. Os alunos constroem jogos, animações e histórias, tornando cada lição uma aventura emocionante."
    },
    {
      icon: Brain,
      title: "Pensamento Computacional",
      description: "Iniciar programação no Fundamental I desenvolve habilidades cruciais como lógica, resolução de problemas e pensamento crítico, formando a base para o futuro digital."
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
                CODE <span className="text-school-orange">OSE</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Alfabetização Digital Integrada
              </h2>
              <p className="text-xl md:text-2xl mb-6">
                Preparando jovens para o futuro digital
              </p>
              <p className="text-lg mb-8 opacity-95">
                CODE OSE é um programa de alfabetização digital integrado ao currículo do Ensino Fundamental I, 
                desenvolvendo pensamento computacional e habilidades essenciais para o século XXI.
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
                <img 
                  src="/images/codeose23_1750779294902.png" 
                  alt="CODE OSE Logo"
                  className="h-40 w-auto"
                />
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
              Programação que <span className="text-school-orange">Transforma</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Este curso inovador vai além de ensinar programação, preparando nossos alunos 
              para a vida e as carreiras do futuro
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

          {/* Features Section */}
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
                Preparo para o Futuro
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  Na era atual, <strong>saber programar é tão fundamental quanto saber ler e escrever</strong>. 
                  {"{CODE.OSE}"} oferece uma base sólida para as crianças, preparando-as para um mundo 
                  cada vez mais regido pela tecnologia.
                </p>
                <p>
                  O curso é estruturado para ser <strong>inclusivo e equitativo</strong>, assegurando que 
                  todos os alunos, independentemente de sua origem ou gênero, tenham acesso às 
                  habilidades digitais vitais para o futuro.
                </p>
                <p>
                  Uma pesquisa de 2016 revelou que <strong>64% das meninas</strong> no 3º ao 5º ano 
                  queriam aprender a codificar, indicando o interesse crescente nessa habilidade essencial.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Conheça o {"{CODE.OSE}"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/attached_assets/1068_1750717790205.jpg" 
                alt="Alunos aprendendo programação"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/1092_1750717790205.jpg" 
                alt="Laboratório de informática"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/1105_1750717790206.jpg" 
                alt="Atividades de programação"
                className="w-full h-48 object-cover rounded-lg shadow-lg col-span-2"
              />
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Construindo Habilidades Críticas para o Século 21
              </h3>
              <p className="text-xl text-slate-600">
                A Maneira Mais Envolvente de Aprender Código
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-school-orange mb-2">7 milhões</div>
                <p className="text-slate-600">de vagas que exigiam habilidades de codificação em 2015</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-school-orange mb-2">64%</div>
                <p className="text-slate-600">das meninas no 3º ao 5º ano queriam aprender a codificar</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-slate-600">
                Nossos alunos aprendem codificação de maneira envolvente, programando algoritmos, 
                construindo websites e criando jogos, tornando a aprendizagem uma aventura estimulante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}