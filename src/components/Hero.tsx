
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Temporarily store in localStorage until leads table is available
      const leads = JSON.parse(localStorage.getItem('leads') || '[]');
      leads.push({ 
        email, 
        source: 'landing', 
        created_at: new Date().toISOString() 
      });
      localStorage.setItem('leads', JSON.stringify(leads));

      toast({
        title: "Success!",
        description: "Thanks for your interest! We'll be in touch soon.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-[#1A2136] border border-gray-200/50">
            ROBLOX ANALYTICS PLATFORM
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-[#1A2136]">Turn Messy Game Data </span>
          <span className="bg-[#1A2136] text-white px-4 py-2 rounded-2xl inline-block transform -rotate-1">
            Into Clear Insights
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Track player behavior, optimize gameplay, and boost engagement with real-time analytics designed specifically for Roblox developers.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 focus:border-[#22D3EE] rounded-xl"
            required
          />
          <Button 
            type="submit"
            size="lg" 
            disabled={isSubmitting}
            className="bg-[#1A2136] hover:bg-[#1A2136]/90 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            {isSubmitting ? 'Starting...' : 'Start Free Trial'}
          </Button>
        </form>
        
        <div className="flex justify-center items-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-[#1A2136] text-[#1A2136] hover:bg-[#1A2136] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all"
          >
            See Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
