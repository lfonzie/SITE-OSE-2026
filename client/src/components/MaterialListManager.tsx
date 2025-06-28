
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Save, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MaterialList {
  id?: number;
  segment: string;
  grade: string;
  year: number;
  googleDriveUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

const MaterialListManager: React.FC = () => {
  const [materialLists, setMaterialLists] = useState<MaterialList[]>([]);
  const [newItem, setNewItem] = useState<MaterialList>({
    segment: '',
    grade: '',
    year: new Date().getFullYear(),
    googleDriveUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const segments = [
    { value: 'educacao-infantil', label: 'Educação Infantil' },
    { value: 'fundamental-1', label: 'Ensino Fundamental I' },
    { value: 'fundamental-2', label: 'Ensino Fundamental II' },
    { value: 'ensino-medio', label: 'Ensino Médio' }
  ];

  const gradesBySegment: Record<string, string[]> = {
    'educacao-infantil': ['jardim-1', 'jardim-2'],
    'fundamental-1': ['1-ano', '2-ano', '3-ano', '4-ano', '5-ano'],
    'fundamental-2': ['6-ano', '7-ano', '8-ano', '9-ano'],
    'ensino-medio': ['1-serie', '2-serie', '3-serie']
  };

  const gradeLabels: Record<string, string> = {
    'jardim-1': 'Jardim I',
    'jardim-2': 'Jardim II',
    '1-ano': '1º Ano',
    '2-ano': '2º Ano',
    '3-ano': '3º Ano',
    '4-ano': '4º Ano',
    '5-ano': '5º Ano',
    '6-ano': '6º Ano',
    '7-ano': '7º Ano',
    '8-ano': '8º Ano',
    '9-ano': '9º Ano',
    '1-serie': '1ª Série',
    '2-serie': '2ª Série',
    '3-serie': '3ª Série'
  };

  useEffect(() => {
    fetchMaterialLists();
  }, []);

  const fetchMaterialLists = async () => {
    try {
      const response = await fetch('/api/material-lists');
      if (response.ok) {
        const data = await response.json();
        setMaterialLists(data);
      }
    } catch (error) {
      console.error('Error fetching material lists:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar listas de material",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    if (!newItem.segment || !newItem.grade || !newItem.googleDriveUrl) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/material-lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newItem,
          googleDriveLink: newItem.googleDriveUrl  // Enviar como googleDriveLink para compatibilidade
        }),
      });

      if (response.ok) {
        const saved = await response.json();
        setMaterialLists([...materialLists, saved]);
        setNewItem({
          segment: '',
          grade: '',
          year: new Date().getFullYear(),
          googleDriveUrl: ''
        });
        toast({
          title: "Sucesso",
          description: "Lista de material salva com sucesso!"
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving material list:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar lista de material",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/material-lists/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMaterialLists(materialLists.filter(item => item.id !== id));
        toast({
          title: "Sucesso",
          description: "Lista de material removida com sucesso!"
        });
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting material list:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover lista de material",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (id: number, updatedItem: Partial<MaterialList>) => {
    try {
      const response = await fetch(`/api/material-lists/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updated = await response.json();
        setMaterialLists(materialLists.map(item => 
          item.id === id ? updated : item
        ));
        toast({
          title: "Sucesso",
          description: "Lista de material atualizada com sucesso!"
        });
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating material list:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar lista de material",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Material List */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Lista de Material</CardTitle>
          <CardDescription>
            Configure o link do Google Drive para uma nova lista de material
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Segmento</label>
              <select
                value={newItem.segment}
                onChange={(e) => setNewItem({...newItem, segment: e.target.value, grade: ''})}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Selecione...</option>
                {segments.map(segment => (
                  <option key={segment.value} value={segment.value}>
                    {segment.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Série/Ano</label>
              <select
                value={newItem.grade}
                onChange={(e) => setNewItem({...newItem, grade: e.target.value})}
                className="w-full p-2 border rounded-md"
                disabled={!newItem.segment}
              >
                <option value="">Selecione...</option>
                {newItem.segment && gradesBySegment[newItem.segment]?.map(grade => (
                  <option key={grade} value={grade}>
                    {gradeLabels[grade]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ano</label>
              <Input
                type="number"
                value={newItem.year}
                onChange={(e) => setNewItem({...newItem, year: parseInt(e.target.value)})}
                min={2020}
                max={2030}
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                {loading ? 'Salvando...' : 'Adicionar'}
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link do Google Drive</label>
            <Input
              value={newItem.googleDriveUrl}
              onChange={(e) => setNewItem({...newItem, googleDriveUrl: e.target.value})}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Existing Material Lists */}
      <Card>
        <CardHeader>
          <CardTitle>Listas de Material Configuradas</CardTitle>
          <CardDescription>
            Gerencie os links existentes das listas de material
          </CardDescription>
        </CardHeader>
        <CardContent>
          {materialLists.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              Nenhuma lista de material configurada ainda.
            </p>
          ) : (
            <div className="space-y-4">
              {materialLists.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {segments.find(s => s.value === item.segment)?.label}
                      </Badge>
                      <Badge variant="secondary">
                        {gradeLabels[item.grade] || item.grade}
                      </Badge>
                      <Badge variant="outline">
                        {item.year}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(item.googleDriveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Abrir
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => item.id && handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Input
                    value={item.googleDriveUrl}
                    onChange={(e) => {
                      const updated = {...item, googleDriveUrl: e.target.value};
                      setMaterialLists(materialLists.map(i => 
                        i.id === item.id ? updated : i
                      ));
                    }}
                    onBlur={() => {
                      if (item.id) {
                        handleUpdate(item.id, {googleDriveLink: item.googleDriveUrl});
                      }
                    }}
                    placeholder="Link do Google Drive"
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialListManager;
