import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Settings, RotateCcw } from "lucide-react";

interface DragImagePositionProps {
  src: string;
  alt: string;
  className?: string;
  onPositionChange?: (position: { x: number; y: number }) => void;
  initialPosition?: { x: number; y: number };
  editable?: boolean;
}

export default function DragImagePosition({
  src,
  alt,
  className = "",
  onPositionChange,
  initialPosition = { x: 0, y: 0 },
  editable = false
}: DragImagePositionProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; startX: number; startY: number }>({ x: 0, y: 0, startX: 0, startY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!editable) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: position.x,
      startY: position.y
    };
  }, [editable, position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !editable) return;
    
    e.preventDefault();
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // Limit movement to reasonable bounds (-50% to +50%)
    const newX = Math.max(-50, Math.min(50, dragStartRef.current.startX + deltaX * 0.5));
    const newY = Math.max(-50, Math.min(50, dragStartRef.current.startY + deltaY * 0.5));
    
    const newPosition = { x: newX, y: newY };
    setPosition(newPosition);
    onPositionChange?.(newPosition);
  }, [isDragging, editable, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const resetPosition = () => {
    const newPosition = { x: 0, y: 0 };
    setPosition(newPosition);
    onPositionChange?.(newPosition);
  };

  const objectPosition = `${50 + position.x}% ${50 + position.y}%`;

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => editable && setShowControls(true)}
      onMouseLeave={() => !isDragging && setShowControls(false)}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-200 ${
          editable ? 'cursor-grab' : ''
        } ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          objectPosition,
          userSelect: 'none',
          pointerEvents: editable ? 'auto' : 'none'
        }}
        onMouseDown={handleMouseDown}
        draggable={false}
      />
      
      {/* Position Indicator */}
      {editable && isDragging && (
        <div className="absolute top-2 left-2 bg-black/75 text-white px-2 py-1 rounded text-xs">
          X: {position.x.toFixed(0)}% Y: {position.y.toFixed(0)}%
        </div>
      )}
      
      {/* Edit Controls */}
      {editable && showControls && !isDragging && (
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={resetPosition}
            title="Resetar posição"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {/* Drag Instruction */}
      {editable && showControls && !isDragging && (
        <div className="absolute bottom-2 left-2 bg-black/75 text-white px-2 py-1 rounded text-xs">
          Clique e arraste para posicionar
        </div>
      )}
    </div>
  );
}