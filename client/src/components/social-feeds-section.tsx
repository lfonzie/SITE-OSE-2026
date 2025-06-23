import { useEffect, useState } from "react";
import { Camera, Users } from "lucide-react";
import { getInstagramFeed, type InstagramPost } from "@/lib/social-feeds";

export default function SocialFeedsSection() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getInstagramFeed();
        setInstagramPosts(posts);
      } catch (error) {
        console.error('Erro ao carregar feed do Instagram:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Acompanhe Nossas <span className="text-school-orange">Redes Sociais</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Fique por dentro do dia a dia escolar, eventos e conquistas dos nossos alunos
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <Camera className="text-school-orange mr-3" size={32} />
            <h3 className="text-2xl font-bold text-slate-800">@colegioose</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center">
              <Camera className="text-school-orange" size={32} />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center">
              <Camera className="text-school-orange" size={32} />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center">
              <Camera className="text-school-orange" size={32} />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center">
              <Camera className="text-school-orange" size={32} />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center md:block hidden">
              <Camera className="text-school-orange" size={32} />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center md:block hidden">
              <Camera className="text-school-orange" size={32} />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center md:block hidden">
              <Camera className="text-school-orange" size={32} />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center md:block hidden">
              <Camera className="text-school-orange" size={32} />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-slate-600 mb-4">
              Acompanhe o dia a dia dos nossos alunos e eventos especiais
            </p>
            <a 
              href="https://instagram.com/colegioose" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-school-orange text-white px-6 py-2 rounded-full hover:bg-school-orange/90 transition-colors"
            >
              Siga @colegioose
            </a>
          </div>
        </div>

        {/* Social Media CTAs */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center">
            <Camera size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Instagram</h3>
            <p className="mb-4">Acompanhe o dia a dia dos nossos alunos</p>
            <a 
              href="https://instagram.com/colegioose" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Seguir @colegioose
            </a>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
            <Users size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Facebook</h3>
            <p className="mb-4">Novidades e comunicados oficiais</p>
            <a 
              href="https://facebook.com/colegioose" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Curtir Página
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}