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
    priority: "low"
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
    title: "Simulado ENEM - Inscrições Abertas",
    message: "As inscrições para o simulado ENEM estão abertas até 20/01",
    date: "2024-01-10",
    type: "info"
    title: "Reunião de Pais - 3º Ano",
    message: "Reunião marcada para 25/01 às 19h no auditório",
    date: "2024-01-08",
    type: "important"
    title: "Material de Apoio Disponível",
    message: "Novo material de Matemática disponível na biblioteca digital",
    date: "2024-01-05",
}
