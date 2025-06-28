import { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";

// Credenciais hardcoded para o admin
const ADMIN_CREDENTIALS = {
  email: "fonseca@colegioose.com.br",
  password: "19082018!"
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
  
  // Detectar se está em produção (Replit usa REPLIT_DEPLOYMENT)
  const isProduction = process.env.NODE_ENV === 'production' || 
                      process.env.REPLIT_DEPLOYMENT === 'true' || 
                      process.env.REPL_DEPLOYMENT === 'true';
  
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Replit não usa HTTPS interno
      sameSite: 'lax',
      maxAge: sessionTtl,
      domain: undefined, // Não definir domínio para funcionar em subdominios do Replit
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
  console.log("Environment:", {
    NODE_ENV: process.env.NODE_ENV,
    REPLIT_DEPLOYMENT: process.env.REPLIT_DEPLOYMENT,
    REPL_DEPLOYMENT: process.env.REPL_DEPLOYMENT
  });
  
  // Configurar sessões
  app.use(getSession());
  
  // Rota de login
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    
    console.log("Login attempt for:", email);
    console.log("Request headers:", req.headers);
    console.log("Session ID:", req.sessionID);
    
    // Verificar credenciais
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      (req.session as any).user = {
        email: email,
        isAuthenticated: true
      };
      
      // Salvar sessão explicitamente
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ 
            success: false, 
            message: "Erro ao salvar sessão" 
          });
        }
        
        console.log("Login successful for:", email);
        console.log("Session saved with ID:", req.sessionID);
        res.json({ 
          success: true, 
          user: { 
            email: email,
            isAuthenticated: true 
          } 
        });
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
    console.log("Auth check - Session ID:", req.sessionID);
    console.log("Auth check - Session data:", req.session);
    console.log("Auth check - Request headers:", req.headers.cookie);
    
    const user = (req.session as any).user;
    if (user?.isAuthenticated) {
      console.log("User authenticated:", user.email);
      res.json(user);
    } else {
      console.log("User not authenticated");
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