
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      title: 'Automation Strategy',
      description: 'Comprehensive automation roadmaps that identify bottlenecks and optimize workflows for maximum efficiency.',
      icon: '🎯'
    },
    {
      title: 'Bot Development',
      description: 'Custom-built intelligent bots that handle repetitive tasks, customer service, and business processes.',
      icon: '🤖'
    },
    {
      title: 'AI Integration',
      description: 'Seamless integration of cutting-edge AI solutions into your existing systems and workflows.',
      icon: '⚡'
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#20243F] mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive automation and AI solutions tailored to transform your business operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-[#A992FF] to-[#7C6BFF] rounded-full flex items-center justify-center text-2xl text-white mb-6 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#20243F] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <a href="#" className="text-[#20243F] hover:text-[#A992FF] transition-colors font-medium">
                  Learn more →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
