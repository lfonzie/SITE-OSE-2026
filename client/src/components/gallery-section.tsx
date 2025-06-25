import { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Importando as novas imagens organizadas
import { newImages } from "@/lib/image-verification";

const galeriaImagens = [
  { src: newImages.img1, alt: "Atividades pedagógicas da OSE", categoria: "Ensino" },
  { src: newImages.img2, alt: "Espaços de aprendizagem modernos", categoria: "Estrutura" },
  { src: newImages.img3, alt: "Vida escolar e convivência", categoria: "Convivência" },
  { src: newImages.img4, alt: "Laboratórios e tecnologia", categoria: "Tecnologia" },
  { src: newImages.img5, alt: "Atividades esportivas", categoria: "Esportes" },
  { src: newImages.img6, alt: "Eventos e celebrações", categoria: "Eventos" },
  { src: newImages.img7, alt: "Projetos educacionais", categoria: "Projetos" },
  { src: newImages.img8, alt: "Momentos especiais da OSE", categoria: "Tradição" }
];

const categorias = ["Todas", "Ensino", "Estrutura", "Convivência", "Tecnologia", "Esportes", "Eventos", "Projetos", "Tradição"];

export default function GallerySection() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [imagemSelecionada, setImagemSelecionada] = useState<number | null>(null);

  const imagensFiltradas = categoriaAtiva === "Todas" 
    ? galeriaImagens 
    : galeriaImagens.filter(img => img.categoria === categoriaAtiva);

  const abrirModal = (index: number) => {
    const indexReal = galeriaImagens.findIndex(img => img === imagensFiltradas[index]);
    setImagemSelecionada(indexReal);
  };

  const proximaImagem = () => {
    if (imagemSelecionada !== null) {
      setImagemSelecionada((imagemSelecionada + 1) % galeriaImagens.length);
    }
  };

  const imagemAnterior = () => {
    if (imagemSelecionada !== null) {
      setImagemSelecionada(
        imagemSelecionada === 0 ? galeriaImagens.length - 1 : imagemSelecionada - 1
      );
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Nossa <span className="text-school-orange">Galeria</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Momentos especiais, espaços inspiradores e a vida vibrante que acontece todos os dias na OSE
          </p>

          {/* Filtros por categoria */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={categoriaAtiva === categoria ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoriaAtiva(categoria)}
                className={categoriaAtiva === categoria 
                  ? "bg-school-orange hover:bg-school-orange/90" 
                  : "hover:bg-school-orange hover:text-white"
                }
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de imagens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {imagensFiltradas.map((imagem, index) => (
            <div key={index} className="group cursor-pointer">
              <OptimizedImage
                src={imagem.src}
                alt={imagem.alt}
                className="w-full h-64 rounded-lg shadow-lg group-hover:shadow-xl 
                         transition-all duration-300 group-hover:scale-105"
                onClick={() => abrirModal(index)}
              />
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 bg-school-orange/10 text-school-orange 
                               text-sm font-medium rounded-full">
                  {imagem.categoria}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para visualização ampliada */}
        <Dialog open={imagemSelecionada !== null} onOpenChange={() => setImagemSelecionada(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
            {imagemSelecionada !== null && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setImagemSelecionada(null)}
                >
                  <X size={20} />
                </Button>

                <OptimizedImage
                  src={galeriaImagens[imagemSelecionada].src}
                  alt={galeriaImagens[imagemSelecionada].alt}
                  className="w-full h-[80vh]"
                />

                {/* Navegação */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 
                           bg-black/50 text-white hover:bg-black/70"
                  onClick={imagemAnterior}
                >
                  <ChevronLeft size={24} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           bg-black/50 text-white hover:bg-black/70"
                  onClick={proximaImagem}
                >
                  <ChevronRight size={24} />
                </Button>

                {/* Informações da imagem */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                  <h3 className="font-semibold">{galeriaImagens[imagemSelecionada].alt}</h3>
                  <p className="text-sm opacity-90">{galeriaImagens[imagemSelecionada].categoria}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}