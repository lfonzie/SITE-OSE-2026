import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Save, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MaterialListManagerProps {
  segment: string;
  grades: string[];
}

export default function MaterialListManager({ segment, grades }: MaterialListManagerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const currentYear = new Date().getFullYear() + 1; // Next school year
  
  const [newLinks, setNewLinks] = useState<{ [key: string]: string }>({});

  const { data: materialLists = [] } = useQuery({
    queryKey: ['/api/material-lists', segment],
    queryFn: async () => {
      const response = await fetch(`/api/material-lists?segment=${segment}`);
      return response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: { segment: string; grade: string; year: number; googleDriveLink: string }) => {
      const response = await fetch('/api/material-lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/material-lists'] });
      toast({
        title: "Link salvo",
        description: "Link do Google Drive salvo com sucesso!"
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao salvar link do Google Drive.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number; googleDriveLink: string }) => {
      const response = await fetch(`/api/material-lists/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/material-lists'] });
      toast({
        title: "Link atualizado",
        description: "Link do Google Drive atualizado com sucesso!"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/material-lists/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/material-lists'] });
      toast({
        title: "Link removido",
        description: "Link do Google Drive removido com sucesso!"
      });
    }
  });

  const handleSaveLink = (grade: string) => {
    const link = newLinks[grade];
    if (!link) return;

    const existingList = materialLists.find((list: any) => 
      list.segment === segment && list.grade === grade && list.year === currentYear
    );

    if (existingList) {
      updateMutation.mutate({
        id: existingList.id,
        googleDriveLink: link
      });
    } else {
      createMutation.mutate({
        segment,
        grade,
        year: currentYear,
        googleDriveLink: link
      });
    }

    setNewLinks(prev => ({ ...prev, [grade]: '' }));
  };

  const getExistingLink = (grade: string) => {
    const existing = materialLists.find((list: any) => 
      list.segment === segment && list.grade === grade && list.year === currentYear
    );
    return existing?.googleDriveLink || '';
  };

  const getExistingId = (grade: string) => {
    const existing = materialLists.find((list: any) => 
      list.segment === segment && list.grade === grade && list.year === currentYear
    );
    return existing?.id;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {segment.charAt(0).toUpperCase() + segment.slice(1)} - {currentYear}
        </CardTitle>
        <CardDescription>
          Gerenciar links do Google Drive para listas de material
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {grades.map((grade) => {
          const existingLink = getExistingLink(grade);
          const existingId = getExistingId(grade);
          
          return (
            <div key={grade} className="space-y-2">
              <Label className="text-sm font-medium">
                {grade.charAt(0).toUpperCase() + grade.slice(1)}
              </Label>
              
              {existingLink ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800 truncate">
                      {existingLink}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(existingLink, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => existingId && deleteMutation.mutate(existingId)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="https://drive.google.com/..."
                    value={newLinks[grade] || ''}
                    onChange={(e) => setNewLinks(prev => ({ 
                      ...prev, 
                      [grade]: e.target.value 
                    }))}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSaveLink(grade)}
                    disabled={!newLinks[grade] || createMutation.isPending}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}