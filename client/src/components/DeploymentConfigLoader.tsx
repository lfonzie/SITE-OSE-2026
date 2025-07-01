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
        const response = await fetch('/api/deployment-configs');
        if (response.ok) {
          const data = await response.json();
          const configs = data.configs || {};

          console.log('Available deployment configurations:', Object.keys(configs));

          // Apply each configuration, prioritizing server configs in production
          Object.entries(configs).forEach(([pageName, config]: [string, any]) => {
            if (config && typeof config === 'object') {
              const localConfig = localStorage.getItem(`page_${pageName}`);

              // In production, always use server config
              // In development, merge or use server config if more recent
              if (isProduction || !localConfig || config.savedForDeployment) {
                localStorage.setItem(`page_${pageName}`, JSON.stringify(config));
                console.log(`Applied deployment config for: ${pageName} (deployment ready)`);
              }
            }
          });

          setConfigsLoaded(true);
          console.log('✅ All deployment configurations loaded and synchronized');
        } else {
          console.log('No deployment configs found on server');
          setConfigsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading deployment configs:', error);
        setConfigsLoaded(true); // Set to true to prevent blocking
      }
    };

    loadDeploymentConfigs();
  }, []);

  return null; // This component renders nothing
}