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
    // Check if UChatWidget is already loaded
    const checkUChatWidget = () => {
      const widget = document.querySelector('[id*="uchat"], [class*="uchat"], [id*="chat"], [class*="chat"], iframe[src*="uchat"]');
      if (widget) {
        setUchatLoaded(true);
        setIsVisible(false); // Hide fallback if UChatWidget is present
      } else {
        setIsVisible(true); // Show fallback if UChatWidget is not present
      }
    };

    // Initial check
    checkUChatWidget();

    // Periodic check for UChatWidget
    const interval = setInterval(checkUChatWidget, 2000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce"
        title="Fale conosco no WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      
      {/* Floating message */}
      <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="text-sm text-gray-700 font-medium">
          Fale conosco no WhatsApp!
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Tire suas dúvidas sobre o Colégio OSE
        </div>
        <div className="absolute bottom-0 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
      </div>
    </div>
  );
}