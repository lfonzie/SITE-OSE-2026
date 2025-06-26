import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { newImages } from "@/lib/image-verification";
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';

export default function WhyOSESection() {
  const { isAuthenticated } = useAuth();
  const { 
    images, 
    updateImage, 
    getImagePosition, 
    updateImagePosition 
  } = usePageData('Why OSE Section', {
    images: [newImages.horizontal2, newImages.horizontal3, newImages.horizontal4, newImages.horizontal5]
  });

  const baseReasons = [
    {
      title: "100 Anos de Tradição",
      description: "A OSE possui um diferencial que poucos colégios no Brasil têm: tradição secular e rica história educacional."
    },
    {
      title: "Formação Integral",
      description: "Educamos com base em valores éticos sólidos, preparando gerações para o sucesso e a cidadania."
    },
    {
      title: "Ambiente Acolhedor",
      description: "Criamos espaços seguros onde cada aluno pode crescer individualmente e socialmente."
    },
    {
      title: "{CODE.OSE} - Programação",
      description: "Programa inovador de ensino de programação e pensamento computacional, preparando alunos para o futuro digital desde os anos iniciais."
    }
  ];

  const reasons = baseReasons.map((reason, index) => ({
    ...reason,
    image: images[index] || newImages.horizontal2
  }));

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Por que escolher <span className="text-school-orange">a OSE</span>?
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-slate-600">
            Conheça os diferenciais que fazem da OSE a escolha ideal para a educação do seu filho.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <AnimatedCard 
              key={index}
              delay={index * 0.15}
              direction="up"
              hover={true}
              scale={true}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
              <div className="h-48 relative">
                <DragImagePosition
                  src={reason.image} 
                  alt={reason.title}
                  className="w-full h-full"
                  editable={isAuthenticated}
                  initialPosition={{
                    x: getImagePosition(`why-ose-${index}`)?.horizontalPosition || 0,
                    y: getImagePosition(`why-ose-${index}`)?.verticalPosition || 0
                  }}
                  onPositionChange={(position: { x: number; y: number }) => {
                    const currentPos = getImagePosition(`why-ose-${index}`) || {
                      objectPosition: 'center center',
                      horizontalPosition: 0,
                      verticalPosition: 0,
                      scale: 1,
                      opacity: 1,
                      filter: 'none',
                      objectFit: 'cover' as const
                    };
                    updateImagePosition(`why-ose-${index}`, {
                      ...currentPos,
                      objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                      horizontalPosition: position.x,
                      verticalPosition: position.y
                    });
                  }}
                />
                {isAuthenticated && (
                  <EnhancedImageSelector
                    currentImage={reason.image}
                    onImageSelect={(url) => updateImage(index, url)}
                    className="absolute top-2 right-2 z-10"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed">{reason.description}</p>
              </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 md:p-12 text-center shadow-lg border border-gray-100">
          <h3 className="text-3xl font-bold mb-4 text-slate-800">
            Venha conhecer a OSE
          </h3>
          <p className="text-xl mb-6 text-slate-600">
            Agende uma visita e descubra por que somos referência em educação há mais de 100 anos
          </p>
          <button
            className="bg-school-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-school-orange/90 transition-colors shadow-lg"
            onClick={() => window.location.href = '/agendamento'}
          >
            Agendar Visita
          </button>
        </div>
      </div>
    </section>
  );
}