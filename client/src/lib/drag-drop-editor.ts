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

// Drag and Drop Manager
export class DragDropManager {
  private draggedElement: HTMLElement | null = null;
  private dropZones: HTMLElement[] = [];
  private onComponentMove?: (componentId: string, newParent?: string, index?: number) => void;

  constructor(onMove?: typeof this.onComponentMove) {
    this.onComponentMove = onMove;
    this.initializeDragDrop();
  }

  private initializeDragDrop() {
    document.addEventListener('dragstart', this.handleDragStart.bind(this));
    document.addEventListener('dragover', this.handleDragOver.bind(this));
    document.addEventListener('drop', this.handleDrop.bind(this));
    document.addEventListener('dragend', this.handleDragEnd.bind(this));
  }

  private handleDragStart(e: DragEvent) {
    this.draggedElement = e.target as HTMLElement;
    if (this.draggedElement?.dataset.componentId) {
      e.dataTransfer?.setData('text/plain', this.draggedElement.dataset.componentId);
      this.draggedElement.style.opacity = '0.5';
    }
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    const dropZone = (e.target as HTMLElement).closest('[data-drop-zone]');
    if (dropZone) {
      dropZone.classList.add('drag-over');
    }
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    const componentId = e.dataTransfer?.getData('text/plain');
    const dropZone = (e.target as HTMLElement).closest('[data-drop-zone]');
    
    if (componentId && dropZone) {
      const parentId = dropZone.dataset.parentId;
      const index = parseInt(dropZone.dataset.index || '0');
      this.onComponentMove?.(componentId, parentId, index);
    }

    // Clean up visual feedback
    document.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
  }

  private handleDragEnd() {
    if (this.draggedElement) {
      this.draggedElement.style.opacity = '1';
      this.draggedElement = null;
    }
    
    document.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
  }

  registerDropZone(element: HTMLElement) {
    element.setAttribute('data-drop-zone', 'true');
    this.dropZones.push(element);
  }

  unregisterDropZone(element: HTMLElement) {
    element.removeAttribute('data-drop-zone');
    this.dropZones = this.dropZones.filter(zone => zone !== element);
  }
}

// Page Builder State Management
export class PageBuilder {
  private pages: Map<string, PageStructure> = new Map();
  private currentPage: string | null = null;
  private dragDropManager: DragDropManager;
  private listeners: Array<() => void> = [];

  constructor() {
    this.dragDropManager = new DragDropManager(this.moveComponent.bind(this));
    this.loadFromStorage();
  }

  // Page Management
  createPage(name: string, slug: string): PageStructure {
    const page: PageStructure = {
      id: this.generateId(),
      name,
      slug,
      components: [],
      seo: {
        title: name,
        description: '',
        keywords: ''
      },
      status: 'draft',
      lastModified: new Date()
    };
    
    this.pages.set(page.id, page);
    this.saveToStorage();
    this.notifyListeners();
    return page;
  }

  getPage(id: string): PageStructure | undefined {
    return this.pages.get(id);
  }

  getAllPages(): PageStructure[] {
    return Array.from(this.pages.values());
  }

  setCurrentPage(id: string) {
    this.currentPage = id;
    this.notifyListeners();
  }

  getCurrentPage(): PageStructure | undefined {
    return this.currentPage ? this.pages.get(this.currentPage) : undefined;
  }

  // Component Management
  addComponent(type: EditorComponent['type'], parentId?: string): EditorComponent {
    const template = componentTemplates.find(t => t.type === type);
    const component: EditorComponent = {
      id: this.generateId(),
      type,
      content: template?.content || {},
      styles: template?.styles || {},
      position: template?.position || { x: 0, y: 0, width: 100, height: 'auto' as any },
      parent: parentId,
      children: []
    };

    const page = this.getCurrentPage();
    if (page) {
      page.components.push(component);
      if (parentId) {
        const parent = page.components.find(c => c.id === parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(component.id);
        }
      }
      page.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
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