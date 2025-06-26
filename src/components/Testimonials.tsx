
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Creator of MegaObby",
      content: "Since using {s}ee Analytics, my player retention improved by 40%. I can finally see where players drop off and fix those spots immediately.",
      avatar: "🎮"
    },
    {
      name: "Sarah Johnson",
      role: "Studio Owner",
      content: "The real-time data is incredible. We caught a game-breaking bug within minutes because we saw the rage-quit spike on the dashboard.",
      avatar: "👩‍💻"
    },
    {
      name: "Mike Rodriguez",
      role: "Solo Developer",
      content: "I wish I had this when I started. The insights helped me understand my players better and my game revenue doubled in 3 months.",
      avatar: "🚀"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2136] mb-6">
            Loved by Roblox developers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what creators are saying about {"{s}ee"} Analytics
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-[#F8FAFC] rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#22D3EE]/10 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A2136]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex text-[#22D3EE] mt-4">
                {'★'.repeat(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
