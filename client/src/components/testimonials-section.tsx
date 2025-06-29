import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@shared/schema";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useAuth } from '@/contexts/AuthContext';
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import { usePageData } from '@/hooks/usePageData';
import { apiRequest } from '@/lib/queryClient';

export default function TestimonialsSection() {
  const { isAuthenticated } = useAuth();
  const { getImagePosition, updateImagePosition } = usePageData('Testimonials');
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Testimonial> }) => {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update testimonial');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-school-brown to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-white/20 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-brown mb-4">
            O que dizem sobre a OSE
          </h2>
          <p className="text-xl text-school-brown max-w-3xl mx-auto">
            Depoimentos de pais, alunos e ex-alunos que fazem parte da nossa história
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <AnimatedCard key={testimonial.id} className="backdrop-blur-lg bg-white/20 border border-white/30 p-8 rounded-2xl shadow-xl shadow-black/10 hover:shadow-2xl hover:bg-white/30 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 mr-4">
                  <DragImagePosition
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    editable={isAuthenticated}
                    initialPosition={{
                      x: getImagePosition(`testimonial-${testimonial.id}`)?.horizontalPosition || 0,
                      y: getImagePosition(`testimonial-${testimonial.id}`)?.verticalPosition || 0
                    }}
                    onPositionChange={(position: { x: number; y: number }) => {
                      const currentPos = getImagePosition(`testimonial-${testimonial.id}`) || {
                        objectPosition: 'center center',
                        horizontalPosition: 0,
                        verticalPosition: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'none',
                        objectFit: 'cover' as const
                      };
                      updateImagePosition(`testimonial-${testimonial.id}`, {
                        ...currentPos,
                        objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                        horizontalPosition: position.x,
                        verticalPosition: position.y
                      });
                    }}
                  />
                  {isAuthenticated && (
                    <>
                      <EnhancedImageSelector
                        currentImage={testimonial.image}
                        onImageSelect={(url) => {
                          updateTestimonialMutation.mutate({
                            id: testimonial.id,
                            updates: { image: url }
                          });
                        }}
                        className="absolute -top-2 -right-2 z-10"
                      />
                      <ImagePositionControls
                        currentPosition={getImagePosition(`testimonial-${testimonial.id}`)}
                        onPositionChange={(position) => updateImagePosition(`testimonial-${testimonial.id}`, position)}
                        className="absolute inset-0"
                      />
                    </>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                  <p className="text-slate-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`${i < testimonial.rating ? "text-yellow-400" : "text-slate-300"}`}
                    size={20}
                  />
                ))}
              </div>
              <div className="relative">
                <Quote className="absolute -top-4 -left-2 text-slate-400" size={24} />
                <p className="text-slate-700 italic leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}