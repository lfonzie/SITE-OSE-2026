import { Button } from "@/components/ui/button";
import { Heart, Users, Target, Award, BookOpen } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Desde <span className="text-school-orange">1924</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              A OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem: 
              Tradição e uma rica história de 100 anos formando gerações. Nossa metodologia inovadora 
              combina nossa experiência secular com a moderna plataforma Amplia.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Com uma equipe de professores experientes, nosso compromisso é com a excelência no ensino 
              e no desenvolvimento pessoal e emocional de cada aluno, oferecendo um ambiente que prepara 
              cidadãos completos para o futuro.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Lightbulb className="text-2xl text-yellow-500 mb-3" size={32} />
                <h4 className="font-bold text-slate-800 mb-2">Inovação</h4>
                <p className="text-slate-600 text-sm">Metodologias ativas e tecnologia educacional</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Heart className="text-2xl text-red-500 mb-3" size={32} />
                <h4 className="font-bold text-slate-800 mb-2">Humanização</h4>
                <p className="text-slate-600 text-sm">Cuidado integral com cada estudante</p>
              </div>
            </div>
            
            <Button className="bg-school-orange hover:bg-school-orange/90 text-white">
              Conheça Nossa Proposta Pedagógica
            </Button>
          </div>
          
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-school-orange/20 to-school-brown/20 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="text-school-orange mx-auto mb-4" size={64} />
                <p className="text-school-brown font-medium">Ambiente Educacional da OSE</p>
              </div>
            </div>
            
            {/* Floating achievement card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-school-orange">
              <div className="flex items-center">
                <img 
                  src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png"
                  alt="100 Anos OSE"
                  className="h-8 w-auto object-contain mr-3"
                />
                <div>
                  <h4 className="font-bold text-slate-800">100 Anos de Tradição</h4>
                  <p className="text-slate-600 text-sm">Desde 1924</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
