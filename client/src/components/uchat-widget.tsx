import { useEffect } from "react";

export default function UChatWidget() {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/float.js';
    script.async = true;
    script.defer = true;
    
    // Add script to head
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src="https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/float.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}