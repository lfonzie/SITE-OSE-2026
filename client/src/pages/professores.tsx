import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { updateSEO } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Award, GraduationCap, Clock } from "lucide-react";

// Dados dos professores
const professores = [
  {
    id: 1,
    nome: "Profa. Maria Silva",
    disciplina: "Matemática",
    formacao: "Mestre em Matemática - USP",
    experiencia: "15 anos de experiência",
    sobre: "Especializada em matemática aplicada e metodologias ativas de ensino.",
    foto: "/images/0312_1750717790204.jpg"
  },
  {
    id: 2,
    nome: "Prof. João Santos",
    disciplina: "Português",
    formacao: "Doutor em Letras - UNICAMP",
    experiencia: "20 anos de experiência",
    sobre: "Focado em literatura brasileira e produção textual criativa.",
    foto: "/images/0378_1750717790208.jpg"
  },
  {
    id: 3,
    nome: "Profa. Ana Costa",
    disciplina: "História",
    formacao: "Doutora em História - PUC-SP",
    experiencia: "18 anos de experiência",
    sobre: "Especialista em história contemporânea e metodologia de pesquisa histórica.",
    foto: "/images/0491_1750717790207.jpg"
  },
  {
    id: 4,
    nome: "Prof. Carlos Lima",
    disciplina: "Física",
    formacao: "Doutor em Física - USP",
    experiencia: "12 anos de experiência",
    sobre: "Especializado em física experimental e uso de tecnologia no ensino.",
    foto: "/images/0541_1750717790207.jpg"
  },
  {
    id: 5,
    nome: "Profa. Beatriz Rocha",
    disciplina: "Química",
    formacao: "Mestre em Química - UNESP",
    experiencia: "16 anos de experiência",
    sobre: "Focada em química orgânica e sustentabilidade ambiental.",
    foto: "/images/0581_1750717790206.jpg"
  }
];

export default function Professores() {
  useEffect(() => {
    updateSEO({
      title: "Professores - Colégio OSE",
      description: "Conheça nosso corpo docente altamente qualificado com mais de 50 professores especializados.",
      keywords: "professores, corpo docente, educadores, qualificação, ensino"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Nossos <span className="text-school-orange">Professores</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Corpo docente altamente qualificado com mais de 50 professores especializados, 
              dedicados à formação integral de nossos alunos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {professores.map((professor) => (
              <Card key={professor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={professor.foto} 
                    alt={professor.nome}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-school-orange text-white">
                    {professor.disciplina}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {professor.nome}
                  </h3>
                  
                  <div className="flex items-center text-school-orange mb-2">
                    <GraduationCap className="mr-2" size={16} />
                    <span className="text-sm font-medium">{professor.formacao}</span>
                  </div>
                  
                  <div className="flex items-center text-slate-600 mb-3">
                    <Clock className="mr-2" size={16} />
                    <span className="text-sm">{professor.experiencia}</span>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {professor.sobre}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-xl p-8 md:p-12 text-center">
            <Award className="text-school-orange mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              Excelência Acadêmica
            </h2>
            <p className="text-xl mb-6 text-slate-600 max-w-4xl mx-auto">
              Nossos professores são selecionados por sua excelência acadêmica, experiência pedagógica 
              e compromisso com a educação transformadora. Todos possuem formação superior e muitos 
              são mestres e doutores em suas áreas de atuação.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-school-orange mb-2">50+</div>
                <div className="text-slate-600">Professores Qualificados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-school-orange mb-2">80%</div>
                <div className="text-slate-600">Com Pós-Graduação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-school-orange mb-2">15+</div>
                <div className="text-slate-600">Anos Experiência Média</div>
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