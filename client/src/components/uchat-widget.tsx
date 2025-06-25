import { useEffect } from "react";

export default function UChatWidget() {
  useEffect(() => {
    // Load UChatWidget script
    const loadUChatScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/float.js"]');
      if (existingScript) return;

      // Create and load the script
      const script = document.createElement('script');
      script.src = 'https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/float.js';
      script.async = true;
      script.defer = true;
      
      // Add to head
      if (document.head) {
        document.head.appendChild(script);
      }
    };

    // Load script immediately
    loadUChatScript();
    
    // Also load after a short delay to ensure it's available
    const timeout = setTimeout(loadUChatScript, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
}