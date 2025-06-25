
import { useEffect, useState } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import UChatWidget from "@/components/uchat-widget";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import UChatWidget from "@/components/uchat-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UChatWidget from "@/components/uchat-widget";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Phone, Mail, User } from "lucide-react";

export default function CV() {
  const { toast } = useToast();
  
  useEffect(() => {
    updateSEO({
      title: "Trabalhe Conosco - Colégio OSE",
      description: "Junte-se à nossa equipe de educadores. Envie seu currículo e faça parte da tradição centenária do Colégio OSE.",
      keywords: "trabalhe conosco, vagas, professor, educador, carreira, ensino"
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Currículo enviado!",
      description: "Recebemos seu currículo e entraremos em contato em breve."
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Trabalhe <span className="text-school-orange">Conosco</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Faça parte da nossa equipe de educadores e contribua para a formação de futuras gerações.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-orange focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Área de Interesse
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-orange focus:border-transparent">
                  <option>Selecione uma área</option>
                  <option>Educação Infantil</option>
                  <option>Ensino Fundamental I</option>
                  <option>Ensino Fundamental II</option>
                  <option>Ensino Médio</option>
                  <option>Coordenação</option>
                  <option>Administrativa</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Anexar Currículo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Clique para selecionar ou arraste seu arquivo</p>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-school-orange text-white py-3 rounded-lg font-semibold hover:bg-school-orange/90 transition-colors"
              >
                Enviar Currículo
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
