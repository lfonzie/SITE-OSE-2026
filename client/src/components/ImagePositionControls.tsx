import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, RotateCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ImagePositionControlsProps {
  currentPosition?: ImagePosition;
  onPositionChange: (position: ImagePosition) => void;
  className?: string;
}

export interface ImagePosition {
  objectPosition: string; // CSS object-position
  horizontalPosition: number; // Horizontal position (-100 to 100)
  verticalPosition: number; // Vertical position (-100 to 100)
  scale: number; // Scale factor (1 = 100%)
  opacity: number; // Opacity (0-1)
  filter: string; // CSS filter
  objectFit: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
}

const defaultPosition: ImagePosition = {
  objectPosition: 'center center',
  horizontalPosition: 0,
  verticalPosition: 0,
  scale: 1,
  opacity: 1,
  filter: 'none',
  objectFit: 'cover'
};

const positionPresets = [
  { label: 'Centro', value: 'center center' },
  { label: 'Topo', value: 'center top' },
  { label: 'Topo Esquerda', value: 'left top' },
  { label: 'Topo Direita', value: 'right top' },
  { label: 'Centro Esquerda', value: 'left center' },
  { label: 'Centro Direita', value: 'right center' },
  { label: 'Base', value: 'center bottom' },
  { label: 'Base Esquerda', value: 'left bottom' },
  { label: 'Base Direita', value: 'right bottom' },
];

const filterPresets = [
  { label: 'Nenhum', value: 'none' },
  { label: 'Sépia', value: 'sepia(0.5)' },
  { label: 'Preto e Branco', value: 'grayscale(1)' },
  { label: 'Desfoque Suave', value: 'blur(1px)' },
  { label: 'Brilho +', value: 'brightness(1.2)' },
  { label: 'Brilho -', value: 'brightness(0.8)' },
  { label: 'Contraste +', value: 'contrast(1.2)' },
  { label: 'Saturação +', value: 'saturate(1.3)' },
];

export default function ImagePositionControls({ 
  currentPosition = defaultPosition, 
  onPositionChange, 
  className = '' 
}: ImagePositionControlsProps) {
  const { isAuthenticated } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [position, setPosition] = useState<ImagePosition>(currentPosition);

  if (!isAuthenticated) {
    return null;
  }

  const handlePositionUpdate = (updates: Partial<ImagePosition>) => {
    const newPosition = { ...position, ...updates };
    setPosition(newPosition);
    onPositionChange(newPosition);
  };

  const resetPosition = () => {
    setPosition(defaultPosition);
    onPositionChange(defaultPosition);
  };

  return (
    <div className={`relative ${className}`}>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="absolute top-2 left-2 z-20 bg-white/90 hover:bg-white shadow-md"
          >
            <Settings size={14} className="mr-1" />
            Posição
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Ajustar Posição da Imagem
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Position Presets */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Posição</Label>
              <Select
                value={position.objectPosition}
                onValueChange={(value) => handlePositionUpdate({ objectPosition: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {positionPresets.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Object Fit */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Ajuste</Label>
              <Select
                value={position.objectFit}
                onValueChange={(value: any) => handlePositionUpdate({ objectFit: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cobrir (Cover)</SelectItem>
                  <SelectItem value="contain">Conter (Contain)</SelectItem>
                  <SelectItem value="fill">Preencher (Fill)</SelectItem>
                  <SelectItem value="scale-down">Reduzir (Scale Down)</SelectItem>
                  <SelectItem value="none">Nenhum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Precise Positioning */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Posicionamento Preciso</Label>
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Horizontal: {position.horizontalPosition}%
                </Label>
                <Slider
                  value={[position.horizontalPosition]}
                  onValueChange={([value]) => handlePositionUpdate({ 
                    horizontalPosition: value,
                    objectPosition: `${50 + value}% ${50 + position.verticalPosition}%`
                  })}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Vertical: {position.verticalPosition}%
                </Label>
                <Slider
                  value={[position.verticalPosition]}
                  onValueChange={([value]) => handlePositionUpdate({ 
                    verticalPosition: value,
                    objectPosition: `${50 + position.horizontalPosition}% ${50 + value}%`
                  })}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Scale */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Escala: {Math.round(position.scale * 100)}%
              </Label>
              <Slider
                value={[position.scale]}
                onValueChange={([value]) => handlePositionUpdate({ scale: value })}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Opacidade: {Math.round(position.opacity * 100)}%
              </Label>
              <Slider
                value={[position.opacity]}
                onValueChange={([value]) => handlePositionUpdate({ opacity: value })}
                min={0.1}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Filtro</Label>
              <Select
                value={position.filter}
                onValueChange={(value) => handlePositionUpdate({ filter: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterPresets.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={resetPosition}
                className="flex items-center gap-2"
              >
                <RotateCcw size={14} />
                Resetar
              </Button>
              <Button
                onClick={() => setDialogOpen(false)}
                className="bg-school-orange hover:bg-school-orange/90"
              >
                Aplicar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}