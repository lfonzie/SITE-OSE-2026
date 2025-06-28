
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Upload, Camera } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface Professor {
  id: number;
  nome: string;
  disciplina: string;
  formacao: string;
  experiencia: string;
  sobre: string;
  foto: string;
}

export default function ProfessoresManager() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProfessores();
  }, []);

  const loadProfessores = async () => {
    try {
      const response = await fetch('/api/professores');
      if (response.ok) {
        const data = await response.json();
        setProfessores(data);
      }
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    }
  };

  const saveProfessor = async (professor: Omit<Professor, 'id'> | Professor) => {
    try {
      const method = 'id' in professor ? 'PUT' : 'POST';
      const url = 'id' in professor ? `/api/professores/${professor.id}` : '/api/professores';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professor),
      });

      if (response.ok) {
        await loadProfessores();
        setIsDialogOpen(false);
        setEditingProfessor(null);
        toast({
          title: "Professor salvo",
          description: "Os dados foram atualizados com sucesso.",
        });
      } else {
        throw new Error('Erro ao salvar professor');
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar os dados do professor.",
        variant: "destructive",
      });
    }
  };

  const deleteProfessor = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este professor?')) return;

    try {
      const response = await fetch(`/api/professores/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadProfessores();
        toast({
          title: "Professor removido",
          description: "O professor foi removido com sucesso.",
        });
      } else {
        throw new Error('Erro ao remover professor');
      }
    } catch (error) {
      toast({
        title: "Erro ao remover",
        description: "Ocorreu um erro ao remover o professor.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfessor) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const timestamp = Date.now();
      const extension = file.name.split('.').pop() || 'jpg';
      const fileName = `professor_${editingProfessor.nome.replace(/\s+/g, '_')}_${timestamp}.${extension}`;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);

      const response = await fetch('/api/upload-professor-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      const result = await response.json();
      const newImageUrl = `/images/${fileName}`;
      setEditingProfessor(prev => prev ? { ...prev, foto: newImageUrl } : null);

      toast({
        title: "Foto atualizada!",
        description: "A nova foto foi carregada com sucesso.",
      });

      e.target.value = '';
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar a foto.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const openEditDialog = (professor?: Professor) => {
    if (professor) {
      setEditingProfessor({ ...professor });
    } else {
      setEditingProfessor({
        id: 0,
        nome: '',
        disciplina: '',
        formacao: '',
        experiencia: '',
        sobre: '',
        foto: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfessor) return;

    if (editingProfessor.id === 0) {
      const { id, ...professorData } = editingProfessor;
      saveProfessor(professorData);
    } else {
      saveProfessor(editingProfessor);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gerenciar Professores</h3>
          <p className="text-sm text-gray-600">
            Adicione, edite ou remova professores do corpo docente
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openEditDialog()}
              className="bg-school-orange hover:bg-school-orange/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Professor
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProfessor?.id === 0 ? 'Adicionar Professor' : 'Editar Professor'}
              </DialogTitle>
            </DialogHeader>
            
            {editingProfessor && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Foto */}
                <div className="space-y-2">
                  <Label>Foto do Professor</Label>
                  <div className="flex items-center space-x-4">
                    {editingProfessor.foto && (
                      <OptimizedImage
                        src={editingProfessor.foto}
                        alt="Foto do professor"
                        className="w-20 h-20 rounded-full object-cover border-2 border-school-orange"
                        onError={(e) => {
                          console.error('Erro ao carregar imagem:', editingProfessor.foto);
                          e.currentTarget.src = '/images/horizontal_1.png'; // Imagem padrão
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="mb-2"
                      />
                      <p className="text-xs text-gray-500">
                        {uploading ? 'Enviando...' : 'Selecione uma foto para o professor'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={editingProfessor.nome}
                    onChange={(e) => setEditingProfessor(prev => 
                      prev ? { ...prev, nome: e.target.value } : null
                    )}
                    placeholder="Nome completo do professor"
                    required
                  />
                </div>

                {/* Disciplina */}
                <div className="space-y-2">
                  <Label htmlFor="disciplina">Disciplina</Label>
                  <Input
                    id="disciplina"
                    value={editingProfessor.disciplina}
                    onChange={(e) => setEditingProfessor(prev => 
                      prev ? { ...prev, disciplina: e.target.value } : null
                    )}
                    placeholder="Disciplina que leciona"
                    required
                  />
                </div>

                {/* Formação */}
                <div className="space-y-2">
                  <Label htmlFor="formacao">Formação</Label>
                  <Input
                    id="formacao"
                    value={editingProfessor.formacao}
                    onChange={(e) => setEditingProfessor(prev => 
                      prev ? { ...prev, formacao: e.target.value } : null
                    )}
                    placeholder="Formação acadêmica"
                    required
                  />
                </div>

                {/* Experiência */}
                <div className="space-y-2">
                  <Label htmlFor="experiencia">Experiência</Label>
                  <Input
                    id="experiencia"
                    value={editingProfessor.experiencia}
                    onChange={(e) => setEditingProfessor(prev => 
                      prev ? { ...prev, experiencia: e.target.value } : null
                    )}
                    placeholder="Tempo de experiência"
                    required
                  />
                </div>

                {/* Sobre */}
                <div className="space-y-2">
                  <Label htmlFor="sobre">Sobre</Label>
                  <Textarea
                    id="sobre"
                    value={editingProfessor.sobre}
                    onChange={(e) => setEditingProfessor(prev => 
                      prev ? { ...prev, sobre: e.target.value } : null
                    )}
                    placeholder="Breve descrição sobre o professor"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-school-orange hover:bg-school-orange/90">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Professores */}
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {professores.map((professor) => (
            <Card key={professor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <OptimizedImage
                    src={professor.foto || '/images/horizontal_1.png'}
                    alt={professor.nome}
                    className="w-12 h-12 rounded-full object-cover border-2 border-school-orange"
                    onError={(e) => {
                      console.error('Erro ao carregar imagem do professor:', professor.foto);
                      e.currentTarget.src = '/images/horizontal_1.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold truncate">
                      {professor.nome}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {professor.disciplina}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs text-gray-600">
                  <p><strong>Formação:</strong> {professor.formacao}</p>
                  <p><strong>Experiência:</strong> {professor.experiencia}</p>
                  <p className="line-clamp-2">{professor.sobre}</p>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(professor)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteProfessor(professor.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      {professores.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum professor cadastrado ainda.</p>
          <p className="text-sm">Clique em "Adicionar Professor" para começar.</p>
        </div>
      )}
    </div>
  );
}
