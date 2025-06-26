
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for new developers",
      features: [
        "Up to 1,000 events/month",
        "Basic dashboard",
        "7-day data retention",
        "Email support"
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For growing games",
      features: [
        "Up to 100,000 events/month",
        "Advanced analytics",
        "90-day data retention",
        "Custom events",
        "A/B testing",
        "Priority support"
      ],
      cta: "Start Pro Trial",
      highlighted: true
    },
    {
      name: "Studio",
      price: "$99",
      period: "per month",
      description: "For successful studios",
      features: [
        "Unlimited events",
        "All analytics features",
        "1-year data retention",
        "Multiple games",
        "Team collaboration",
        "White-label reports",
        "Phone support"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2136] mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as your game grows. No hidden fees, cancel anytime.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-2xl p-8 shadow-lg transition-all hover:shadow-xl ${
                plan.highlighted 
                  ? 'bg-[#1A2136] text-white ring-4 ring-[#22D3EE] scale-105' 
                  : 'bg-white'
              }`}
            >
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-[#1A2136]'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-white' : 'text-[#1A2136]'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${
                    plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    /{plan.period}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-3 ${
                      plan.highlighted ? 'text-[#22D3EE]' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 font-semibold ${
                  plan.highlighted 
                    ? 'bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#1A2136]' 
                    : 'bg-[#1A2136] hover:bg-[#1A2136]/90 text-white'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need a custom plan? <a href="#" className="text-[#22D3EE] hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
