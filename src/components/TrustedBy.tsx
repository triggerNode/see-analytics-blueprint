
import React from 'react';

const TrustedBy = () => {
  const companies = [
    'DreamCraft',
    'BADIMO',
    'BIG Games',
    'ROLVe',
    'Easy.gg'
  ];

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">
          Trusted by leading Roblox developers
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {companies.map((company, index) => (
            <div 
              key={index}
              className="text-2xl font-bold text-[#20243F] hover:opacity-100 transition-opacity duration-300"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
