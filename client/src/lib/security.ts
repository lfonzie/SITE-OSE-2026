export const setupCSP = () => {
  const meta = document.createElement("meta");
  meta.setAttribute("http-equiv", "Content-Security-Policy");
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
      https://sdk.dfktv2.com
      https://*.dfktv2.com
      https://ipapi.co
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
      https://www.facebook.com
      https://www.uchat.com.au
      https://*.uchat.com.au
      https://sdk.dfktv2.com
      https://*.dfktv2.com;
    frame-src 'self' 
      https://calendly.com 
      https://*.calendly.com 
      https://www.googletagmanager.com 
      https://td.doubleclick.net 
      https://*.doubleclick.net
      https://sdk.dfktv2.com;
    media-src 'self' https://sdk.dfktv2.com;
  `
    .replace(/\s+/g, " ")
    .trim();
  document.head.appendChild(meta);
};

export const sanitizeInput = (input: string): string => {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

export const validateForm = (formData: Record<string, string>): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    return false;
  }
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  if (formData.phone && !phoneRegex.test(formData.phone)) {
    return false;
  }
  const xssPatterns = [/<script/i, /javascript:/i, /on\w+=/i];
  for (const [key, value] of Object.entries(formData)) {
    if (xssPatterns.some((pattern) => pattern.test(value))) {
      return false;
    }
  }
  return true;
};

const formSubmissions = new Map<string, number[]>();

export const checkRateLimit = (
  identifier: string,
  maxRequests = 5,
  windowMs = 300000,
): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  if (!formSubmissions.has(identifier)) {
    formSubmissions.set(identifier, []);
  }
  const submissions = formSubmissions.get(identifier)!;
  const recentSubmissions = submissions.filter((time) => time > windowStart);
  if (recentSubmissions.length >= maxRequests) {
    return false;
  }
  recentSubmissions.push(now);
  formSubmissions.set(identifier, recentSubmissions);
  return true;
};
