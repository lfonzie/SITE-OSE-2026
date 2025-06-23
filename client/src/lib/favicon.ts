// Favicon Management (substitui RealFaviconGenerator)

export const setupFavicons = () => {
  // Remove existing favicons
  const existingIcons = document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], meta[name*="msapplication"]');
  existingIcons.forEach(icon => icon.remove());

  // Favicon configurations
  const favicons = [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ];

  // Add favicon links
  favicons.forEach(favicon => {
    const link = document.createElement('link');
    Object.entries(favicon).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });

  // Meta tags for mobile
  const metas = [
    { name: 'msapplication-TileColor', content: '#ff7f00' },
    { name: 'theme-color', content: '#ff7f00' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Colégio OSE' }
  ];

  metas.forEach(meta => {
    const metaElement = document.createElement('meta');
    metaElement.name = meta.name;
    metaElement.content = meta.content;
    document.head.appendChild(metaElement);
  });
};

// Generate Web App Manifest
export const generateManifest = () => {
  const manifest = {
    name: 'Colégio OSE',
    short_name: 'OSE',
    description: 'Tradição secular de ensino desde 1924',
    start_url: '/',
    display: 'standalone',
    theme_color: '#ff7f00',
    background_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };

  return JSON.stringify(manifest, null, 2);
};