import { useEffect } from 'react';

// This component ensures server configurations are loaded in production
export default function DeploymentConfigLoader() {
  useEffect(() => {
    const isProduction = import.meta.env.PROD || 
                        window.location.hostname.includes('.replit.app') ||
                        window.location.hostname.includes('.repl.co');

    if (isProduction) {
      console.log('🚀 Production deployment detected - Loading server configurations...');
      
      const applyServerConfigs = async () => {
        try {
          const response = await fetch('/api/apply-server-configs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.ok) {
            const result = await response.json();
            console.log('✅ Server configurations loaded for deployment:', result.configs);
            
            // Apply each configuration to localStorage to ensure immediate availability
            Object.entries(result.configs).forEach(([pageName, config]) => {
              localStorage.setItem(`page_${pageName}`, JSON.stringify(config));
            });
            
            // Force page reload to apply configurations
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            console.warn('⚠️ No server configurations found for deployment');
          }
        } catch (error) {
          console.error('❌ Error loading deployment configurations:', error);
        }
      };

      // Only run once per session
      const hasLoaded = sessionStorage.getItem('deployment-configs-loaded');
      if (!hasLoaded) {
        sessionStorage.setItem('deployment-configs-loaded', 'true');
        applyServerConfigs();
      }
    }
  }, []);

  return null; // This component renders nothing
}