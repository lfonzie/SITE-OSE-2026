import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function WhatsAppWidget({ 
  phoneNumber = "5515021013812", 
  message = "Olá! Gostaria de saber mais sobre o Colégio OSE.",
  className = ""
}: WhatsAppWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [uchatLoaded, setUchatLoaded] = useState(false);

  useEffect(() => {
    // Always show the WhatsApp widget for now, regardless of UChatWidget status
    setIsVisible(true);
    
    // Check if UChatWidget is already loaded but keep our widget visible
    const checkUChatWidget = () => {
      const widget = document.querySelector('[id*="uchat"], [class*="uchat"], [id*="chat"], [class*="chat"], iframe[src*="uchat"]');
      if (widget) {
        setUchatLoaded(true);
        console.log('UChatWidget found, but keeping fallback visible');
        // Force UChatWidget to be visible if it exists
        if (widget instanceof HTMLElement) {
          widget.style.display = 'block';
          widget.style.visibility = 'visible';
          widget.style.zIndex = '999998';
        }
      }
    };

    // Initial check
    checkUChatWidget();

    // Periodic check for UChatWidget
    const interval = setInterval(checkUChatWidget, 3000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Force visibility for debugging
  console.log('WhatsApp Widget render state:', { isVisible, uchatLoaded });

  return (
    <div>
      {/* Debug element to test visibility */}
      <div 
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          zIndex: 999999,
          backgroundColor: 'red',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px'
        }}
      >
        Widget Test: {isVisible ? 'Visible' : 'Hidden'}
      </div>
      
      <div className={`whatsapp-widget ${className}`}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
          title="Fale conosco no WhatsApp"
          style={{
            backgroundColor: '#25D366',
            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)'
          }}
        >
          <MessageCircle size={28} />
        </a>
      
      {/* Floating message */}
      <div 
        className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 mb-2 max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ zIndex: 999998 }}
      >
        <div className="text-sm text-gray-700 font-medium">
          Fale conosco no WhatsApp!
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Tire suas dúvidas sobre o Colégio OSE
        </div>
        <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
      </div>
      

    </div>
  );
}