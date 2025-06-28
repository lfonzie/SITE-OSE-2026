import type { Express } from "express";
import { storage } from "./storage.js";
import { z } from "zod";
import { insertContactSchema, insertMaterialListSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { setupSimpleAuth, isAuthenticated } from "./simpleAuth";

// Configurar multer para upload geral de imagens (pasta /images)
const uploadGeneral = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'client/public/images');
      // Criar diretório se não existir
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileName = req.body.fileName || `upload_${Date.now()}.${file.originalname.split('.').pop()}`;
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

// Configurar multer EXCLUSIVAMENTE para upload do Instagram (pasta /IG)
const uploadInstagram = multer({
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

export async function registerRoutes(app: Express) {
  // Auth middleware
  setupSimpleAuth(app);

  // Auth routes are now handled by simpleAuth.ts
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

  app.patch("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const updated = await storage.updateTestimonial(id, updates);
      if (!updated) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update testimonial" });
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

  // Upload geral de imagens (vai para /images)
  app.post("/api/upload-image", uploadGeneral.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      res.json({ 
        success: true, 
        fileName: req.file.filename,
        path: `/api/images/${req.file.filename}`
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

  // List all images in general /images folder (não /IG)
  app.get("/api/general-images", (req, res) => {
    try {
      const imagesPath = path.join(process.cwd(), 'client/public/images');

      if (!fs.existsSync(imagesPath)) {
        return res.json([]);
      }

      const files = fs.readdirSync(imagesPath).filter(file => 
        /\.(jpg|jpeg|png|gif)$/i.test(file) && !fs.statSync(path.join(imagesPath, file)).isDirectory()
      );

      const images = files.map(file => {
        const filePath = path.join(imagesPath, file);
        const stats = fs.statSync(filePath);
        return {
          filename: file,
          uploadedAt: stats.mtime.toISOString(),
          url: `/api/images/${file}`
        };
      });

      res.json(images);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // List all images in IG folder (EXCLUSIVO para Instagram)
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

  // Upload Instagram image EXCLUSIVO (vai para /IG)
  app.post("/api/upload-instagram", uploadInstagram.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const timestamp = Date.now();
      const fileExtension = path.extname(req.file.originalname);
      const filename = `instagram_${timestamp}${fileExtension}`;
      const igPath = path.join(process.cwd(), 'client/public/images/IG');
      const filepath = path.join(igPath, filename);

      // Ensure IG directory exists
      if (!fs.existsSync(igPath)) {
        fs.mkdirSync(igPath, { recursive: true });
      }

      // Move uploaded file to IG directory with new name
      fs.renameSync(req.file.path, filepath);

      res.json({
        success: true,
        filename,
        url: `/api/images/IG/${filename}`
      });
    } catch (error: any) {
      console.error("Error uploading Instagram image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Delete image from IG folder (keep existing endpoint)
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

  // Delete Instagram image (new dedicated endpoint)
  app.delete("/api/instagram-images/:filename", (req, res) => {
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

  // Get all images from public/images directory
  app.get("/api/server-images", (req, res) => {
    try {
      const imagesDir = path.join(process.cwd(), 'client', 'public', 'images');

      const getImagesRecursively = (dir: string, baseDir: string = ''): any[] => {
        const items = fs.readdirSync(dir);
        let images: any[] = [];

        for (const item of items) {
          const fullPath = path.join(dir, item);
          const relativePath = path.join(baseDir, item);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            if (item !== 'IG') {
              images = images.concat(getImagesRecursively(fullPath, relativePath));
            }
          } else if (item.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
            images.push({
              filename: item,
              path: relativePath.replace(/\\/g, '/'),
              url: `/images/${relativePath.replace(/\\/g, '/')}`,
              directory: baseDir || 'root',
              size: stat.size,
              lastModified: stat.mtime.toISOString()
            });
          }
        }

        return images;
      };

      const images = getImagesRecursively(imagesDir);

      images.sort((a, b) => {
        if (a.directory !== b.directory) {
          return a.directory.localeCompare(b.directory);
        }
        return a.filename.localeCompare(b.filename);
      });

      res.json(images);
    } catch (error: any) {
      console.error('Error loading server images:', error);
      res.status(500).json({ error: 'Failed to load server images' });
    }
  });

  // Material Lists API
  app.get('/api/material-lists', async (req, res) => {
    try {
      const materialLists = await storage.getMaterialLists();
      res.json(materialLists);
    } catch (error) {
      console.error('Error fetching material lists:', error);
      res.status(500).json({ error: 'Failed to fetch material lists' });
    }
  });

  app.post('/api/material-lists', async (req, res) => {
    try {
      const { segment, grade, year, googleDriveLink } = req.body;

      if (!segment || !grade || !year || !googleDriveLink) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const materialList = await storage.createMaterialList({
        segment,
        grade,
        year,
        googleDriveLink
      });

      res.json(materialList);
    } catch (error) {
      console.error('Error creating material list:', error);
      res.status(500).json({ error: 'Failed to create material list' });
    }
  });

  app.patch('/api/material-lists/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const materialList = await storage.updateMaterialList(id, updates);

      if (!materialList) {
        return res.status(404).json({ error: 'Material list not found' });
      }

      res.json(materialList);
    } catch (error) {
      console.error('Error updating material list:', error);
      res.status(500).json({ error: 'Failed to update material list' });
    }
  });

  app.delete('/api/material-lists/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteMaterialList(id);

      if (!success) {
        return res.status(404).json({ error: 'Material list not found' });
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting material list:', error);
      res.status(500).json({ error: 'Failed to delete material list' });
    }
  });

  // Album Events routes
  app.get('/api/album-events', async (req, res) => {
    try {
      const events = await storage.getAlbumEvents();
      res.json(events);
    } catch (error) {
      console.error('Error fetching album events:', error);
      res.status(500).json({ error: 'Failed to fetch album events' });
    }
  });

  app.post('/api/album-events', async (req, res) => {
    try {
      const { title, year, photoLink, eventDate } = req.body;
      
      if (!title || !year || !photoLink) {
        return res.status(400).json({ error: 'Title, year, and photo link are required' });
      }

      const event = await storage.createAlbumEvent({
        title,
        year,
        photoLink,
        eventDate: eventDate ? new Date(eventDate) : null
      });

      res.json(event);
    } catch (error) {
      console.error('Error creating album event:', error);
      res.status(500).json({ error: 'Failed to create album event' });
    }
  });

  app.patch('/api/album-events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      if (updates.eventDate) {
        updates.eventDate = new Date(updates.eventDate);
      }

      const event = await storage.updateAlbumEvent(id, updates);
      
      if (!event) {
        return res.status(404).json({ error: 'Album event not found' });
      }

      res.json(event);
    } catch (error) {
      console.error('Error updating album event:', error);
      res.status(500).json({ error: 'Failed to update album event' });
    }
  });

  app.delete('/api/album-events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAlbumEvent(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Album event not found' });
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting album event:', error);
      res.status(500).json({ error: 'Failed to delete album event' });
    }
  });

  // Serve dashboard.html at /dash route
  app.get('/dash', (req, res) => {
    const dashboardPath = path.join(process.cwd(), 'client/public/dashboard.html');
    res.sendFile(dashboardPath);
  });
}