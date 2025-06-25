import Navigation from "@/components/navigation";
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
import { OptimizedImage } from "@/components/ui/optimized-image";

// Importando imagens para serviços
import img1 from "@assets/0023_1750717790208.jpg";
import img2 from "@assets/0378_1750717790208.jpg";
import img3 from "@assets/1285_1750717790208.jpg";
import img4 from "@assets/0023_1750719589611.jpg";
import img5 from "@assets/0378_1750719589611.jpg";
import img6 from "@assets/1285_1750719589611.jpg";
export default function Services() {
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
    id: "portal-pais",
    title: "Portal dos Pais",
    description: "Acompanhe o desenvolvimento escolar do seu filho de forma integrada",
    icon: Users,
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
      "Mais de 10.000 títulos digitais",
      "Pesquisa avançada por tema",
      "Reserva de livros físicos",
      "Recomendações personalizadas",
      "Acesso 24/7"
    color: "bg-purple-600",
    link: "#biblioteca"
    id: "calendario-escolar",
    title: "Calendário Escolar",
    description: "Planejamento completo do ano letivo com todas as datas importantes",
    icon: Calendar,
      "Feriados e recessos",
      "Eventos e atividades especiais",
      "Reuniões pedagógicas",
      "Sincronização com dispositivos"
    color: "bg-yellow-600",
    link: "#calendario"
    id: "documentos",
    title: "Documentos Escolares",
    description: "Solicitação e acompanhamento de documentos oficiais da escola",
    icon: FileText,
      "Declarações e atestados",
      "Histórico escolar",
      "Certificados de conclusão",
      "Transferências",
      "Acompanhamento de status"
    color: "bg-red-600",
    link: "#documentos"
    id: "uniforme",
    title: "Uniforme Escolar",
    description: "Loja oficial com todos os itens do uniforme e materiais escolares",
    icon: Shirt,
      "Catálogo completo de uniformes",
      "Materiais escolares oficiais",
      "Encomendas online",
      "Tabela de tamanhos",
      "Entrega na escola"
    color: "bg-indigo-600",
    link: "#uniforme"
    id: "financeiro",
    title: "Portal Financeiro",
    description: "Gestão completa das mensalidades e pagamentos escolares",
    icon: CreditCard,
      "Boletos e PIX",
      "Histórico de pagamentos",
      "Negociação de débitos",
      "Comprovantes digitais",
      "Parcelamentos especiais"
    color: "bg-emerald-600",
    link: "#financeiro"
    id: "comunicados",
    title: "Central de Comunicados",
    description: "Receba todas as informações importantes da escola em tempo real",
    icon: Bell,
      "Notificações push",
      "E-mails automáticos",
      "SMS importantes",
      "Murais digitais",
      "Histórico de mensagens"
    color: "bg-orange-600",
    link: "#comunicados"
    id: "transporte",
    title: "Transporte Escolar",
    description: "Acompanhamento e gestão do transporte escolar credenciado",
    icon: MapPin,
      "Rastreamento em tempo real",
      "Rotas e horários",
      "Cadastro de transportadores",
      "Avisos de atraso",
      "Segurança certificada"
    color: "bg-cyan-600",
    link: "#transporte"
    id: "atividades",
    title: "Atividades Extracurriculares",
    description: "Inscrições e acompanhamento de atividades complementares",
    icon: Clock,
      "Esportes e modalidades",
      "Artes e cultura",
      "Cursos de idiomas",
      "Robótica e tecnologia",
      "Grupos de estudo"
    color: "bg-pink-600",
    link: "#atividades"
    id: "seguranca",
    title: "Segurança Escolar",
    description: "Sistema integrado de segurança e monitoramento",
    icon: Shield,
      "Controle de acesso",
      "Câmeras de segurança",
      "Identificação por RFID",
      "Protocolo de emergência",
      "Relatórios de entrada/saída"
    color: "bg-slate-600",
    link: "#seguranca"
    id: "eventos",
    title: "Galeria de Eventos",
    description: "Fotos e vídeos dos principais eventos e atividades da escola",
    icon: Camera,
      "Álbuns por turma",
      "Eventos esportivos",
      "Apresentações culturais",
      "Formaturas e cerimônias",
      "Download de fotos"
    color: "bg-violet-600",
    link: "#eventos"
  }
];
}
