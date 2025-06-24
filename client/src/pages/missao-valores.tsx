
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Heart, Target, Users, Award, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MissaoValores() {
  useEffect(() => {
    updateSEO({
      title: "Missão e Valores | a OSE",
      description: "Conheça a missão e valores do Colégio OSE. Formando líderes transformadores há 100 anos em Sorocaba.",
      keywords: "missão ose, valores colégio, educação sorocaba, líderes transformadores"
    });
  }, []);

  const valores = [
    {
      icon: Users,
      title: "Respeito",
      description: "Celebramos a diversidade e valorizamos cada voz. Estamos comprometidos em construir uma comunidade onde todos gostem de pertencer.",
      color: "bg-blue-500"
    },
    {
      icon: Star,
      title: "Entusiasmo",
      description: "Somos impulsionados por nossa paixão pela aprendizagem, curiosidade e inovação. Inspiramos uns aos outros com o exemplo e a alegria em nossas ações.",
      color: "bg-yellow-500"
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Nosso objetivo é a excelência em tudo o que fazemos. Continuamente buscamos o crescimento e aprimoramento, perpetuando a reputação de alto padrão de ensino que construímos em Sorocaba.",
      color: "bg-school-orange"
    },
    {
      icon: Target,
      title: "Responsabilidade",
      description: "Assumimos nossos compromissos e somos responsáveis por nossas ações. Priorizamos o uso consciente dos recursos, seja em nossa escola ou no planeta como um todo.",
      color: "bg-green-500"
    },
    {
      icon: Heart,
      title: "Bondade",
      description: "Valorizamos a compaixão e a justiça, sempre prontos para agir de maneira correta. Compartilhamos nosso tempo e habilidades com generosidade, fortalecendo os laços em nossa comunidade escolar e na cidade de Sorocaba.",
      color: "bg-pink-500"
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
                Missão e <span className="text-school-orange">Valores</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Construindo <strong>líderes transformadores</strong> com <strong>valores sólidos</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                Há mais de 100 anos, a OSE é guiada por princípios fundamentais que moldam 
                cada aspecto de nossa educação. Valores que perduram, excelência que se renova.
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
                  onClick={() => document.getElementById('valores')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">Missão e Valores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-school-orange rounded-full mb-6">
              <Target className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Nossa <span className="text-school-orange">Missão</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 rounded-2xl shadow-lg border border-orange-100">
              <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
                <p>
                  O Colégio OSE tem uma rica história em Sorocaba e uma reputação de desenvolver 
                  <strong className="text-school-orange"> líderes transformadores</strong>. A nossa missão é nutrir uma nova geração de líderes que não apenas prosperarão em suas próprias vidas, mas que também serão agentes de mudança, contribuindo para um mundo melhor.
                </p>
                
                <p>
                  Nós vemos além da mera concessão de um diploma. Firmemente acreditamos que a educação é um 
                  <strong className="text-school-brown"> processo holístico</strong> que engloba mais do que as matérias tradicionais. Nosso compromisso é formar cidadãos completos, que levam consigo a marca da diversidade, empatia e benevolência que tanto valorizamos.
                </p>
                
                <p>
                  Através da nossa longa história, e durante o difícil período de uma pandemia sem precedentes, reafirmamos nossa verdadeira essência de ser uma escola: um lugar onde os 
                  <strong className="text-school-orange"> valores são vividos e transmitidos</strong>.
                </p>
                
                <p>
                  Com salas de aula de última geração, educadores experientes e materiais didáticos inovadores, estamos preparados para enfrentar os desafios do presente e do futuro. Assim, continuamos a honrar nosso legado, sendo um 
                  <strong className="text-school-brown"> pilar de aprendizado e desenvolvimento</strong> na comunidade de Sorocaba.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-school-brown rounded-full mb-6">
              <Heart className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Nossos <span className="text-school-brown">Valores</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Os valores fundamentais que orientam todas as nossas ações e decisões educacionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`${valor.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{valor.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{valor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Globe className="text-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl mb-8 text-slate-100">
            Venha conhecer de perto como nossos valores e missão se traduzem em uma educação transformadora
          </p>
          <button
            className="bg-white text-school-orange px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-lg"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Agende uma Visita
          </button>
        </div>
      </section>

    </div>
  );
}
