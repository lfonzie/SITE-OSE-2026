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
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-school-orange hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-school-orange to-school-brown rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{testimonial.name}</h4>
                    <p className="text-school-orange text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < testimonial.rating ? "text-yellow-400 fill-current" : "text-slate-300"
                      }`}
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}