import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Calculator, Palette, UserCheck, BookOpen } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Importando imagens para Fundamental I
import img1 from "@assets/0934_1750717790206.jpg";
import img2 from "@assets/1105_1750717790206.jpg";
import img3 from "@assets/0581_1750717790206.jpg";
import img4 from "@assets/0491_1750717790207.jpg";
import img5 from "@assets/0541_1750717790207.jpg";
import img6 from "@assets/1295_1750717790207.jpg";

export default function Fundamental1() {
  useEffect(() => {
    updateSEO({
      title: "Ensino Fundamental I - Anos Iniciais | a OSE",
      description: "Ensino Fundamental I na OSE: desenvolvendo mentes curiosas e corações compassivos. 1º ao 5º ano com foco em habilidades sociais e emocionais.",
      keywords: "ensino fundamental I sorocaba, anos iniciais, desenvolvimento acadêmico, habilidades sociais"
    });
  }, []);

  const competencies = [
    {
      icon: MessageCircle,
      title: "Capacidade Verbal",
      description: "Priorizamos o desenvolvimento da linguagem como base para todas as outras formas de aprendizado, fomentando comunicação, pensamento crítico e imaginação."
    },
    {
      icon: Users,
      title: "Socialização",
      description: "Enfatizamos atividades que cultivam empatia, colaboração e consciência social para formar cidadãos conscientes e solidários."
    },
    {
      icon: Calculator,
      title: "Operações Mentais",
      description: "Os alunos se tornam fluentes em matemática, desenvolvendo capacidade de aplicar conceitos numéricos na vida cotidiana com abordagens práticas e lúdicas."
    },
    {
      icon: Palette,
      title: "Capital Cultural",
      description: "Ampliamos os horizontes culturais apresentando variedade de artes, histórias e tradições para uma educação mais rica e diversificada."
    },
    {
      icon: UserCheck,
      title: "Autonomia",
      description: "Encorajamos os alunos a serem protagonistas do próprio aprendizado com atividades que exigem decisões e pensamento independente."
    },
    {
      icon: BookOpen,
      title: "Currículo Tradicional",
      description: "Disciplinas fundamentais como Matemática, Português, História, Geografia, além de Educação Física, Inglês, Ciências, Artes e Música."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage
            src={img1}
            alt="Alunos do Ensino Fundamental I"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Ensino Fundamental I
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-lg">
              Anos Iniciais - 1º ao 5º ano
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto drop-shadow-lg">
              Desenvolvendo Mentes Curiosas e Corações Compassivos
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95 drop-shadow-lg">
              O Ensino Fundamental I representa um período crítico e fascinante na jornada educacional. 
              Focamos não apenas no desenvolvimento acadêmico, mas também nas habilidades sociais, emocionais e culturais.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Competências Desenvolvidas
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Nossa metodologia abrange seis pilares fundamentais para o desenvolvimento integral dos alunos
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

          {/* Educational Approach */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Construindo Fundamentos Sólidos
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  O Ensino Fundamental I representa um período crítico e fascinante na jornada educacional. 
                  Nosso enfoque vai além do desenvolvimento acadêmico, englobando também as <strong>habilidades 
                  sociais, emocionais e culturais</strong> essenciais para o crescimento integral de cada criança.
                </p>
                <p>
                  Através de <strong>metodologias ativas e inovadoras</strong>, proporcionamos um ambiente 
                  onde cada aluno pode explorar suas curiosidades, desenvolver pensamento crítico e 
                  construir uma base sólida para os próximos níveis educacionais.
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
          {/* Galeria de Imagens do Fundamental I */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-slate-800 text-center mb-12">
              Vida Escolar no Fundamental I
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <OptimizedImage
                src={img2}
                alt="Atividades em sala de aula"
                className="w-full h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <OptimizedImage
                src={img3}
                alt="Projetos educacionais"
                className="w-full h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <OptimizedImage
                src={img4}
                alt="Aprendizado colaborativo"
                className="w-full h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <OptimizedImage
                src={img5}
                alt="Desenvolvimento de autonomia"
                className="w-full h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <OptimizedImage
                src={img6}
                alt="Atividades culturais"
                className="w-full h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <OptimizedImage
                src={img1}
                alt="Momentos especiais"
                className="w-full h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
          </div>
          </div>

          {/* Curriculum Section */}
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Currículo Completo e Equilibrado
              </h3>
              <p className="text-xl text-slate-600">
                Base sólida para o desenvolvimento intelectual e social
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Núcleo Básico</h4>
                <p className="text-sm text-slate-600">Matemática, Português, História, Geografia</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Artes e Cultura</h4>
                <p className="text-sm text-slate-600">Artes Visuais, Música, Educação Cultural</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Ciências</h4>
                <p className="text-sm text-slate-600">Ciências Naturais, Experimentação</p>
              </div>
              <div className="text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Desenvolvimento</h4>
                <p className="text-sm text-slate-600">Educação Física, Inglês, Socioemocional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}