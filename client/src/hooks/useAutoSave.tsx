import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface AutoSaveOptions {
  data: any;
  key: string;
  delay?: number; // delay in milliseconds before saving
  onSave?: (data: any) => void;
}

export function useAutoSave({ data, key, delay = 1000, onSave }: AutoSaveOptions) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef<string>('');

  useEffect(() => {
    const currentDataString = JSON.stringify(data);
    
    // Skip if data hasn't changed
    if (currentDataString === previousDataRef.current || !data) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      try {
        const saveData = {
          ...data,
          lastModified: new Date().toISOString(),
          autoSaved: true
        };

        // Save to localStorage
        localStorage.setItem(key, JSON.stringify(saveData));
        
        // Call custom save handler if provided
        if (onSave) {
          onSave(saveData);
        }

        // Show success notification (only if data has actually changed and user is authenticated)
        if (previousDataRef.current !== '' && isAuthenticated) {
          toast({
            title: "Alterações salvas automaticamente",
            description: "As modificações foram salvas com sucesso.",
            duration: 2000,
          });
        }

        previousDataRef.current = currentDataString;
      } catch (error) {
        console.error('Erro ao salvar automaticamente:', error);
        // Only show error notifications to authenticated users
        if (isAuthenticated) {
          toast({
            title: "Erro ao salvar",
            description: "Não foi possível salvar as alterações automaticamente.",
            variant: "destructive",
            duration: 3000,
          });
        }
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, key, delay, onSave, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}