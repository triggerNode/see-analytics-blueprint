
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: 'Real-time Analytics',
      description: 'Monitor player activity and game performance in real-time with live dashboards.',
      icon: '📊'
    },
    {
      title: 'One-Click Setup',
      description: 'Get started in minutes with our simple installation process and automated configuration.',
      icon: '⚡'
    },
    {
      title: 'Funnel Tracking',
      description: 'Track player progression through your game and identify drop-off points.',
      icon: '🔄'
    },
    {
      title: 'Custom Events',
      description: 'Track any custom event in your game with our flexible event tracking system.',
      icon: '🎯'
    },
    {
      title: 'A/B Testing',
      description: 'Run experiments to optimize your game mechanics and player experience.',
      icon: '🧪'
    },
    {
      title: 'Retention Analysis',
      description: 'Understand player retention patterns and improve long-term engagement.',
      icon: '📈'
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2136] mb-6">
            Powerful features for game developers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to understand your players and optimize your game performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#1A2136] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
