
import React from 'react';

interface EventRowProps {
  event: {
    id: string;
    event_type: string;
    player_id: string;
    timestamp: string;
    data: any;
  };
}

const EventRow = ({ event }: EventRowProps) => {
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now.getTime() - eventTime.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ago`;
  };

  const getEventTypeStyle = (eventType: string) => {
    switch (eventType) {
      case 'player_join':
        return 'text-green-600';
      case 'player_death':
        return 'text-red-600';
      case 'purchase_success':
        return 'text-blue-600';
      case 'level_complete':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatEventType = (eventType: string) => {
    return eventType.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getInitials = (playerId: string) => {
    return playerId.slice(-2).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="w-8 h-8 bg-gradient-to-br from-[#A992FF] to-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-medium">
          {getInitials(event.player_id)}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className={`font-semibold text-sm ${getEventTypeStyle(event.event_type)}`}>
            {formatEventType(event.event_type)}
          </span>
          <span className="text-gray-500 text-sm">by {event.player_id}</span>
        </div>
        {event.data && Object.keys(event.data).length > 0 && (
          <div className="text-xs text-gray-400 mt-1 truncate">
            {JSON.stringify(event.data)}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-400 flex-shrink-0">
        {getRelativeTime(event.timestamp)}
      </div>
    </div>
  );
};

export default EventRow;
