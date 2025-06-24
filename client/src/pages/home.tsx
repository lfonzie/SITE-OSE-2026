import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import ProgramsSection from "@/components/programs-section";
import FeaturesSection from "@/components/features-section";
import GallerySection from "@/components/gallery-section";
import TestimonialsSection from "@/components/testimonials-section";
import SocialFeedsSection from "@/components/social-feeds-section";
import ContactSection from "@/components/contact-section";


export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#FF4F00' }}>
        <div className="absolute inset-0 bg-black/10" />
      </section>
      <StatsSection />
      <WhyOSESection />
      <PedagogicalProposalSection />
      <ProgramsSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <SocialFeedsSection />
      <ContactSection />
    </div>
  );
}