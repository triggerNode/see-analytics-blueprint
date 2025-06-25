
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-[#20243F] border border-gray-200/50">
            FOR ROBLOX DEVELOPERS
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-[#20243F]">Analytics </span>
          <span className="bg-[#20243F] text-white px-4 py-2 rounded-2xl inline-block transform -rotate-1">
            made simple.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Track player behavior, optimize gameplay, and boost engagement with 
          real-time analytics designed specifically for Roblox developers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-[#20243F] hover:bg-[#20243F]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Free Trial
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-[#20243F] text-[#20243F] hover:bg-[#20243F] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
