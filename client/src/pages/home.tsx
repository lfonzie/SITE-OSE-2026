import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import { updateSEO, addSchoolSchema, addStructuredData } from "@/lib/seo";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import StatsSection from "@/components/stats-section";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import ProgramsSection from "@/components/programs-section";
import FeaturesSection from "@/components/features-section";
import FacultySection from "@/components/faculty-section";
import TestimonialsSection from "@/components/testimonials-section";
import SocialFeedsSection from "@/components/social-feeds-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

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
