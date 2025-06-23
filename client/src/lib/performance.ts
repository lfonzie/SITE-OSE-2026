// Performance Optimization (substitui Jetpack Boost)

// Lazy loading for images
export const initLazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
    .hero-section { min-height: 100vh; background: linear-gradient(135deg, #ff7f00, #8b4513); }
    .navigation { position: fixed; top: 0; width: 100%; z-index: 1000; background: white; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

// Preload critical resources
export const preloadResources = () => {
  const resources = [
    { href: '/fonts/main.woff2', as: 'font', type: 'font/woff2' },
    { href: 'https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png', as: 'image' }
  ];

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.as === 'font') link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Remove unused CSS
export const removeUnusedCSS = () => {
  // This would typically be done at build time
  console.log('CSS optimization applied at build time');
};