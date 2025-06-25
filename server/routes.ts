import type { Express } from "express";
import { storage } from "./storage.js";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configurar multer para upload de imagens
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'client/public/images/IG');
      // Criar diretório se não existir
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileName = req.body.fileName || `instagram_${Date.now()}.${file.originalname.split('.').pop()}`;
      cb(null, fileName);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos'));
    }
  }
});

export function registerRoutes(app: Express) {
  // Programs
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getProgram(id);
      if (!program) {
        return res.status(404).json({ message: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch program" });
    }
  });

  // Faculty
  app.get("/api/faculty", async (req, res) => {
    try {
      const faculty = await storage.getFaculty();
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch faculty" });
    }
  });

  app.get("/api/faculty/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const facultyMember = await storage.getFacultyMember(id);
      if (!facultyMember) {
        return res.status(404).json({ message: "Faculty member not found" });
      }
      res.json(facultyMember);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch faculty member" });
    }
  });

  // News
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getNewsArticle(id);
      if (!article) {
        return res.status(404).json({ message: "News article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news article" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Contact form
  app.post("/api/contacts", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const newContact = await storage.createContact(contact);
      res.json(newContact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Upload de imagens
  app.post("/api/upload-image", upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      res.json({ 
        success: true, 
        fileName: req.file.filename,
        path: `/api/images/IG/${req.file.filename}`
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Serve uploaded images via API
  app.get("/api/images/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'client/public/images', filename);
      
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Image not found' });
      }

      res.sendFile(imagePath);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Serve images from public/images directly (for development)
  app.get("/images/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'client/public/images', filename);
      
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Image not found' });
      }

      res.sendFile(imagePath);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Serve images from IG folder
  app.get("/api/images/IG/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'client/public/images/IG', filename);
      
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Image not found' });
      }

      res.sendFile(imagePath);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // List all images in IG folder
  app.get("/api/instagram-images", (req, res) => {
    try {
      const igPath = path.join(process.cwd(), 'client/public/images/IG');
      
      if (!fs.existsSync(igPath)) {
        return res.json([]);
      }

      const files = fs.readdirSync(igPath).filter(file => 
        /\.(jpg|jpeg|png|gif)$/i.test(file)
      );

      const images = files.map(filename => {
        const filePath = path.join(igPath, filename);
        const stats = fs.statSync(filePath);
        return {
          filename,
          uploadedAt: stats.mtime.toISOString()
        };
      }).sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

      res.json(images);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete image from IG folder
  app.delete("/api/delete-image/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'client/public/images/IG', filename);
      
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Image not found' });
      }

      fs.unlinkSync(imagePath);
      res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}