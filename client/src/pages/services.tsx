import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Shirt, 
  Monitor,
  CreditCard,
  Bell,
  MapPin,
  Clock,
  Shield,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    id: "portal-aluno",
    title: "Portal do Aluno",
    description: "Acesso completo às notas, faltas, cronograma de provas e atividades online",
    icon: Monitor,
    features: [
      "Notas e boletins em tempo real",
      "Cronograma de provas e trabalhos",
      "Material didático digital",
      "Comunicação com professores",
      "Histórico escolar"
    ],
    color: "bg-school-blue",
    link: "#portal-aluno"
  },
  {
    id: "portal-pais",
    title: "Portal dos Pais",
    description: "Acompanhe o desenvolvimento escolar do seu filho de forma integrada",
    icon: Users,
    features: [
      "Relatórios de desempenho",
      "Agenda de reuniões",
      "Comunicados da escola",
      "Controle financeiro",
      "Calendário de eventos"
    ],
    color: "bg-school-green",
    link: "#portal-pais"
  },
  {
    id: "biblioteca-digital",
    title: "Biblioteca Digital",
    description: "Acervo completo de livros, artigos e recursos educacionais online",
    icon: BookOpen,
    features: [
      "Mais de 10.000 títulos digitais",
      "Pesquisa avançada por tema",
      "Reserva de livros físicos",
      "Recomendações personalizadas",
      "Acesso 24/7"
    ],
    color: "bg-purple-600",
    link: "#biblioteca"
  },
  {
    id: "calendario-escolar",
    title: "Calendário Escolar",
    description: "Planejamento completo do ano letivo com todas as datas importantes",
    icon: Calendar,
    features: [
      "Cronograma de provas e trabalhos",
      "Feriados e recessos",
      "Eventos e atividades especiais",
      "Reuniões pedagógicas",
      "Sincronização com dispositivos"
    ],
    color: "bg-yellow-600",
    link: "#calendario"
  },
  {
    id: "documentos",
    title: "Documentos Escolares",
    description: "Solicitação e acompanhamento de documentos oficiais da escola",
    icon: FileText,
    features: [
      "Declarações e atestados",
      "Histórico escolar",
      "Certificados de conclusão",
      "Transferências",
      "Acompanhamento de status"
    ],
    color: "bg-red-600",
    link: "#documentos"
  },
  {
    id: "uniforme",
    title: "Uniforme Escolar",
    description: "Loja oficial com todos os itens do uniforme e materiais escolares",
    icon: Shirt,
    features: [
      "Catálogo completo de uniformes",
      "Materiais escolares oficiais",
      "Encomendas online",
      "Tabela de tamanhos",
      "Entrega na escola"
    ],
    color: "bg-indigo-600",
    link: "#uniforme"
  },
  {
    id: "financeiro",
    title: "Portal Financeiro",
    description: "Gestão completa das mensalidades e pagamentos escolares",
    icon: CreditCard,
    features: [
      "Boletos e PIX",
      "Histórico de pagamentos",
      "Negociação de débitos",
      "Comprovantes digitais",
      "Parcelamentos especiais"
    ],
    color: "bg-emerald-600",
    link: "#financeiro"
  },
  {
    id: "comunicados",
    title: "Central de Comunicados",
    description: "Receba todas as informações importantes da escola em tempo real",
    icon: Bell,
    features: [
      "Notificações push",
      "E-mails automáticos",
      "SMS importantes",
      "Murais digitais",
      "Histórico de mensagens"
    ],
    color: "bg-orange-600",
    link: "#comunicados"
  },
  {
    id: "transporte",
    title: "Transporte Escolar",
    description: "Acompanhamento e gestão do transporte escolar credenciado",
    icon: MapPin,
    features: [
      "Rastreamento em tempo real",
      "Rotas e horários",
      "Cadastro de transportadores",
      "Avisos de atraso",
      "Segurança certificada"
    ],
    color: "bg-cyan-600",
    link: "#transporte"
  },
  {
    id: "atividades",
    title: "Atividades Extracurriculares",
    description: "Inscrições e acompanhamento de atividades complementares",
    icon: Clock,
    features: [
      "Esportes e modalidades",
      "Artes e cultura",
      "Cursos de idiomas",
      "Robótica e tecnologia",
      "Grupos de estudo"
    ],
    color: "bg-pink-600",
    link: "#atividades"
  },
  {
    id: "seguranca",
    title: "Segurança Escolar",
    description: "Sistema integrado de segurança e monitoramento",
    icon: Shield,
    features: [
      "Controle de acesso",
      "Câmeras de segurança",
      "Identificação por RFID",
      "Protocolo de emergência",
      "Relatórios de entrada/saída"
    ],
    color: "bg-slate-600",
    link: "#seguranca"
  },
  {
    id: "eventos",
    title: "Galeria de Eventos",
    description: "Fotos e vídeos dos principais eventos e atividades da escola",
    icon: Camera,
    features: [
      "Álbuns por turma",
      "Eventos esportivos",
      "Apresentações culturais",
      "Formaturas e cerimônias",
      "Download de fotos"
    ],
    color: "bg-violet-600",
    link: "#eventos"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-school-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png"
              alt="Colégio OSE - 100 Anos"
              className="h-20 w-auto object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nossos <span className="text-yellow-300">Serviços</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Oferecemos uma gama completa de serviços digitais e presenciais para facilitar 
            o dia a dia escolar de alunos, pais e responsáveis.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <CardHeader>
                    <div className={`${service.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon size={32} />
                    </div>
                    <CardTitle className="text-2xl text-slate-800">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-slate-600">
                          <div className="w-2 h-2 bg-school-blue rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => {
                        if (service.id === 'portal-aluno') {
                          window.location.href = '/portal-aluno';
                        } else if (service.id === 'portal-pais') {
                          window.location.href = '/portal-pais';
                        } else {
                          // Placeholder for other services
                          alert('Serviço em desenvolvimento');
                        }
                      }}
                      className={`w-full ${service.color} hover:opacity-90 text-white`}
                    >
                      Acessar Serviço
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-school-green to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Precisa de Ajuda com Nossos Serviços?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Nossa equipe de suporte está sempre disponível para ajudar você a aproveitar 
            ao máximo todos os nossos serviços digitais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-school-green hover:bg-gray-100">
              Central de Ajuda
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-school-green">
              Entrar em Contato
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}