import { OptimizedImage } from "@/components/ui/optimized-image";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";

import { logos, newImages } from "@/lib/image-verification";

const features = [
  {
    logo: logos.google,
    title: "Google for Education",
    description: "Plataforma que transforma a maneira como educadores e alunos aprendem e colaboram, oferecendo educação interativa e colaborativa.",
    color: "bg-blue-600"
  },
  {
    logo: newImages.img30,
    title: "Corpo Docente Experiente",
    description: "Equipe altamente qualificada com vasta experiência acadêmica e prática, sempre atualizada com as melhores práticas pedagógicas.",
    color: "bg-green-600"
  },
  {
    logo: logos.macmillan,
    title: "Educação Bilíngue MacMillan",
    description: "Currículo bilíngue que forma cidadãos globais, preparando alunos para interações multiculturais e proficiência linguística.",
    color: "bg-purple-600"
  },
  {
    logo: logos.codeose,
    title: "{CODE.OSE} - Programação",
    description: "Programa inovador de ensino de programação e pensamento computacional, preparando alunos para o futuro digital.",
    color: "bg-red-600"
  },
  {
    logo: logos.acm,
    title: "Parceria com ACM-YMCA",
    description: "Ginásio e atividades da ACM (YMCA) de Sorocaba disponíveis para nossos alunos. Famílias podem frequentar pagando apenas a mensalidade, sem compra de título.",
    color: "bg-yellow-600"
  },
  {
    logo: logos.arvore,
    title: "Plataforma Árvore",
    description: "Biblioteca digital com milhares de livros e recursos educacionais para incentivar a leitura e o aprendizado.",
    color: "bg-emerald-600"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nossos <span className="text-school-orange">Diferenciais</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Oferecemos uma educação de excelência com recursos modernos e parcerias estratégicas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 flex items-center justify-center mb-6 bg-gray-50 rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={feature.logo}
                    alt={feature.title}
                    className={
                      feature.title === "Educação Bilíngue MacMillan" 
                        ? "w-full h-auto max-h-12 object-contain" 
                        : feature.title === "Corpo Docente Experiente"
                        ? "w-16 h-16 object-cover rounded-lg"
                        : "w-16 h-16 object-contain"
                    }
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}