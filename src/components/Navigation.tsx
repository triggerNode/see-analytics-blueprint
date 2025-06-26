
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
            <div className="text-2xl font-bold text-[#1A2136]">
              {"{s}ee"}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-[#1A2136] transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#1A2136] transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-[#1A2136] transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-700 hover:text-[#1A2136] transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-700 hover:text-[#1A2136] transition-colors">FAQ</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-[#1A2136] text-[#1A2136] hover:bg-[#1A2136] hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#1A2136] hover:bg-[#1A2136]/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
