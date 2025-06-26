
import React from 'react';
import { Code, BarChart3, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Code,
      title: "Add Our Script",
      description: "Copy-paste one line of code into your Roblox game script. Takes less than 2 minutes.",
      step: "01"
    },
    {
      icon: BarChart3,
      title: "Watch Data Flow",
      description: "See real-time player analytics appear instantly in your dashboard.",
      step: "02"
    },
    {
      icon: Zap,
      title: "Optimize & Grow",
      description: "Use insights to fix pain points and boost player engagement.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2136] mb-6">
            Get started in 3 simple steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From setup to insights in under 5 minutes. No complex configuration required.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-[#22D3EE] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                
                <div className="w-16 h-16 bg-[#22D3EE]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="w-8 h-8 text-[#22D3EE]" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#1A2136] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-[#22D3EE]/30"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
