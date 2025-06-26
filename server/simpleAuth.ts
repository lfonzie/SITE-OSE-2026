import { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";

// Credenciais hardcoded para o admin
const ADMIN_CREDENTIALS = {
  email: "fonseca@colegioose.com.br",
  password: "admin123"
};

// Configurar sessões
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false para desenvolvimento
      maxAge: sessionTtl,
    },
  });
}

// Interface para estender Express Session
declare module 'express-session' {
  interface SessionData {
    user?: {
      email: string;
      isAuthenticated: boolean;
    };
  }
}

export function setupSimpleAuth(app: Express) {
  console.log("Setting up Simple Auth...");
  
  // Configurar sessões
  app.use(getSession());
  
  // Rota de login
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    
    console.log("Login attempt for:", email);
    
    // Verificar credenciais
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      (req.session as any).user = {
        email: email,
        isAuthenticated: true
      };
      
      console.log("Login successful for:", email);
      res.json({ 
        success: true, 
        user: { 
          email: email,
          isAuthenticated: true 
        } 
      });
    } else {
      console.log("Login failed for:", email);
      res.status(401).json({ 
        success: false, 
        message: "Credenciais inválidas" 
      });
    }
  });
  
  // Rota para verificar usuário logado
  app.get("/api/auth/user", (req, res) => {
    const user = (req.session as any).user;
    if (user?.isAuthenticated) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Não autenticado" });
    }
  });
  
  // Rota de logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erro no logout:", err);
        res.status(500).json({ message: "Erro no logout" });
      } else {
        res.json({ success: true, message: "Logout realizado" });
      }
    });
  });
  
  console.log("Simple Auth routes registered");
}

// Middleware para proteger rotas
export const isAuthenticated: RequestHandler = (req, res, next) => {
  const user = (req.session as any).user;
  if (user?.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: "Acesso negado - faça login" });
  }
};