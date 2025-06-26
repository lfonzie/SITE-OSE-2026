
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useInlineTextEditor } from '@/hooks/useInlineTextEditor';
import { useInlineImageEditor } from '@/hooks/useInlineImageEditor';
import { useInlineHeroEditor } from '@/hooks/useInlineHeroEditor';
import HeroSection from '@/components/hero-section';
import WhyOseSection from '@/components/why-ose-section';
import ProgramsSection from '@/components/programs-section';
import StatsSection from '@/components/stats-section';
import TestimonialsSection from '@/components/testimonials-section';
import ContactSection from '@/components/contact-section';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { InlineTextEditor } = useInlineTextEditor();
  const { InlineImageEditor } = useInlineImageEditor();
  const { InlineHeroEditor } = useInlineHeroEditor();

  // State for editable content
  const [homeContent, setHomeContent] = React.useState({
    welcomeTitle: "Bem-vindos ao Colégio OSE",
    welcomeDescription: "Educação de qualidade há mais de 100 anos, formando cidadãos para o futuro.",
    announcementTitle: "Matrículas Abertas 2025",
    announcementText: "Venha fazer parte da nossa história. Inscreva-se agora!"
  });

  const updateContent = (key: string, value: string) => {
    setHomeContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with inline editing */}
      <HeroSection />
      
      {/* Welcome Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <InlineTextEditor
            value={homeContent.welcomeTitle}
            onSave={(value) => updateContent('welcomeTitle', value)}
            as="h2"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            placeholder="Título de boas-vindas"
            saveKey="welcome_title"
          />
          <InlineTextEditor
            value={homeContent.welcomeDescription}
            onSave={(value) => updateContent('welcomeDescription', value)}
            as="p"
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            placeholder="Descrição de boas-vindas"
            saveKey="welcome_description"
          />
        </div>
      </section>

      {/* Announcement Section */}
      {isAuthenticated && (
        <section className="py-12 bg-school-orange">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <InlineTextEditor
              value={homeContent.announcementTitle}
              onSave={(value) => updateContent('announcementTitle', value)}
              as="h3"
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              placeholder="Título do anúncio"
              saveKey="announcement_title"
            />
            <InlineTextEditor
              value={homeContent.announcementText}
              onSave={(value) => updateContent('announcementText', value)}
              as="p"
              className="text-lg text-white/90"
              placeholder="Texto do anúncio"
              saveKey="announcement_text"
            />
          </div>
        </section>
      )}

      {/* Main Sections */}
      <WhyOseSection />
      <ProgramsSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
