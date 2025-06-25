import { useEffect } from "react";

export default function CleanupScripts() {
  useEffect(() => {
    // Remove any existing UChatWidget scripts and elements
    const removeUChatElements = () => {
      // Remove scripts
      const scripts = document.querySelectorAll('script[src*="uchat.com.au"]');
      scripts.forEach(script => script.remove());
      
      // Remove any UChatWidget containers/iframes
      const uchatElements = document.querySelectorAll('[id*="uchat"], [class*="uchat"], iframe[src*="uchat"]');
      uchatElements.forEach(element => element.remove());
      
      // Remove any floating chat buttons
      const chatButtons = document.querySelectorAll('[class*="chat"], [id*="chat-widget"], [class*="whatsapp"]');
      chatButtons.forEach(button => {
        if (button.textContent?.toLowerCase().includes('chat') || 
            button.getAttribute('style')?.includes('position: fixed')) {
          button.remove();
        }
      });
    };

    // Run cleanup immediately
    removeUChatElements();
    
    // Run cleanup again after a short delay to catch dynamically loaded elements
    const timeouts = [100, 500, 1000, 2000].map(delay => 
      setTimeout(removeUChatElements, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return null;
}