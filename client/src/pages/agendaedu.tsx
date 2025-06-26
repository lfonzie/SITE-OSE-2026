
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, MessageSquare, FileText, Users, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
// Removed problematic imports - will implement sections directly
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';

export default function AgendaEdu() {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    updateSEO({
      title: "AgendaEdu - Colégio OSE | Portal de Comunicação Escolar",
      description: "Acesse o AgendaEdu do Colégio OSE para acompanhar a agenda escolar, comunicados, notas e muito mais.",
      keywords: "agendaedu, portal escolar, comunicação, agenda, colégio ose, sorocaba"
    });
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "Agenda Escolar",
      description: "Acompanhe eventos, provas, atividades e datas importantes"
    },
    {
      icon: MessageSquare,
      title: "Comunicados",
      description: "Receba informações importantes da escola em tempo real"
    },
    {
      icon: FileText,
      title: "Boletins e Notas",
      description: "Visualize o desempenho acadêmico e relatórios de notas"
    },
    {
      icon: Users,
      title: "Comunicação Direta",
      description: "Chat direto com professores e coordenação pedagógica"
    },
    {
      icon: Clock,
      title: "Horários",
      description: "Consulte horários de aulas e atividades extracurriculares"
    },
    {
      icon: BookOpen,
      title: "Atividades",
      description: "Acompanhe tarefas, trabalhos e projetos escolares"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Admin Logout Button */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <LogoutButton />
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-school-orange/10"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AgendaEdu
              <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                Portal de Comunicação Escolar OSE
              </span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Mantenha-se conectado com a vida escolar do seu filho através da nossa plataforma digital integrada.
            </p>
            
            <Button
              size="lg"
              onClick={() => window.open('https://web.agendaedu.com/', '_blank')}
              className="bg-school-orange text-white hover:bg-school-orange/90 text-lg px-8 py-3"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Acessar AgendaEdu
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Funcionalidades da Plataforma
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              O AgendaEdu oferece uma experiência completa de comunicação entre escola, alunos e famílias.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-school-orange">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-school-orange/10 p-2 rounded-lg">
                        <feature.icon className="w-6 h-6 text-school-orange" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Access Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-800">
                  Como Acessar
                </CardTitle>
                <CardDescription className="text-lg">
                  Siga os passos para conectar-se à plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Primeiro Acesso
                    </h3>
                    <ol className="space-y-3 text-slate-600">
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                        <span>Receba suas credenciais de acesso da secretaria do colégio</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                        <span>Acesse web.agendaedu.com</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                        <span>Faça login com usuário e senha fornecidos</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-school-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                        <span>Configure sua conta e comece a usar</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Suporte
                    </h3>
                    <div className="space-y-3">
                      <p className="text-slate-600">
                        <strong>Dúvidas técnicas:</strong><br />
                        Entre em contato com a secretaria do colégio
                      </p>
                      <p className="text-slate-600">
                        <strong>Telefone:</strong><br />
                        (15) 2101-3800
                      </p>
                      <p className="text-slate-600">
                        <strong>Horário de atendimento:</strong><br />
                        Segunda a sexta, das 7h às 17h
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-6 border-t">
                  <Button
                    size="lg"
                    onClick={() => window.open('https://web.agendaedu.com/', '_blank')}
                    className="bg-school-orange text-white hover:bg-school-orange/90"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Acessar AgendaEdu Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Por que OSE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Por que escolher <span className="text-school-orange">a OSE</span>?
            </h2>
          </div>
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 p-8 rounded-xl text-center">
            <p className="text-lg text-slate-700">
              A OSE oferece uma educação de excelência há 100 anos em Sorocaba, 
              utilizando ferramentas modernas como a AgendaEdu para manter pais e alunos sempre conectados.
            </p>
          </div>
        </div>
      </section>

      {/* Por que OSE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Por que escolher <span className="text-school-orange">a OSE</span>?
            </h2>
          </div>
          <div className="bg-gradient-to-r from-school-orange/10 to-school-brown/10 p-8 rounded-xl text-center">
            <p className="text-lg text-slate-700">
              A OSE oferece uma educação de excelência há 100 anos em Sorocaba, 
              utilizando ferramentas modernas como a AgendaEdu para manter pais e alunos sempre conectados.
            </p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Entre em Contato</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <p className="text-lg text-slate-600 mb-4">
              <strong>Telefone:</strong> (15) 2101-3800
            </p>
            <p className="text-lg text-slate-600 mb-4">
              <strong>WhatsApp:</strong> (15) 2101-3812
            </p>
            <p className="text-slate-600">
              Horário de atendimento: Segunda a sexta, das 7h às 17h
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
