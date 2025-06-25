import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { Book, ExternalLink, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logos, newImages } from "@/lib/image-verification";

export default function Arvore() {
  useEffect(() => {
    updateSEO({
      title: "Árvore - Livros Digitais | Colégio OSE",
      description: "Plataforma de livros digitais Árvore - Uma biblioteca completa para nossos alunos",
      keywords: "árvore, livros digitais, leitura, biblioteca digital, colégio ose"
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={newImages.horizontal31}
            alt="Árvore - Biblioteca Digital"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-700/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src={logos.arvore} 
                alt="Árvore"
                className="h-32 mx-auto mb-4"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Árvore
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Uma biblioteca completa ao alcance dos nossos alunos
            </p>
            <Button 
              onClick={() => window.open('https://www.arvore.com.br', '_blank')}
              className="bg-white text-school-orange hover:bg-gray-100 text-lg px-8 py-3"
            >
              Acessar Plataforma
              <ExternalLink className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Recursos da Plataforma
            </h2>
            <p className="text-xl text-slate-600">
              Tudo que você precisa para uma experiência de leitura completa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Book className="text-school-orange mb-4" size={48} />
                <CardTitle>Biblioteca Digital</CardTitle>
                <CardDescription>
                  Acesso a milhares de livros digitais de diversos gêneros e níveis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="text-school-orange mb-4" size={48} />
                <CardTitle>Leitura Social</CardTitle>
                <CardDescription>
                  Compartilhe experiências de leitura com colegas e professores
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="text-school-orange mb-4" size={48} />
                <CardTitle>Acesso 24/7</CardTitle>
                <CardDescription>
                  Leia quando e onde quiser, no computador, tablet ou celular
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            Como Acessar
          </h2>

          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <p className="text-lg text-slate-700 mb-6">
              Todos os nossos alunos têm acesso gratuito à plataforma Árvore. 
              Use suas credenciais do colégio para fazer login.
            </p>

            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                <p>Acesse o site da Árvore ou baixe o aplicativo</p>
              </div>
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                <p>Use seu login e senha fornecidos pelo colégio</p>
              </div>
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                <p>Explore a biblioteca e comece a ler!</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => window.open('https://www.arvore.com.br', '_blank')}
            className="bg-school-orange hover:bg-school-orange/90 text-white text-lg px-8 py-3"
          >
            Acessar Árvore
            <ExternalLink className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}