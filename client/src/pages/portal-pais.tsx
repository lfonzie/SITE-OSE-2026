import Navigation from "@/components/navigation";
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
        average: 8.2,
        attendance: 94,
        pendingActivities: 1
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
    title: "Simulado ENEM - Ana Carolina",
    message: "Sua filha está inscrita no simulado ENEM de 20/01. Local: Auditório às 8h.",
    date: "2024-01-10",
    type: "info",
    student: "Ana Carolina"
    message: "Reunião marcada para 25/01 às 19h. Presença obrigatória dos responsáveis.",
    date: "2024-01-08",
    type: "important",
    id: 3,
    title: "Atividade em Atraso - Pedro",
    message: "Pedro possui 1 atividade de Matemática em atraso. Prazo: 15/01.",
    date: "2024-01-12",
    type: "warning",
    student: "Pedro"
}
