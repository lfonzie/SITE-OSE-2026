
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

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-school-orange/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Glass Navigation */}
      <div className="relative z-50">
        <div className="backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg">
          <Navigation />
        </div>
      </div>

      {/* Glass Sections */}
      <div className="relative z-10">
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
