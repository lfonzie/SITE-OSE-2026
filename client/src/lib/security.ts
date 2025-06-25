// Security Implementation (substitui Jetpack Protect)

// Content Security Policy
export const setupCSP = () => {
  const meta = document.createElement('meta');
  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.content = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 
      https://www.googletagmanager.com 
      https://connect.facebook.net 
      https://assets.calendly.com 
      https://www.google-analytics.com 
      https://googleads.g.doubleclick.net 
      https://ssl.google-analytics.com
      https://www.uchat.com.au
      https://*.uchat.com.au
      https://replit.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com;
    img-src 'self' data: https: blob: 
      https://www.facebook.com 
      https://www.google-analytics.com 
      https://googleads.g.doubleclick.net;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' 
      https://www.google-analytics.com 
      https://api.calendly.com 
      https://analytics.google.com 
      https://stats.g.doubleclick.net 
      https://www.google.com 
      https://connect.facebook.net
      https://www.uchat.com.au
      https://*.uchat.com.au;
    frame-src 'self' https://calendly.com https://*.calendly.com https://www.googletagmanager.com https://td.doubleclick.net https://*.doubleclick.net;
  `.replace(/\s+/g, ' ').trim();
  document.head.appendChild(meta);
};

// XSS Protection
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Form validation and protection
export const validateForm = (formData: Record<string, string>): boolean => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    return false;
  }

  // Phone validation (Brazilian format)
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  if (formData.phone && !phoneRegex.test(formData.phone)) {
    return false;
  }

  // Check for common XSS patterns
  const xssPatterns = [/<script/i, /javascript:/i, /on\w+=/i];
  for (const [key, value] of Object.entries(formData)) {
    if (xssPatterns.some(pattern => pattern.test(value))) {
      return false;
    }
  }

  return true;
};

// Rate limiting for forms
const formSubmissions = new Map<string, number[]>();

export const checkRateLimit = (identifier: string, maxRequests = 5, windowMs = 300000): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!formSubmissions.has(identifier)) {
    formSubmissions.set(identifier, []);
  }
  
  const submissions = formSubmissions.get(identifier)!;
  const recentSubmissions = submissions.filter(time => time > windowStart);
  
  if (recentSubmissions.length >= maxRequests) {
    return false;
  }
  
  recentSubmissions.push(now);
  formSubmissions.set(identifier, recentSubmissions);
  return true;
};