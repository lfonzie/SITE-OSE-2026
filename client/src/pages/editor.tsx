import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { pageBuilder, EditorComponent } from "@/lib/drag-drop-editor";
import { updateSEO } from "@/lib/seo";
import EditorToolbar from "@/components/page-editor/EditorToolbar";
import DraggableComponent from "@/components/page-editor/DraggableComponent";
import PropertyPanel from "@/components/page-editor/PropertyPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smartphone, Tablet, Monitor } from "lucide-react";

export default function Editor() {
  const [, setLocation] = useLocation();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [components, setComponents] = useState<EditorComponent[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    updateSEO({
      title: "Editor de Páginas - Colégio OSE",
      description: "Editor visual drag and drop para criação de páginas",
      keywords: "editor, cms, página builder"
    });

    // Initialize page builder listener
    const updateComponents = () => {
      const currentPage = pageBuilder.getCurrentPage();
      if (currentPage) {
        setComponents([...currentPage.components]);
      }
    };

    pageBuilder.addListener(updateComponents);
    updateComponents();

    return () => {
      pageBuilder.removeListener(updateComponents);
    };
  }, []);

  const handleAddComponent = useCallback((type: string) => {
    const component = pageBuilder.addComponent(type as any);
    setSelectedComponent(component.id);
    setForceUpdate(prev => prev + 1);
  }, []);

  const handleUpdateComponent = useCallback((id: string, updates: Partial<EditorComponent>) => {
    pageBuilder.updateComponent(id, updates);
    setForceUpdate(prev => prev + 1);
  }, []);

  const handleDeleteComponent = useCallback((id: string) => {
    pageBuilder.deleteComponent(id);
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
    setForceUpdate(prev => prev + 1);
  }, [selectedComponent]);

  const handleSelectComponent = useCallback((id: string) => {
    setSelectedComponent(id);
  }, []);

  const handleSave = useCallback(() => {
    // Auto-save is handled by pageBuilder
    alert('Página salva com sucesso!');
  }, []);

  const handlePreview = useCallback(() => {
    setPreviewMode(!previewMode);
  }, [previewMode]);

  const handleDropOnCanvas = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('component-type');
    const componentId = e.dataTransfer.getData('component-id');

    if (componentType) {
      // Adding new component
      handleAddComponent(componentType);
    } else if (componentId) {
      // Moving existing component
      // This would be handled by the DragDropManager
    }
  }, [handleAddComponent]);

  const currentPage = pageBuilder.getCurrentPage();
  const selectedComponentData = selectedComponent 
    ? components.find(c => c.id === selectedComponent) 
    : null;

  const getDeviceClass = () => {
    switch (deviceMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'w-full';
    }
  };

  if (!currentPage) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bem-vindo ao Editor</h2>
          <p className="text-gray-600 mb-6">Crie uma nova página para começar</p>
          <Button 
            onClick={() => {
              const name = prompt('Nome da página:');
              if (name) {
                const slug = name.toLowerCase().replace(/\s+/g, '-');
                const newPage = pageBuilder.createPage(name, slug);
                pageBuilder.setCurrentPage(newPage.id);
                setForceUpdate(prev => prev + 1);
              }
            }}
            className="bg-school-orange hover:bg-school-orange/90"
          >
            Criar Nova Página
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Toolbar */}
      {!previewMode && (
        <EditorToolbar 
          onAddComponent={handleAddComponent}
          onSave={handleSave}
          onPreview={handlePreview}
        />
      )}

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="font-semibold text-gray-800">{currentPage.name}</h1>
              <p className="text-sm text-gray-500">/{currentPage.slug}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Device Mode Toggles */}
            <div className="flex items-center border rounded-lg">
              <Button
                variant={deviceMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceMode('desktop')}
                className="rounded-r-none"
              >
                <Monitor size={16} />
              </Button>
              <Button
                variant={deviceMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceMode('tablet')}
                className="rounded-none border-x"
              >
                <Tablet size={16} />
              </Button>
              <Button
                variant={deviceMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceMode('mobile')}
                className="rounded-l-none"
              >
                <Smartphone size={16} />
              </Button>
            </div>

            <Button
              variant={previewMode ? 'default' : 'outline'}
              size="sm"
              onClick={handlePreview}
            >
              {previewMode ? 'Sair da Prévia' : 'Prévia'}
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-4">
          <div 
            className={`min-h-full bg-white rounded-lg shadow-sm transition-all duration-300 ${getDeviceClass()}`}
            onDrop={handleDropOnCanvas}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => setSelectedComponent(null)}
          >
            <div className="p-4">
              {components.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <div className="text-lg font-medium mb-2">Página vazia</div>
                  <div className="text-sm">Arraste componentes da barra lateral para começar</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {components
                    .filter(component => !component.parent) // Only root components
                    .map((component) => (
                      <DraggableComponent
                        key={component.id}
                        component={component}
                        isSelected={selectedComponent === component.id}
                        onSelect={handleSelectComponent}
                        onUpdate={handleUpdateComponent}
                        onDelete={handleDeleteComponent}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Property Panel */}
      {!previewMode && (
        <PropertyPanel
          selectedComponent={selectedComponentData || null}
          onUpdate={handleUpdateComponent}
        />
      )}
    </div>
  );
}