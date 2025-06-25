import { useState, useEffect } from 'react';
import VisualComposer from '@/components/VisualComposer';

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

interface PageData {
  pageName: string;
  elements: PageElement[];
  lastModified: string;
}

export function useVisualComposer(pageName: string) {
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem(`page_${pageName}`);
    if (savedData) {
      try {
        setPageData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading page data:', error);
      }
    }
  }, [pageName]);

  const handleSave = (data: PageData) => {
    setPageData(data);
    localStorage.setItem(`page_${pageName}`, JSON.stringify(data));
  };

  const VisualComposerComponent = () => (
    <VisualComposer 
      pageName={pageName}
      pageData={pageData}
      onSave={handleSave}
    />
  );

  return {
    pageData,
    VisualComposerComponent
  };
}