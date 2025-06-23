// SEO Implementation (substitui Rank Math SEO)
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const updateSEO = (config: SEOConfig) => {
  // Update page title
  document.title = config.title;

  // Remove existing meta tags
  const existingMetas = document.querySelectorAll('meta[data-seo-managed]');
  existingMetas.forEach(meta => meta.remove());

  // Create meta tags
  const metas = [
    { name: 'description', content: config.description },
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
  ];

  if (config.keywords) {
    metas.push({ name: 'keywords', content: config.keywords });
  }

  if (config.ogImage) {
    metas.push(
      { property: 'og:image', content: config.ogImage },
      { name: 'twitter:image', content: config.ogImage }
    );
  }

  // Add canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = config.canonical || window.location.href;

  // Add meta tags to head
  metas.forEach(meta => {
    const metaElement = document.createElement('meta');
    if ('name' in meta) {
      metaElement.name = meta.name;
    } else {
      metaElement.setAttribute('property', meta.property);
    }
    metaElement.content = meta.content;
    metaElement.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(metaElement);
  });
};

// Structured Data (Schema.org)
export const addStructuredData = (data: object) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// School Organization Schema
export const addSchoolSchema = () => {
  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Colégio OSE",
    "foundingDate": "1924",
    "description": "Tradição secular de ensino. Formando cidadãos críticos há 100 anos.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua da Penha, 620",
      "addressLocality": "Sorocaba",
      "addressRegion": "SP",
      "postalCode": "18010-002",
      "addressCountry": "BR"
    },
    "telephone": "(15) 2101-3800",
    "email": "info@colegioose.com.br",
    "url": "https://colegioose.com.br",
    "logo": "https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png",
    "sameAs": [
      "https://www.facebook.com/colegioose",
      "https://www.instagram.com/colegioose"
    ]
  };
  
  addStructuredData(schoolSchema);
};