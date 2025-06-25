import { useEffect } from "react";

export default function WhatsAppWidget() {
  useEffect(() => {
    // Only load UChatWidget on production domain
    if (window.location.hostname === 'colegioose.com.br' || 
        window.location.hostname.includes('colegioose.com.br')) {
      
      const loadUChatScript = () => {
        const existingScript = document.querySelector('script[src="https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/float.js"]');
        if (existingScript) return;

        const script = document.createElement('script');
        script.src = 'https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/float.js';
        script.async = true;
        script.defer = true;
        
        if (document.head) {
          document.head.appendChild(script);
        }
      };

      loadUChatScript();
    }
  }, []);

  // Show custom WhatsApp button only for development/other domains
  if (window.location.hostname !== 'colegioose.com.br' && 
      !window.location.hostname.includes('colegioose.com.br')) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50"
        style={{ zIndex: 9999 }}
      >
        <a
          href="https://wa.me/551521013812"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title="Fale Conosco no WhatsApp"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.535 4.148 1.556 5.95L0 24l6.304-1.611c1.72.96 3.678 1.467 5.713 1.467 6.621 0 11.988-5.367 11.988-11.988C23.971 5.347 18.604.029 12.017 0zm5.936 16.54c-.264.747-1.554 1.39-2.127 1.444-.558.053-1.286.241-4.332-.904-3.257-1.222-5.348-4.56-5.51-4.772-.162-.213-1.322-1.756-1.322-3.35 0-1.593.836-2.378 1.133-2.702.297-.324.648-.405.864-.405.216 0 .432.001.621.012.199.011.466-.075.728.555.264.63 1.133 2.378 1.233 2.55.099.171.165.37.033.597-.132.227-.198.369-.396.567-.198.198-.416.442-.594.594-.198.171-.404.356-.173.7.231.345 1.029 1.699 2.208 2.75 1.515 1.351 2.793 1.768 3.188 1.966.396.198.627.165.858-.099.231-.264.993-1.158 1.257-1.555.264-.396.528-.33.891-.198.363.132 2.31 1.09 2.706 1.287.396.198.66.297.759.462.099.165.099.959-.165 1.706z"/>
          </svg>
        </a>
      </div>
    );
  }

  return null;
}