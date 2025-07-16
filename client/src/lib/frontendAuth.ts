// Frontend-only authentication system to bypass Vite middleware issues
// This is a temporary solution until the Vite configuration can be fixed

const ADMIN_CREDENTIALS = {
  email: "fonseca@colegioose.com.br",
  password: "19082018!"
};

const AUTH_STORAGE_KEY = "ose_admin_auth";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

interface AuthSession {
  email: string;
  isAuthenticated: boolean;
  expiresAt: number;
}

class FrontendAuth {
  private static instance: FrontendAuth;

  private constructor() {}

  static getInstance(): FrontendAuth {
    if (!FrontendAuth.instance) {
      FrontendAuth.instance = new FrontendAuth();
    }
    return FrontendAuth.instance;
  }

  login(email: string, password: string): boolean {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const session: AuthSession = {
        email,
        isAuthenticated: true,
        expiresAt: Date.now() + SESSION_DURATION
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      console.log("Frontend auth: Login successful for", email);
      return true;
    }
    
    console.log("Frontend auth: Login failed for", email);
    return false;
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    console.log("Frontend auth: Logout successful");
  }

  isAuthenticated(): boolean {
    try {
      const sessionStr = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!sessionStr) {
        return false;
      }

      const session: AuthSession = JSON.parse(sessionStr);
      
      // Check if session expired
      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }

      return session.isAuthenticated;
    } catch (error) {
      console.error("Frontend auth: Error checking authentication", error);
      this.logout();
      return false;
    }
  }

  getUser(): { email: string; isAuthenticated: boolean } | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      const sessionStr = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!sessionStr) {
        return null;
      }

      const session: AuthSession = JSON.parse(sessionStr);
      return {
        email: session.email,
        isAuthenticated: session.isAuthenticated
      };
    } catch (error) {
      console.error("Frontend auth: Error getting user", error);
      return null;
    }
  }

  // Extend session if still valid
  refreshSession(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    try {
      const sessionStr = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!sessionStr) {
        return false;
      }

      const session: AuthSession = JSON.parse(sessionStr);
      session.expiresAt = Date.now() + SESSION_DURATION;
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      return true;
    } catch (error) {
      console.error("Frontend auth: Error refreshing session", error);
      return false;
    }
  }
}

export const frontendAuth = FrontendAuth.getInstance();