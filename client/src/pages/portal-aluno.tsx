import Navigation from "@/components/navigation";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  User,
  Bell,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const studentData = {
  name: "Ana Carolina Silva",
  class: "3º Ano - Ensino Médio",
  studentId: "2024001234",
  photo: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
};

const grades = [
  { subject: "Matemática", grade: 9.2, maxGrade: 10, color: "bg-green-500" },
  { subject: "Português", grade: 8.8, maxGrade: 10, color: "bg-blue-500" },
  { subject: "Física", grade: 9.5, maxGrade: 10, color: "bg-purple-500" },
  { subject: "Química", grade: 8.5, maxGrade: 10, color: "bg-yellow-500" },
  { subject: "Biologia", grade: 9.0, maxGrade: 10, color: "bg-indigo-500" },
  { subject: "História", grade: 8.7, maxGrade: 10, color: "bg-red-500" }
];

const assignments = [
  {
    id: 1,
    title: "Redação ENEM",
    subject: "Português",
    dueDate: "2024-01-15",
    status: "pending",
    priority: "high"
  },
  {
    id: 2,
    title: "Lista de Exercícios - Função Quadrática",
    subject: "Matemática",
    dueDate: "2024-01-12",
    status: "completed",
    priority: "medium"
  },
  {
    id: 3,
    title: "Relatório de Laboratório",
    subject: "Química",
    dueDate: "2024-01-20",
    status: "pending",
    priority: "medium"
  },
  {
    id: 4,
    title: "Seminário - Revolução Industrial",
    subject: "História",
    dueDate: "2024-01-18",
    status: "submitted",
    priority: "high"
  }
];

const schedule = [
  { time: "07:30 - 08:20", subject: "Matemática", room: "Sala 201", teacher: "Prof. João Santos" },
  { time: "08:20 - 09:10", subject: "Português", room: "Sala 105", teacher: "Profa. Maria Silva" },
  { time: "09:10 - 09:30", subject: "Intervalo", room: "-", teacher: "-" },
  { time: "09:30 - 10:20", subject: "Física", room: "Lab. Física", teacher: "Prof. Carlos Lima" },
  { time: "10:20 - 11:10", subject: "Química", room: "Lab. Química", teacher: "Profa. Ana Costa" },
  { time: "11:10 - 12:00", subject: "Educação Física", room: "Quadra", teacher: "Prof. Pedro Oliveira" }
];

const notifications = [
  {
    id: 1,
    title: "Simulado ENEM - Inscrições Abertas",
    message: "As inscrições para o simulado ENEM estão abertas até 20/01",
    date: "2024-01-10",
    type: "info"
  },
  {
    id: 2,
    title: "Reunião de Pais - 3º Ano",
    message: "Reunião marcada para 25/01 às 19h no auditório",
    date: "2024-01-08",
    type: "important"
  },
  {
    id: 3,
    title: "Material de Apoio Disponível",
    message: "Novo material de Matemática disponível na biblioteca digital",
    date: "2024-01-05",
    type: "info"
  }
];

