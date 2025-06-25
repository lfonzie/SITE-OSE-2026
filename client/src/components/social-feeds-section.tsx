import { useState, useEffect } from "react";
import { Camera, Users } from "lucide-react";
import { getInstagramFeed, type InstagramPost } from "@/lib/social-feeds";

export default function SocialFeedsSection() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [instagramImages, setInstagramImages] = useState([
    "/images/0312_1750717790204.jpg",
    "/images/0354_1750717790205.jpg",
    "/images/0581_1750717790206.jpg",
    "/images/0700_1750717790204.jpg",
    "/images/0905_1750717790206.jpg",
    "/images/0934_1750717790206.jpg",
    "/images/1068_1750717790205.jpg",
    "/images/1105_1750717790206.jpg"
  ]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("instagram_posts");
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      if (posts.length > 0) {
        const adminImages = posts.map((post: any) => post.imageUrl);
        setInstagramImages(adminImages);
      }
    }
  }, []);

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

          {instagramPosts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {instagramPosts.slice(0, 8).map((post, index) => (
                <a 
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all"
                  style={{ display: index >= 4 ? 'none' : 'block' }}
                >
                  <img 
                    src={post.media_url}
                    alt={post.caption.split(' ').slice(0, 5).join(' ')}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Camera className="text-white" size={24} />
                  </div>
                </a>
              ))}
              {/* Mostrar mais posts em desktop */}
              {instagramPosts.slice(4, 8).map((post, index) => (
                <a 
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all hidden md:block"
                >
                  <img 
                    src={post.media_url}
                    alt={post.caption.split(' ').slice(0, 5).join(' ')}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Camera className="text-white" size={24} />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center"
                  style={{ display: index >= 4 ? 'none' : 'flex' }}
                >
                  <Camera className="text-school-orange" size={32} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <p className="text-slate-600 mb-2">
              📸 Feed em tempo real do Instagram @colegioose
            </p>
            <p className="text-slate-500 text-sm mb-4">
              Acompanhe o dia a dia dos nossos alunos, eventos especiais e conquistas da família OSE
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a 
                href="https://instagram.com/colegioose" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-school-orange text-white px-6 py-2 rounded-full hover:bg-school-orange/90 transition-colors"
              >
                Siga @colegioose
              </a>
              <span className="text-slate-400 text-sm">
                {instagramPosts.length > 0 ? `${instagramPosts.length} posts recentes` : 'Carregando posts...'}
              </span>
            </div>
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