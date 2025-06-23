import { 
  programs, faculty, news, testimonials, contacts,
  type Program, type Faculty, type News, type Testimonial, type Contact,
  type InsertProgram, type InsertFaculty, type InsertNews, type InsertTestimonial, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // Programs
  getPrograms(): Promise<Program[]>;
  getProgram(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  // Faculty
  getFaculty(): Promise<Faculty[]>;
  getFacultyMember(id: number): Promise<Faculty | undefined>;
  createFacultyMember(faculty: InsertFaculty): Promise<Faculty>;
  
  // News
  getNews(): Promise<News[]>;
  getNewsArticle(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private programs: Map<number, Program> = new Map();
  private faculty: Map<number, Faculty> = new Map();
  private news: Map<number, News> = new Map();
  private testimonials: Map<number, Testimonial> = new Map();
  private contacts: Map<number, Contact> = new Map();
  private currentId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed programs
    const programsData: Program[] = [
      {
        id: 1,
        title: "Educação Infantil",
        description: "Desenvolvimento integral através do lúdico, respeitando o ritmo natural de cada criança.",
        ageRange: "2-5 anos",
        features: ["Maternal (2-3 anos)", "Pré I e II (4-5 anos)"],
        color: "blue",
        icon: "baby"
      },
      {
        id: 2,
        title: "Ensino Fundamental",
        description: "Formação sólida dos conceitos fundamentais com metodologias ativas e tecnologia.",
        ageRange: "6-14 anos",
        features: ["Anos Iniciais (1º ao 5º ano)", "Anos Finais (6º ao 9º ano)"],
        color: "green",
        icon: "book"
      },
      {
        id: 3,
        title: "Ensino Médio",
        description: "Preparação completa para o vestibular e formação cidadã com foco no projeto de vida.",
        ageRange: "15-17 anos",
        features: ["1ª, 2ª e 3ª série", "Preparação ENEM"],
        color: "red",
        icon: "graduation-cap"
      }
    ];

    programsData.forEach(program => this.programs.set(program.id, program));

    // Seed faculty
    const facultyData: Faculty[] = [
      {
        id: 1,
        name: "Profa. Maria Silva",
        position: "Diretora Pedagógica",
        description: "Mestre em Educação, 20 anos de experiência em gestão pedagógica",
        image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        email: "maria.silva@colegioose.com.br"
      },
      {
        id: 2,
        name: "Prof. João Santos",
        position: "Coord. de Ciências",
        description: "Doutor em Física, especialista em metodologias ativas",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        email: "joao.santos@colegioose.com.br"
      },
      {
        id: 3,
        name: "Profa. Ana Costa",
        position: "Coord. de Línguas",
        description: "Mestre em Linguística, certificação internacional Cambridge",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        email: "ana.costa@colegioose.com.br"
      },
      {
        id: 4,
        name: "Prof. Carlos Lima",
        position: "Coord. Tecnologia",
        description: "Especialista em Tecnologia Educacional e Robótica",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        email: "carlos.lima@colegioose.com.br"
      }
    ];

    facultyData.forEach(member => this.faculty.set(member.id, member));

    // Seed news
    const newsData: News[] = [
      {
        id: 1,
        title: "Feira de Ciências 2023 foi um sucesso",
        excerpt: "Nossos alunos apresentaram projetos inovadores que impressionaram toda a comunidade escolar e visitantes.",
        content: "A Feira de Ciências 2023 do Colégio OSE foi um verdadeiro sucesso, reunindo estudantes, professores, pais e visitantes para prestigiar os projetos desenvolvidos pelos nossos alunos. Durante o evento, foram apresentados mais de 50 projetos que abordaram temas como sustentabilidade, tecnologia, saúde e inovação.",
        image: "https://images.unsplash.com/photo-1581726690015-c9861fa5057f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
        category: "Evento",
        publishedAt: new Date("2023-11-15")
      },
      {
        id: 2,
        title: "Alunos conquistam medalhas na Olimpíada de Matemática",
        excerpt: "Três estudantes do Ensino Médio foram premiados na Olimpíada Brasileira de Matemática das Escolas Públicas.",
        content: "Os alunos Pedro Henrique, Maria Eduarda e Gabriel Silva conquistaram medalhas de ouro, prata e bronze respectivamente na Olimpíada Brasileira de Matemática. Este resultado demonstra a excelência do ensino de matemática em nossa instituição.",
        image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
        category: "Conquista",
        publishedAt: new Date("2023-11-10")
      },
      {
        id: 3,
        title: "Novas salas interativas inauguradas",
        excerpt: "Investimento em tecnologia educacional moderniza ainda mais as salas de aula do colégio.",
        content: "O Colégio OSE inaugurou suas novas salas interativas, equipadas com lousas digitais, sistemas de som avançados e conectividade de alta velocidade. Esse investimento reforça nosso compromisso com a educação de qualidade e inovação tecnológica.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
        category: "Infraestrutura",
        publishedAt: new Date("2023-11-05")
      }
    ];

    newsData.forEach(article => this.news.set(article.id, article));

    // Seed testimonials
    const testimonialsData: Testimonial[] = [
      {
        id: 1,
        name: "Maria Oliveira",
        role: "Mãe da aluna Sofia (8º ano)",
        content: "O Colégio OSE proporcionou uma formação excepcional para minha filha. Os professores são dedicados e a metodologia inovadora fez toda a diferença no desenvolvimento dela.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        rating: 5
      },
      {
        id: 2,
        name: "Pedro Santos",
        role: "Ex-aluno - Medicina USP",
        content: "Estudei no OSE durante todo o Ensino Médio e hoje curso Medicina. A preparação que recebi foi fundamental para meu sucesso no vestibular.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        rating: 5
      },
      {
        id: 3,
        name: "Julia Costa",
        role: "Aluna do 5º ano",
        content: "Adoro estudar aqui! Os professores são muito carinhosos e as aulas são super divertidas. Aprendo muito brincando!",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        rating: 5
      }
    ];

    testimonialsData.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));

    this.currentId = 100; // Start from 100 to avoid conflicts
  }

  // Programs
  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgram(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const id = this.currentId++;
    const newProgram: Program = { ...program, id };
    this.programs.set(id, newProgram);
    return newProgram;
  }

  // Faculty
  async getFaculty(): Promise<Faculty[]> {
    return Array.from(this.faculty.values());
  }

  async getFacultyMember(id: number): Promise<Faculty | undefined> {
    return this.faculty.get(id);
  }

  async createFacultyMember(faculty: InsertFaculty): Promise<Faculty> {
    const id = this.currentId++;
    const newFaculty: Faculty = { ...faculty, id };
    this.faculty.set(id, newFaculty);
    return newFaculty;
  }

  // News
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getNewsArticle(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(news: InsertNews): Promise<News> {
    const id = this.currentId++;
    const newNews: News = { ...news, id };
    this.news.set(id, newNews);
    return newNews;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const newContact: Contact = { 
      ...contact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
