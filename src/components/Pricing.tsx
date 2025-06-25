
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      dau: '10,000 DAU',
      features: [
        'Real-time analytics',
        'Basic funnel tracking',
        'Email support',
        'Standard integrations'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/month',
      dau: '100,000 DAU',
      features: [
        'Everything in Starter',
        'Advanced A/B testing',
        'Custom events',
        'Priority support',
        'Advanced integrations'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      dau: 'Unlimited DAU',
      features: [
        'Everything in Pro',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#20243F] mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your game's scale and requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border-2 shadow-lg ${
              plan.popular 
                ? 'border-[#A992FF] shadow-2xl transform scale-105' 
                : 'border-gray-200 hover:border-[#A992FF]/50'
            } transition-all duration-300 bg-white/90 backdrop-blur-sm`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#A992FF] text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold text-[#20243F] mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-[#20243F]">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.dau}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-[#20243F] hover:bg-[#20243F]/90 text-white' 
                      : 'bg-white border-2 border-[#20243F] text-[#20243F] hover:bg-[#20243F] hover:text-white'
                  } transition-all`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
