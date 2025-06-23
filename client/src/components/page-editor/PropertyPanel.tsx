import { useState, useEffect } from "react";
import { EditorComponent } from "@/lib/drag-drop-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Layout, Type, Link } from "lucide-react";

interface PropertyPanelProps {
  selectedComponent: EditorComponent | null;
  onUpdate: (id: string, updates: Partial<EditorComponent>) => void;
}

export default function PropertyPanel({ selectedComponent, onUpdate }: PropertyPanelProps) {
  const [localComponent, setLocalComponent] = useState<EditorComponent | null>(selectedComponent);

  useEffect(() => {
    setLocalComponent(selectedComponent);
  }, [selectedComponent]);

  if (!selectedComponent || !localComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 h-full p-4">
        <div className="text-center text-gray-500 mt-8">
          <Layout size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="font-medium mb-2">Nenhum componente selecionado</h3>
          <p className="text-sm">Clique em um componente para editar suas propriedades</p>
        </div>
      </div>
    );
  }

  const handleStyleUpdate = (property: string, value: string) => {
    const updatedComponent = {
      ...localComponent,
      styles: {
        ...localComponent.styles,
        [property]: value
      }
    };
    setLocalComponent(updatedComponent);
    onUpdate(selectedComponent.id, updatedComponent);
  };

  const handleContentUpdate = (property: string, value: any) => {
    const updatedComponent = {
      ...localComponent,
      content: {
        ...localComponent.content,
        [property]: value
      }
    };
    setLocalComponent(updatedComponent);
    onUpdate(selectedComponent.id, updatedComponent);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 capitalize">
          Editar {localComponent.type}
        </h3>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 m-4">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Type size={16} className="mr-2" />
                Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ContentEditor component={localComponent} onUpdate={handleContentUpdate} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Style Tab */}
        <TabsContent value="style" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Palette size={16} className="mr-2" />
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StyleEditor component={localComponent} onUpdate={handleStyleUpdate} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Layout size={16} className="mr-2" />
                Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <LayoutEditor component={localComponent} onUpdate={handleStyleUpdate} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ContentEditor({ 
  component, 
  onUpdate 
}: { 
  component: EditorComponent; 
  onUpdate: (property: string, value: any) => void;
}) {
  switch (component.type) {
    case 'text':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="text-content">Texto</Label>
            <Textarea
              id="text-content"
              value={component.content.text || ''}
              onChange={(e) => onUpdate('text', e.target.value)}
              placeholder="Digite seu texto aqui..."
              rows={4}
            />
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="image-src">URL da Imagem</Label>
            <Input
              id="image-src"
              value={component.content.src || ''}
              onChange={(e) => onUpdate('src', e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <div>
            <Label htmlFor="image-alt">Texto Alternativo</Label>
            <Input
              id="image-alt"
              value={component.content.alt || ''}
              onChange={(e) => onUpdate('alt', e.target.value)}
              placeholder="Descrição da imagem"
            />
          </div>
          <div>
            <Label htmlFor="image-caption">Legenda</Label>
            <Input
              id="image-caption"
              value={component.content.caption || ''}
              onChange={(e) => onUpdate('caption', e.target.value)}
              placeholder="Legenda opcional"
            />
          </div>
        </div>
      );

    case 'button':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="button-text">Texto do Botão</Label>
            <Input
              id="button-text"
              value={component.content.text || ''}
              onChange={(e) => onUpdate('text', e.target.value)}
              placeholder="Clique aqui"
            />
          </div>
          <div>
            <Label htmlFor="button-link">Link</Label>
            <Input
              id="button-link"
              value={component.content.link || ''}
              onChange={(e) => onUpdate('link', e.target.value)}
              placeholder="https://exemplo.com"
            />
          </div>
          <div>
            <Label htmlFor="button-target">Abrir em</Label>
            <Select 
              value={component.content.target || '_self'} 
              onValueChange={(value) => onUpdate('target', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_self">Mesma janela</SelectItem>
                <SelectItem value="_blank">Nova janela</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case 'section':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="section-title">Título da Seção</Label>
            <Input
              id="section-title"
              value={component.content.title || ''}
              onChange={(e) => onUpdate('title', e.target.value)}
              placeholder="Nova Seção"
            />
          </div>
        </div>
      );

    default:
      return (
        <div className="text-sm text-gray-500">
          Nenhuma opção de conteúdo disponível para este componente.
        </div>
      );
  }
}

function StyleEditor({ 
  component, 
  onUpdate 
}: { 
  component: EditorComponent; 
  onUpdate: (property: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Colors */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Cores</h4>
        <div>
          <Label htmlFor="bg-color">Cor de Fundo</Label>
          <div className="flex space-x-2">
            <Input
              id="bg-color"
              type="color"
              value={component.styles.backgroundColor || '#ffffff'}
              onChange={(e) => onUpdate('backgroundColor', e.target.value)}
              className="w-12 h-8 p-1"
            />
            <Input
              value={component.styles.backgroundColor || ''}
              onChange={(e) => onUpdate('backgroundColor', e.target.value)}
              placeholder="#ffffff"
              className="flex-1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="text-color">Cor do Texto</Label>
          <div className="flex space-x-2">
            <Input
              id="text-color"
              type="color"
              value={component.styles.color || '#000000'}
              onChange={(e) => onUpdate('color', e.target.value)}
              className="w-12 h-8 p-1"
            />
            <Input
              value={component.styles.color || ''}
              onChange={(e) => onUpdate('color', e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      {(component.type === 'text' || component.type === 'button') && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Tipografia</h4>
          <div>
            <Label htmlFor="font-size">Tamanho da Fonte</Label>
            <Select 
              value={component.styles.fontSize || '16px'} 
              onValueChange={(value) => onUpdate('fontSize', value)}
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
                <SelectItem value="48px">48px</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="text-align">Alinhamento</Label>
            <Select 
              value={component.styles.textAlign || 'left'} 
              onValueChange={(value) => onUpdate('textAlign', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Border Radius */}
      <div>
        <Label htmlFor="border-radius">Borda Arredondada</Label>
        <Select 
          value={component.styles.borderRadius || '0px'} 
          onValueChange={(value) => onUpdate('borderRadius', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0px">Sem arredondamento</SelectItem>
            <SelectItem value="4px">Pequeno (4px)</SelectItem>
            <SelectItem value="8px">Médio (8px)</SelectItem>
            <SelectItem value="12px">Grande (12px)</SelectItem>
            <SelectItem value="24px">Muito grande (24px)</SelectItem>
            <SelectItem value="50%">Circular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function LayoutEditor({ 
  component, 
  onUpdate 
}: { 
  component: EditorComponent; 
  onUpdate: (property: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Spacing */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Espaçamento</h4>
        <div>
          <Label htmlFor="padding">Padding Interno</Label>
          <Select 
            value={component.styles.padding || '0px'} 
            onValueChange={(value) => onUpdate('padding', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0px">Nenhum</SelectItem>
              <SelectItem value="8px">Pequeno (8px)</SelectItem>
              <SelectItem value="16px">Médio (16px)</SelectItem>
              <SelectItem value="24px">Grande (24px)</SelectItem>
              <SelectItem value="32px">Muito grande (32px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="margin">Margin Externa</Label>
          <Select 
            value={component.styles.margin || '0px'} 
            onValueChange={(value) => onUpdate('margin', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0px">Nenhuma</SelectItem>
              <SelectItem value="8px">Pequena (8px)</SelectItem>
              <SelectItem value="16px">Média (16px)</SelectItem>
              <SelectItem value="24px">Grande (24px)</SelectItem>
              <SelectItem value="32px">Muito grande (32px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}