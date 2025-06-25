import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SitemapStatusProps {
  onRegenerateSuccess?: () => void;
}

export default function SitemapStatus({ onRegenerateSuccess }: SitemapStatusProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [urlCount, setUrlCount] = useState<number | null>(null);
  const { toast } = useToast();

  const regenerateSitemap = async () => {
    setIsRegenerating(true);
    try {
      const response = await fetch('/api/sitemap/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to regenerate sitemap');
      }
      
      const data = await response.json();
      setLastUpdate(new Date());
      setUrlCount(data.urls);
      
      toast({
        title: 'Sitemap atualizado',
        description: `${data.urls} URLs geradas com sucesso`,
      });
      
      onRegenerateSuccess?.();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar sitemap',
        description: 'Não foi possível regenerar o sitemap',
        variant: 'destructive',
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const openSitemap = () => {
    window.open('/sitemap.xml', '_blank');
  };

  const openRobots = () => {
    window.open('/robots.txt', '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          SEO & Sitemap
        </CardTitle>
        <CardDescription>
          Gerenciamento automático de sitemap e configurações SEO
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Status do Sitemap</h4>
            <Badge variant="default" className="bg-green-100 text-green-800">
              Automático
            </Badge>
            {urlCount && (
              <p className="text-sm text-muted-foreground">
                {urlCount} URLs indexadas
              </p>
            )}
            {lastUpdate && (
              <p className="text-xs text-muted-foreground">
                Última atualização: {lastUpdate.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Funcionalidades</h4>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span>✓ Regeneração automática</span>
              <span>✓ Cache inteligente</span>
              <span>✓ URLs dinâmicas</span>
              <span>✓ Robots.txt integrado</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={regenerateSitemap}
            disabled={isRegenerating}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Regenerando...' : 'Forçar Atualização'}
          </Button>
          
          <Button onClick={openSitemap} size="sm" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver Sitemap
          </Button>
          
          <Button onClick={openRobots} size="sm" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Robots.txt
          </Button>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Atualização Automática</p>
              <p className="text-blue-700">
                O sitemap é automaticamente regenerado quando:
              </p>
              <ul className="list-disc list-inside text-blue-700 mt-1 space-y-1">
                <li>Novas imagens são adicionadas ao Instagram</li>
                <li>Conteúdo é modificado</li>
                <li>Novos programas são criados</li>
                <li>Cache expira (1 hora)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}