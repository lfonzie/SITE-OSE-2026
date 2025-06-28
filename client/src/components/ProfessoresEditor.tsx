
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Edit, Plus, Save, Trash2, Image as ImageIcon } from 'lucide-react';
import EnhancedImageSelector from './EnhancedImageSelector';

interface Professor {
  id: string;
  nome: string;
  disciplina: string;
  formacao: string;
  experiencia: string;
  foto: string;
}

const professoresDefault: Professor[] = [
  {
    id: '1',
    nome: 'Samanta Chibau Mileze',
    disciplina: 'Coordenadora Pedagógica',
    formacao: 'Pedagogia - Universidade de Sorocaba',
    experiencia: '15 anos de experiência em educação',
    foto: '/images/samanta.jpg'
  },
  {
    id: '2',
    nome: 'Fernando Silva',
    disciplina: 'Matemática e Física',
    formacao: 'Licenciatura em Matemática - USP',
    experiencia: '12 anos de experiência em ensino',
    foto: '/images/fernando.jpeg'
  },
  {
    id: '3',
    nome: 'Edna Santos',
    disciplina: 'Língua Portuguesa',
    formacao: 'Letras - PUC-SP',
    experiencia: '20 anos de experiência em educação',
    foto: '/images/edna.jpg'
  }
];

export default function ProfessoresEditor() {
  const [professores, setProfessores] = useState<Professor[]>(() => {
    const saved = localStorage.getItem('professores-data');
    return saved ? JSON.parse(saved) : professoresDefault;
  });
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const { toast } = useToast();

  const saveProfessores = (newProfessores: Professor[]) => {
    setProfessores(newProfessores);
    localStorage.setItem('professores-data', JSON.stringify(newProfessores));
    toast({
      title: "Professores atualizados",
      description: "As informações foram salvas com sucesso.",
    });
  };

  const handleSaveProfessor = (professor: Professor) => {
    if (professor.id === 'new') {
      const newId = Date.now().toString();
      const newProfessor = { ...professor, id: newId };
      saveProfessores([...professores, newProfessor]);
    } else {
      saveProfessores(professores.map(p => p.id === professor.id ? professor : p));
    }
    setEditingProfessor(null);
    setIsDialogOpen(false);
  };

  const handleDeleteProfessor = (id: string) => {
    saveProfessores(professores.filter(p => p.id !== id));
  };

  const handleEditProfessor = (professor: Professor) => {
    setEditingProfessor(professor);
    setIsDialogOpen(true);
  };

  const handleAddProfessor = () => {
    setEditingProfessor({
      id: 'new',
      nome: '',
      disciplina: '',
      formacao: '',
      experiencia: '',
      foto: ''
    });
    setIsDialogOpen(true);
  };

  const handleImageSelect = (imageUrl: string) => {
    if (editingProfessor) {
      setEditingProfessor({ ...editingProfessor, foto: imageUrl });
    }
    setShowImageSelector(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Professores</h2>
        <Button onClick={handleAddProfessor}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Professor
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professores.map((professor) => (
          <Card key={professor.id} className="overflow-hidden">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={professor.foto}
                alt={professor.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{professor.nome}</CardTitle>
              <p className="text-sm text-gray-600">{professor.disciplina}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <Label className="text-xs font-medium text-gray-500">Formação</Label>
                <p className="text-sm">{professor.formacao}</p>
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500">Experiência</Label>
                <p className="text-sm">{professor.experiencia}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditProfessor(professor)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProfessor(professor.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para editar/adicionar professor */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProfessor?.id === 'new' ? 'Adicionar Professor' : 'Editar Professor'}
            </DialogTitle>
          </DialogHeader>
          
          {editingProfessor && (
            <div className="space-y-4">
              {/* Foto */}
              <div className="space-y-2">
                <Label>Foto</Label>
                <div className="flex items-center gap-2">
                  {editingProfessor.foto && (
                    <img
                      src={editingProfessor.foto}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setShowImageSelector(true)}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Selecionar Foto
                  </Button>
                </div>
              </div>

              {/* Nome */}
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={editingProfessor.nome}
                  onChange={(e) => setEditingProfessor({
                    ...editingProfessor,
                    nome: e.target.value
                  })}
                  placeholder="Nome completo do professor"
                />
              </div>

              {/* Disciplina */}
              <div className="space-y-2">
                <Label>Disciplina</Label>
                <Input
                  value={editingProfessor.disciplina}
                  onChange={(e) => setEditingProfessor({
                    ...editingProfessor,
                    disciplina: e.target.value
                  })}
                  placeholder="Disciplina que leciona"
                />
              </div>

              {/* Formação */}
              <div className="space-y-2">
                <Label>Formação</Label>
                <Textarea
                  value={editingProfessor.formacao}
                  onChange={(e) => setEditingProfessor({
                    ...editingProfessor,
                    formacao: e.target.value
                  })}
                  placeholder="Formação acadêmica"
                  rows={2}
                />
              </div>

              {/* Experiência */}
              <div className="space-y-2">
                <Label>Experiência</Label>
                <Textarea
                  value={editingProfessor.experiencia}
                  onChange={(e) => setEditingProfessor({
                    ...editingProfessor,
                    experiencia: e.target.value
                  })}
                  placeholder="Experiência profissional"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleSaveProfessor(editingProfessor)}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Seletor de imagem */}
      {showImageSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Selecionar Foto do Professor</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowImageSelector(false)}
                >
                  Fechar
                </Button>
              </div>
              <EnhancedImageSelector
                onImageSelect={handleImageSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
