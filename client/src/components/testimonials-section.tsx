import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-school-blue to-blue-700 text-white">
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
    <section className="py-20 bg-gradient-to-br from-school-blue to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O que dizem sobre nós
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Depoimentos de pais, alunos e ex-alunos que fazem parte da nossa história
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-orange-100 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-white object-cover" 
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-orange-200 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
