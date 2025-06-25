import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import { updateSEO } from "@/lib/seo";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import UChatWidget from "@/components/uchat-widget";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import UChatWidget from "@/components/uchat-widget";
import { Book, ExternalLink, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Arvore() {
  useEffect(() => {
    updateSEO({
      title: "Árvore de Livros - Colégio OSE",
      description: "Plataforma digital de leitura que incentiva o hábito da leitura através de livros digitais e atividades interativas.",
      keywords: "árvore de livros, leitura digital, livros, educação, literatura"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              <span className="text-school-orange">Árvore</span> de Livros
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Plataforma digital que transforma a experiência de leitura, incentivando o hábito através de livros interativos e atividades pedagógicas.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Biblioteca Digital Interativa</CardTitle>
              <CardDescription>
                Acesso a milhares de livros digitais com recursos pedagógicos integrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-slate-800 mb-3">Recursos Disponíveis:</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Mais de 30.000 livros digitais</li>
                    <li>• Atividades pedagógicas interativas</li>
                    <li>• Relatórios de leitura personalizados</li>
                    <li>• Gamificação do aprendizado</li>
                    <li>• Acesso multiplataforma</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-3">Benefícios:</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Desenvolvimento do hábito da leitura</li>
                    <li>• Melhoria da compreensão textual</li>
                    <li>• Ampliação do vocabulário</li>
                    <li>• Estímulo à criatividade</li>
                    <li>• Acompanhamento do progresso</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
