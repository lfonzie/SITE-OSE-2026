import { GraduationCap, Award, BookOpen, Users, Target, Heart } from 'lucide-react';
import UChatWidget from "@/components/uchat-widget";
import { Button } from '@/components/ui/button';
import UChatWidget from "@/components/uchat-widget";
import Navigation from '@/components/navigation';
import UChatWidget from "@/components/uchat-widget";
import WhyOSESection from '@/components/why-ose-section';
import UChatWidget from "@/components/uchat-widget";
import ContactSection from '@/components/contact-section';
import UChatWidget from "@/components/uchat-widget";
import { OptimizedImage } from '@/components/ui/optimized-image';
import UChatWidget from "@/components/uchat-widget";

// Import images
import img1 from '/images/0905_1750717790206.jpg';
import UChatWidget from "@/components/uchat-widget";
import img2 from '/images/0934_1750717790206.jpg';
import UChatWidget from "@/components/uchat-widget";
import img3 from '/images/1068_1750717790205.jpg';
import UChatWidget from "@/components/uchat-widget";
// Dados dos professores - expandir conforme necessário
const professores = [
  {
    id: 1,
    nome: "Prof. João Silva",
    disciplina: "Matemática",
    formacao: "Mestre em Matemática - USP",
    experiencia: "15 anos de experiência",
    sobre: "Especialista em metodologias ativas para o ensino de matemática, com foco no desenvolvimento do raciocínio lógico.",
    foto: "/images/0905_1750717790206.jpg"
  },
  {
    id: 2,
    nome: "Profa. Maria Santos",
    disciplina: "Português",
    formacao: "Doutora em Letras - UNICAMP",
    experiencia: "20 anos de experiência",
    sobre: "Especializada em literatura brasileira e produção textual, promovendo o amor pela leitura e escrita.",
    foto: "/images/0934_1750717790206.jpg"
  },
  {
    id: 3,
    nome: "Prof. Carlos Lima",
    disciplina: "Física",
    formacao: "Mestre em Física - UNESP",
    experiencia: "12 anos de experiência",
    sobre: "Apaixonado por ensinar física através de experimentos práticos e aplicações do cotidiano.",
    foto: "/images/1068_1750717790205.jpg"
  },
  {
    id: 4,
    nome: "Profa. Ana Costa",
    disciplina: "Química",
    formacao: "Doutora em Química - USP",
    experiencia: "18 anos de experiência",
    sobre: "Especialista em química orgânica e inorgânica, utilizando laboratório para aprendizado prático.",
    foto: "/images/0023_1750717790208.jpg"
  },
  {
    id: 5,
    nome: "Prof. Roberto Ferreira",
    disciplina: "História",
    formacao: "Mestre em História - PUC-SP",
    experiencia: "16 anos de experiência",
    sobre: "Dedicado ao ensino de história brasileira e mundial, conectando passado e presente.",
    foto: "/images/0312_1750717790204.jpg"
  },
  {
    id: 6,
    nome: "Profa. Lúcia Oliveira",
    disciplina: "Geografia",
    formacao: "Especialista em Geografia - UNESP",
    experiencia: "14 anos de experiência",
    sobre: "Focada em geografia humana e física, utilizando tecnologia e mapas interativos.",
    foto: "/images/0354_1750717790205.jpg"
    id: 7,
    nome: "Prof. Paulo Mendes",
    disciplina: "Biologia",
    formacao: "Doutor em Biologia - USP",
    experiencia: "22 anos de experiência",
    sobre: "Especialista em biologia molecular e ecologia, promovendo consciência ambiental.",
    foto: "/images/0378_1750717790208.jpg"
    id: 8,
    nome: "Profa. Fernanda Rocha",
    disciplina: "Inglês",
    formacao: "Mestre em Linguística - UNICAMP",
    experiencia: "10 anos de experiência",
    sobre: "Certificada Cambridge, especializada em metodologia comunicativa e preparação para exames internacionais.",
    foto: "/images/0491_1750717790207.jpg"
    id: 9,
    nome: "Prof. Marcos Almeida",
    disciplina: "Educação Física",
    formacao: "Especialista em Educação Física - USP",
    experiencia: "13 anos de experiência",
    sobre: "Focado no desenvolvimento motor e formação de valores através do esporte.",
    foto: "/images/0541_1750717790207.jpg"
    id: 10,
    nome: "Profa. Juliana Campos",
    disciplina: "Artes",
    formacao: "Mestre em Artes Visuais - UNESP",
    experiencia: "11 anos de experiência",
    sobre: "Especializada em artes visuais e história da arte, estimulando a criatividade dos alunos.",
    foto: "/images/0581_1750717790206.jpg"
    id: 11,
    nome: "Prof. Eduardo Barbosa",
    disciplina: "Filosofia",
    formacao: "Doutor em Filosofia - USP",
    experiencia: "19 anos de experiência",
    sobre: "Especialista em ética e filosofia política, desenvolvendo pensamento crítico nos estudantes.",
    foto: "/images/0700_1750717790204.jpg"
    id: 12,
    nome: "Profa. Carla Nascimento",
    disciplina: "Sociologia",
    formacao: "Mestre em Sociologia - UNICAMP",
    experiencia: "8 anos de experiência",
    sobre: "Focada em sociologia contemporânea e direitos humanos, formando cidadãos conscientes.",
    foto: "/images/1092_1750717790205.jpg"
  // Adicione mais professores aqui...
    id: 13,
    nome: "Prof. Ricardo Souza",
    disciplina: "Informática",
    formacao: "Mestre em Ciência da Computação - USP",
    experiencia: "9 anos de experiência",
    sobre: "Especialista em programação e tecnologia educacional, preparando alunos para o futuro digital.",
    foto: "/images/1105_1750717790206.jpg"
    id: 14,
    nome: "Profa. Sandra Martins",
    disciplina: "Psicologia",
    formacao: "Doutora em Psicologia - PUC-SP",
    experiencia: "17 anos de experiência",
    sobre: "Especializada em psicologia educacional e desenvolvimento socioemocional dos estudantes.",
    foto: "/images/1285_1750717790208.jpg"
    id: 15,
    nome: "Prof. Gustavo Pereira",
    disciplina: "Espanhol",
    formacao: "Mestre em Letras Hispânicas - USP",
    experiencia: "7 anos de experiência",
    sobre: "Nativo de Buenos Aires, especializado em cultura hispano-americana e preparação para DELE.",
    foto: "/images/1295_1750717790207.jpg"
  }
  // Continue adicionando mais professores até completar 50+
];
}
