
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const TriggerNodeNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-[#20243F]">
              {'{t}riggerNode'}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-[#20243F] transition-colors">Our Services</a>
            <a href="/products" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#20243F] transition-colors">Our Works</a>
            <a href="#contact" className="text-gray-700 hover:text-[#20243F] transition-colors">Contact Us</a>
            <a href="/products/see-analytics" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#20243F] transition-colors font-semibold">Try {'{s}ee'}</a>
          </div>
          
          <Button 
            className="bg-[#20243F] hover:bg-[#20243F]/90 text-white"
            onClick={() => window.open('https://calendly.com', '_blank')}
          >
            Book a Call
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TriggerNodeNavigation;
