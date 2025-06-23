import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  CreditCard,
  Bell,
  Settings,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const parentData = {
  name: "Carlos Silva",
  children: [
    {
      name: "Ana Carolina Silva",
      class: "3º Ano - Ensino Médio",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      performance: {
        average: 8.95,
        attendance: 96,
        pendingActivities: 2
      }
    },
    {
      name: "Pedro Silva",
      class: "8º Ano - Fundamental II",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      performance: {
        average: 8.2,
        attendance: 94,
        pendingActivities: 1
      }
    }
  ]
};

const financialData = [
  { month: "Janeiro 2024", amount: 1250.00, status: "paid", dueDate: "2024-01-05" },
  { month: "Fevereiro 2024", amount: 1250.00, status: "pending", dueDate: "2024-02-05" },
  { month: "Março 2024", amount: 1250.00, status: "pending", dueDate: "2024-03-05" }
];

const meetings = [
  {
    id: 1,
    title: "Reunião de Pais - 3º Ano",
    date: "2024-01-25",
    time: "19:00",
    location: "Auditório Principal",
    status: "scheduled",
    description: "Discussão sobre preparação para vestibular e ENEM"
  },
  {
    id: 2,
    title: "Atendimento Individual - Ana Carolina",
    date: "2024-01-18",
    time: "16:30",
    location: "Sala da Coordenação",
    status: "confirmed",
    description: "Acompanhamento pedagógico individual"
  }
];

const communications = [
  {
    id: 1,
    title: "Simulado ENEM - Ana Carolina",
    message: "Sua filha está inscrita no simulado ENEM de 20/01. Local: Auditório às 8h.",
    date: "2024-01-10",
    type: "info",
    student: "Ana Carolina"
  },
  {
    id: 2,
    title: "Reunião de Pais - 3º Ano",
    message: "Reunião marcada para 25/01 às 19h. Presença obrigatória dos responsáveis.",
    date: "2024-01-08",
    type: "important",
    student: "Ana Carolina"
  },
  {
    id: 3,
    title: "Atividade em Atraso - Pedro",
    message: "Pedro possui 1 atividade de Matemática em atraso. Prazo: 15/01.",
    date: "2024-01-12",
    type: "warning",
    student: "Pedro"
  }
];

export default function PortalPais() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Vencido';
      default:
        return 'Desconhecido';
    }
  };

  const getCommunicationType = (type: string) => {
    switch (type) {
      case 'important':
        return { color: 'bg-red-500', icon: AlertTriangle };
      case 'warning':
        return { color: 'bg-yellow-500', icon: Clock };
      case 'info':
        return { color: 'bg-blue-500', icon: Bell };
      default:
        return { color: 'bg-gray-500', icon: Bell };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-school-green to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img 
                src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png"
                alt="Colégio OSE"
                className="h-16 w-auto object-contain filter brightness-0 invert"
              />
              <div>
                <h1 className="text-3xl font-bold">Portal dos Pais</h1>
                <p className="text-green-100 text-lg">Bem-vindo, {parentData.name}</p>
                <p className="text-green-200 text-sm">Acompanhe o desenvolvimento dos seus filhos</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-school-green">
                <Bell className="mr-2" size={16} />
                Notificações
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-school-green">
                <Settings className="mr-2" size={16} />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Children Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Seus Filhos</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {parentData.children.map((child, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={child.photo}
                      alt={child.name}
                      className="w-16 h-16 rounded-full object-cover" 
                    />
                    <div>
                      <CardTitle className="text-lg">{child.name}</CardTitle>
                      <CardDescription>{child.class}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-school-blue">{child.performance.average}</div>
                      <p className="text-xs text-slate-600">Média Geral</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-school-green">{child.performance.attendance}%</div>
                      <p className="text-xs text-slate-600">Frequência</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{child.performance.pendingActivities}</div>
                      <p className="text-xs text-slate-600">Pendentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="communications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="communications">Comunicados</TabsTrigger>
              <TabsTrigger value="meetings">Reuniões</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
            </TabsList>

            {/* Communications Tab */}
            <TabsContent value="communications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 text-school-green" size={20} />
                    Comunicados da Escola
                  </CardTitle>
                  <CardDescription>Últimas informações sobre seus filhos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communications.map((comm) => {
                      const typeConfig = getCommunicationType(comm.type);
                      const Icon = typeConfig.icon;
                      return (
                        <div key={comm.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className={`${typeConfig.color} text-white p-2 rounded-full flex-shrink-0`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{comm.title}</h3>
                              <Badge variant="outline">{comm.student}</Badge>
                            </div>
                            <p className="text-slate-600 mt-1">{comm.message}</p>
                            <p className="text-xs text-slate-400 mt-2">{comm.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meetings Tab */}
            <TabsContent value="meetings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 text-school-green" size={20} />
                    Agenda de Reuniões
                  </CardTitle>
                  <CardDescription>Próximas reuniões e atendimentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-school-green text-white p-2 rounded-full">
                            <Calendar size={16} />
                          </div>
                          <div>
                            <h3 className="font-medium">{meeting.title}</h3>
                            <p className="text-sm text-slate-600">{meeting.description}</p>
                            <p className="text-xs text-slate-500">
                              {meeting.date} às {meeting.time} - {meeting.location}
                            </p>
                          </div>
                        </div>
                        <Badge className={meeting.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {meeting.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 text-school-green" size={20} />
                    Situação Financeira
                  </CardTitle>
                  <CardDescription>Mensalidades e pagamentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{payment.month}</h3>
                          <p className="text-sm text-slate-600">Vencimento: {payment.dueDate}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-bold">R$ {payment.amount.toFixed(2)}</span>
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusText(payment.status)}
                          </Badge>
                          {payment.status === 'pending' && (
                            <Button size="sm" className="bg-school-green hover:bg-school-green/90">
                              Pagar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 text-school-green" size={20} />
                    Contato com a Escola
                  </CardTitle>
                  <CardDescription>Entre em contato com coordenadores e professores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-slate-800">Coordenação Pedagógica</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="text-school-green" size={16} />
                          <span className="text-sm">(11) 1234-5678 - Ramal 201</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="text-school-green" size={16} />
                          <span className="text-sm">coordenacao@colegioose.com.br</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="text-school-green" size={16} />
                          <span className="text-sm">Segunda a Sexta: 7h30 às 17h</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-slate-800">Secretaria</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="text-school-green" size={16} />
                          <span className="text-sm">(11) 1234-5678 - Ramal 100</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="text-school-green" size={16} />
                          <span className="text-sm">secretaria@colegioose.com.br</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="text-school-green" size={16} />
                          <span className="text-sm">Segunda a Sexta: 7h às 18h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-school-green hover:bg-school-green/90 text-white">
                      <MessageSquare className="mr-2" size={16} />
                      Enviar Mensagem para a Escola
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}