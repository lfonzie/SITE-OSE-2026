
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Download, FileText, GraduationCap } from "lucide-react";

export default function ListaMaterial() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  useEffect(() => {
    updateSEO({
      title: "Lista de Material 2025 | a OSE",
      description: "Lista de material escolar 2025 do Colégio OSE. Confira os materiais necessários para Educação Infantil, Ensino Fundamental I, II e Ensino Médio.",
      keywords: "lista material escolar 2025, material didático OSE, livros escolares sorocaba"
    });
  }, []);

  const segments = [
    {
      id: "educacao-infantil",
      title: "Educação Infantil",
      subtitle: "Jardim I e Jardim II",
      icon: BookOpen,
      color: "from-pink-500 to-rose-500",
      description: "Material desenvolvido especialmente para os primeiros passos na educação"
    },
    {
      id: "fundamental-1",
      title: "Ensino Fundamental I",
      subtitle: "1º ao 5º ano",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      description: "Base sólida para o desenvolvimento acadêmico e social"
    },
    {
      id: "fundamental-2",
      title: "Ensino Fundamental II",
      subtitle: "6º ao 9º ano",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      description: "Preparação para os desafios do ensino médio"
    },
    {
      id: "ensino-medio",
      title: "Ensino Médio",
      subtitle: "1ª à 3ª série",
      icon: GraduationCap,
      color: "from-purple-500 to-violet-500",
      description: "Preparação completa para vestibulares e ENEM"
    }
  ];

  const handleSegmentClick = (segmentId: string) => {
    setSelectedSegment(segmentId);
    // Aqui você pode implementar a lógica para mostrar a lista específica
    // ou redirecionar para um PDF/documento específico
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-school-orange to-school-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Lista de Material
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              2025
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Clique no Ano/Série para 2025
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-95">
              Confira os materiais necessários para cada segmento educacional e 
              prepare-se para um ano letivo de sucesso.
            </p>
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Selecione o Segmento
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Escolha o ano ou série do seu filho para acessar a lista de material completa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {segments.map((segment) => (
              <Card 
                key={segment.id}
                className="hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleSegmentClick(segment.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${segment.color} flex items-center justify-center mx-auto mb-4`}>
                    <segment.icon className="text-white" size={36} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {segment.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-semibold text-school-orange">
                    {segment.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6">{segment.description}</p>
                  <Button className="bg-school-orange hover:bg-school-orange/90 text-white">
                    <Download className="mr-2" size={16} />
                    Baixar Lista de Material
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Informações Importantes
              </h3>
              <p className="text-xl text-slate-600">
                Orientações para Aquisição dos Materiais
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">📅 Prazo</h4>
                <p className="text-sm text-slate-600">
                  Os materiais devem ser adquiridos até o início das aulas
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">📚 Material Didático</h4>
                <p className="text-sm text-slate-600">
                  Plataforma Amplia com recursos digitais integrados
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">🛍️ Onde Comprar</h4>
                <p className="text-sm text-slate-600">
                  Livrarias parceiras ou através do portal da escola
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">👕 Uniforme</h4>
                <p className="text-sm text-slate-600">
                  Disponível na loja oficial da escola
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">💰 Parcelamento</h4>
                <p className="text-sm text-slate-600">
                  Consulte condições especiais de pagamento
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">📞 Dúvidas</h4>
                <p className="text-sm text-slate-600">
                  Entre em contato com a secretaria da escola
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Precisa de Ajuda?
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Nossa equipe está pronta para esclarecer suas dúvidas sobre a lista de material
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Button 
                size="lg"
                className="bg-school-orange hover:bg-school-orange/90 text-white"
                onClick={() => window.open('tel:(15)2101-3800')}
              >
                📞 (15) 2101-3800
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-school-orange text-school-orange hover:bg-school-orange hover:text-white"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                📧 Enviar Mensagem
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
