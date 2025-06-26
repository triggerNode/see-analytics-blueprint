
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface GameSelectorModalProps {
  open: boolean;
  onPlaceIdSelected: (placeId: number) => void;
}

const GameSelectorModal = ({ open, onPlaceIdSelected }: GameSelectorModalProps) => {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const extractPlaceId = (input: string): number | null => {
    // Try to match URL pattern: /games/123456789/
    const urlMatch = input.match(/games\/(\d+)/);
    if (urlMatch) {
      return parseInt(urlMatch[1]);
    }
    
    // Try to match plain number
    const numberMatch = input.match(/^\d+$/);
    if (numberMatch) {
      return parseInt(input);
    }
    
    return null;
  };

  const handleSubmit = () => {
    const placeId = extractPlaceId(url);
    
    if (!placeId) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid Roblox game URL or Place ID",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('placeId', placeId.toString());
    onPlaceIdSelected(placeId);
    setUrl('');
    
    toast({
      title: "Game selected!",
      description: `Now tracking Place ID: ${placeId}`
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1A2136]">Select Your Roblox Game</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Game URL or Place ID
            </label>
            <Input
              placeholder="https://www.roblox.com/games/123456789/game-name or just 123456789"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border-[#22D3EE]/20 focus:border-[#22D3EE]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste your Roblox game URL or enter the Place ID directly
            </p>
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#1A2136] hover:bg-[#1A2136]/90"
            disabled={!url.trim()}
          >
            Start Tracking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameSelectorModal;
