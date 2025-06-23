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
      <Footer />
    </div>
  );
}
