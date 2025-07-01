import { useEffect } from 'react';

// This component ensures server configurations are loaded in production
export default function DeploymentConfigLoader() {
  useEffect(() => {
    const loadDeploymentConfigs = async () => {
      // Always try to load server configs to ensure consistency
      const isProduction = import.meta.env.PROD || 
                        window.location.hostname.includes('.replit.app') ||
                        window.location.hostname.includes('.repl.co');
      const forceLoad = localStorage.getItem('force_deployment_config') === 'true';

      console.log('Loading deployment configurations...', { isProduction, forceLoad });

      try {
        const response = await fetch('/api/deployment-configs')
          .catch(fetchError => {
            console.warn('Network error fetching deployment configs:', fetchError);
            return null;
          });
        
        if (response && response.ok) {
          const data = await response.json()
            .catch(jsonError => {
              console.warn('Error parsing deployment configs JSON:', jsonError);
              return { configs: {} };
            });
          
          const configs = data.configs || {};

          console.log('Available deployment configurations:', Object.keys(configs));

          // Apply each configuration, prioritizing server configs in production
          Object.entries(configs).forEach(([pageName, config]: [string, any]) => {
            try {
              if (config && typeof config === 'object') {
                const localConfig = localStorage.getItem(`page_${pageName}`);

                // In production, always use server config
                // In development, merge or use server config if more recent
                if (isProduction || !localConfig || config.savedForDeployment) {
                  localStorage.setItem(`page_${pageName}`, JSON.stringify(config));
                  console.log(`Applied deployment config for: ${pageName} (deployment ready)`);
                }
              }
            } catch (configError) {
              console.warn(`Error applying config for ${pageName}:`, configError);
            }
          });

          console.log('✅ All deployment configurations loaded and synchronized');
        } else {
          console.log('No deployment configs found on server or response failed');
        }
      } catch (error) {
        console.warn('Error loading deployment configs:', error);
      }
    };

    loadDeploymentConfigs();
  }, []);

  return null; // This component renders nothing
}