import { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { z } from "zod";

// Schema para validação de login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

// Interface para dados do usuário na sessão
interface AuthUser {
  id: string;
  email: string;
  isAuthenticated: boolean;
  loginTime: number;
  lastActivity: number;
}

// Configuração de segurança
const SECURITY_CONFIG = {
  SALT_ROUNDS: 12,
  SESSION_TTL: 24 * 60 * 60 * 1000, // 24 horas
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
  SESSION_ROTATION_INTERVAL: 60 * 60 * 1000, // 1 hora
};

// Armazenamento em memória para tentativas de login (em produção usar Redis)
const loginAttempts = new Map<string, { count: number; lockoutUntil?: number }>();

// Hash da senha do admin (em produção, armazenar no banco)
const ADMIN_PASSWORD_HASH = "$2b$12$E9xLrqmCyC4yn5O6617RfuMuEVlDZDpteEHAmJVzQ6E//W8bRBv52"; // hash de "19082018!"
const ADMIN_EMAIL = "fonseca@colegioose.com.br";

export function getSecureSession() {
  const sessionTtl = SECURITY_CONFIG.SESSION_TTL;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl / 1000, // em segundos
    tableName: "sessions",
  });

  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Renova cookie a cada requisição
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: sessionTtl,
    },
    genid: () => crypto.randomUUID(), // Usar UUID v4 para session ID
  });
}

// Middleware para verificar tentativas de login
function checkLoginAttempts(email: string): boolean {
  const attempts = loginAttempts.get(email);
  if (!attempts) return true;

  if (attempts.lockoutUntil && Date.now() < attempts.lockoutUntil) {
    return false; // Ainda bloqueado
  }

  if (attempts.lockoutUntil && Date.now() >= attempts.lockoutUntil) {
    // Reset após lockout
    loginAttempts.delete(email);
    return true;
  }

  return attempts.count < SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS;
}

// Registrar tentativa de login falhada
function recordFailedLogin(email: string): void {
  const attempts = loginAttempts.get(email) || { count: 0 };
  attempts.count++;

  if (attempts.count >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
    attempts.lockoutUntil = Date.now() + SECURITY_CONFIG.LOCKOUT_DURATION;
  }

  loginAttempts.set(email, attempts);
}

// Limpar tentativas após login bem-sucedido
function clearLoginAttempts(email: string): void {
  loginAttempts.delete(email);
}

// Gerar hash de senha
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SECURITY_CONFIG.SALT_ROUNDS);
}

// Verificar senha
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Regenerar session ID para prevenir session fixation
function regenerateSession(req: any): Promise<void> {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function setupSecureAuth(app: Express) {
  console.log("Setting up Secure Authentication...");

  // Configurar sessões seguras
  app.use(getSecureSession());

  // Middleware de logging de segurança
  app.use((req, res, next) => {
    if (req.path.startsWith('/auth/')) {
      console.log(`Security Log: ${req.method} ${req.path} from ${req.ip} at ${new Date().toISOString()}`);
    }
    next();
  });

  // Rota de login segura
  app.post("/auth/login", async (req, res) => {
    try {
      const clientIP = req.ip || req.connection.remoteAddress;
      console.log(`Login attempt from IP: ${clientIP}`);

      // Validar dados de entrada
      const { email, password } = loginSchema.parse(req.body);

      // Verificar rate limiting
      if (!checkLoginAttempts(email)) {
        console.log(`Login blocked for ${email} - too many attempts`);
        return res.status(429).json({
          success: false,
          message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
          lockoutUntil: loginAttempts.get(email)?.lockoutUntil
        });
      }

      // Verificar credenciais
      if (email !== ADMIN_EMAIL) {
        recordFailedLogin(email);
        console.log(`Login failed for ${email} - invalid email`);
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas"
        });
      }

      const isValidPassword = await verifyPassword(password, ADMIN_PASSWORD_HASH);
      if (!isValidPassword) {
        recordFailedLogin(email);
        console.log(`Login failed for ${email} - invalid password`);
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas"
        });
      }

      // Login bem-sucedido - regenerar session
      await regenerateSession(req);

      const now = Date.now();
      const authUser: AuthUser = {
        id: crypto.randomUUID(),
        email,
        isAuthenticated: true,
        loginTime: now,
        lastActivity: now
      };

      (req.session as any).user = authUser;

      // Limpar tentativas de login
      clearLoginAttempts(email);

      console.log(`Login successful for ${email} - Session ID: ${req.sessionID}`);
      res.json({
        success: true,
        user: {
          email: authUser.email,
          loginTime: authUser.loginTime
        }
      });

    } catch (error: any) {
      console.error("Login error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  });

  // Rota para verificar usuário logado
  app.get("/auth/user", (req, res) => {
    const user = (req.session as any).user as AuthUser;
    
    if (!user?.isAuthenticated) {
      return res.status(401).json({ 
        success: false, 
        message: "Não autenticado" 
      });
    }

    // Verificar expiração da sessão
    const now = Date.now();
    const sessionAge = now - user.loginTime;
    
    if (sessionAge > SECURITY_CONFIG.SESSION_TTL) {
      delete (req.session as any).user;
      return res.status(401).json({ 
        success: false, 
        message: "Sessão expirada" 
      });
    }

    // Atualizar última atividade
    user.lastActivity = now;
    (req.session as any).user = user;

    console.log(`Auth check successful for ${user.email}`);
    res.json({
      success: true,
      user: {
        email: user.email,
        loginTime: user.loginTime,
        lastActivity: user.lastActivity
      }
    });
  });

  // Rota de logout segura
  app.post("/auth/logout", (req, res) => {
    const user = (req.session as any).user as AuthUser;
    const email = user?.email || 'unknown';

    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        res.status(500).json({ 
          success: false, 
          message: "Erro no logout" 
        });
      } else {
        console.log(`Logout successful for ${email}`);
        res.json({ 
          success: true, 
          message: "Logout realizado com sucesso" 
        });
      }
    });
  });

  // Middleware para limpar tentativas antigas
  setInterval(() => {
    const now = Date.now();
    for (const [email, attempts] of loginAttempts.entries()) {
      if (attempts.lockoutUntil && now >= attempts.lockoutUntil) {
        loginAttempts.delete(email);
      }
    }
  }, 5 * 60 * 1000); // Limpar a cada 5 minutos

  console.log("Secure Authentication configured");
}

// Middleware seguro para proteger rotas
export const isSecurelyAuthenticated: RequestHandler = (req, res, next) => {
  const user = (req.session as any).user as AuthUser;
  
  if (!user?.isAuthenticated) {
    return res.status(401).json({ 
      success: false, 
      message: "Acesso negado - autenticação necessária" 
    });
  }

  // Verificar expiração
  const now = Date.now();
  const sessionAge = now - user.loginTime;
  const timeSinceActivity = now - user.lastActivity;

  if (sessionAge > SECURITY_CONFIG.SESSION_TTL) {
    delete (req.session as any).user;
    return res.status(401).json({ 
      success: false, 
      message: "Sessão expirada - faça login novamente" 
    });
  }

  // Rotacionar session ID periodicamente
  if (timeSinceActivity > SECURITY_CONFIG.SESSION_ROTATION_INTERVAL) {
    req.session.regenerate((err) => {
      if (err) {
        console.error("Session rotation error:", err);
      } else {
        user.lastActivity = now;
        (req.session as any).user = user;
        console.log(`Session rotated for ${user.email}`);
      }
    });
  } else {
    // Atualizar última atividade
    user.lastActivity = now;
    (req.session as any).user = user;
  }

  next();
};