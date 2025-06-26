import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Link, Download, Edit, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface MaterialList {
  id: number;
  segment: string;
  grade: string;
  year: number;
  googleDriveLink: string | null;
  fileName: string | null;
  updatedAt: string;
}

interface MaterialListManagerProps {
  segment: string;
  grades: string[];
}

export default function MaterialListManager({ segment, grades }: MaterialListManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MaterialList | null>(null);
  const [formData, setFormData] = useState({
    grade: '',
    year: new Date().getFullYear() + 1,
    googleDriveLink: '',
    fileName: ''
  });

  const queryClient = useQueryClient();

  const { data: materialLists = [] } = useQuery({
    queryKey: ['/api/material-lists', segment],
    queryFn: async () => {
      const response = await fetch(`/api/material-lists/${segment}`);
      return response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/material-lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/material-lists'] });
      setIsDialogOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const response = await fetch(`/api/material-lists/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/material-lists'] });
      setIsDialogOpen(false);
      resetForm();
      setEditingItem(null);
    }
  });

  const resetForm = () => {
    setFormData({
      grade: '',
      year: new Date().getFullYear() + 1,
      googleDriveLink: '',
      fileName: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      segment,
      grade: formData.grade,
      year: formData.year,
      googleDriveLink: formData.googleDriveLink || null,
      fileName: formData.fileName || null
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (item: MaterialList) => {
    setEditingItem(item);
    setFormData({
      grade: item.grade,
      year: item.year,
      googleDriveLink: item.googleDriveLink || '',
      fileName: item.fileName || ''
    });
    setIsDialogOpen(true);
  };

  const gradeKey = (grade: string) => {
    return grade.toLowerCase()
      .replace('º', '')
      .replace('ª', '')
      .replace(' ', '')
      .replace('jardim', 'jardim')
      .replace('série', 'serie');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Gerenciar Listas - {segment}</h4>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); resetForm(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Lista
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar Lista' : 'Adicionar Nova Lista'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="grade">Série/Ano</Label>
                <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a série" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem key={gradeKey(grade)} value={gradeKey(grade)}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">Ano Letivo</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  min={2024}
                  max={2030}
                />
              </div>

              <div>
                <Label htmlFor="googleDriveLink">Link do Google Drive</Label>
                <Input
                  id="googleDriveLink"
                  type="url"
                  value={formData.googleDriveLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, googleDriveLink: e.target.value }))}
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <Label htmlFor="fileName">Nome do Arquivo (opcional)</Label>
                <Input
                  id="fileName"
                  value={formData.fileName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fileName: e.target.value }))}
                  placeholder="Lista_Material_1ano_2026.pdf"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingItem ? 'Atualizar' : 'Criar'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {materialLists.map((item: MaterialList) => (
          <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h5 className="font-medium">{item.grade} - {item.year}</h5>
              {item.fileName && <p className="text-sm text-gray-600">{item.fileName}</p>}
              <p className="text-xs text-gray-400">
                Atualizado em {new Date(item.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="flex gap-2">
              {item.googleDriveLink && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(item.googleDriveLink!, '_blank')}
                >
                  <Link className="w-4 h-4 mr-1" />
                  Drive
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {materialLists.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma lista cadastrada para este segmento
          </div>
        )}
      </div>
    </div>
  );
}