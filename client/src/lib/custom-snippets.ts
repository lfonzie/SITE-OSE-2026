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
    id: 'uchat-widget',
    name: 'UChat Chat Widget',
    code: `<script>
      (function() {
        console.log('UChat widget loading...');
        
        // Check if UChat script already exists
        if (document.querySelector('script[src*="uchat.com.au"]')) {
          console.log('UChat script already loaded');
          return;
        }
        
        var script = document.createElement('script');
        script.src = 'https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/full.js';
        script.async = true;
        script.defer = true;
        
        script.onload = function() {
          console.log('UChat script loaded successfully');
          
          // Check immediately
          if (window.UChat) {
            console.log('UChat found immediately');
          }
          
          // Check after 1 second
          setTimeout(function() {
            console.log('Checking for UChat after 1s...');
            if (window.UChat) {
              console.log('UChat widget initialized');
            } else if (window.DF_Widget) {
              console.log('DF Widget (UChat) found');
            } else {
              console.warn('UChat widget not found after script load');
              console.log('Available window objects containing chat/DF/widget:', 
                Object.keys(window).filter(function(k) {
                  return k.toLowerCase().includes('chat') || 
                    k.includes('DF') || 
                    k.toLowerCase().includes('widget') ||
                    k.toLowerCase().includes('uchat');
                })
              );
              
              // Check for any scripts loaded
              var scripts = Array.from(document.scripts);
              var uchatScripts = scripts.filter(function(s) { return s.src && s.src.includes('uchat'); });
              console.log('UChat scripts found:', uchatScripts.length);
              
              // Check for widget containers
              var widgets = document.querySelectorAll('[id*="chat"], [class*="chat"], [id*="widget"], [class*="widget"]');
              console.log('Potential widget elements:', widgets.length);
            }
          }, 2000);
          
          // Final check after 5 seconds
          setTimeout(function() {
            console.log('Final UChat check after 5s...');
            if (window.UChat || window.DF_Widget) {
              console.log('UChat/DF Widget found in final check');
            } else {
              console.error('UChat widget failed to initialize after 5 seconds');
            }
          }, 5000);
        };
        
        script.onerror = function() {
          console.error('Failed to load UChat script');
        };
        
        document.head.appendChild(script);
        console.log('UChat script added to DOM');
      })();
    </script>`,
    location: 'body',
    active: false
  }
];

// Initialize snippet manager
export const snippetManager = new SnippetManager();

// Add common snippets
commonSnippets.forEach(snippet => snippetManager.addSnippet(snippet));