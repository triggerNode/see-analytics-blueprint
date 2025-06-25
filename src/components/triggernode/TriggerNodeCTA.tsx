
import React from 'react';
import { Button } from '@/components/ui/button';

const TriggerNodeCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#20243F] to-[#2a2f4f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Automate?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join forward-thinking companies that trust {"{t}riggerNode"} to transform their operations 
          with intelligent automation and AI solutions.
        </p>
        
        <Button 
          size="lg" 
          className="bg-white text-[#20243F] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          onClick={() => window.open('https://calendly.com', '_blank')}
        >
          Book a Call
        </Button>
        
        <p className="text-sm opacity-70 mt-6">
          Free consultation • Custom solutions • Proven results
        </p>
      </div>
    </section>
  );
};

export default TriggerNodeCTA;
