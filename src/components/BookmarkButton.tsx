
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookmarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmarked!",
      description: isBookmarked 
        ? "Removed from your bookmarks" 
        : "Added to your bookmarks for easy access",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleBookmark}
        size="lg"
        className={`rounded-full shadow-lg hover:shadow-xl transition-all ${
          isBookmarked 
            ? 'bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#1A2136]' 
            : 'bg-[#1A2136] hover:bg-[#1A2136]/90 text-white'
        }`}
      >
        {isBookmarked ? (
          <BookmarkCheck className="w-5 h-5 mr-2" />
        ) : (
          <Bookmark className="w-5 h-5 mr-2" />
        )}
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </Button>
    </div>
  );
};

export default BookmarkButton;
