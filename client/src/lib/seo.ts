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
    "alternateName": "Organização Sorocabana de Ensino",
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.5015",
      "longitude": "-47.4526"
    },
    "telephone": "(15) 2101-3800",
    "email": "info@colegioose.com.br",
    "url": "https://colegioose.com.br",
    "logo": "https://colegioose.com.br/images/LogoOSE100anos.png",
    "image": "https://colegioose.com.br/images/LogoOSE100anos.png",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "openingHours": "Mo-Fr 07:00-18:00",
    "areaServed": {
      "@type": "City",
      "name": "Sorocaba"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-23.5015",
        "longitude": "-47.4526"
      },
      "geoRadius": "50000"
    },
    "sameAs": [
      "https://www.facebook.com/colegioose",
      "https://www.instagram.com/colegioose",
      "https://www.youtube.com/@colegioose"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Programas Educacionais",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Educação Infantil",
          "description": "Programa para crianças de 4 a 6 anos"
        },
        {
          "@type": "OfferCatalog", 
          "name": "Ensino Fundamental I",
          "description": "Anos iniciais do ensino fundamental"
        },
        {
          "@type": "OfferCatalog",
          "name": "Ensino Fundamental II", 
          "description": "Anos finais do ensino fundamental"
        },
        {
          "@type": "OfferCatalog",
          "name": "Ensino Médio",
          "description": "Preparação para vestibular e ENEM"
        },
        {
          "@type": "OfferCatalog",
          "name": "Programa Bilíngue",
          "description": "Educação bilíngue português-inglês"
        }
      ]
    }
  };
  
  addStructuredData(schoolSchema);
};