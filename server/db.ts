import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Professores management
interface Professor {
  id: number;
  nome: string;
  disciplina: string;
  formacao: string;
  experiencia: string;
  sobre: string;
  foto: string;
}

let professores: Professor[] = [
  {
    id: 1,
    nome: "Prof. João Silva",
    disciplina: "Matemática",
    formacao: "Mestre em Matemática - USP",
    experiencia: "15 anos de experiência",
    sobre: "Especialista em metodologias ativas para o ensino de matemática, com foco no desenvolvimento do raciocínio lógico.",
    foto: "/images/horizontal_1.png"
  },
  {
    id: 2,
    nome: "Profa. Maria Santos",
    disciplina: "Português",
    formacao: "Doutora em Letras - UNICAMP",
    experiencia: "20 anos de experiência",
    sobre: "Especializada em literatura brasileira e produção textual, promovendo o amor pela leitura e escrita.",
    foto: "/images/horizontal_2.png"
  }
];

export const getProfessores = (): Professor[] => {
  return professores;
};

export const addProfessor = (professorData: Omit<Professor, 'id'>): Professor => {
  const newId = Math.max(...professores.map(p => p.id), 0) + 1;
  const professor: Professor = {
    id: newId,
    ...professorData
  };
  professores.push(professor);
  return professor;
};

export const updateProfessor = (id: number, professorData: Partial<Professor>): Professor | null => {
  const index = professores.findIndex(p => p.id === id);
  if (index === -1) return null;

  professores[index] = { ...professores[index], ...professorData };
  return professores[index];
};

export const deleteProfessor = (id: number): boolean => {
  const initialLength = professores.length;
  professores = professores.filter(p => p.id !== id);
  return professores.length < initialLength;
};