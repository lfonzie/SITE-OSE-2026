// Visual Drag & Drop Editor System

export interface EditorComponent {
  id: string;
  type: 'text' | 'image' | 'button' | 'section' | 'gallery' | 'form' | 'video' | 'spacer';
  content: any;
  styles: {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    textAlign?: 'left' | 'center' | 'right';
    borderRadius?: string;
  };
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  parent?: string;
  children?: string[];
}

export interface PageStructure {
  id: string;
  name: string;
  slug: string;
  components: EditorComponent[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  status: 'draft' | 'published';
  lastModified: Date;
}

// Component Templates
export const componentTemplates: Partial<EditorComponent>[] = [
  {
    type: 'text',
    content: { text: 'Clique para editar este texto' },
    styles: { fontSize: '16px', color: '#333' }
  },
  {
    type: 'image',
    content: { src: '', alt: 'Imagem', caption: '' },
    styles: { borderRadius: '8px' }
  },
  {
    type: 'button',
    content: { text: 'Botão', link: '#', target: '_self' },
    styles: { 
      backgroundColor: '#ff7f00', 
      color: 'white', 
      padding: '12px 24px',
      borderRadius: '6px'
    }
  },
  {
    type: 'section',
    content: { title: 'Nova Seção' },
    styles: { 
      backgroundColor: '#f8f9fa',
      padding: '40px 20px'
    }
  },
  {
    type: 'gallery',
    content: { images: [], columns: 3 },
    styles: { padding: '20px' }
  },
  {
    type: 'form',
    content: { 
      fields: [
        { type: 'text', name: 'name', label: 'Nome', required: true },
        { type: 'email', name: 'email', label: 'Email', required: true }
      ],
      submitText: 'Enviar'
    },
    styles: { padding: '20px' }
  },
  {
    type: 'video',
    content: { src: '', title: 'Vídeo' },
    styles: { borderRadius: '8px' }
  },
  {
    type: 'spacer',
    content: {},
    styles: {},
    position: { x: 0, y: 0, width: 100, height: 40 }
  }
];

// Simplified Drag and Drop Manager
export class DragDropManager {
  private draggedElement: HTMLElement | null = null;

  constructor() {
    // Simplified initialization
  }

  handleDragStart(componentId: string) {
    // Simple drag start handler
  }

  handleDrop(componentId: string, targetId?: string) {
    // Simple drop handler
  }
}

// Simplified Page Builder
export class PageBuilder {
  private pages: Map<string, PageStructure> = new Map();
  private currentPage: string | null = null;

  constructor() {
    // Simplified constructor
  }

  // Basic page management methods
  getAllPages(): PageStructure[] {
    return [];
  }

  getCurrentPage(): PageStructure | undefined {
    return undefined;
  }

  addComponent(type: string): void {
    // Simplified add component
  }

  updateComponent(id: string, updates: any): void {
    // Simplified update component
  }

    return component;
  }

  updateComponent(id: string, updates: Partial<EditorComponent>) {
    const page = this.getCurrentPage();
    if (page) {
      const componentIndex = page.components.findIndex(c => c.id === id);
      if (componentIndex !== -1) {
        page.components[componentIndex] = { ...page.components[componentIndex], ...updates };
        page.lastModified = new Date();
        this.saveToStorage();
        this.notifyListeners();
      }
    }
  }

  deleteComponent(id: string) {
    const page = this.getCurrentPage();
    if (page) {
      // Remove from parent's children
      const component = page.components.find(c => c.id === id);
      if (component?.parent) {
        const parent = page.components.find(c => c.id === component.parent);
        if (parent?.children) {
          parent.children = parent.children.filter(childId => childId !== id);
        }
      }

      // Remove component and its children
      page.components = page.components.filter(c => c.id !== id && c.parent !== id);
      page.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  moveComponent(componentId: string, newParent?: string, index?: number) {
    const page = this.getCurrentPage();
    if (page) {
      const component = page.components.find(c => c.id === componentId);
      if (component) {
        // Remove from old parent
        if (component.parent) {
          const oldParent = page.components.find(c => c.id === component.parent);
          if (oldParent?.children) {
            oldParent.children = oldParent.children.filter(id => id !== componentId);
          }
        }

        // Add to new parent
        component.parent = newParent;
        if (newParent) {
          const parent = page.components.find(c => c.id === newParent);
          if (parent) {
            parent.children = parent.children || [];
            if (index !== undefined) {
              parent.children.splice(index, 0, componentId);
            } else {
              parent.children.push(componentId);
            }
          }
        }

        page.lastModified = new Date();
        this.saveToStorage();
        this.notifyListeners();
      }
    }
  }

  // Utility Methods
  private generateId(): string {
    return 'comp_' + Math.random().toString(36).substr(2, 9);
  }

  private saveToStorage() {
    const data = Array.from(this.pages.entries());
    localStorage.setItem('pageBuilder_pages', JSON.stringify(data));
  }

  private loadFromStorage() {
    try {
      const data = localStorage.getItem('pageBuilder_pages');
      if (data) {
        const entries = JSON.parse(data);
        this.pages = new Map(entries);
      }
    } catch (error) {
      console.error('Erro ao carregar páginas do storage:', error);
    }
  }

  // Event Listeners
  addListener(callback: () => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: () => void) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback());
  }

  // Export/Import
  exportPage(id: string): string {
    const page = this.pages.get(id);
    return page ? JSON.stringify(page, null, 2) : '';
  }

  importPage(data: string): boolean {
    try {
      const page: PageStructure = JSON.parse(data);
      page.id = this.generateId(); // Generate new ID to avoid conflicts
      this.pages.set(page.id, page);
      this.saveToStorage();
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Erro ao importar página:', error);
      return false;
    }
  }
}

// Global instance
export const pageBuilder = new PageBuilder();