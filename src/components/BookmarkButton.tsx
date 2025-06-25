
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const BookmarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Button
      onClick={toggleBookmark}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 ${
        isBookmarked 
          ? 'bg-[#A992FF] hover:bg-[#A992FF]/90' 
          : 'bg-white border-2 border-[#20243F] hover:bg-[#20243F]'
      }`}
    >
      <svg 
        className={`w-6 h-6 transition-colors ${
          isBookmarked ? 'text-white' : 'text-[#20243F] hover:text-white'
        }`} 
        fill={isBookmarked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </Button>
  );
};

export default BookmarkButton;
