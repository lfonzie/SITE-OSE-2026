// Custom Code Snippets (substitui WPCode Lite)

interface CodeSnippet {
  id: string;
  name: string;
  code: string;
  location: 'head' | 'body' | 'footer';
  active: boolean;
  conditions?: {
    pages?: string[];
    devices?: ('desktop' | 'mobile' | 'tablet')[];
  };
}

// Code snippets management
export class SnippetManager {
  private snippets: CodeSnippet[] = [];

  addSnippet(snippet: CodeSnippet) {
    this.snippets.push(snippet);
  }

  removeSnippet(id: string) {
    this.snippets = this.snippets.filter(s => s.id !== id);
  }

  executeSnippets() {
    this.snippets
      .filter(snippet => snippet.active)
      .filter(snippet => this.shouldExecute(snippet))
      .forEach(snippet => this.injectCode(snippet));
  }

  private shouldExecute(snippet: CodeSnippet): boolean {
    // Check page conditions
    if (snippet.conditions?.pages) {
      const currentPath = window.location.pathname;
      const pageMatch = snippet.conditions.pages.some(page => 
        currentPath === page || currentPath.includes(page)
      );
      if (!pageMatch) return false;
    }

    // Check device conditions
    if (snippet.conditions?.devices) {
      const device = this.getDeviceType();
      if (!snippet.conditions.devices.includes(device)) return false;
    }

    return true;
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private injectCode(snippet: CodeSnippet) {
    if (snippet.code.includes('<script')) {
      this.injectScript(snippet);
    } else if (snippet.code.includes('<style')) {
      this.injectStyle(snippet);
    } else {
      this.injectHTML(snippet);
    }
  }

  private injectScript(snippet: CodeSnippet) {
    const script = document.createElement('script');
    script.innerHTML = snippet.code.replace(/<\/?script[^>]*>/g, '');
    script.setAttribute('data-snippet-id', snippet.id);
    
    if (snippet.location === 'head') {
      document.head.appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  }

  private injectStyle(snippet: CodeSnippet) {
    const style = document.createElement('style');
    style.innerHTML = snippet.code.replace(/<\/?style[^>]*>/g, '');
    style.setAttribute('data-snippet-id', snippet.id);
    document.head.appendChild(style);
  }

  private injectHTML(snippet: CodeSnippet) {
    const container = document.createElement('div');
    container.innerHTML = snippet.code;
    container.setAttribute('data-snippet-id', snippet.id);
    
    if (snippet.location === 'head') {
      document.head.appendChild(container);
    } else {
      document.body.appendChild(container);
    }
  }
}

// Pre-configured snippets for common use cases
export const commonSnippets: CodeSnippet[] = [
  {
    id: 'google-site-verification',
    name: 'Google Site Verification',
    code: '<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />',
    location: 'head',
    active: false
  },
  {
    id: 'hotjar-tracking',
    name: 'Hotjar Tracking',
    code: `
      <script>
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      </script>
    `,
    location: 'head',
    active: false
  },
  {
    id: 'whatsapp-chat',
    name: 'WhatsApp Chat Widget',
    code: `
      <!-- WhatsApp widget disabled - UChatWidget handles this globally -->
    `,
    location: 'body',
    active: false
  },
  {
    id: 'whatsapp-chat-old',
    name: 'WhatsApp Chat Widget (Backup)',
    code: `
      <div id="whatsapp-chat" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
        <a href="https://wa.me/551521013812" target="_blank" 
           style="background: #25d366; color: white; padding: 12px; border-radius: 50px; text-decoration: none; display: flex; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
          </svg>
          <span style="margin-left: 8px;">Fale Conosco</span>
        </a>
      </div>
    `,
    location: 'body',
    active: false,
    conditions: {
      devices: ['desktop', 'mobile']
    }
  }
];

// Initialize snippet manager
export const snippetManager = new SnippetManager();

// Add common snippets
commonSnippets.forEach(snippet => snippetManager.addSnippet(snippet));