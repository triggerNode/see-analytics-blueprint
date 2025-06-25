
import React from 'react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#20243F] to-[#2a2f4f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to optimize your game?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of developers who trust {"{s}ee"} Analytics to understand their players 
          and grow their games.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white text-[#20243F] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Free Trial
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-[#20243F] px-8 py-4 text-lg font-semibold rounded-xl transition-all"
          >
            Talk to Sales
          </Button>
        </div>
        
        <p className="text-sm opacity-70 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTA;
