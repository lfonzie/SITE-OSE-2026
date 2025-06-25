import { storage } from './storage';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

// Get the base URL from environment or use localhost for development
const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REPLIT_DOMAIN 
      ? `https://${process.env.REPLIT_DOMAIN}` 
      : 'https://colegioose.com.br';
  }
  return 'http://localhost:5000';
};

// Generate sitemap URLs based on current content
export const generateSitemapUrls = async (): Promise<SitemapUrl[]> => {
  const baseUrl = getBaseUrl();
  const now = new Date().toISOString();
  
  const urls: SitemapUrl[] = [
    // Static pages with high priority
    {
      loc: `${baseUrl}/`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/sobre`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/programas`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${baseUrl}/contato`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: `${baseUrl}/agendamento`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.8'
    },
    // Portal pages
    {
      loc: `${baseUrl}/portal-aluno`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      loc: `${baseUrl}/portal-pais`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      loc: `${baseUrl}/admin`,
      lastmod: now,
      changefreq: 'daily',
      priority: '0.3'
    }
  ];

  try {
    // Add dynamic program pages
    const programs = await storage.getPrograms();
    programs.forEach(program => {
      urls.push({
        loc: `${baseUrl}/programa/${program.id}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: '0.7'
      });
    });

    // Add news article pages if any
    const news = await storage.getNews();
    news.forEach(article => {
      urls.push({
        loc: `${baseUrl}/noticia/${article.id}`,
        lastmod: new Date(article.publishedAt).toISOString(),
        changefreq: 'yearly',
        priority: '0.5'
      });
    });
  } catch (error) {
    console.error('Error generating dynamic sitemap URLs:', error);
  }

  return urls;
};

// Generate XML sitemap
export const generateSitemapXML = async (): Promise<string> => {
  const urls = await generateSitemapUrls();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
};

// Generate robots.txt content
export const generateRobotsTxt = (): string => {
  const baseUrl = getBaseUrl();
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Block admin areas
Disallow: /admin
Disallow: /api/

# Allow all other content
Allow: /portal-aluno
Allow: /portal-pais
Allow: /programas
Allow: /contato
Allow: /agendamento
`;
};

// Cache for sitemap to avoid regenerating on every request
let sitemapCache: { xml: string; timestamp: number } | null = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getCachedSitemap = async (): Promise<string> => {
  const now = Date.now();
  
  if (!sitemapCache || (now - sitemapCache.timestamp) > CACHE_DURATION) {
    const xml = await generateSitemapXML();
    sitemapCache = { xml, timestamp: now };
  }
  
  return sitemapCache.xml;
};

// Clear sitemap cache when content changes
export const invalidateSitemapCache = (): void => {
  sitemapCache = null;
  console.log('Sitemap cache invalidated - will regenerate on next request');
};