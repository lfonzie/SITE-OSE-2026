import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface InlineTextEditorProps {
  value: string;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export function useInlineTextEditor() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const InlineTextEditor = ({
    value,
    onSave,
    multiline = false,
    className = '',
    placeholder = '',
    as = 'p',
    ...props
  }: InlineTextEditorProps & { id?: string }) => {
    const id = props.id || Math.random().toString(36);
    const isEditing = editingId === id;

    const startEditing = () => {
      setEditingId(id);
      setTempValue(value);
    };

    const saveEdit = () => {
      onSave(tempValue);
      setEditingId(null);
      toast({
        title: "Texto atualizado",
        description: "As alterações foram salvas automaticamente."
      });
    };

    const cancelEdit = () => {
      setEditingId(null);
      setTempValue('');
    };

    if (!isAuthenticated && !isEditing) {
      const Component = as;
      return <Component className={className} {...props}>{value}</Component>;
    }

    if (isEditing) {
      return (
        <div className="relative inline-block w-full">
          {multiline ? (
            <Textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder={placeholder}
              className={`${className} min-h-[100px]`}
              autoFocus
            />
          ) : (
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder={placeholder}
              className={className}
              autoFocus
            />
          )}
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={saveEdit}>
              <Save size={12} className="mr-1" />
              Salvar
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit}>
              <X size={12} className="mr-1" />
              Cancelar
            </Button>
          </div>
        </div>
      );
    }

    const Component = as;
    return (
      <div className="relative group inline-block w-full">
        <Component className={className} {...props}>
          {value}
        </Component>
        {isAuthenticated && (
          <Button
            size="sm"
            variant="outline"
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 bg-white shadow-md"
            onClick={startEditing}
          >
            <Edit size={10} />
          </Button>
        )}
      </div>
    );
  };

  return { InlineTextEditor, isEditing: !!editingId };
}