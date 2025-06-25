
import React, { useState, useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventRow from './EventRow';

interface Event {
  id: string;
  event_type: string;
  player_id: string;
  timestamp: string;
  data: any;
}

const RealTimeFeed = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

  const loadInitialEvents = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(200);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading initial events:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setupRealtimeSubscription = useCallback(() => {
    const channel = supabase
      .channel('events-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          if (!isPaused) {
            setEvents(prev => {
              const newEvents = [payload.new as Event, ...prev];
              return newEvents.slice(0, 200); // Keep only latest 200 events
            });
          }
        }
      )
      .subscribe();

    setSubscription(channel);
  }, [isPaused]);

  useEffect(() => {
    loadInitialEvents();
    setupRealtimeSubscription();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [loadInitialEvents, setupRealtimeSubscription]);

  useEffect(() => {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
    if (!isPaused) {
      setupRealtimeSubscription();
    }
  }, [isPaused, setupRealtimeSubscription]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const EventListItem = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <EventRow event={events[index]} />
    </div>
  );

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#20243F]">Real-Time Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#20243F]">Real-Time Events</CardTitle>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <Button
              variant="outline"
              size="sm"
              onClick={togglePause}
              className="text-[#20243F] border-[#20243F]/20"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {events.length} events • {isPaused ? 'Paused' : 'Live'}
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden">
        {events.length > 0 ? (
          <List
            height={600}
            itemCount={events.length}
            itemSize={80}
            width="100%"
          >
            {EventListItem}
          </List>
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-500">
            No events yet. Waiting for real-time data...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeFeed;
