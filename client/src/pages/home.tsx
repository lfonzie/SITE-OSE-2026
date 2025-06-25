import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import ProgramsSection from "@/components/programs-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import SocialFeedsSection from "@/components/social-feeds-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Update document title for SEO
    document.title = "Colégio OSE - Tradição Secular de Ensino em Sorocaba | Desde 1924";
    
    // Add structured data for search engines
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Colégio OSE",
      "alternateName": "OSE",
      "url": "https://colegioose.com.br",
      "logo": "https://colegioose.com.br/images/logo-ose.png",
      "description": "Colégio OSE - 100 anos de excelência educacional em Sorocaba. Educação Infantil, Ensino Fundamental e Médio.",
      "foundingDate": "1924",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Sorocaba",
        "addressLocality": "Sorocaba",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "telephone": "+55-15-2101-3812",
      "sameAs": [
        "https://www.instagram.com/colegioose/",
        "https://www.facebook.com/colegioose"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <WhyOSESection />
      <PedagogicalProposalSection />
      <ProgramsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <SocialFeedsSection />
      <ContactSection />
    </div>
  );
}