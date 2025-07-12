import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ageRange: text("age_range").notNull(),
  features: text("features").array().notNull(),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
});

export const faculty = pgTable("faculty", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  email: text("email").notNull(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  publishedAt: timestamp("published_at").notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  rating: integer("rating").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const materialLists = pgTable("material_lists", {
  id: serial("id").primaryKey(),
  segment: text("segment").notNull(), // "infantil", "fundamental1", "fundamental2", "medio"
  grade: text("grade").notNull(), // "jardim1", "1ano", "2ano", etc.
  year: integer("year").notNull(), // 2025, 2026
  googleDriveLink: text("google_drive_link"),
  fileName: text("file_name"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bolsasInscricoes = pgTable("bolsas_inscricoes", {
  id: serial("id").primaryKey(),
  // Dados do aluno
  nomeAluno: text("nome_aluno").notNull(),
  nascimentoAluno: text("nascimento_aluno").notNull(),
  rgAluno: text("rg_aluno").notNull(),
  cpfAluno: text("cpf_aluno").notNull(),
  escolaAtual: text("escola_atual").notNull(),
  
  // Dados do responsável
  nomeResponsavel: text("nome_responsavel").notNull(),
  nascimentoResponsavel: text("nascimento_responsavel").notNull(),
  cpfResponsavel: text("cpf_responsavel").notNull(),
  
  // Endereço
  rua: text("rua").notNull(),
  cidade: text("cidade").notNull(),
  cep: text("cep").notNull(),
  
  // Contato
  celular: text("celular").notNull(),
  email: text("email").notNull(),
  
  // Série/Ano
  segmento: text("segmento").notNull(), // "fund2", "medio"
  serie: text("serie").notNull(), // "6ano", "7ano_reman", etc.
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").notNull().default("pendente"), // "pendente", "confirmada", "cancelada"
  protocolo: text("protocolo").notNull(), // Número de protocolo único
});

export const insertProgramSchema = createInsertSchema(programs).omit({ id: true });
export const insertFacultySchema = createInsertSchema(faculty).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
export const insertMaterialListSchema = createInsertSchema(materialLists).omit({ id: true, updatedAt: true });
export const insertBolsasInscricaoSchema = createInsertSchema(bolsasInscricoes).omit({ id: true, createdAt: true, protocolo: true });

export type Program = typeof programs.$inferSelect;
export type Faculty = typeof faculty.$inferSelect;
export type News = typeof news.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type MaterialList = typeof materialLists.$inferSelect;
export type BolsasInscricao = typeof bolsasInscricoes.$inferSelect;
export type InsertBolsasInscricao = z.infer<typeof insertBolsasInscricaoSchema>;

export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertMaterialList = z.infer<typeof insertMaterialListSchema>;

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Album events table
export const albumEvents = pgTable("album_events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  year: varchar("year", { length: 4 }).notNull(),
  photoLink: text("photo_link").notNull(),
  eventDate: timestamp("event_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAlbumEventSchema = createInsertSchema(albumEvents).omit({ id: true, createdAt: true, updatedAt: true });

export type AlbumEvent = typeof albumEvents.$inferSelect;
export type InsertAlbumEvent = z.infer<typeof insertAlbumEventSchema>;
