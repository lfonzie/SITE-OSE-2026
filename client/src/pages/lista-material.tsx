
import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BookOpen, Backpack, Palette } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
// Usando imagens da pasta public/images
export default function ListaMaterial() {
  useEffect(() => {
    updateSEO({
      title: "Lista de Material - Colégio OSE",
      description: "Confira a lista de material escolar para o ano letivo do Colégio OSE.",
      keywords: "lista de material, material escolar, ano letivo, livros didáticos"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Lista de <span className="text-school-orange">Material</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Confira a lista completa de materiais escolares para o ano letivo.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Material Escolar 2024
              </h2>
              <p className="text-slate-600">
                As listas estão organizadas por segmento e série. Clique no link correspondente para fazer o download.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-lg">Educação Infantil</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-school-orange hover:underline">• Maternal I e II</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• Pré I e II</a></li>
                </ul>
                
                <h3 className="font-bold text-slate-800 text-lg mt-6">Ensino Fundamental I</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-school-orange hover:underline">• 1º ano</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 2º ano</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 3º ano</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 4º ano</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 5º ano</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-lg">Ensino Fundamental II</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-school-orange hover:underline">• 6º ano</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 7º ano</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 8º ano</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 9º ano</a></li>
                </ul>
                
                <h3 className="font-bold text-slate-800 text-lg mt-6">Ensino Médio</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-school-orange hover:underline">• 1ª série</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 2ª série</a></li>
                  <li><a href="#" className="text-school-orange hover:underline">• 3ª série</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
