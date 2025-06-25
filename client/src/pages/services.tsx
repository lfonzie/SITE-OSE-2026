import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { updateSEO } from "@/lib/seo";
import UChatWidget from "@/components/uchat-widget";
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

export default function Services() {
  useEffect(() => {
    updateSEO({
      title: "Serviços Digitais - Colégio OSE",
      description: "Conheça todos os serviços digitais que o Colégio OSE oferece para facilitar o dia a dia escolar.",
      keywords: "serviços digitais, portal do aluno, portal dos pais, colégio ose"
    });
  }, []);

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
    link: "https://siga03.activesoft.com.br/login/?instituicao=COLEGIOOSE"
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Nossos <span className="text-school-orange">Serviços</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Conheça todos os serviços digitais que o Colégio OSE oferece para facilitar o dia a dia escolar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-school-orange rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-school-orange hover:bg-school-orange/90 text-white"
                      onClick={() => window.open(service.link, '_blank')}
                    >
                      Acessar Serviço
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
