
import React from 'react';
import { Activity, BarChart, Users } from 'lucide-react';

const FeatureGrid = () => {
  const features = [
    {
      icon: Users,
      title: 'Live Players',
      description: 'Track active players in real-time across all your game servers and experiences.'
    },
    {
      icon: BarChart,
      title: 'Revenue Heatmap',
      description: 'Visualize where players spend Robux and identify your highest-earning game areas.'
    },
    {
      icon: Activity,
      title: 'Rage-Quit Tracker',
      description: 'Detect frustration points and optimize gameplay to reduce player churn.'
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2136] mb-4">
            Everything You Need to Optimize Your Game
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get actionable insights that help you make data-driven decisions and boost player engagement.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-[1.03] border border-gray-100"
            >
              <div className="w-12 h-12 bg-[#22D3EE]/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A2136] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
