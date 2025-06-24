import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Globe, Users, BookOpen, Target, Lightbulb, Award } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Importando imagens para educação bilíngue
const img1 = "/images/0312_1750717790204.jpg";
const img2 = "/images/0354_1750717790205.jpg";
const img3 = "/images/0700_1750717790204.jpg";
const img4 = "/images/0905_1750717790206.jpg";
const img5 = "/images/1068_1750717790205.jpg";
const img6 = "/images/1092_1750717790205.jpg";

export default function Bilingue() {
  useEffect(() => {
    updateSEO({
      title: "Global Citizens - Educação Bilíngue | a OSE",
      description: "Programa Global Citizens na OSE: educação bilíngue integral com MacMillan Education. Formando cidadãos globais conscientes.",
      keywords: "educação bilíngue sorocaba, global citizens, macmillan education, inglês, cidadania global"
    });
  }, []);

  const features = [
    {
      icon: Globe,
      title: "Abordagem Holística e Interdisciplinar",
      description: "Integramos o aprendizado do idioma com outras disciplinas acadêmicas, oferecendo uma educação mais completa onde os alunos aplicam o idioma em contextos variados."
    },
    {
      icon: Target,
      title: "Imersão Total",
      description: "A experiência linguística vai além da sala de aula. Os alunos são incentivados a utilizar o idioma em diversas situações do dia a dia, ampliando fluência e confiança."
    },
    {
      icon: Lightbulb,
      title: "Relevância Prática",
      description: "Tornamos o idioma uma ferramenta útil para a vida cotidiana e futuras carreiras, aplicando conhecimentos em situações reais como entrevistas e apresentações."
    },
    {
      icon: Users,
      title: "Cidadania Global",
      description: "Abordamos aspectos de cidadania global, compreensão cultural e responsabilidade social, preparando líderes conscientes para um mundo interconectado."
    },
    {
      icon: BookOpen,
      title: "Material MacMillan Education",
      description: "Utilizamos material desenvolvido por especialistas que oferece abordagem holística e interdisciplinar, integrando inglês com diversas disciplinas."
    },
    {
      icon: Award,
      title: "Aulas Diárias Opcionais",
      description: "Oferecemos aulas diárias de inglês como opção adicional, proporcionando introdução ponderada à língua estrangeira sem pressão de ambiente bilíngue."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/attached_assets/0312_1750717790204.jpg" 
            alt="Global Citizens - Educação Bilíngue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4F00]/90 via-[#FF4F00]/80 to-[#FF6B00]/85">
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Global Citizens
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-lg">
              Educação Bilíngue
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto drop-shadow-lg">
              Uma Jornada Rumo à Educação Bilíngue
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95 drop-shadow-lg">
              Na OSE, a educação bilíngue vai além da mera aquisição de um segundo idioma. 
              Nosso programa Global Citizens proporciona uma jornada educacional abrangente 
              que abraça tanto aspectos linguísticos quanto culturais.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Formando Cidadãos Globais
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Nossa abordagem vai além do ensino tradicional de idiomas, integrando aspectos 
              culturais e de cidadania global para formar líderes conscientes.
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
                Além da Sala de Aula
              </h3>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  A <strong>imersão total</strong> não se limita ao ambiente escolar. Os alunos são 
                  incentivados a utilizar o idioma em diversas situações do dia a dia, como parte 
                  integral de seu processo de aprendizagem.
                </p>
                <p>
                  A ênfase está em tornar o idioma uma <strong>ferramenta útil para a vida cotidiana</strong> 
                  e para futuras carreiras dos alunos. Eles aprendem a aplicar seus conhecimentos 
                  linguísticos em situações reais.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Conheça o Programa Global Citizens
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/attached_assets/0312_1750717790204.jpg" 
                alt="Alunos em aula bilíngue"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/0354_1750717790205.jpg" 
                alt="Atividades bilíngues"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/attached_assets/0581_1750717790206.jpg" 
                alt="Programa Global Citizens"
                className="w-full h-48 object-cover rounded-lg shadow-lg col-span-2"
              />
            </div>
          </div>

          {/* MacMillan Education Section */}
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                MacMillan Education
              </h3>
              <p className="text-xl text-slate-600">
                Material de Excelência para Educação Bilíngue
              </p>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-slate-600 mb-6">
                O material da MacMillan Education oferece uma abordagem holística e interdisciplinar 
                ao ensino bilíngue. Desenvolvido por especialistas, o programa integra o inglês com 
                diversas disciplinas, promovendo uma aprendizagem imersiva e prática.
              </p>
              <p className="text-lg text-slate-600">
                Além de habilidades linguísticas, o foco é cultivar cidadãos globais conscientes e 
                culturalmente enriquecidos. A MacMillan Education proporciona assim uma educação 
                bilíngue inovadora, preparando alunos para um mundo globalizado.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Metodologia Reconhecida
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Utilizamos as melhores práticas internacionais de ensino bilíngue
            </p>
            <div className="flex justify-center items-center space-x-8 mt-8">
              <img 
                src="/attached_assets/png-clipart-macmillan-education-logo-publishing-houses-logos_1750779294902.png" 
                alt="MacMillan Education"
                className="h-16"
              />
              <img 
                src="/attached_assets/codeose23_1750779294902.png" 
                alt="CODE OSE"
                className="h-16"
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