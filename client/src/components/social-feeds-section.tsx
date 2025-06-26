import { useState, useEffect } from "react";
import { Camera, Users } from "lucide-react";
import { getInstagramFeed, type InstagramPost } from "@/lib/social-feeds";
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
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
        // Carregar EXCLUSIVAMENTE imagens da pasta /IG
        const response = await fetch('/api/instagram-images');
        if (response.ok) {
          const images = await response.json();
          console.log('Imagens carregadas da pasta IG:', images);
          
          // Filtrar apenas imagens válidas e ordenar por data
          const validImages = images.filter((img: any) => 
            img.filename && img.filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)
          );
          
          const sortedImages = validImages.sort((a: any, b: any) => 
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          );
          
          const imageUrls = sortedImages.map((img: any) => `/api/images/IG/${img.filename}`);
          setInstagramImages(imageUrls.slice(0, 8)); // Máximo 8 imagens
          
          console.log('URLs das imagens do Instagram:', imageUrls);
        } else {
          console.warn('Falha ao carregar imagens da API:', response.status);
          setInstagramImages([]);
        }
      } catch (error) {
        console.error('Erro ao carregar imagens do Instagram:', error);
        setInstagramImages([]);
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

          {instagramImages.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma imagem encontrada</h3>
              <p className="text-gray-500">
                As imagens do Instagram são carregadas exclusivamente da pasta /IG
              </p>
              {isAuthenticated && (
                <p className="text-school-orange mt-2">
                  Faça upload de imagens no painel administrativo
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {instagramImages.slice(0, 8).map((imageUrl, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all relative"
                >
                  <DragImagePosition
                    src={imageUrl}
                    alt={`Foto ${index + 1} do Instagram OSE`}
                    className="w-full h-full group-hover:brightness-110 transition-all"
                    editable={isAuthenticated}
                    initialPosition={{
                      x: getImagePosition(`instagram-${index}`)?.horizontalPosition || 0,
                      y: getImagePosition(`instagram-${index}`)?.verticalPosition || 0
                    }}
                    onPositionChange={(position: { x: number; y: number }) => {
                      const currentPos = getImagePosition(`instagram-${index}`) || {
                        objectPosition: 'center center',
                        horizontalPosition: 0,
                        verticalPosition: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'none',
                        objectFit: 'cover' as const
                      };
                      updateImagePosition(`instagram-${index}`, {
                        ...currentPos,
                        objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                        horizontalPosition: position.x,
                        verticalPosition: position.y
                      });
                    }}
                  />
                  {isAuthenticated && (
                    <EnhancedImageSelector
                      currentImage={imageUrl}
                      onImageSelect={(url) => {
                        console.log(`Update Instagram image ${index} to ${url}`);
                      }}
                      className="absolute top-1 right-1 z-10 scale-75"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Camera className="text-white" size={24} />
                  </div>
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
        
      </div>
    </section>
  );
}