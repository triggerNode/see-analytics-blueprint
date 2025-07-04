
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TriggerNodeTestimonials = () => {
  const testimonials = [
    {
      quote: "{t}riggerNode transformed our operations completely. We've saved 40+ hours per week through their automation solutions.",
      name: "Jennifer Walsh",
      company: "TechScale Inc.",
      avatar: "JW"
    },
    {
      quote: "Their AI integration helped us reduce response times by 80%. The ROI was evident within the first month.",
      name: "Marcus Chen",
      company: "Growth Labs",
      avatar: "MC"
    },
    {
      quote: "Professional, efficient, and results-driven. {t}riggerNode doesn't just build solutions, they build partnerships.",
      name: "Sarah Mitchell",
      company: "InnovateCorp",
      avatar: "SM"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#20243F] mb-6">
            Trusted by Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what ambitious companies are saying about our automation solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-[#A992FF] mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#20243F] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-[#20243F]">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TriggerNodeTestimonials;
