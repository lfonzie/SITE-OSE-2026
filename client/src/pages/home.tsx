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
      
      {/* Uniforme Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              <span className="text-school-orange">UNIFORME 2025</span>
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Venda exclusiva na</h3>
              <h4 className="text-xl font-semibold text-school-orange mb-6">Origem Confecções</h4>
              <div className="space-y-2 text-slate-600">
                <p className="text-lg">Av. Gen. Osório, 1079 - Vila Trujillo, Sorocaba - SP</p>
                <p className="text-lg font-semibold text-school-orange">(15) 3233-3305</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactSection />
    </div>
  );
}