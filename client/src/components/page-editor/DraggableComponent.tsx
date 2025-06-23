import { useState, useRef } from "react";
import { EditorComponent, pageBuilder } from "@/lib/drag-drop-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Trash2, 
  Settings, 
  Move, 
  Copy,
  Eye,
  EyeOff 
} from "lucide-react";

interface DraggableComponentProps {
  component: EditorComponent;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<EditorComponent>) => void;
  onDelete: (id: string) => void;
  children?: React.ReactNode;
}

export default function DraggableComponent({
  component,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  children
}: DraggableComponentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('component-id', component.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir este componente?')) {
      onDelete(component.id);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newComponent = {
      ...component,
      id: 'comp_' + Math.random().toString(36).substr(2, 9),
      position: {
        ...component.position,
        y: component.position.y + 50
      }
    };
    // Add to page builder
    const currentPage = pageBuilder.getCurrentPage();
    if (currentPage) {
      currentPage.components.push(newComponent);
      pageBuilder.setCurrentPage(currentPage.id);
    }
  };

  return (
    <div
      ref={componentRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative min-h-[40px] cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-school-orange ring-offset-2' : ''}
        ${isHovered ? 'ring-1 ring-gray-300 ring-offset-1' : ''}
        ${isDragging ? 'opacity-50' : ''}
      `}
      style={{
        ...component.styles,
        position: 'relative'
      }}
      data-component-id={component.id}
    >
      {/* Component Toolbar */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-10 left-0 z-50 flex items-center space-x-1 bg-white border border-gray-200 rounded-md shadow-sm p-1">
          <span className="text-xs text-gray-500 px-2">{component.type}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDuplicate}
            className="h-6 w-6 p-0"
          >
            <Copy size={12} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
          >
            <Settings size={12} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 cursor-move"
          >
            <Move size={12} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 size={12} />
          </Button>
        </div>
      )}

      {/* Drop Zone Indicator */}
      <div
        className="absolute inset-0 border-2 border-dashed border-transparent transition-colors"
        data-drop-zone="true"
        data-parent-id={component.id}
      />

      {/* Component Content */}
      <div className="relative z-10">
        {children || <ComponentRenderer component={component} onUpdate={onUpdate} />}
      </div>

      {/* Resize Handles */}
      {isSelected && (
        <>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-school-orange border border-white rounded-sm cursor-se-resize" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-school-orange border border-white rounded-sm cursor-s-resize" />
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-3 bg-school-orange border border-white rounded-sm cursor-e-resize" />
        </>
      )}
    </div>
  );
}

// Component Renderer
function ComponentRenderer({ 
  component, 
  onUpdate 
}: { 
  component: EditorComponent;
  onUpdate: (id: string, updates: Partial<EditorComponent>) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (newContent: any) => {
    onUpdate(component.id, { content: newContent });
  };

  switch (component.type) {
    case 'text':
      return (
        <div
          className={isEditing ? 'border border-blue-300 rounded' : ''}
          onDoubleClick={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        >
          {isEditing ? (
            <textarea
              autoFocus
              defaultValue={component.content.text || 'Texto editável'}
              onBlur={(e) => {
                handleContentChange({ text: e.target.value });
                setIsEditing(false);
              }}
              className="w-full p-2 border-none outline-none resize-none"
              style={{ ...component.styles, backgroundColor: 'transparent' }}
            />
          ) : (
            <div
              style={component.styles}
              dangerouslySetInnerHTML={{
                __html: component.content.text || 'Clique duas vezes para editar'
              }}
            />
          )}
        </div>
      );

    case 'image':
      return (
        <div className="text-center">
          {component.content.src ? (
            <img
              src={component.content.src}
              alt={component.content.alt || 'Imagem'}
              style={component.styles}
              className="max-w-full h-auto"
            />
          ) : (
            <div
              className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              style={component.styles}
            >
              <div className="text-gray-500">
                <div className="text-sm">Clique para adicionar imagem</div>
              </div>
            </div>
          )}
          {component.content.caption && (
            <p className="text-sm text-gray-600 mt-2">{component.content.caption}</p>
          )}
        </div>
      );

    case 'button':
      return (
        <Button
          style={component.styles}
          className="inline-flex items-center justify-center"
          onClick={(e) => e.preventDefault()}
        >
          {component.content.text || 'Botão'}
        </Button>
      );

    case 'section':
      return (
        <div style={component.styles} className="min-h-[100px] border border-dashed border-gray-300 rounded">
          <div className="p-4">
            <h3 className="font-medium mb-2">{component.content.title || 'Nova Seção'}</h3>
            <div className="text-sm text-gray-500">
              Arraste componentes aqui
            </div>
          </div>
        </div>
      );

    case 'form':
      return (
        <Card style={component.styles}>
          <div className="p-4">
            <h3 className="font-medium mb-4">Formulário de Contato</h3>
            {component.content.fields?.map((field: any, index: number) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>
            ))}
            <Button className="w-full bg-school-orange hover:bg-school-orange/90">
              {component.content.submitText || 'Enviar'}
            </Button>
          </div>
        </Card>
      );

    case 'spacer':
      return (
        <div
          style={{
            height: component.position.height,
            ...component.styles
          }}
          className="bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center"
        >
          <span className="text-xs text-gray-400">Espaçador</span>
        </div>
      );

    default:
      return (
        <div className="p-4 bg-gray-100 border border-dashed border-gray-300 rounded">
          <div className="text-sm text-gray-600">
            Componente: {component.type}
          </div>
        </div>
      );
  }
}