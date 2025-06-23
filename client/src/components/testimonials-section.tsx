import { useQuery } from "@tanstack/react-query";
import { Star, Users } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
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
    <section id="testimonials" className="py-20 bg-gradient-to-r from-school-orange/10 to-school-brown/10">
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
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center">
                  <Users className="text-school-orange" size={24} />
                </div>
                <div className="flex justify-center mb-4">
                  <div className="flex text-school-orange">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 mb-6 italic text-center">"{testimonial.content}"</p>
              <div className="text-center">
                <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                <p className="text-school-orange text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
