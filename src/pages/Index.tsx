
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import BookmarkButton from '../components/BookmarkButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-purple-50/30 to-blue-50/40 relative overflow-x-hidden">
      {/* Subtle diamond grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1A2136 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <Navigation />
      <Hero />
      <FeatureGrid />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <BookmarkButton />
    </div>
  );
};

export default Index;
