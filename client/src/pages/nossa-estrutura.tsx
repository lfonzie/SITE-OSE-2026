import { useEffect } from "react";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { Building, Users, BookOpen, Microscope, Computer, Palette, Music, Trophy, Heart, Shield, Wifi, Camera } from "lucide-react";
import { newImages } from "@/lib/image-verification";

export default function NossaEstrutura() {
  const heroImage = newImages.horizontal22;
  const images = [newImages.horizontal23, newImages.horizontal24, newImages.horizontal25, newImages.horizontal26];

  useEffect(() => {
    updateSEO({
      title: "Nossa Estrutura | Colégio OSE - Infraestrutura Educacional de Excelência",
      description: "Conheça a estrutura completa do Colégio OSE: salas modernas, laboratórios equipados, biblioteca, quadras esportivas, área verde e muito mais. Infraestrutura pensada para o aprendizado.",
      keywords: "estrutura colégio ose, infraestrutura escola, laboratórios, biblioteca, quadras esportivas, salas de aula modernas, estrutura educacional sorocaba"
    });
  }, []);

  const facilities = [
    {
      icon: Building,
      title: "Salas de Aula",
      description: "Salas amplas e bem iluminadas, climatizadas com ar-condicionado, projetores e mobiliário ergonômico para todos os segmentos.",
      features: ["Ar-condicionado", "Projetores", "Mobiliário ergonômico", "Salas grandes e iluminadas"]
    },
    {
      icon: Microscope,
      title: "Laboratórios de Química",
      description: "3 laboratórios de química totalmente equipados para aulas práticas e experimentos científicos.",
      features: ["3 laboratórios disponíveis", "Equipamentos modernos", "Materiais de segurança", "Bancadas experimentais"]
    },
    {
      icon: BookOpen,
      title: "Espaços de Convivência",
      description: "Espaços de convivência em cada segmento que funcionam como biblioteca e sala de estudos.",
      features: ["Um espaço por segmento", "Ambiente de estudos", "Área de convivência", "Espaço para leitura"]
    },
    {
      icon: Trophy,
      title: "Quadra Esportiva",
      description: "Uma quadra esportiva coberta e climatizada para prática de esportes e educação física.",
      features: ["Quadra coberta", "Climatizada", "Equipamentos esportivos", "Ambiente confortável"]
    },
    {
      icon: Palette,
      title: "Salas de Arte",
      description: "Salas especializadas para atividades artísticas e desenvolvimento da criatividade.",
      features: ["Salas equipadas", "Materiais artísticos", "Ambiente criativo", "Espaço amplo"]
    },
    {
      icon: Music,
      title: "Auditório",
      description: "Auditório completo para apresentações, eventos e atividades culturais da escola.",
      features: ["Espaço amplo", "Sistema de som", "Equipamentos audiovisuais", "Ambiente para eventos"]
    }
  ];

  const highlights = [
    {
      icon: Shield,
      title: "Segurança Completa",
      description: "Sistema de segurança 24h com câmeras, controle de acesso e equipe especializada."
    },
    {
      icon: Wifi,
      title: "Internet de Alta Velocidade",
      description: "Rede wifi em toda escola para apoio às atividades pedagógicas digitais."
    },
    {
      icon: Heart,
      title: "Área de Convivência",
      description: "Espaços verdes e pátios para recreação, socialização e atividades ao ar livre."
    },
    {
      icon: Camera,
      title: "Monitoramento Educacional",
      description: "Acompanhamento pedagógico com ferramentas modernas de gestão escolar."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300/30 to-amber-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/4 -right-4 w-72 h-72 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-gradient-to-r from-amber-300/30 to-red-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-slate-800"
          style={{ opacity: 0.7 }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif drop-shadow-lg">
              Nossa <span className="text-amber-400">Estrutura</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed drop-shadow-md">
              Infraestrutura moderna e completa para proporcionar a melhor experiência educacional
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principais Instalações */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-serif">
              Principais <span className="text-amber-600">Instalações</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Ambientes projetados para estimular o aprendizado, criatividade e desenvolvimento integral dos nossos alunos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl p-6 hover:shadow-xl hover:bg-white/40 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <facility.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{facility.title}</h3>
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">{facility.description}</p>
                <ul className="space-y-2">
                  {facility.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-600">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Imagens */}
      <section className="py-20 backdrop-blur-lg bg-white/30 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-serif">
              Conheça Nossos <span className="text-amber-600">Espaços</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Veja alguns dos ambientes que fazem parte do dia a dia dos nossos alunos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-xl overflow-hidden backdrop-blur-lg bg-white/20 border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={image}
                  alt={`Estrutura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques Especiais */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-serif">
              Diferenciais da Nossa <span className="text-amber-600">Estrutura</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Recursos que garantem segurança, tecnologia e conforto para toda comunidade escolar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl p-6 hover:shadow-xl hover:bg-white/40 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{highlight.title}</h3>
                <p className="text-slate-700 leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vídeos da Estrutura */}
      <section className="py-20 backdrop-blur-lg bg-white/30 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-serif">
              Tour Virtual pela <span className="text-amber-600">Nossa Escola</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Faça um tour pelos nossos espaços através desses vídeos especiais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl overflow-hidden"
            >
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/QisqkOA-DoU"
                  title="Colégio OSE - Nossa Estrutura"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Estrutura Geral</h3>
                <p className="text-slate-600">Conheça os principais espaços da nossa escola</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl overflow-hidden"
            >
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/mgRpjG_L5kw"
                  title="Estrutura - Ensino Fundamental I e II"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Ensino Fundamental</h3>
                <p className="text-slate-600">Ambientes dedicados aos anos iniciais e finais</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl overflow-hidden"
            >
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/OOeIphA5F3Q"
                  title="Estrutura - Ensino Médio"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Ensino Médio</h3>
                <p className="text-slate-600">Espaços preparados para jovens protagonistas</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}