
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface GameSelectorModalProps {
  open: boolean;
  onPlaceIdSelected: (placeId: number) => void;
}

const GameSelectorModal = ({ open, onPlaceIdSelected }: GameSelectorModalProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const extractPlaceId = (input: string): number | null => {
    // Clear any previous errors
    setError(null);
    
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

  const handleSubmit = async () => {
    console.log('GameSelectorModal: Attempting to submit with input:', url);
    
    setIsLoading(true);
    setError(null);
    
    const placeId = extractPlaceId(url);
    
    if (!placeId) {
      const errorMsg = "Invalid input. Please enter a valid Roblox game URL or Place ID";
      console.error('GameSelectorModal:', errorMsg);
      setError(errorMsg);
      toast({
        title: "Invalid input",
        description: errorMsg,
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log('GameSelectorModal: Extracted placeId:', placeId);
      localStorage.setItem('placeId', placeId.toString());
      onPlaceIdSelected(placeId);
      setUrl('');
      
      toast({
        title: "Game selected!",
        description: `Now tracking Place ID: ${placeId}`
      });
      
      console.log('GameSelectorModal: Successfully set placeId');
    } catch (error) {
      const errorMsg = 'Failed to save game selection';
      console.error('GameSelectorModal error:', error);
      setError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1A2136]">Select Your Roblox Game</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div>
            <label htmlFor="game-url-input" className="text-sm font-medium text-gray-700 mb-2 block">
              Game URL or Place ID
            </label>
            <Input
              id="game-url-input"
              name="gameUrl"
              placeholder="https://www.roblox.com/games/123456789/game-name or just 123456789"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-[#22D3EE]/20 focus:border-[#22D3EE]"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste your Roblox game URL or enter the Place ID directly
            </p>
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#1A2136] hover:bg-[#1A2136]/90"
            disabled={!url.trim() || isLoading}
          >
            {isLoading ? 'Processing...' : 'Start Tracking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameSelectorModal;
