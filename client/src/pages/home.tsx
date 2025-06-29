
import React from 'react';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import WhyOseSection from '@/components/why-ose-section';
import ProgramsSection from '@/components/programs-section';
import StatsSection from '@/components/stats-section';
import TestimonialsSection from '@/components/testimonials-section';
import ContactSection from '@/components/contact-section';
import PedagogicalProposalSection from '@/components/pedagogical-proposal-section';
import FeaturesSection from '@/components/features-section';
import SocialFeedsSection from '@/components/social-feeds-section';
import SEO from '@/components/SEO';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Colégio OSE",
    "alternateName": "Organização Sorocabana de Ensino",
    "url": "https://colegioose.com.br",
    "logo": "https://colegioose.com.br/images/LogoOSE100anos.png",
    "description": "Escola particular em Sorocaba com 100 anos de tradição educacional. Educação Infantil, Ensino Fundamental e Médio com excelência acadêmica.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Dr. Ursulino de Oliveira, 20",
      "addressLocality": "Sorocaba",
      "addressRegion": "SP",
      "postalCode": "18035-370",
      "addressCountry": "BR"
    },
    "telephone": "+55-15-2101-3800",
    "email": "contato@colegioose.com.br",
    "foundingDate": "1924",
    "sameAs": [
      "https://www.facebook.com/colegioose",
      "https://www.instagram.com/colegioose",
      "https://www.linkedin.com/company/colegio-ose"
    ],
    "offers": [
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Educação Infantil",
        "description": "Programa educacional para crianças de 4 a 6 anos com metodologia especializada"
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Ensino Fundamental I",
        "description": "Ensino fundamental anos iniciais com foco no desenvolvimento integral"
      },
      {
        "@type": "EducationalOccupationalProgram", 
        "name": "Ensino Fundamental II",
        "description": "Ensino fundamental anos finais preparando para o ensino médio"
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Ensino Médio",
        "description": "Preparação completa para vestibulares e ENEM com excelência acadêmica"
      }
    ]
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Colégio OSE - 100 Anos de Excelência Educacional em Sorocaba | Educação Infantil, Fundamental e Médio"
        description="Escola particular em Sorocaba com 100 anos de tradição. Educação Infantil, Ensino Fundamental e Médio com metodologia moderna, preparação para vestibulares e desenvolvimento integral do aluno."
        keywords="colégio particular sorocaba, escola particular sorocaba, educação infantil sorocaba, ensino fundamental sorocaba, ensino médio sorocaba, escola tradicional, vestibular, ENEM, colégio OSE"
        canonical="https://colegioose.com.br/"
        ogTitle="Colégio OSE - 100 Anos de Tradição Educacional em Sorocaba"
        ogDescription="Escola particular com 100 anos de excelência em Sorocaba. Educação Infantil, Fundamental e Médio com metodologia moderna e preparação completa para o futuro."
        ogImage="https://colegioose.com.br/images/LogoOSE100anos.png"
        structuredData={structuredData}
      />
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-orange-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/25 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-tr from-emerald-400/15 via-cyan-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-bl from-rose-400/20 via-orange-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '8s'}}></div>
      </div>

      <Navigation />

      {/* Glass Sections with padding for fixed nav */}
      <div className="relative z-10 pt-20">
        <div className="backdrop-blur-sm bg-white/10 border-b border-white/10">
          <HeroSection />
        </div>
        
        <div className="backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
          <StatsSection />
        </div>
        
        <div className="backdrop-blur-sm bg-white/20 border-b border-white/10">
          <WhyOseSection />
        </div>
        
        <div className="backdrop-blur-md bg-white/25 border-b border-white/20 shadow-sm">
          <PedagogicalProposalSection />
        </div>
        
        <div className="backdrop-blur-sm bg-white/15 border-b border-white/10">
          <ProgramsSection />
        </div>
        
        <div className="backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
          <FeaturesSection />
        </div>
        
        <div className="backdrop-blur-sm bg-white/20 border-b border-white/10">
          <TestimonialsSection />
        </div>
        
        <div className="backdrop-blur-md bg-white/25 border-b border-white/20 shadow-sm">
          <SocialFeedsSection />
        </div>
        
        <div className="backdrop-blur-lg bg-white/40 border-t border-white/30 shadow-lg">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
