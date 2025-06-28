import { 
  programs, faculty, news, testimonials, contacts, materialLists, albumEvents, users,
  type Program, type Faculty, type News, type Testimonial, type Contact, type MaterialList, type AlbumEvent, type User,
  type InsertProgram, type InsertFaculty, type InsertNews, type InsertTestimonial, type InsertContact, type InsertMaterialList, type InsertAlbumEvent, type UpsertUser
} from "@shared/schema";
import path from 'path';
import fs from 'fs/promises';

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
  updateTestimonial(id: number, updates: Partial<Testimonial>): Promise<Testimonial | undefined>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Material Lists
  getMaterialLists(): Promise<MaterialList[]>;
  getMaterialListsBySegment(segment: string): Promise<MaterialList[]>;
  createMaterialList(materialList: InsertMaterialList): Promise<MaterialList>;
  updateMaterialList(id: number, updates: Partial<MaterialList>): Promise<MaterialList | undefined>;
  deleteMaterialList(id: number): Promise<boolean>;

  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Album Events
  getAlbumEvents(): Promise<AlbumEvent[]>;
  createAlbumEvent(event: InsertAlbumEvent): Promise<AlbumEvent>;
  updateAlbumEvent(id: number, updates: Partial<AlbumEvent>): Promise<AlbumEvent | undefined>;
  deleteAlbumEvent(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private programs: Map<number, Program> = new Map();
  private faculty: Map<number, Faculty> = new Map();
  private news: Map<number, News> = new Map();
  private testimonials: Map<number, Testimonial> = new Map();
  private contacts: Map<number, Contact> = new Map();
  private materialLists: Map<number, MaterialList> = new Map();
  private albumEvents: Map<number, AlbumEvent> = new Map();
  private currentId = 1;
  private dataDir = path.join(process.cwd(), 'data');
  private instagramPath = path.join(this.dataDir, 'instagram.json');
  private testimonialsPath = path.join(this.dataDir, 'testimonials.json');
  private materialsPath = path.join(this.dataDir, 'materials.json');

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed programs
    const programs: Program[] = [
      {
        id: 1,
        title: "Educação Infantil",
        description: "Desenvolvimento socioemocional e cognitivo para crianças de 4 a 6 anos, com ambiente seguro e pedagogia finlandesa.",
        ageRange: "4 a 6 anos",
        features: [
          "Jardim I e Jardim II",
          "Pedagogia Finlandesa",
          "Desenvolvimento Socioemocional",
          "Ambiente Seguro e Acolhedor"
        ],
        icon: "baby",
        color: "blue"
      },
      {
        id: 2,
        title: "Ensino Fundamental I",
        description: "Desenvolvendo mentes curiosas e corações compassivos através de metodologias ativas e pensamento crítico.",
        ageRange: "6 a 10 anos",
        features: [
          "1º ao 5º ano",
          "Metodologias Ativas",
          "Pensamento Crítico",
          "{CODE.OSE} Linguagem Programação"
        ],
        icon: "graduation-cap",
        color: "green"
      },
      {
        id: 3,
        title: "Ensino Fundamental II",
        description: "Formando líderes conscientes para um mundo em transformação, com foco em cidadania e ética.",
        ageRange: "11 a 14 anos",
        features: [
          "6º ao 9º ano",
          "Formação de Líderes",
          "Responsabilidade Ética",
          "Preparação para o Futuro"
        ],
        icon: "brain",
        color: "red"
      },
      {
        id: 4,
        title: "Ensino Médio",
        description: "Preparação para o futuro com excelência acadêmica e formação integral, focando em vestibulares e vida.",
        ageRange: "15 a 17 anos",
        features: [
          "1ª a 3ª série",
          "Preparação Vestibular",
          "Formação Integral",
          "Excelência Acadêmica"
        ],
        icon: "graduation-cap",
        color: "blue"
      }
    ];

    programs.forEach(program => this.programs.set(program.id, program));

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
        title: "Festa Junina 2025 - Um sábado de alegria, tradição e família na OSE!",
        excerpt: "Vivemos uma manhã inesquecível na nossa Festa Junina 2025! Com muita cor, música e animação, o evento reuniu alunos, famílias e toda a comunidade escolar.",
        content: "No último sábado, vivemos uma manhã inesquecível na nossa Festa Junina 2025! Com muita cor, música e animação, o evento reuniu alunos, famílias e toda a comunidade escolar em um momento cheio de cultura, afeto e diversão. As danças típicas apresentadas pelos alunos encantaram o público e trouxeram todo o charme das festas tradicionais para o palco.",
        image: "https://images.unsplash.com/photo-1542802107-2b46ed58f85e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
        category: "Evento",
        publishedAt: new Date("2025-06-07")
      },
      {
        id: 2,
        title: "JES - Atletismo Infanto: OSE no pódio!",
        excerpt: "Com muita garra e dedicação, nossos alunos da categoria Infanto participaram das provas de atletismo nos Jogos Escolares de Sorocaba (JES) e conquistaram resultados incríveis!",
        content: "Tiago Guimarães Correa Tavares conquistou o 3º lugar nos 100 metros rasos e Lorenzo A. de Almeida Lagemann ficou em 3º lugar no salto em altura. Essas conquistas são reflexo do esforço, da disciplina e do espírito esportivo que fazem parte da rotina dos nossos alunos.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
        category: "Esporte",
        publishedAt: new Date("2025-05-20")
      },
      {
        id: 3,
        title: "Zoológico de São Paulo - Uma aula ao ar livre com os 8º e 9º anos!",
        excerpt: "Os alunos dos 8º e 9º anos participaram de um passeio especial ao Zoológico de São Paulo, unindo aprendizado, contato com a natureza e muita curiosidade científica!",
        content: "Durante a visita, os estudantes observaram de perto diversas espécies da fauna brasileira e mundial, ampliando seus conhecimentos sobre ecossistemas, biodiversidade, comportamento animal e conservação ambiental. A experiência permitiu a conexão entre os conteúdos de Ciências e Geografia com a vivência real.",
        image: "https://images.unsplash.com/photo-1549924652-6f8e0c7b0e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
        category: "Educação",
        publishedAt: new Date("2025-05-15")
      }
    ];

    newsData.forEach(article => this.news.set(article.id, article));

    // Seed testimonials
    const testimonialsData: Testimonial[] = [
      {
        id: 1,
        name: "Samanta Chibau Mileze",
        role: "Ex-aluna e Médica Veterinária",
        content: "Uma vida de OSE me fez ir direto para uma universidade federal. O melhor ensino, a melhor equipe e as melhores lembranças. Obrigada!",
        image: "/images/samanta.jpg",
        rating: 5
      },
      {
        id: 2,
        name: "Fernando Proença",
        role: "Médico e pai orgulhoso de 3 filhos",
        content: "Estudei na OSE de 1984 a 1996. Foram 12 anos de muitas amizades e aprendizado. Grande escola. Amigos que mantenho até hoje.",
        image: "/images/fernando.jpeg",
        rating: 5
      },
      {
        id: 3,
        name: "Edna J. Paulo",
        role: "Ex-aluna e mãe orgulhosa do Richard",
        content: "Hoje com muita satisfação e alegria meu filho começará a trilhar sua história nesta tão sonhada escola. Parabéns ao gestor da OSE sempre oferecendo grandes oportunidades aos alunos que desejam um futuro brilhante!",
        image: "/images/edna.jpg",
        rating: 5
      }
    ];

    testimonialsData.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));

    // Seed album events with authentic OSE data
    const albumEventsData: AlbumEvent[] = [
      // 2025 Events
      { id: 1, title: "FESTA JUNINA 2025", year: "2025", photoLink: "https://photos.app.goo.gl/TJUiJtZmTxAXStpr5", eventDate: new Date("2025-06-15"), createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: "PETZOO 2025", year: "2025", photoLink: "https://photos.app.goo.gl/9zdK3NX3VCF9StRz6", eventDate: new Date("2025-05-10"), createdAt: new Date(), updatedAt: new Date() },
      { id: 3, title: "DIA DA FAMÍLIA 2025", year: "2025", photoLink: "https://photos.app.goo.gl/KL1Qzeo543NjoBwv7", eventDate: new Date("2025-04-20"), createdAt: new Date(), updatedAt: new Date() },
      { id: 4, title: "PLANETARIO / RIO TIETE 2025", year: "2025", photoLink: "https://photos.app.goo.gl/niRigCStmmYK8JM86", eventDate: new Date("2025-03-15"), createdAt: new Date(), updatedAt: new Date() },
      { id: 5, title: "CARNAVAL MANHÃ", year: "2025", photoLink: "https://photos.app.goo.gl/P1PJdRw2RaA6oUHq6", eventDate: new Date("2025-02-13"), createdAt: new Date(), updatedAt: new Date() },
      { id: 6, title: "CARNAVAL TARDE", year: "2025", photoLink: "https://photos.app.goo.gl/cpgyF59fTfLha5z58", eventDate: new Date("2025-02-13"), createdAt: new Date(), updatedAt: new Date() },
      
      // 2024 Events
      { id: 7, title: "CAFÉ FORMANDOS 2024", year: "2024", photoLink: "https://photos.app.goo.gl/3GCCuwHddujvLtSj8", eventDate: new Date("2024-12-10"), createdAt: new Date(), updatedAt: new Date() },
      { id: 8, title: "GINCANA 2024 - DIA 1", year: "2024", photoLink: "https://photos.app.goo.gl/xvcTxxeiUdsYtTLu9", eventDate: new Date("2024-10-15"), createdAt: new Date(), updatedAt: new Date() },
      { id: 9, title: "GINCANA 2024 - DIA 2", year: "2024", photoLink: "https://photos.app.goo.gl/u38gnZiTzudgmc4v8", eventDate: new Date("2024-10-16"), createdAt: new Date(), updatedAt: new Date() },
      { id: 10, title: "GINCANA 2024 - DIA 3", year: "2024", photoLink: "https://photos.app.goo.gl/Zj775GDwXfPgtY2cA", eventDate: new Date("2024-10-17"), createdAt: new Date(), updatedAt: new Date() },
      { id: 11, title: "GINCANA 2024 - DIA 4", year: "2024", photoLink: "https://photos.app.goo.gl/M2nnN7Qa42Uy3zQJ8", eventDate: new Date("2024-10-18"), createdAt: new Date(), updatedAt: new Date() },
      { id: 12, title: "FESTA JUNINA 2024", year: "2024", photoLink: "https://photos.app.goo.gl/1Lq2dLXSV4j6bN4n8", eventDate: new Date("2024-06-15"), createdAt: new Date(), updatedAt: new Date() },
      
      // 2023 Events
      { id: 13, title: "FESTIVAL CULTURAL 2023", year: "2023", photoLink: "https://bit.ly/FestivalOSE2023", eventDate: new Date("2023-11-20"), createdAt: new Date(), updatedAt: new Date() },
      { id: 14, title: "FESTA JUNINA 2023", year: "2023", photoLink: "https://bit.ly/FestaJuninaOSE2023_", eventDate: new Date("2023-06-15"), createdAt: new Date(), updatedAt: new Date() },
      { id: 15, title: "DIA DA FAMÍLIA 2023", year: "2023", photoLink: "https://bit.ly/OSEFamilia23", eventDate: new Date("2023-04-25"), createdAt: new Date(), updatedAt: new Date() }
    ];

    albumEventsData.forEach(event => this.albumEvents.set(event.id, event));

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

  async updateTestimonial(id: number, updates: Partial<Testimonial>): Promise<Testimonial | undefined> {
    const existing = this.testimonials.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.testimonials.set(id, updated);
    return updated;
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

  // Material Lists
  async getMaterialLists(): Promise<MaterialList[]> {
    return Array.from(this.materialLists.values()).sort((a, b) => b.year - a.year);
  }

  async getMaterialListsBySegment(segment: string): Promise<MaterialList[]> {
    return Array.from(this.materialLists.values())
      .filter(list => list.segment === segment)
      .sort((a, b) => b.year - a.year);
  }

  async createMaterialList(materialList: InsertMaterialList): Promise<MaterialList> {
    const id = this.currentId++;
    const newMaterialList: MaterialList = { 
      ...materialList,
      googleDriveLink: materialList.googleDriveLink || null,
      fileName: materialList.fileName || null,
      id,
      updatedAt: new Date()
    };
    this.materialLists.set(id, newMaterialList);
    await this.saveMaterialLists();
    return newMaterialList;
  }

  async updateMaterialList(id: number, updates: Partial<MaterialList>): Promise<MaterialList | undefined> {
    const existing = this.materialLists.get(id);
    if (!existing) return undefined;

    const updated: MaterialList = { 
      ...existing, 
      ...updates, 
      id,
      updatedAt: new Date()
    };
    this.materialLists.set(id, updated);
    await this.saveMaterialLists();
    return updated;
  }

  async deleteMaterialList(id: number): Promise<boolean> {
    const deleted = this.materialLists.delete(id);
    if (deleted) {
      await this.saveMaterialLists();
    }
    return deleted;
  }

  // User operations for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    // In memory storage - would use database in production
    return undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // In memory storage - would use database in production
    const user: User = {
      id: userData.id!,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return user;
  }

  // Album Events operations
  async getAlbumEvents(): Promise<AlbumEvent[]> {
    return Array.from(this.albumEvents.values()).sort((a, b) => {
      // Sort by event date (if available) or creation date, newest first
      const dateA = a.eventDate || a.createdAt || new Date(0);
      const dateB = b.eventDate || b.createdAt || new Date(0);
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }

  async createAlbumEvent(event: InsertAlbumEvent): Promise<AlbumEvent> {
    const id = this.currentId++;
    const newEvent: AlbumEvent = {
      ...event,
      id,
      eventDate: event.eventDate || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.albumEvents.set(id, newEvent);
    return newEvent;
  }

  async updateAlbumEvent(id: number, updates: Partial<AlbumEvent>): Promise<AlbumEvent | undefined> {
    const event = this.albumEvents.get(id);
    if (!event) return undefined;

    const updated: AlbumEvent = {
      ...event,
      ...updates,
      id,
      updatedAt: new Date()
    };
    this.albumEvents.set(id, updated);
    return updated;
  }

  async deleteAlbumEvent(id: number): Promise<boolean> {
    return this.albumEvents.delete(id);
  }

  private async loadMaterialLists(): Promise<MaterialList[]> {
    try {
      const data = await fs.readFile(this.materialsPath, 'utf-8');
      const lists = JSON.parse(data) || [];

      // Load into memory and update currentId
      lists.forEach((list: MaterialList) => {
        this.materialLists.set(list.id!, list);
        if (list.id! >= this.currentId) {
          this.currentId = list.id! + 1;
        }
      });

      return lists;
    } catch (error) {
      return [];
    }
  }
  private async saveMaterialLists(): Promise<void> {
    try {
      const lists = Array.from(this.materialLists.values());
      await fs.writeFile(this.materialsPath, JSON.stringify(lists, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving material lists:', error);
    }
  }

  private async loadPages(): Promise<any[]> {
    return [];
  }

  private async loadUploads(): Promise<any[]> {
    return [];
  }

  private async loadPrograms(): Promise<any[]> {
    return [];
  }

  private async loadTestimonials(): Promise<any[]> {
    return [];
  }

  private async loadInstagramImages(): Promise<any[]> {
    return [];
  }

  private async ensureDataDir(): Promise<void> {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }
  }

  private async init() {
    await this.ensureDataDir();
    await this.loadMaterialLists();
  }
}

export const storage = new MemStorage();
// Initialize storage on startup
storage['init']?.();