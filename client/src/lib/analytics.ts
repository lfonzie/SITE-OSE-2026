// Google Analytics 4 Implementation
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  try {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-N2MQBKE70F';

    if (import.meta.env.DEV) {
      console.log('Google Analytics configurado:', measurementId);
    }

    // Add Google Analytics script with error handling
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script1.onerror = () => {
      console.warn('Failed to load Google Analytics script');
    };
    document.head.appendChild(script1);

    // Initialize gtag with error handling
    const script2 = document.createElement('script');
    script2.innerHTML = `
      try {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      } catch (e) {
        console.warn('Error initializing Google Analytics:', e);
      }
    `;
    document.head.appendChild(script2);
  } catch (error) {
    console.warn('Error setting up Google Analytics:', error);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-524DC3R';
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Facebook Pixel Implementation
export const initFacebookPixel = () => {
  try {
    const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID || '303393036895689';
    
    if (import.meta.env.DEV) {
      console.log('Facebook Pixel configurado:', pixelId);
    }

    // Facebook Pixel Code with error handling
    const script = document.createElement('script');
    script.onerror = () => {
      console.warn('Failed to load Facebook Pixel script');
    };
    script.innerHTML = `
      try {
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      } catch (e) {
        console.warn('Error initializing Facebook Pixel:', e);
      }
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);
  } catch (error) {
    console.warn('Error setting up Facebook Pixel:', error);
  }
};

// Track Facebook events
export const trackFBEvent = (eventName: string, parameters?: object) => {
  if (typeof window === 'undefined' || !(window as any).fbq) return;
  
  (window as any).fbq('track', eventName, parameters);
};

// Google Tag Manager Implementation
export const initGTM = () => {
  try {
    const gtmId = import.meta.env.VITE_GTM_ID || 'GTM-524DC3R';
    
    if (!gtmId || gtmId === 'GTM-524DC3R') {
      // Using default OSE GTM ID
      if (import.meta.env.DEV) {
        console.log('Google Tag Manager configurado com ID padrão OSE');
      }
    }

    // GTM Script with error handling
    const script1 = document.createElement('script');
    script1.onerror = () => {
      console.warn('Failed to load Google Tag Manager script');
    };
    script1.innerHTML = `
      try {
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      } catch (e) {
        console.warn('Error initializing Google Tag Manager:', e);
      }
    `;
    document.head.appendChild(script1);

    // GTM Noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
  } catch (error) {
    console.warn('Error setting up Google Tag Manager:', error);
  }
};

// Initialize all tracking
export const initAllTracking = () => {
  // Only initialize analytics in production or when explicitly enabled
  if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    initGA();
    initFacebookPixel();
    initGTM();
  } else if (import.meta.env.DEV) {
    console.log('Analytics disabled in development mode - add VITE_ENABLE_ANALYTICS=true to enable');
  }
};