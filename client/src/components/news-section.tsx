import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { News } from "@shared/schema";

export default function NewsSection() {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  if (isLoading) {
    return (
      <section id="noticias" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'evento':
        return 'bg-school-blue text-white';
      case 'conquista':
        return 'bg-school-green text-white';
      case 'infraestrutura':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  return (
    <section id="noticias" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Últimas <span className="text-school-blue">Notícias</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Fique por dentro das novidades, eventos e conquistas do Colégio OSE
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news?.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden"
            >
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Badge className={`${getCategoryColor(article.category)} mr-3`}>
                    {article.category}
                  </Badge>
                  <span className="text-slate-500 text-sm">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{article.title}</h3>
                <p className="text-slate-600 mb-4">{article.excerpt}</p>
                <button className="text-school-blue font-semibold hover:underline flex items-center group">
                  Leia mais 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-school-blue hover:bg-school-blue/90 text-white">
            Ver Todas as Notícias
          </Button>
        </div>
      </div>
    </section>
  );
}
