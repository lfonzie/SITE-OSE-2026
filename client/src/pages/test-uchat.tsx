
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";

export default function TestUChat() {
  const [widgetStatus, setWidgetStatus] = useState("Carregando...");
  const [logs, setLogs] = useState<string[]>([]);
  const [widgetFound, setWidgetFound] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev.slice(-9), logEntry]);
    console.log(logEntry);
  };

  const checkUChatWidget = () => {
    const selectors = [
      '[id*="uchat"]',
      '[class*="uchat"]', 
      '[id*="chat"]',
      '[class*="chat"]',
      '.uchat-widget',
      '#uchat-widget',
      'iframe[src*="uchat"]',
      'iframe[src*="widget"]'
    ];
    
    let found = false;
    let details: string[] = [];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        found = true;
        elements.forEach((el, index) => {
          const styles = window.getComputedStyle(el);
          details.push(`${selector}[${index}]: display=${styles.display}, visibility=${styles.visibility}, zIndex=${styles.zIndex}`);
        });
      }
    });
    
    if (found) {
      setWidgetStatus(`✅ Widget encontrado! (${details.length} elementos)`);
      setWidgetFound(true);
      addLog(`UChatWidget encontrado: ${details.join(', ')}`);
    } else {
      setWidgetStatus("❌ Widget não encontrado");
      setWidgetFound(false);
      addLog('UChatWidget não encontrado no DOM');
    }
    
    return found;
  };

  const forceWidgetCheck = () => {
    addLog('Verificação manual iniciada...');
    checkUChatWidget();
  };

  const createFallbackWidget = () => {
    addLog('Criando widget fallback manual...');
    
    // Remove fallback existente
    const existing = document.getElementById('manual-fallback-widget');
    if (existing) existing.remove();
    
    const fallbackWidget = document.createElement('div');
    fallbackWidget.id = 'manual-fallback-widget';
    fallbackWidget.innerHTML = `
      <a href="https://wa.me/5515021013812" target="_blank" 
         style="position: fixed; bottom: 80px; right: 20px; background: #25D366; color: white; padding: 15px; border-radius: 50px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 999999; font-size: 16px;">
          💬 Fallback
      </a>
    `;
    document.body.appendChild(fallbackWidget);
  };

  useEffect(() => {
    addLog('Página de teste UChatWidget iniciada');
    
    // Verificação inicial após 2 segundos
    setTimeout(() => {
      checkUChatWidget();
    }, 2000);
    
    // Verificação periódica a cada 5 segundos
    const interval = setInterval(checkUChatWidget, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Teste UChatWidget - Colégio OSE
        </h1>
        
        {/* Status Widget */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Status do Widget</h2>
          <div className={`p-3 rounded ${widgetFound ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {widgetStatus}
          </div>
        </div>

        {/* Controles */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Controles de Teste</h2>
          <div className="flex gap-4 flex-wrap">
            <Button onClick={forceWidgetCheck} className="bg-blue-500 hover:bg-blue-600">
              🔍 Verificar Widget
            </Button>
            <Button onClick={createFallbackWidget} className="bg-orange-500 hover:bg-orange-600">
              🛠️ Criar Fallback
            </Button>
            <Button 
              onClick={() => window.open('https://wa.me/5515021013812', '_blank')}
              className="bg-green-500 hover:bg-green-600"
            >
              💬 WhatsApp Direto
            </Button>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Logs do Sistema</h2>
          <div className="bg-gray-100 p-3 rounded max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">Nenhum log ainda...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-sm font-mono mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Informações */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Informações de Diagnóstico</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Checklist:</h3>
              <ul className="space-y-1 text-sm">
                <li>✅ Script UChatWidget carregado globalmente</li>
                <li className={widgetFound ? "text-green-600" : "text-red-600"}>
                  {widgetFound ? "✅" : "❌"} Widget visível no DOM
                </li>
                <li>🔍 Widget funcionalmente ativo</li>
                <li>🔍 Posicionamento correto</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Possíveis Problemas:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Bloqueador de anúncios</li>
                <li>• JavaScript desabilitado</li>
                <li>• Problemas de CSP (Content Security Policy)</li>
                <li>• Conflitos com outros scripts</li>
                <li>• Problema no servidor do UChatWidget</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> O UChatWidget é carregado globalmente no index.html. 
              Se não aparecer aqui, pode haver um problema de configuração ou bloqueio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
