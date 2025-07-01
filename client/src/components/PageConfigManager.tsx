import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Eye, Save, Trash2, CheckCircle, TestTube, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface PageConfig {
  pageName: string;
  heroImage?: string;
  heroBackground?: any;
  images?: string[];
  imagePositions?: any;
  content?: any;
  lastModified: string;
  savedForDeployment: boolean;
  autoSaved?: boolean;
}

export default function PageConfigManager() {
  const { isAuthenticated } = useAuth();
  const [configs, setConfigs] = useState<Record<string, PageConfig>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadConfigs();
    }
  }, [isAuthenticated]);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/page-configs');
      if (response.ok) {
        const data = await response.json();
        setConfigs(data);
      }
    } catch (error) {
      console.error('Error loading configs:', error);
      toast({
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar as configurações das páginas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentPageToServer = async (pageName: string) => {
    try {
      const localData = localStorage.getItem(`page_${pageName}`);
      if (!localData) {
        toast({
          title: "Dados não encontrados",
          description: `Não há dados salvos localmente para ${pageName}.`,
          variant: "destructive",
        });
        return;
      }

      const config = JSON.parse(localData);

      const response = await fetch('/api/page-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageName,
          config: {
            ...config,
            savedForDeployment: true
          }
        })
      });

      if (response.ok) {
        toast({
          title: "Configuração salva",
          description: `Página ${pageName} salva para o deployment.`,
        });
        loadConfigs();
      } else {
        throw new Error('Failed to save config');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a configuração.",
        variant: "destructive",
      });
    }
  };

  const loadServerConfigToLocal = async (pageName: string) => {
    try {
      const response = await fetch(`/api/page-config/${pageName}`);
      if (response.ok) {
        const config = await response.json();
        localStorage.setItem(`page_${pageName}`, JSON.stringify(config));
        toast({
          title: "Configuração carregada",
          description: `Dados do servidor carregados para ${pageName}.`,
        });
      } else {
        throw new Error('Config not found');
      }
    } catch (error) {
      console.error('Error loading config:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar a configuração do servidor.",
        variant: "destructive",
      });
    }
  };

  const exportAllConfigs = () => {
    const dataStr = JSON.stringify(configs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `page-configs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exportação concluída",
      description: "Arquivo de configurações baixado com sucesso.",
    });
  };

  const testDeploymentConfigs = async () => {
    try {
      const response = await fetch('/api/deployment-configs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Teste de deployment concluído",
          description: `${Object.keys(result.configs).length} configurações prontas para deployment.`,
        });
        console.log('Deployment configs:', result.configs);
      } else {
        toast({
          title: "Nenhuma configuração encontrada",
          description: "Não há configurações salvas para deployment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error testing deployment configs:', error);
      toast({
        title: "Erro no teste",
        description: "Não foi possível testar as configurações de deployment.",
        variant: "destructive",
      });
    }
  };

  const syncAllToDeployment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sync-all-to-deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Sincronização concluída",
          description: result.message,
        });
        console.log('Sync result:', result);
      } else {
        const error = await response.text();
        toast({
          title: "Erro na sincronização",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error syncing to deployment:', error);
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar as configurações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const forceDeploymentSync = async () => {
    setLoading(true);
    try {
      // Trigger the deployment config reload
      const response = await fetch('/api/deployment-configs');
      
      if (response.ok) {
        const data = await response.json();
        const configs = data.configs || {};
        
        // Force apply all server configurations locally
        Object.entries(configs).forEach(([pageName, config]: [string, any]) => {
          if (config && typeof config === 'object') {
            localStorage.setItem(`page_${pageName}`, JSON.stringify(config));
          }
        });
        
        // Reload the page to apply changes
        window.location.reload();
        
        toast({
          title: "Sincronização forçada concluída",
          description: `${Object.keys(configs).length} configurações aplicadas com as imagens do deployment.`,
        });
      } else {
        throw new Error('Failed to fetch deployment configs');
      }
    } catch (error) {
      console.error('Error in forced sync:', error);
      toast({
        title: "Erro na sincronização forçada",
        description: "Não foi possível aplicar as configurações do deployment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const syncAllPagesToServer = async () => {
    setLoading(true);
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    try {
      for (const page of pages) {
        try {
          const localData = localStorage.getItem(`page_${page.key}`);
          if (localData) {
            const config = JSON.parse(localData);

            console.log(`Syncing ${page.key} with config:`, config);

            const response = await fetch('/api/page-config', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                pageName: page.key,
                config: {
                  ...config,
                  savedForDeployment: true
                }
              })
            });

            if (response.ok) {
              successCount++;
              console.log(`Successfully synced ${page.key}`);
            } else {
              const errorText = await response.text();
              console.error(`Failed to sync ${page.key}:`, errorText);
              errorCount++;
            }
          } else {
            console.log(`No local data found for ${page.key}`);
            skippedCount++;
          }

          // Small delay to avoid overwhelming the server
          await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
          console.error(`Error syncing ${page.key}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0 || skippedCount > 0) {
        toast({
          title: "Sincronização concluída",
          description: `${successCount} páginas sincronizadas, ${skippedCount} sem dados locais${errorCount > 0 ? `, ${errorCount} erros` : ''}.`,
        });
        loadConfigs();
      } else {
        toast({
          title: "Nenhuma página sincronizada",
          description: "Não foram encontrados dados locais para sincronizar.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('General sync error:', error);
      toast({
        title: "Erro na sincronização",
        description: "Erro geral durante a sincronização.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const pages = [
    { name: 'Home', key: 'home' },
    { name: 'Why OSE Section', key: 'why-ose' },
    { name: 'Programs Section', key: 'programs' },
    { name: 'Testimonials', key: 'testimonials' },
    { name: 'Fundamental I', key: 'fundamental-i' },
    { name: 'Fundamental II', key: 'fundamental-ii' },
    { name: 'Ensino Médio', key: 'ensino-medio' },
    { name: 'Educação Infantil', key: 'educacao-infantil' },
    { name: 'Legacy OSE', key: 'legacy' },
    { name: 'Missão e Valores', key: 'missao-valores' },
    { name: 'Nossa Estrutura', key: 'estrutura' },
    { name: 'Programa Bilíngue', key: 'bilingue' },
    { name: 'Programa Integral', key: 'integral' },
    { name: 'Socioemocional', key: 'socioemocional' },
    { name: 'Amplia', key: 'amplia' },
    { name: 'Code OSE', key: 'code' },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciador de Configurações</h2>
        <div className="flex gap-2">
          <Button 
            onClick={forceDeploymentSync} 
            variant="destructive"
            disabled={loading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Aplicando..." : "Aplicar Config Deploy"}
          </Button>
          <Button 
            onClick={syncAllPagesToServer} 
            variant="default"
            disabled={loading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Sincronizando..." : "Sincronizar Todas"}
          </Button>
          <Button onClick={testDeploymentConfigs} variant="secondary">
            <CheckCircle className="w-4 h-4 mr-2" />
            Testar Deployment
          </Button>
          <Button onClick={exportAllConfigs} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Todas
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações por Página</CardTitle>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">📋 Como garantir consistência no deployment:</h4>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Configure as imagens nas páginas durante o desenvolvimento</li>
              <li>2. Use o botão "Sincronizar Todas" para salvar no servidor</li>
              <li>3. No deployment, as configurações serão carregadas automaticamente</li>
              <li>4. Verifique o status "Servidor" nas páginas abaixo</li>
            </ol>
          </div>
          
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">🔄 Aplicar Configurações do Deploy:</h4>
            <p className="text-sm text-red-700">
              Use o botão vermelho "Aplicar Config Deploy" para forçar a aplicação das imagens que estão no deployment. 
              Isso sobrescreverá todas as configurações locais com as configurações corretas do servidor.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {pages.map((page) => {
              const serverConfig = configs[page.key];
              const hasLocalData = !!localStorage.getItem(`page_${page.key}`);

              return (
                <div key={page.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <h3 className="font-medium">{page.name}</h3>
                    <div className="flex space-x-2">
                      {serverConfig && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Servidor
                        </Badge>
                      )}
                      {hasLocalData && (
                        <Badge variant="secondary">
                          Local
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {hasLocalData && (
                      <Button
                        size="sm"
                        onClick={() => saveCurrentPageToServer(page.key)}
                        variant="outline"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                    )}

                    {serverConfig && (
                      <Button
                        size="sm"
                        onClick={() => loadServerConfigToLocal(page.key)}
                        variant="outline"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Carregar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {Object.keys(configs).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes das Configurações Salvas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(configs).map(([pageName, config]) => (
                <div key={pageName} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{config.pageName || pageName}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(config.lastModified).toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Hero Image:</span>
                      <p className="text-gray-600 truncate">
                        {config.heroImage ? config.heroImage.split('/').pop() : 'Não definida'}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium">Imagens:</span>
                      <p className="text-gray-600">
                        {config.images ? `${config.images.length} imagens` : 'Nenhuma'}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium">Background:</span>
                      <p className="text-gray-600">
                        {config.heroBackground?.type || 'Padrão'}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium">Posições:</span>
                      <p className="text-gray-600">
                        {config.imagePositions ? 
                          `${Object.keys(config.imagePositions).length} configuradas` : 
                          'Nenhuma'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}