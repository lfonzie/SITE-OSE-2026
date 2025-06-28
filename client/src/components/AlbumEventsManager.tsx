import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, ExternalLink, Calendar } from "lucide-react";
import type { AlbumEvent } from "@shared/schema";

interface AlbumEventForm {
  title: string;
  year: string;
  photoLink: string;
  eventDate?: string;
}

export default function AlbumEventsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AlbumEvent | null>(null);
  const [formData, setFormData] = useState<AlbumEventForm>({
    title: "",
    year: new Date().getFullYear().toString(),
    photoLink: "",
    eventDate: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query para buscar eventos
  const { data: events = [], isLoading } = useQuery<AlbumEvent[]>({
    queryKey: ["/api/album-events"],
  });

  // Mutation para criar evento
  const createMutation = useMutation({
    mutationFn: async (data: AlbumEventForm) => {
      return apiRequest("/api/album-events", {
        method: "POST",
        body: {
          title: data.title,
          year: data.year,
          photoLink: data.photoLink,
          eventDate: data.eventDate || null
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/album-events"] });
      toast({
        title: "Sucesso",
        description: "Evento criado com sucesso!",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar evento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para atualizar evento
  const updateMutation = useMutation({
    mutationFn: async (data: { id: number } & AlbumEventForm) => {
      return apiRequest(`/api/album-events/${data.id}`, {
        method: "PATCH",
        body: {
          title: data.title,
          year: data.year,
          photoLink: data.photoLink,
          eventDate: data.eventDate || null
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/album-events"] });
      toast({
        title: "Sucesso",
        description: "Evento atualizado com sucesso!",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar evento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para deletar evento
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/album-events/${id}`, {
        method: "DELETE"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/album-events"] });
      toast({
        title: "Sucesso",
        description: "Evento removido com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao remover evento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      year: new Date().getFullYear().toString(),
      photoLink: "",
      eventDate: ""
    });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (event: AlbumEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      year: event.year,
      photoLink: event.photoLink,
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : ""
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.year || !formData.photoLink) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (editingEvent) {
      updateMutation.mutate({ id: editingEvent.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este evento?")) {
      deleteMutation.mutate(id);
    }
  };

  // Organizar eventos por ano
  const eventsByYear = events.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {} as Record<string, AlbumEvent[]>);

  const sortedYears = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Gerenciar Eventos do Álbum</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Editar Evento" : "Adicionar Evento"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Evento *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: FESTA JUNINA 2025"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="year">Ano *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2025"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="photoLink">Link das Fotos *</Label>
                <Input
                  id="photoLink"
                  value={formData.photoLink}
                  onChange={(e) => setFormData({ ...formData, photoLink: e.target.value })}
                  placeholder="https://photos.app.goo.gl/..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="eventDate">Data do Evento (opcional)</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingEvent ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-amber-600 mr-2" />
                <h3 className="text-xl font-bold text-slate-800">{year}</h3>
                <span className="ml-2 text-sm text-slate-500">
                  ({eventsByYear[year].length} eventos)
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventsByYear[year].map((event) => (
                  <Card key={event.id} className="relative group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-800 flex items-start justify-between">
                        <span className="pr-2">{event.title}</span>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(event)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(event.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {event.eventDate && (
                          <p className="text-xs text-slate-500">
                            {new Date(event.eventDate).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(event.photoLink, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Ver Fotos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          
          {sortedYears.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p>Nenhum evento cadastrado ainda.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}