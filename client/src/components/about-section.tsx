import { Lightbulb, Heart, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Nossa <span className="text-school-blue">História</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Desde 1998, o Colégio OSE tem sido referência em educação de qualidade, 
              formando gerações de estudantes preparados para os desafios do mundo moderno. 
              Nossa metodologia inovadora combina tradição pedagógica com tecnologia de ponta.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Acreditamos que cada aluno é único e possui potencial ilimitado. Por isso, 
              oferecemos um ambiente acolhedor e estimulante, onde o aprendizado acontece 
              de forma natural e prazerosa.
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
            
            <Button className="bg-school-blue hover:bg-school-blue/90 text-white">
              Conheça Nossa Proposta Pedagógica
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Fachada moderna do Colégio OSE" 
              className="rounded-2xl shadow-2xl w-full" 
            />
            
            {/* Floating achievement card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-school-green">
              <div className="flex items-center">
                <Medal className="text-yellow-500 text-2xl mr-3" size={32} />
                <div>
                  <h4 className="font-bold text-slate-800">Escola Nota 10</h4>
                  <p className="text-slate-600 text-sm">Avaliação MEC 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
