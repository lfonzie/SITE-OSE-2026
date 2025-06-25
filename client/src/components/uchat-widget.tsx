import { useEffect } from 'react';

export default function UChatWidget() {
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src*="uchat.com.au"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/full.js';
    script.async = true;
    script.defer = true;
    
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[src*="uchat.com.au"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}