export default function PortalAluno() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'submitted':
        return <Clock className="text-blue-500" size={16} />;
      case 'pending':
        return <AlertCircle className="text-yellow-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'submitted':
        return 'Enviado';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-school-blue to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png"
                  alt="Colégio OSE"
                  className="h-12 w-auto object-contain filter brightness-0 invert"
                />
                <img 
                  src={studentData.photo}
                  alt={studentData.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover" 
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{studentData.name}</h1>
                <p className="text-blue-100 text-lg">{studentData.class}</p>
                <p className="text-blue-200 text-sm">Matrícula: {studentData.studentId}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-school-orange">
                <Bell className="mr-2" size={16} />
                Notificações
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-school-orange">
                <Settings className="mr-2" size={16} />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="grades">Notas</TabsTrigger>
              <TabsTrigger value="assignments">Atividades</TabsTrigger>
              <TabsTrigger value="schedule">Horários</TabsTrigger>
              <TabsTrigger value="materials">Materiais</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Média Geral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-school-orange">8.95</div>
                    <p className="text-xs text-slate-500">+0.2 desde o último mês</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Frequência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-school-brown">96%</div>
                    <p className="text-xs text-slate-500">145 de 151 presenças</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Atividades Pendentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">2</div>
                    <p className="text-xs text-slate-500">De 15 atividades totais</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Próxima Prova</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">3 dias</div>
                    <p className="text-xs text-slate-500">Matemática - 15/01</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 text-school-blue" size={20} />
                      Desempenho por Matéria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {grades.slice(0, 4).map((grade, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{grade.subject}</span>
                            <span className="text-sm text-slate-600">{grade.grade}</span>
                          </div>
                          <Progress value={(grade.grade / grade.maxGrade) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 text-school-blue" size={20} />
                      Notificações Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'important' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <p className="text-xs text-slate-600">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{notification.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Grades Tab */}
            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle>Boletim Escolar</CardTitle>
                  <CardDescription>Suas notas por disciplina neste bimestre</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {grades.map((grade, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{grade.subject}</h3>
                          <Badge className={`${grade.color} text-white`}>{grade.grade}</Badge>
                        </div>
                        <Progress value={(grade.grade / grade.maxGrade) * 100} className="h-3" />
                        <div className="flex justify-between text-sm text-slate-600">
                          <span>Mínimo: 6.0</span>
                          <span>Máximo: {grade.maxGrade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <CardTitle>Atividades e Trabalhos</CardTitle>
                  <CardDescription>Acompanhe suas atividades pendentes e concluídas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(assignment.status)}
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-slate-600">{assignment.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getPriorityColor(assignment.priority)}>
                            {assignment.priority === 'high' ? 'Alta' : assignment.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                          <span className="text-sm text-slate-600">{assignment.dueDate}</span>
                          <Badge variant={assignment.status === 'completed' ? 'default' : assignment.status === 'submitted' ? 'secondary' : 'outline'}>
                            {getStatusText(assignment.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Horário de Hoje</CardTitle>
                  <CardDescription>Suas aulas programadas para hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                        item.subject === 'Intervalo' ? 'bg-slate-100' : 'bg-white border'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-mono text-slate-600 w-24">{item.time}</div>
                          <div>
                            <h3 className="font-medium">{item.subject}</h3>
                            {item.teacher !== '-' && (
                              <p className="text-sm text-slate-600">{item.teacher}</p>
                            )}
                          </div>
                        </div>
                        {item.room !== '-' && (
                          <Badge variant="outline">{item.room}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Materials Tab */}
            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>Material de Apoio</CardTitle>
                  <CardDescription>Downloads e recursos educacionais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História'].map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="text-school-blue" size={20} />
                          <div>
                            <h3 className="font-medium">Apostila de {subject}</h3>
                            <p className="text-sm text-slate-600">Atualizada em 10/01/2024</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2" size={16} />
                          Baixar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
          <div className="mt-12 text-center">
            <Button 
              size="lg"
              className="bg-school-orange hover:bg-school-orange/90 text-white text-lg px-8 py-4"
              onClick={() => window.open('https://siga03.activesoft.com.br/login/?instituicao=COLEGIOOSE', '_blank')}
            >
              🔗 Acessar Portal do Aluno
            </Button>
          </div>
          {/* Instruções de Acesso */}
          <div className="mt-16 bg-gradient-to-r from-school-orange/10 to-school-brown/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Como Acessar o Portal
            </h3>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4 text-slate-700">
                <div className="flex items-start">
                  <div className="bg-school-orange text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                    1
                  </div>
                  <p><strong>Acesse o link:</strong> Portal do Aluno (botão abaixo).</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-school-orange text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                    2
                  </div>
                  <p><strong>No campo de login:</strong> use o CPF do responsável financeiro.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-school-orange text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                    3
                  </div>
                  <p><strong>A senha:</strong> são os primeiros 6 dígitos do CPF (somente números).</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Após o login:</strong> você poderá acessar as notas do aluno e outras informações importantes.
                </p>
              </div>
            </div>
          </div>

    </div>
  );
}