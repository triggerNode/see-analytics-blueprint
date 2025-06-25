
import React from 'react';
import TriggerNodeNavigation from '../components/triggernode/TriggerNodeNavigation';
import TriggerNodeHero from '../components/triggernode/TriggerNodeHero';
import Services from '../components/triggernode/Services';
import Process from '../components/triggernode/Process';
import TriggerNodeTestimonials from '../components/triggernode/TriggerNodeTestimonials';
import TriggerNodeCTA from '../components/triggernode/TriggerNodeCTA';
import TriggerNodeFooter from '../components/triggernode/TriggerNodeFooter';
import BookmarkButton from '../components/BookmarkButton';

const TriggerNode = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/40 relative overflow-x-hidden">
      {/* Subtle diamond grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #20243F 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <TriggerNodeNavigation />
      <TriggerNodeHero />
      <Services />
      <Process />
      <TriggerNodeTestimonials />
      <TriggerNodeCTA />
      <TriggerNodeFooter />
      <BookmarkButton />
    </div>
  );
};

export default TriggerNode;
