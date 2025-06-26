import { useQuery } from "@tanstack/react-query";
import { Baby, Book, GraduationCap, ArrowRight, Check, Heart, Brain } from "lucide-react";
import type { Program } from "@shared/schema";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection, AnimatedItem } from "@/components/animated/AnimatedSection";
import { AnimatedIcon } from "@/components/animated/AnimatedIcon";
import { newImages } from "@/lib/image-verification";
import DragImagePosition from '@/components/DragImagePosition';
import EnhancedImageSelector from '@/components/EnhancedImageSelector';
import ImagePositionControls from '@/components/ImagePositionControls';
import { useAuth } from '@/contexts/AuthContext';
import { usePageData } from '@/hooks/usePageData';

const iconMap = {
  baby: Baby,
  book: Book,
  "graduation-cap": GraduationCap,
  heart: Heart,
  brain: Brain,
};

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-600",
    text: "text-blue-600"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-600",
    text: "text-green-600"
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-600",
    text: "text-red-600"
  }
};

export default function ProgramsSection() {
  const { isAuthenticated } = useAuth();
  const { 
    images, 
    updateImage, 
    updateImagePosition,
    getImagePosition 
  } = usePageData('Programs Section', {
    images: [newImages.img9, newImages.img10, newImages.img11, newImages.img12]
  });

  const getImageForProgram = (title: string, index: number) => {
    const currentImages = images || [];
    const imageMap: Record<string, string> = {
      'Educação Infantil': currentImages[0] || newImages.img9,
      'Ensino Fundamental I': currentImages[1] || newImages.img10,
      'Ensino Fundamental II': currentImages[2] || newImages.img11,
      'Ensino Médio': currentImages[3] || newImages.img12
    };
    return imageMap[title] || currentImages[index] || newImages.img1;
  };
  
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  if (isLoading) {
    return (
      <section id="programas" className="py-20 bg-white">
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

  return (
    <section id="programas" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nossos <span className="text-school-orange">Programas</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Oferecemos uma educação completa desde a Educação Infantil até o Ensino Médio, 
            preparando nossos alunos para um futuro brilhante.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs?.map((program, index) => {
            const IconComponent = iconMap[program.icon as keyof typeof iconMap] || Book;
            const colors = colorMap[program.color as keyof typeof colorMap] || colorMap.blue;

            return (
              <AnimatedCard 
                key={program.id}
                delay={index * 0.1}
                direction="up"
                hover={true}
                scale={true}
              >
                <div className={`${colors.bg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border ${colors.border}`}>
                <div className="h-48 mb-6 rounded-xl overflow-hidden relative">
                  <DragImagePosition
                    src={getImageForProgram(program.title, index)}
                    alt={program.title}
                    className="w-full h-full"
                    editable={isAuthenticated}
                    initialPosition={{
                      x: getImagePosition(`program-${index}`)?.horizontalPosition || 0,
                      y: getImagePosition(`program-${index}`)?.verticalPosition || 0
                    }}
                    onPositionChange={(position: { x: number; y: number }) => {
                      const currentPos = getImagePosition(`program-${index}`) || {
                        objectPosition: 'center center',
                        horizontalPosition: 0,
                        verticalPosition: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'none',
                        objectFit: 'cover' as const
                      };
                      updateImagePosition(`program-${index}`, {
                        ...currentPos,
                        objectPosition: `${50 + position.x}% ${50 + position.y}%`,
                        horizontalPosition: position.x,
                        verticalPosition: position.y
                      });
                    }}
                  />
                  {isAuthenticated && (
                    <>
                      <EnhancedImageSelector
                        currentImage={getImageForProgram(program.title, index)}
                        onImageSelect={(url) => updateImage(index, url)}
                        className="absolute top-2 right-2 z-10"
                      />
                      <ImagePositionControls
                        currentPosition={getImagePosition(`program-${index}`)}
                        onPositionChange={(position) => updateImagePosition(`program-${index}`, position)}
                        className="absolute inset-0"
                      />
                    </>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{program.title}</h3>
                <p className="text-slate-600 mb-6">{program.description}</p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-600">
                      <AnimatedIcon 
                        delay={(index * 0.1) + (featureIndex * 0.05)}
                        pulse={true}
                      >
                        <Check className="text-school-brown mr-2" size={16} />
                      </AnimatedIcon>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`${colors.text} font-semibold hover:underline flex items-center`}
                  onClick={() => {
                    const pageMap: Record<string, string> = {
                      'Educação Infantil': '/educacao-infantil',
                      'Ensino Fundamental I': '/fundamental-1',
                      'Ensino Fundamental II': '/fundamental-2',
                      'Ensino Médio': '/ensino-medio'
                    };
                    const targetPage = pageMap[program.title];
                    if (targetPage) {
                      window.location.href = targetPage;
                    }
                  }}
                >
                  Saiba Mais <ArrowRight className="ml-1" size={16} />
                </button>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}