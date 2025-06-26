import { useState, useEffect } from "react";
import { Camera, Users } from "lucide-react";
import { getInstagramFeed, type InstagramPost } from "@/lib/social-feeds";
import DragImagePosition from '@/components/DragImagePosition';
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';

export default function SocialFeedsSection() {
  const { isAuthenticated } = useAuth();
  const { getImagePosition, updateImagePosition } = usePageData('Home', {});
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [instagramImages, setInstagramImages] = useState<string[]>([]);

  useEffect(() => {
    const loadInstagramImages = async () => {
      try {
        // Carregar imagens do servidor
        const response = await fetch('/api/instagram-images');
        if (response.ok) {
          const images = await response.json();
          // Ordenar por data de modificação (mais recentes primeiro)
          const sortedImages = images.sort((a: any, b: any) => 
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          );
          const imageUrls = sortedImages.map((img: any) => `/api/images/IG/${img.filename}`);
          setInstagramImages(imageUrls.slice(0, 8)); // Máximo 8 imagens
        } else {
          // Fallback para imagens padrão se API falhar
          const defaultImages = [
            "/images/1.png",
            "/images/2.png",
            "/images/3.png",
            "/images/4.png",
            "/images/5.png",
            "/images/6.png",
            "/images/7.png",
            "/images/8.png"
          ];
          setInstagramImages(defaultImages);
        }
      } catch (error) {
        console.error('Erro ao carregar imagens do Instagram:', error);
        // Usar imagens padrão em caso de erro
        const defaultImages = [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
          "/images/7.png",
          "/images/8.png"
        ];
        setInstagramImages(defaultImages);
      }
    };

    loadInstagramImages();
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {instagramImages.slice(0, 8).map((imageUrl, index) => (
              <div 
                key={index}
                className="aspect-square rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all relative"
                style={{ display: index >= 4 ? 'none' : 'block' }}
              >
                <img 
                  src={imageUrl}
                  alt={`Foto ${index + 1} do Instagram OSE`}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                  onError={(e) => {
                    console.log(`Erro ao carregar imagem: ${imageUrl}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
            ))}
            {/* Mostrar mais fotos em desktop */}
            {instagramImages.slice(4, 8).map((imageUrl, index) => (
              <div 
                key={index + 4}
                className="aspect-square rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all hidden md:block relative"
              >
                <img 
                  src={imageUrl}
                  alt={`Foto ${index + 5} do Instagram OSE`}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                  onError={(e) => {
                    console.log(`Erro ao carregar imagem: ${imageUrl}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
            ))}
            
            {/* Placeholders para slots vazios */}
            {Array.from({ length: Math.max(0, 8 - instagramImages.length) }).map((_, index) => (
              <div 
                key={`placeholder-${index}`}
                className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-school-orange/20 to-school-brown/20 flex items-center justify-center"
                style={{ display: (instagramImages.length + index) >= 4 ? 'none' : 'flex' }}
              >
                <Camera className="text-school-orange" size={32} />
              </div>
            ))}
          </div>

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