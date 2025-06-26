import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { apiClient } from '@/lib/api';

export interface StatRow {
  place_id: number;
  ts: string;
  ccus: number;
  revenue_usd: number;
  rage_quits: number;
}

export const useGameStats = (placeId?: number) => {
  const [rows, setRows] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const channelRef = useRef<any>(null);

  // Cleanup function
  const cleanup = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
  };

  // Fetch data from Edge Function
  const fetchFromEdgeFunction = async () => {
    if (!placeId) return;

    try {
      console.log(`Polling Edge Function for placeId: ${placeId}`);
      const response = await apiClient.fetchRobloxMetrics(placeId);
      
      if (response.error) {
        console.error('Edge Function error:', response.error);
        return;
      }

      if (response.data) {
        const newRow = response.data as StatRow;
        console.log('New data from Edge Function:', newRow);
        
        setRows(currentRows => {
          // Add new row and keep last 120
          const updatedRows = [...currentRows, newRow].slice(-120);
          return updatedRows;
        });
      }
    } catch (error) {
      console.error('Failed to fetch from Edge Function:', error);
    }
  };

  // Start polling Edge Function
  const startPolling = () => {
    if (isPolling || !placeId) return;
    
    console.log('Starting Edge Function polling...');
    setIsPolling(true);
    
    // Fetch immediately
    fetchFromEdgeFunction();
    
    // Then poll every 10 seconds
    pollIntervalRef.current = setInterval(fetchFromEdgeFunction, 10000);
  };

  // Stop polling
  const stopPolling = () => {
    if (!isPolling) return;
    
    console.log('Stopping Edge Function polling...');
    setIsPolling(false);
    
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  // Setup real-time subscription
  const setupRealtimeSubscription = () => {
    if (!placeId || channelRef.current) return;

    console.log('Setting up real-time subscription...');
    
    channelRef.current = supabase
      .channel('realtime:public:game_stats')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'game_stats', 
          filter: `place_id=eq.${placeId}` 
        },
        (payload) => {
          console.log('Real-time data received:', payload.new);
          setRows(currentRows => [...currentRows.slice(-119), payload.new as StatRow]);
        }
      )
      .subscribe();
  };

  useEffect(() => {
    if (!placeId) {
      setLoading(false);
      return;
    }

    // Fetch initial data from database
    const fetchInitialData = async () => {
      try {
        const { data } = await supabase
          .from('game_stats')
          .select('*')
          .eq('place_id', placeId)
          .order('ts', { ascending: false })
          .limit(120);
        
        if (data && data.length > 0) {
          console.log(`Found ${data.length} existing rows in database`);
          setRows(data.reverse()); // Reverse to have oldest first
          
          // Setup real-time subscription since we have database data
          setupRealtimeSubscription();
        } else {
          console.log('No existing data, starting Edge Function polling');
          // No database data, start polling Edge Function
          startPolling();
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        // Fallback to polling if database fetch fails
        startPolling();
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Cleanup on unmount or placeId change
    return cleanup;
  }, [placeId]);

  // Switch from polling to real-time when database gets data
  useEffect(() => {
    if (rows.length > 0 && isPolling) {
      console.log('Database has data, switching to real-time subscription');
      stopPolling();
      setupRealtimeSubscription();
    }
  }, [rows.length, isPolling]);

  return { rows, loading };
};
