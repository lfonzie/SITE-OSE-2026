
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BookOpen, Backpack, Palette } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Usando imagens da pasta public/images
const img1 = "/images/0934_1750717790206.jpg";
const img2 = "/images/1105_1750717790206.jpg";
const img3 = "/images/0581_1750717790206.jpg";
const img4 = "/images/0491_1750717790207.jpg";
const img5 = "/images/0541_1750717790207.jpg";

export default function ListaMaterial() {
  useEffect(() => {
    updateSEO({
      title: "Lista de Material Escolar | Colégio OSE",
      description: "Confira a lista de material escolar por segmento. Materiais organizados para o sucesso acadêmico dos nossos alunos.",
      keywords: "lista material, material escolar, colégio ose, educação infantil, fundamental, ensino médio"
    });
  }, []);

  const segmentos = [
    {
      titulo: "Educação Infantil",
      descricao: "Material lúdico e pedagógico para os primeiros anos",
      icone: <Palette className="text-school-orange" size={40} />,
      link: "#educacao-infantil",
      imagem: img1
    },
    {
      titulo: "Fundamental I",
      descricao: "Material completo para os anos iniciais",
      icone: <BookOpen className="text-school-orange" size={40} />,
      link: "#fundamental-1",
      imagem: img2
    },
    {
      titulo: "Fundamental II",
      descricao: "Material específico para os anos finais",
      icone: <Backpack className="text-school-orange" size={40} />,
      link: "#fundamental-2",
      imagem: img3
    },
    {
      titulo: "Ensino Médio",
      descricao: "Material preparatório para vestibular e ENEM",
      icone: <FileText className="text-school-orange" size={40} />,
      link: "#ensino-medio",
      imagem: img4
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
                Lista de <span className="text-school-orange">Material</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Material <strong>organizado</strong> para o <strong>sucesso acadêmico</strong>
              </p>
              <p className="text-lg mb-8 opacity-90">
                Confira as listas de material escolar por segmento. Materiais cuidadosamente 
                selecionados para apoiar o desenvolvimento educacional e criativo dos nossos alunos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-school-orange font-semibold px-8 py-3"
                  onClick={() => document.getElementById('listas')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  📋 Ver Listas
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white font-semibold px-8 py-3"
                  onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
                >
                  📅 Agende uma Visita
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <FileText className="text-white/80 mx-auto mb-4" size={80} />
                  <p className="text-white/70 text-lg font-medium">Lista de Material</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informações Importantes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Informações <span className="text-school-orange">Importantes</span>
            </h2>
            <p className="text-xl text-slate-600">
              Tudo que você precisa saber sobre o material escolar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <Calendar className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Prazo</h3>
              <p className="text-slate-600">
                Listas disponíveis a partir de dezembro para o ano letivo seguinte
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <Download className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Download</h3>
              <p className="text-slate-600">
                Baixe as listas em PDF para facilitar suas compras
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl text-center">
              <FileText className="text-school-orange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Organização</h3>
              <p className="text-slate-600">
                Material organizado por disciplina e período letivo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Listas por Segmento */}
      <section id="listas" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Listas por <span className="text-school-orange">Segmento</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Selecione o segmento para acessar a lista de material específica
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {segmentos.map((segmento, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <OptimizedImage 
                    src={segmento.imagem} 
                    alt={`Material ${segmento.titulo}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 left-4">
                    {segmento.icone}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{segmento.titulo}</h3>
                  <p className="text-slate-600 mb-6">{segmento.descricao}</p>
                  <div className="flex gap-4">
                    <Button 
                      className="bg-school-orange hover:bg-school-orange/90 text-white flex-1"
                      onClick={() => alert('Lista será disponibilizada em dezembro')}
                    >
                      <Download className="mr-2" size={16} />
                      Baixar Lista
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-school-orange text-school-orange hover:bg-school-orange/10"
                      onClick={() => window.location.href = segmento.link}
                    >
                      Saiba Mais
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aviso */}
          <div className="mt-12 bg-school-orange/10 border-l-4 border-school-orange p-6 rounded-r-lg">
            <div className="flex items-start">
              <FileText className="text-school-orange mt-1 mr-3 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Importante</h4>
                <p className="text-slate-700">
                  As listas de material para 2025 estarão disponíveis a partir de dezembro de 2024. 
                  Fique atento aos nossos canais de comunicação para mais informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dicas para Pais */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Dicas para <span className="text-school-orange">Pais</span>
            </h2>
            <p className="text-xl text-slate-600">
              Como organizar e economizar na compra do material escolar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Planeje com Antecedência</h4>
                  <p className="text-slate-600">Baixe a lista assim que disponível e compare preços em diferentes fornecedores.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Reaproveite Materiais</h4>
                  <p className="text-slate-600">Verifique quais materiais do ano anterior ainda podem ser utilizados.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-school-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Compras Coletivas</h4>
                  <p className="text-slate-600">Organize compras em grupo com outros pais para conseguir melhores preços.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <OptimizedImage 
                src={img5} 
                alt="Organização de material escolar"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
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
