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
    nome: "Samanta Chibau Mileze",
    disciplina: "Coordenadora Pedagógica",
    formacao: "Pedagogia - Universidade de Sorocaba",
    experiencia: "15 anos de experiência em educação",
    sobre: "Coordenadora pedagógica experiente com foco no desenvolvimento integral dos alunos.",
    foto: "/images/samanta.jpg"
  },
  {
    id: 2,
    nome: "Fernando Silva",
    disciplina: "Matemática e Física",
    formacao: "Licenciatura em Matemática - USP",
    experiencia: "12 anos de experiência em ensino",
    sobre: "Especialista em matemática e física com metodologias inovadoras de ensino.",
    foto: "/images/fernando.jpeg"
  },
  {
    id: 3,
    nome: "Edna Santos",
    disciplina: "Língua Portuguesa",
    formacao: "Letras - PUC-SP",
    experiencia: "20 anos de experiência em educação",
    sobre: "Professora de português com vasta experiência em literatura e gramática.",
    foto: "/images/edna.jpg"
  },
  {
    id: 4,
    nome: "Prof. João Silva",
    disciplina: "Matemática",
    formacao: "Mestre em Matemática - USP",
    experiencia: "15 anos de experiência",
    sobre: "Especialista em metodologias ativas para o ensino de matemática, com foco no desenvolvimento do raciocínio lógico.",
    foto: "/images/horizontal_1.png"
  },
  {
    id: 5,
    nome: "Profa. Maria Santos",
    disciplina: "Português",
    formacao: "Doutora em Letras - UNICAMP",
    experiencia: "20 anos de experiência",
    sobre: "Especializada em literatura brasileira e produção textual, promovendo o amor pela leitura e escrita.",
    foto: "/images/horizontal_2.png"
  },
  {
    id: 6,
    nome: "Prof. Carlos Lima",
    disciplina: "Física",
    formacao: "Mestre em Física - UNESP",
    experiencia: "12 anos de experiência",
    sobre: "Apaixonado por ensinar física através de experimentos práticos e aplicações do cotidiano.",
    foto: "/images/horizontal_3.png"
  },
  {
    id: 7,
    nome: "Profa. Ana Costa",
    disciplina: "Química",
    formacao: "Doutora em Química - USP",
    experiencia: "18 anos de experiência",
    sobre: "Especialista em química orgânica e inorgânica, utilizando laboratório para aprendizado prático.",
    foto: "/images/horizontal_4.png"
  },
  {
    id: 8,
    nome: "Prof. Roberto Ferreira",
    disciplina: "História",
    formacao: "Mestre em História - PUC-SP",
    experiencia: "16 anos de experiência",
    sobre: "Dedicado ao ensino de história brasileira e mundial, conectando passado e presente.",
    foto: "/images/horizontal_5.png"
  },
  {
    id: 9,
    nome: "Profa. Lúcia Oliveira",
    disciplina: "Geografia",
    formacao: "Especialista em Geografia - UNESP",
    experiencia: "14 anos de experiência",
    sobre: "Focada em geografia humana e física, utilizando tecnologia e mapas interativos.",
    foto: "/images/horizontal_6.png"
  },
  {
    id: 10,
    nome: "Prof. Paulo Mendes",
    disciplina: "Biologia",
    formacao: "Doutor em Biologia - USP",
    experiencia: "22 anos de experiência",
    sobre: "Especialista em biologia molecular e ecologia, promovendo consciência ambiental.",
    foto: "/images/horizontal_7.png"
  },
  {
    id: 11,
    nome: "Profa. Fernanda Rocha",
    disciplina: "Inglês",
    formacao: "Mestre em Linguística - UNICAMP",
    experiencia: "10 anos de experiência",
    sobre: "Certificada Cambridge, especializada em metodologia comunicativa e preparação para exames internacionais.",
    foto: "/images/horizontal_8.png"
  },
  {
    id: 12,
    nome: "Prof. Marcos Almeida",
    disciplina: "Educação Física",
    formacao: "Especialista em Educação Física - USP",
    experiencia: "13 anos de experiência",
    sobre: "Focado no desenvolvimento motor e formação de valores através do esporte.",
    foto: "/images/horizontal_9.png"
  },
  {
    id: 13,
    nome: "Profa. Juliana Campos",
    disciplina: "Artes",
    formacao: "Mestre em Artes Visuais - UNESP",
    experiencia: "11 anos de experiência",
    sobre: "Especializada em artes visuais e história da arte, estimulando a criatividade dos alunos.",
    foto: "/images/horizontal_10.png"
  },
  {
    id: 14,
    nome: "Prof. Eduardo Barbosa",
    disciplina: "Filosofia",
    formacao: "Doutor em Filosofia - USP",
    experiencia: "19 anos de experiência",
    sobre: "Especialista em ética e filosofia política, desenvolvendo pensamento crítico nos estudantes.",
    foto: "/images/horizontal_11.png"
  },
  {
    id: 15,
    nome: "Profa. Carla Nascimento",
    disciplina: "Sociologia",
    formacao: "Mestre em Sociologia - UNICAMP",
    experiencia: "8 anos de experiência",
    sobre: "Focada em sociologia contemporânea e direitos humanos, formando cidadãos conscientes.",
    foto: "/images/horizontal_12.png"
  },
  {
    id: 16,
    nome: "Prof. Ricardo Souza",
    disciplina: "Informática",
    formacao: "Mestre em Ciência da Computação - USP",
    experiencia: "9 anos de experiência",
    sobre: "Especialista em programação e tecnologia educacional, preparando alunos para o futuro digital.",
    foto: "/images/horizontal_13.png"
  },
  {
    id: 17,
    nome: "Profa. Sandra Martins",
    disciplina: "Psicologia",
    formacao: "Doutora em Psicologia - PUC-SP",
    experiencia: "17 anos de experiência",
    sobre: "Especializada em psicologia educacional e desenvolvimento socioemocional dos estudantes.",
    foto: "/images/horizontal_14.png"
  },
  {
    id: 18,
    nome: "Prof. Gustavo Pereira",
    disciplina: "Espanhol",
    formacao: "Mestre em Letras Hispânicas - USP",
    experiencia: "7 anos de experiência",
    sobre: "Nativo de Buenos Aires, especializado em cultura hispano-americana e preparação para DELE.",
    foto: "/images/horizontal_15.png"
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