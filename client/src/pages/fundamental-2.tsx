import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Brain, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Importando imagens para Fundamental II
const img1 = "/images/0023_1750717790208.jpg";
const img2 = "/images/0378_1750717790208.jpg";
const img3 = "/images/1285_1750717790208.jpg";
const img4 = "/images/0023_1750719589611.jpg";
const img5 = "/images/0378_1750719589611.jpg";
const img6 = "/images/1285_1750719589611.jpg";

export default function Fundamental2() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Fundamental II - Anos Finais | a OSE",
      description: "Ensino Fundamental II na OSE: formando líderes conscientes para um mundo em transformação. 6º ao 9º ano com foco em cidadania e ética.",
      keywords: "ensino fundamental II sorocaba, anos finais, liderança, cidadania, ética"
    });
  }, []);

  const competencies = [
    {
      icon: Brain,
      title: "Capacidade de Abstração",
      description: "Focamos no desenvolvimento do pensamento lógico-dedutivo, incentivando experimentação mental e formulação de hipóteses."
    },
    {
      icon: Target,
      title: "Capacidade de Aplicação",
      description: "Alunos aplicam raciocínio lógico em vasta gama de problemas matemáticos, científicos e sociais com abordagens pedagógicas estimulantes."
    },
    {
      icon: Users,
      title: "Protagonismo e Colaboração",
      description: "Utilizamos leituras, filmes, debates e entrevistas para preparar jovens para a vida em sociedade, cultivando colaboração e protagonismo."
    },
    {
      icon: Award,
      title: "Responsabilidade Ética",
      description: "Questões de ética são pilares em nossa metodologia. 'Quero? Posso? Devo?' norteiam nosso comportamento ético diário."
    },
    {
      icon: Lightbulb,
      title: "Criatividade",
      description: "Ambiente propício para desenvolvimento criativo onde erros são parte do aprendizado e alunos exploram seu potencial criativo."
    },
    {
      icon: BookOpen,
      title: "Currículo Tradicional",
      description: "Desde Matemática e Português até Física, Química e Biologia no 9º ano, complementado por Educação Física, Inglês e Artes."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#FF4F00] to-[#FF6B00] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Ensino Fundamental II
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-lg">
              Anos Finais - 6º ao 9º ano
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto drop-shadow-lg">
              Formando Líderes Conscientes para um Mundo em Transformação
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95 drop-shadow-lg">
              Uma fase empolgante e transformadora onde nossos alunos passam por rápido desenvolvimento 
              cognitivo e emocional. Nosso foco está além do currículo acadêmico.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Desenvolvimento Integral do Adolescente
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Visamos criar cidadãos responsáveis, éticos e ativos na sua comunidade através de seis pilares fundamentais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {competencies.map((competency, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-school-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <competency.icon className="text-school-orange" size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{competency.title}</h4>
                <p className="text-slate-600 leading-relaxed">{competency.description}</p>
              </div>
            ))}
          </div>

          {/* Educational Philosophy */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              {/* Galeria de Imagens do Fundamental II */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <OptimizedImage
                  src={img2}
                  alt="Estudantes do Fundamental II em atividades"
                  className="w-full h-32 rounded-lg shadow-lg"
                />
                <OptimizedImage
                  src={img3}
                  alt="Projetos colaborativos"
                  className="w-full h-32 rounded-lg shadow-lg"
                />
                <OptimizedImage
                  src={img4}
                  alt="Desenvolvimento de liderança"
                  className="w-full h-32 rounded-lg shadow-lg col-span-2"
                />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Formação de Líderes Éticos
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  Neste período crucial, onde as estruturas cognitivas atingem um nível elevado, 
                  os alunos são capazes de aplicar seu raciocínio lógico em uma vasta gama de problemas, 
                  sejam eles matemáticos, científicos ou sociais.
                </p>
                <p>
                  <strong>a OSE</strong> acredita na escola como um ambiente de desenvolvimento integral. 
                  Utilizamos metodologias que incentivam a experimentação mental, permitindo que os 
                  alunos relacionem conceitos abstratos e formulem hipóteses.
                </p>
                <p>
                  As questões de ética são pilares em nossa metodologia. Provocamos a consciência 
                  individual com reflexões constantes, formando jovens responsáveis e conscientes.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agendamento Avaliação Pedagógica
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold text-slate-800 mb-6">
                Reflexão Ética Diária
              </h4>
              <div className="bg-school-orange/10 p-6 rounded-lg mb-6">
                <h5 className="text-xl font-bold text-school-orange mb-3">
                  "Quero? Posso? Devo?"
                </h5>
                <p className="text-slate-600">
                  Estas três perguntas norteiam nosso comportamento ético e são um exercício 
                  diário em nossa abordagem educacional.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-school-orange text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">Q</span>
                  </div>
                  <p className="text-slate-600"><strong>Quero:</strong> Desenvolvimento do autoconhecimento</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-school-orange text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">P</span>
                  </div>
                  <p className="text-slate-600"><strong>Posso:</strong> Compreensão de limites e possibilidades</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-school-orange text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">D</span>
                  </div>
                  <p className="text-slate-600"><strong>Devo:</strong> Construção da responsabilidade social</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Preparando Líderes do Futuro
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  O Ensino Fundamental II é uma fase empolgante e transformadora onde nossos alunos 
                  passam por <strong>rápido desenvolvimento cognitivo e emocional</strong>. Nosso foco 
                  está além do currículo acadêmico.
                </p>
                <p>
                  Criamos um ambiente que promove <strong>autonomia, responsabilidade e pensamento crítico</strong>, 
                  essenciais para formar jovens conscientes e preparados para os desafios do futuro.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agendamento Avaliação Pedagógica
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/attached_assets/1068_1750717790205.jpg" 
                alt="Alunos do Fundamental II em laboratório"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/1092_1750717790205.jpg" 
                alt="Sala de aula do Fundamental II"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/1105_1750717790206.jpg" 
                alt="Projeto pedagógico Fundamental II"
                className="w-full h-48 object-cover rounded-lg shadow-lg col-span-2"
              />
            </div>
          </div>

          {/* Curriculum Section */}
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Currículo Preparatório
              </h3>
              <p className="text-xl text-slate-600">
                Preparando alunos para um mundo cada vez mais globalizado
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Exatas</h4>
                <p className="text-sm text-slate-600">Matemática, Física, Química</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Humanas</h4>
                <p className="text-sm text-slate-600">Português, História, Geografia</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Biológicas</h4>
                <p className="text-sm text-slate-600">Biologia, Ciências Naturais</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Complementares</h4>
                <p className="text-sm text-slate-600">Educação Física, Inglês, Artes</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-slate-600 max-w-3xl mx-auto">
                No 9º ano, introduzimos Física, Química e Biologia como disciplinas específicas, 
                preparando os alunos para o Ensino Médio e desafios acadêmicos futuros.
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