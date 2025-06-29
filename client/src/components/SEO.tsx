import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData
}: SEOProps) {

  useEffect(() => {
    // Set page title
    document.title = title;

    // Remove existing meta tags that we'll replace
    const existingMetas = document.querySelectorAll('meta[data-seo="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"][data-seo="true"]');
    existingStructuredData.forEach(script => script.remove());

    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();

    const head = document.head;

    // Basic meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { name: 'author', content: 'Colégio OSE' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#D97706' }, // OSE orange color
      
      // Open Graph tags
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonical || window.location.href },
      { property: 'og:site_name', content: 'Colégio OSE' },
      { property: 'og:locale', content: 'pt_BR' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: ogTitle || title },
      { name: 'twitter:description', content: ogDescription || description },
      { name: 'twitter:site', content: '@colegioose' },
      
      // Additional SEO tags
      { name: 'geo.region', content: 'BR-SP' },
      { name: 'geo.placename', content: 'Sorocaba' },
      { name: 'geo.position', content: '-23.5015;-47.4526' },
      { name: 'ICBM', content: '-23.5015, -47.4526' },
    ];

    // Add og:image if provided
    if (ogImage) {
      metaTags.push(
        { property: 'og:image', content: ogImage },
        { property: 'og:image:alt', content: ogTitle || title },
        { name: 'twitter:image', content: ogImage }
      );
    }

    // Create and append meta tags
    metaTags.forEach(({ name, property, content }) => {
      if (content) {
        const meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        meta.setAttribute('data-seo', 'true');
        head.appendChild(meta);
      }
    });

    // Add canonical link
    if (canonical) {
      const canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonical);
      head.appendChild(canonicalLink);
    }

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(structuredData);
      head.appendChild(script);
    }

  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, structuredData]);

  return null;
}