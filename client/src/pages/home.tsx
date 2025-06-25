import { useEffect } from "react";
import { updateSEO, addSchoolSchema, addStructuredData } from "@/lib/seo";
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

export default function Home() {
  useEffect(() => {
    // Main SEO configuration for homepage
    updateSEO({
      title: "Colégio OSE - Tradição Secular de Ensino desde 1924 | Sorocaba - SP",
      description: "Colégio OSE em Sorocaba oferece educação de excelência há 100 anos. Educação Infantil, Ensino Fundamental I e II com metodologia inovadora e valores tradicionais. Matricule-se!",
      keywords: "colégio sorocaba, escola particular sorocaba, educação infantil sorocaba, ensino fundamental sorocaba, colégio ose, escola tradicional, educação de qualidade, formação integral",
      ogImage: "https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png",
      canonical: "https://colegioose.com.br/"
    });

    // Add school organization schema
    addSchoolSchema();

    // Add breadcrumb schema for homepage
    addStructuredData({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://colegioose.com.br/"
      }]
    });

    // Add educational courses schema
    addStructuredData({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Educação Básica Completa",
      "description": "Educação Infantil, Ensino Fundamental I e II com metodologia inovadora",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Colégio OSE",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rua da Penha, 620",
          "addressLocality": "Sorocaba",
          "addressRegion": "SP",
          "postalCode": "18010-002",
          "addressCountry": "BR"
        }
      },
      "offers": {
        "@type": "Offer",
        "category": "Educação Básica",
        "availabilityStarts": "2025-02-01"
      }
    });

    // Add local business schema
    addStructuredData({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://colegioose.com.br/#localbusiness",
      "name": "Colégio OSE",
      "alternateName": "OSE",
      "description": "Colégio particular em Sorocaba com tradição de 100 anos em educação de excelência",
      "url": "https://colegioose.com.br",
      "telephone": "(15) 2101-3800",
      "email": "secretaria@colegioose.com.br",
      "priceRange": "$$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua da Penha, 620",
        "addressLocality": "Sorocaba",
        "addressRegion": "SP",
        "postalCode": "18010-002",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-23.5016",
        "longitude": "-47.4526"
      },
      "openingHours": [
        "Mo-Fr 07:00-18:00"
      ],
      "sameAs": [
        "https://www.facebook.com/colegioose",
        "https://www.instagram.com/colegioose"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "124"
      }
    });

    // Add FAQ schema for common questions
    addStructuredData({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quais segmentos o Colégio OSE oferece?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Colégio OSE oferece Educação Infantil (2 a 5 anos), Ensino Fundamental I (1º ao 5º ano) e Ensino Fundamental II (6º ao 9º ano) com metodologia inovadora e formação integral."
          }
        },
        {
          "@type": "Question",
          "name": "Desde quando o Colégio OSE existe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Colégio OSE foi fundado em 1924, completando 100 anos de tradição em educação de excelência em Sorocaba."
          }
        },
        {
          "@type": "Question",
          "name": "Onde fica localizado o Colégio OSE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Colégio OSE está localizado na Rua da Penha, 620, Centro, Sorocaba - SP, CEP 18010-002."
          }
        },
        {
          "@type": "Question",
          "name": "Como entrar em contato com o Colégio OSE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Você pode entrar em contato pelo telefone (15) 2101-3800, pelo email secretaria@colegioose.com.br ou visitando nossa unidade na Rua da Penha, 620."
          }
        }
      ]
    });

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