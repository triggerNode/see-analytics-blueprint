
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Install Our Module',
      description: 'Add our lightweight module to your Roblox game with a single line of code.',
      color: 'bg-[#A992FF]'
    },
    {
      number: '02',
      title: 'Configure Tracking',
      description: 'Set up your events and funnels through our intuitive dashboard interface.',
      color: 'bg-[#7C6BFF]'
    },
    {
      number: '03',
      title: 'Get Insights',
      description: 'Start receiving real-time analytics and actionable insights about your players.',
      color: 'bg-[#69C9FF]'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#20243F] mb-6">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get up and running with analytics in three simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-[#20243F] mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full">
                  <div className="flex justify-center">
                    <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
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
