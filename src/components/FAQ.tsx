
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqData = [
    {
      question: "How does {s}ee Analytics integrate with my Roblox game?",
      answer: "Simply add our lightweight SDK to your game script. It takes less than 5 minutes to set up and starts collecting data immediately. No complex configuration required."
    },
    {
      question: "Will this affect my game's performance?",
      answer: "Not at all. Our analytics run asynchronously and use minimal resources. We've optimized for Roblox's environment to ensure zero impact on player experience."
    },
    {
      question: "Can I track custom events specific to my game?",
      answer: "Absolutely! Beyond standard metrics, you can track custom events like quest completions, item purchases, social interactions, and any game-specific actions that matter to you."
    },
    {
      question: "How quickly can I see results?",
      answer: "Data appears in your dashboard within seconds. Our real-time processing means you can watch player behavior as it happens and make immediate optimizations."
    },
    {
      question: "Is my game data secure and private?",
      answer: "Yes. We use enterprise-grade encryption and never share your data. You maintain full ownership and control over your analytics data at all times."
    },
    {
      question: "Do you support multiple games and experiences?",
      answer: "Yes! Manage analytics for all your Roblox games from a single dashboard. Perfect for studios with multiple titles or developers testing different concepts."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2136] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about {"{s}ee"} Analytics
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-xl px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-[#1A2136] hover:text-[#22D3EE] transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
