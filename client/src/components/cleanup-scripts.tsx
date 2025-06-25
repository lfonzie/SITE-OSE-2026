import { useEffect } from "react";

export default function CleanupScripts() {
  useEffect(() => {
    // Add aggressive CSS to hide any chat widgets
    const addHideChatCSS = () => {
      const styleId = 'hide-chat-widgets';
      let style = document.getElementById(styleId);
      
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          /* Hide all possible chat widget variations */
          [id*="uchat"], [class*="uchat"],
          [id*="whatsapp"], [class*="whatsapp"],
          [id*="chat"], [class*="chat"],
          iframe[src*="uchat"], iframe[src*="whatsapp"],
          [data-chat], [data-whatsapp],
          div[style*="position: fixed"][style*="bottom"],
          div[style*="position: fixed"][style*="right"],
          div[style*="z-index: 999"],
          div[style*="z-index: 9999"],
          *[style*="position: fixed"]:has(img[src*="whatsapp"]),
          *:contains("Fale Conosco"),
          *:contains("WhatsApp") {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            z-index: -9999 !important;
            pointer-events: none !important;
          }
          
          /* Additional selectors for floating buttons */
          div[style*="position: fixed"]:not([class]):not([id]) {
            display: none !important;
          }
          
          /* Hide any element with green background that might be a WhatsApp button */
          div[style*="background"][style*="green"],
          div[style*="background-color"][style*="#25d366"],
          div[style*="background-color"][style*="rgb(37, 211, 102)"] {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    const removeAllChatElements = () => {
      // Remove scripts
      const scripts = document.querySelectorAll('script[src*="uchat"], script[src*="whatsapp"], script[src*="chat"]');
      scripts.forEach(script => script.remove());
      
      // Remove all floating divs that might be chat widgets
      document.querySelectorAll('div').forEach(element => {
        const style = element.getAttribute('style') || '';
        const text = element.textContent?.toLowerCase() || '';
        
        if ((style.includes('position: fixed') || style.includes('position: absolute')) &&
            (style.includes('bottom') || style.includes('right') || 
             text.includes('fale conosco') || text.includes('whatsapp') ||
             element.querySelector('img[src*="whatsapp"]'))) {
          element.remove();
        }
      });
      
      // Remove iframes from external chat services
      document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src?.toLowerCase() || '';
        if (src.includes('uchat') || src.includes('whatsapp') || src.includes('chat')) {
          iframe.remove();
        }
      });
    };

    // Apply CSS immediately
    addHideChatCSS();
    
    // Run cleanup immediately
    removeAllChatElements();
    
    // Set up observer to catch dynamically added elements
    const observer = new MutationObserver((mutations) => {
      let shouldClean = false;
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            const text = element.textContent?.toLowerCase() || '';
            const style = element.getAttribute?.('style') || '';
            
            if (text.includes('fale conosco') || 
                text.includes('whatsapp') ||
                style.includes('position: fixed') ||
                element.tagName === 'IFRAME') {
              shouldClean = true;
            }
          }
        });
      });
      
      if (shouldClean) {
        setTimeout(removeAllChatElements, 50);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Run cleanup multiple times
    const timeouts = [100, 300, 500, 1000, 2000, 5000].map(delay => 
      setTimeout(() => {
        addHideChatCSS();
        removeAllChatElements();
      }, delay)
    );

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return null;
}