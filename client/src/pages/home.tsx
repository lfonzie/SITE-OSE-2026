import React from 'react';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import WhyOseSection from '@/components/why-ose-section';
import ProgramsSection from '@/components/programs-section';
import StatsSection from '@/components/stats-section';
import TestimonialsSection from '@/components/testimonials-section';
import ContactSection from '@/components/contact-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyOseSection />
      <ProgramsSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}