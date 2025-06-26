
import React from 'react';

const TrustedBy = () => {
  const companies = [
    { name: 'Adopt Me!', logo: '🐾' },
    { name: 'Brookhaven', logo: '🏘️' },
    { name: 'MeepCity', logo: '🎮' },
    { name: 'Jailbreak', logo: '🚔' },
    { name: 'Arsenal', logo: '🔫' },
    { name: 'Piggy', logo: '🐷' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-[#1A2136] mb-2">
            Trusted by top Roblox developers
          </h2>
          <p className="text-gray-600">
            Join thousands of developers optimizing their games with {"{s}ee"} Analytics
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-2">{company.logo}</div>
              <div className="text-sm font-medium text-gray-700">{company.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
