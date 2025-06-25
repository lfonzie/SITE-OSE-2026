import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Edit3, 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Layout, 
  Save,
  Eye,
  Undo,
  Settings,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import InlineImageSelector from './InlineImageSelector';

interface VisualComposerProps {
  pageName: string;
  pageData?: any;
  onSave?: (data: any) => void;
}

interface PageElement {
  id: string;
  type: 'text' | 'image' | 'section' | 'button';
  content: string;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
  };
  position: {
    x: number;
    y: number;
    width: string;
    height: string;
  };
}

export default function VisualComposer({ pageName, pageData, onSave }: VisualComposerProps) {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('elements');
  const [elements, setElements] = useState<PageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Initialize with existing page data
  useEffect(() => {
    if (pageData && pageData.elements) {
      setElements(pageData.elements);
    }
  }, [pageData]);

  if (!isAuthenticated) {
    return null;
  }

  const addElement = (type: PageElement['type']) => {
    const newElement: PageElement = {
      id: `element_${Date.now()}`,
      type,
      content: type === 'text' ? 'Novo texto' : type === 'button' ? 'Novo botão' : '',
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        fontSize: '16px',
        fontWeight: 'normal',
        padding: '10px',
        margin: '0px',
        borderRadius: '8px'
      },
      position: {
        x: 50,
        y: 50,
        width: '300px',
        height: 'auto'
      }
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<PageElement>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const handleSave = () => {
    const pageData = {
      pageName,
      elements,
      lastModified: new Date().toISOString()
    };
    
    // Save to localStorage for now
    localStorage.setItem(`page_${pageName}`, JSON.stringify(pageData));
    
    if (onSave) {
      onSave(pageData);
    }
    
    setIsOpen(false);
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <>
      {/* Floating Editor Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 bg-school-orange hover:bg-school-orange/90 text-white shadow-lg"
            size="lg"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            Editor Visual
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Editor Visual - {pageName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex h-[70vh]">
            {/* Left Panel - Tools */}
            <div className="w-80 border-r bg-slate-50 p-4 overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="elements">Elementos</TabsTrigger>
                  <TabsTrigger value="styles">Estilos</TabsTrigger>
                  <TabsTrigger value="settings">Config</TabsTrigger>
                </TabsList>
                
                <TabsContent value="elements" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Adicionar Elementos</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addElement('text')}
                        className="flex items-center gap-2"
                      >
                        <Type className="w-4 h-4" />
                        Texto
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addElement('image')}
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Imagem
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addElement('section')}
                        className="flex items-center gap-2"
                      >
                        <Layout className="w-4 h-4" />
                        Seção
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addElement('button')}
                        className="flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Botão
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Elementos na Página</Label>
                    <div className="space-y-2">
                      {elements.map((element) => (
                        <Card
                          key={element.id}
                          className={`cursor-pointer transition-colors ${
                            selectedElement === element.id ? 'border-school-orange' : ''
                          }`}
                          onClick={() => setSelectedElement(element.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {element.type} - {element.content.substring(0, 20)}...
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteElement(element.id);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="styles" className="space-y-4">
                  {selectedElementData ? (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Conteúdo</Label>
                        {selectedElementData.type === 'text' || selectedElementData.type === 'button' ? (
                          <Textarea
                            value={selectedElementData.content}
                            onChange={(e) => updateElement(selectedElementData.id, { content: e.target.value })}
                            placeholder="Digite o conteúdo..."
                          />
                        ) : selectedElementData.type === 'image' ? (
                          <InlineImageSelector
                            currentImage={selectedElementData.content}
                            onImageSelect={(url) => updateElement(selectedElementData.id, { content: url })}
                            className="w-full h-32 border rounded"
                          />
                        ) : null}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Cor de Fundo</Label>
                          <Input
                            type="color"
                            value={selectedElementData.styles.backgroundColor || '#ffffff'}
                            onChange={(e) => updateElement(selectedElementData.id, {
                              styles: { ...selectedElementData.styles, backgroundColor: e.target.value }
                            })}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Cor do Texto</Label>
                          <Input
                            type="color"
                            value={selectedElementData.styles.textColor || '#000000'}
                            onChange={(e) => updateElement(selectedElementData.id, {
                              styles: { ...selectedElementData.styles, textColor: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Tamanho da Fonte</Label>
                          <Select
                            value={selectedElementData.styles.fontSize || '16px'}
                            onValueChange={(value) => updateElement(selectedElementData.id, {
                              styles: { ...selectedElementData.styles, fontSize: value }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12px">12px</SelectItem>
                              <SelectItem value="14px">14px</SelectItem>
                              <SelectItem value="16px">16px</SelectItem>
                              <SelectItem value="18px">18px</SelectItem>
                              <SelectItem value="20px">20px</SelectItem>
                              <SelectItem value="24px">24px</SelectItem>
                              <SelectItem value="32px">32px</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Peso da Fonte</Label>
                          <Select
                            value={selectedElementData.styles.fontWeight || 'normal'}
                            onValueChange={(value) => updateElement(selectedElementData.id, {
                              styles: { ...selectedElementData.styles, fontWeight: value }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="bold">Negrito</SelectItem>
                              <SelectItem value="lighter">Leve</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Padding</Label>
                        <Input
                          value={selectedElementData.styles.padding || '10px'}
                          onChange={(e) => updateElement(selectedElementData.id, {
                            styles: { ...selectedElementData.styles, padding: e.target.value }
                          })}
                          placeholder="ex: 10px 20px"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-slate-500">Selecione um elemento para editar os estilos</p>
                  )}
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Configurações da Página</Label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={previewMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreviewMode(!previewMode)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {previewMode ? 'Sair do Preview' : 'Preview'}
                        </Button>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-600 mb-2">
                          Total de elementos: {elements.length}
                        </p>
                        <p className="text-sm text-slate-600">
                          Última modificação: {new Date().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Panel - Preview */}
            <div className="flex-1 bg-white overflow-auto">
              <div className="p-4 border-b bg-slate-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Preview da Página</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Undo className="w-4 h-4 mr-2" />
                      Desfazer
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="bg-school-orange hover:bg-school-orange/90"
                      size="sm"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 min-h-96 relative">
                {elements.length === 0 ? (
                  <div className="text-center text-slate-500 mt-20">
                    <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum elemento adicionado ainda.</p>
                    <p className="text-sm">Use o painel à esquerda para adicionar elementos à página.</p>
                  </div>
                ) : (
                  elements.map((element) => (
                    <div
                      key={element.id}
                      className={`absolute cursor-pointer transition-all ${
                        selectedElement === element.id ? 'ring-2 ring-school-orange' : ''
                      }`}
                      style={{
                        left: element.position.x,
                        top: element.position.y,
                        width: element.position.width,
                        height: element.position.height,
                        backgroundColor: element.styles.backgroundColor,
                        color: element.styles.textColor,
                        fontSize: element.styles.fontSize,
                        fontWeight: element.styles.fontWeight,
                        padding: element.styles.padding,
                        margin: element.styles.margin,
                        borderRadius: element.styles.borderRadius,
                      }}
                      onClick={() => setSelectedElement(element.id)}
                    >
                      {element.type === 'text' && (
                        <div dangerouslySetInnerHTML={{ __html: element.content }} />
                      )}
                      {element.type === 'image' && element.content && (
                        <img 
                          src={element.content} 
                          alt="Elemento de imagem" 
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                      {element.type === 'button' && (
                        <button className="px-4 py-2 rounded bg-school-orange text-white hover:bg-school-orange/90">
                          {element.content}
                        </button>
                      )}
                      {element.type === 'section' && (
                        <div className="w-full h-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                          <span className="text-slate-500">Seção: {element.content}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}