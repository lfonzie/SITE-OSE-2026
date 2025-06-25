import { useEffect } from "react";

// UChatWidget is loaded globally via script tag in index.html
// This component removes any conflicting WhatsApp widgets
export default function WhatsAppWidget() {
  useEffect(() => {
    // Remove any existing WhatsApp chat elements from custom snippets
    const removeCustomWidgets = () => {
      const elements = document.querySelectorAll('#whatsapp-chat, [data-snippet-id="whatsapp-chat"]');
      elements.forEach(element => element.remove());
    };

    // Run immediately and periodically to ensure cleanup
    removeCustomWidgets();
    const interval = setInterval(removeCustomWidgets, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}