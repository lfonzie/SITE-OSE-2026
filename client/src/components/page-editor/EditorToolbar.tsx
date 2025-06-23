import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Type,
  Image,
  Square,
  Video,
  FormInput,
  Grid3X3,
  MousePointer,
  Minus,
  Plus,
  Save,
  Eye,
  Undo,
  Redo,
  Settings,
  Copy
} from "lucide-react";
import { componentTemplates, pageBuilder } from "@/lib/drag-drop-editor";
import PageImporter from "./PageImporter";

interface EditorToolbarProps {
  onAddComponent: (type: string) => void;
  onSave: () => void;
  onPreview: () => void;
}

export default function EditorToolbar({ onAddComponent, onSave, onPreview }: EditorToolbarProps) {
  const [activeTab, setActiveTab] = useState("components");

  const componentTypes = [
    { type: 'text', icon: Type, label: 'Texto', description: 'Adicionar texto editável' },
    { type: 'image', icon: Image, label: 'Imagem', description: 'Inserir imagem' },
    { type: 'button', icon: MousePointer, label: 'Botão', description: 'Botão clicável' },
    { type: 'section', icon: Square, label: 'Seção', description: 'Container para outros elementos' },
    { type: 'gallery', icon: Grid3X3, label: 'Galeria', description: 'Galeria de imagens' },
    { type: 'form', icon: FormInput, label: 'Formulário', description: 'Formulário de contato' },
    { type: 'video', icon: Video, label: 'Vídeo', description: 'Player de vídeo' },
    { type: 'spacer', icon: Minus, label: 'Espaçador', description: 'Espaço em branco' }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Editor de Páginas</h2>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={onPreview}>
              <Eye size={16} className="mr-1" />
              Visualizar
            </Button>
            <Button size="sm" onClick={onSave} className="bg-school-orange hover:bg-school-orange/90">
              <Save size={16} className="mr-1" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Undo size={16} />
          </Button>
          <Button size="sm" variant="outline">
            <Redo size={16} />
          </Button>
          <Button size="sm" variant="outline">
            <Settings size={16} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 m-4">
          <TabsTrigger value="components">Componentes</TabsTrigger>
          <TabsTrigger value="pages">Páginas</TabsTrigger>
          <TabsTrigger value="settings">Config</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>

        {/* Components Tab */}
        <TabsContent value="components" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Arrastar e Soltar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {componentTypes.map((component) => {
                const IconComponent = component.icon;
                return (
                  <div
                    key={component.type}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('component-type', component.type);
                    }}
                    onClick={() => onAddComponent(component.type)}
                    className="flex items-center p-3 border rounded-lg cursor-move hover:bg-gray-50 transition-colors"
                  >
                    <IconComponent size={20} className="text-school-orange mr-3" />
                    <div>
                      <div className="font-medium text-sm">{component.label}</div>
                      <div className="text-xs text-gray-500">{component.description}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Minhas Páginas</CardTitle>
            </CardHeader>
            <CardContent>
              <PageList />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <PageSettings />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Import/Export Tab */}
        <TabsContent value="import" className="p-4">
          <PageImporter />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PageList() {
  const [pages, setPages] = useState(pageBuilder.getAllPages());
  const currentPage = pageBuilder.getCurrentPage();

  const handleCreatePage = () => {
    const name = prompt('Nome da nova página:');
    if (name) {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      pageBuilder.createPage(name, slug);
      setPages(pageBuilder.getAllPages());
    }
  };

  const handleSelectPage = (pageId: string) => {
    pageBuilder.setCurrentPage(pageId);
    setPages(pageBuilder.getAllPages()); // Force update
  };

  const handleDuplicatePage = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const page = pageBuilder.getPage(pageId);
    if (page) {
      const newName = `${page.name} (Cópia)`;
      const newSlug = `${page.slug}-copia`;
      const newPage = pageBuilder.createPage(newName, newSlug);
      
      // Copy components
      page.components.forEach(component => {
        const newComponent = {
          ...component,
          id: 'comp_' + Math.random().toString(36).substr(2, 9)
        };
        const currentPageData = pageBuilder.getCurrentPage();
        if (currentPageData && currentPageData.id === newPage.id) {
          currentPageData.components.push(newComponent);
        }
      });
      
      setPages(pageBuilder.getAllPages());
    }
  };

  const predefinedPages = [
    { name: 'Página Inicial', slug: 'home', description: 'Homepage principal' },
    { name: 'Sobre Nós', slug: 'sobre', description: 'História da escola' },
    { name: 'Programas', slug: 'programas', description: 'Cursos oferecidos' },
    { name: 'Contato', slug: 'contato', description: 'Informações de contato' }
  ];

  return (
    <div className="space-y-2">
      <Button 
        onClick={handleCreatePage}
        className="w-full bg-school-orange hover:bg-school-orange/90"
        size="sm"
      >
        <Plus size={16} className="mr-2" />
        Nova Página
      </Button>

      <div className="text-xs text-gray-500 mt-4 mb-2">Páginas Sugeridas:</div>
      {predefinedPages.map((template) => (
        <Button
          key={template.slug}
          variant="outline"
          size="sm"
          className="w-full justify-start text-left"
          onClick={() => {
            const existing = pages.find(p => p.slug === template.slug);
            if (existing) {
              handleSelectPage(existing.id);
            } else {
              const newPage = pageBuilder.createPage(template.name, template.slug);
              pageBuilder.setCurrentPage(newPage.id);
              setPages(pageBuilder.getAllPages());
            }
          }}
        >
          <div>
            <div className="font-medium text-sm">{template.name}</div>
            <div className="text-xs text-gray-500">{template.description}</div>
          </div>
        </Button>
      ))}
      
      {pages.length > 0 && (
        <>
          <div className="text-xs text-gray-500 mt-4 mb-2">Suas Páginas:</div>
          {pages.map((page) => (
            <div
              key={page.id}
              onClick={() => handleSelectPage(page.id)}
              className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                currentPage?.id === page.id ? 'border-school-orange bg-orange-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">{page.name}</div>
                  <div className="text-xs text-gray-500">/{page.slug}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {page.status === 'published' ? '🟢 Publicado' : '🟡 Rascunho'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {page.components.length} componentes
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleDuplicatePage(page.id, e)}
                  className="h-6 w-6 p-0"
                >
                  <Copy size={12} />
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function PageSettings() {
  const currentPage = pageBuilder.getCurrentPage();

  if (!currentPage) {
    return (
      <div className="text-center text-gray-500 text-sm">
        Selecione uma página para configurar
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Título da Página
        </label>
        <input
          type="text"
          defaultValue={currentPage.seo.title}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          onChange={(e) => {
            pageBuilder.updateComponent(currentPage.id, {
              ...currentPage,
              seo: { ...currentPage.seo, title: e.target.value }
            } as any);
          }}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          defaultValue={currentPage.seo.description}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          onChange={(e) => {
            pageBuilder.updateComponent(currentPage.id, {
              ...currentPage,
              seo: { ...currentPage.seo, description: e.target.value }
            } as any);
          }}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          defaultValue={currentPage.status}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          onChange={(e) => {
            pageBuilder.updateComponent(currentPage.id, {
              ...currentPage,
              status: e.target.value as 'draft' | 'published'
            } as any);
          }}
        >
          <option value="draft">Rascunho</option>
          <option value="published">Publicado</option>
        </select>
      </div>
    </div>
  );
}