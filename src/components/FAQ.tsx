
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How difficult is it to set up {s}ee Analytics?",
      answer: "Setup is incredibly simple. Just add our module to your Roblox game with a single line of code, and you'll start receiving analytics data immediately. Our step-by-step guide takes most developers less than 5 minutes to complete."
    },
    {
      question: "Will this impact my game's performance?",
      answer: "No, our analytics module is designed to be lightweight and efficient. It uses minimal resources and won't affect your game's performance or player experience. All data processing happens on our servers, not in your game."
    },
    {
      question: "Can I track custom events specific to my game?",
      answer: "Absolutely! You can track any custom event that's important to your game, such as item purchases, level completions, or any other player actions. Our flexible event system adapts to your specific needs."
    },
    {
      question: "How secure is my game data?",
      answer: "We take data security very seriously. All data is encrypted in transit and at rest, and we follow industry best practices for data protection. We're also GDPR compliant and never share your data with third parties."
    },
    {
      question: "Can I export my analytics data?",
      answer: "Yes, you can export your data in various formats including CSV, JSON, and PDF reports. Our API also allows for automated data exports and integration with other tools you might be using."
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#20243F] mb-6">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-[#20243F] hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
