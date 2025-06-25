import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import { updateSEO, addSchoolSchema, addStructuredData } from "@/lib/seo";
import UChatWidget from "@/components/uchat-widget";
import Navigation from "@/components/navigation";
import UChatWidget from "@/components/uchat-widget";
import HeroSection from "@/components/hero-section";
import UChatWidget from "@/components/uchat-widget";
import StatsSection from "@/components/stats-section";
import UChatWidget from "@/components/uchat-widget";
import WhyOSESection from "@/components/why-ose-section";
import UChatWidget from "@/components/uchat-widget";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import UChatWidget from "@/components/uchat-widget";
import ProgramsSection from "@/components/programs-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import SocialFeedsSection from "@/components/social-feeds-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "Colégio OSE - 100 Anos de Tradição em Educação",
      description: "Há mais de 100 anos formando gerações com excelência educacional. Conheça nossa tradição, nossos valores e nossos programas educacionais únicos.",
      keywords: "colégio ose, educação, tradição, ensino, escola, são paulo"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <WhyOSESection />
      <StatsSection />
      <FacultySection />
      <TestimonialsSection />
      <SocialFeedsSection />
      <ContactSection />
      <Footer />
      <UChatWidget />
    </div>
  );
}
