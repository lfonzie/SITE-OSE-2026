import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Heart, Play, Users, BookOpen, Lightbulb, Target, Palette } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";

// Importando imagens para Educação Infantil
import { newImages } from "@/lib/image-verification";
const img1 = newImages.img12;
const img2 = newImages.img13;
const img3 = newImages.img14;
const img4 = newImages.img15;
const img5 = newImages.img16;
const img6 = newImages.img17;

export default function EducacaoInfantil() {
  useEffect(() => {
    updateSEO({
      title: "Educação Infantil - Jardim I e II | a OSE",
      description: "Educação Infantil na OSE: desenvolvimento socioemocional e cognitivo para crianças de 4 a 6 anos. Ambiente seguro com pedagogia finlandesa.",
      keywords: "educação infantil sorocaba, jardim I jardim II, desenvolvimento infantil, pedagogia finlandesa"
    });
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Ambiente Seguro e Respeitoso",
      description: "Criamos espaços acolhedores onde as crianças podem crescer individualmente e socialmente, fortalecendo sua autoestima."
    },
    {
      icon: BookOpen,
      title: "Pedagogia Finlandesa",
      description: "Combinando as melhores práticas da educação finlandesa e brasileira, incentivamos a participação ativa da criança."
    },
    {
      icon: Users,
      title: "Desenvolvimento Socioemocional",
      description: "Programa que cultiva inteligência emocional, empatia e resiliência desde cedo através de atividades lúdicas."
    },
    {
      icon: Palette,
      title: "Aprendizado Lúdico",
      description: "Utilizamos abordagens lúdicas e práticas para estimular a curiosidade e criatividade, oferecendo desenvolvimento equilibrado."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={img1}
            alt="Educação Infantil - OSE"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-700/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Educação <span className="text-school-orange">Infantil</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Jardim I e Jardim II
              </h2>
              <p className="text-xl md:text-2xl mb-6">
                Crescimento e Exploração na Primeira Infância
              </p>
              <p className="text-lg mb-8 opacity-95">
                Para os grupos de Jardim I e Jardim II, destinados a crianças de 4 a 6 anos, 
                oferecemos uma abordagem única que foca no desenvolvimento socioemocional e cognitivo.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Base Sólida para o Futuro
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  Nosso currículo é <strong>cuidadosamente planejado</strong> para estimular o 
                  crescimento pessoal e social de cada aluno, proporcionando uma base sólida 
                  para as futuras etapas educacionais.
                </p>
                <p>
                  A segurança e o desenvolvimento emocional são primordiais em nossa abordagem. 
                  Criamos espaços acolhedores onde as crianças podem crescer individualmente e 
                  socialmente, fortalecendo sua autoestima e sua percepção sobre si e seu lugar no mundo.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white mr-4"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agendamento Avaliação Pedagógica
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <OptimizedImage
                src={img2}
                alt="Crianças da Educação Infantil em ambiente de aprendizado"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage
                src={img3}
                alt="Atividades lúdicas na Educação Infantil"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage
                src={img4}
                alt="Desenvolvimento socioemocional"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <OptimizedImage
                src={img5}
                alt="Pedagogia finlandesa em prática"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="bg-school-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-3">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Diferenciais */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold text-slate-800 mb-4">
                Coleção Amplia: Pedagogia Finlandesa
              </h4>
              <p className="text-slate-600 mb-4">
                Combinando as melhores práticas da educação finlandesa e brasileira, nossa coleção 
                incentiva a participação ativa da criança e valoriza seu crescimento pessoal e social.
              </p>
              <p className="text-slate-600">
                Utilizamos abordagens lúdicas e práticas para estimular a curiosidade e a criatividade, 
                oferecendo um desenvolvimento equilibrado e completo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold text-slate-800 mb-4">
                Aulas Diárias de Inglês
              </h4>
              <p className="text-slate-600 mb-4">
                Oferecemos aulas diárias de inglês, proporcionando uma introdução ponderada à língua estrangeira.
              </p>
              <p className="text-slate-600">
                Esta opção, disponível mediante um custo adicional, permite que seu filho se beneficie 
                de um ensino de idiomas sem a pressão de um ambiente bilíngue.
              </p>
            </div>
          </div>

          {/* Galeria de Imagens */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <OptimizedImage
              src={img6}
              alt="Ambiente de aprendizado lúdico"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img1}
              alt="Sala de aula da Educação Infantil"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <OptimizedImage
              src={img2}
              alt="Crianças em atividades pedagógicas"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}