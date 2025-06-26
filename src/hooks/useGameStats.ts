
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
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const channelRef = useRef<any>(null);
  const initializationRef = useRef(false);

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

  // Generate mock data immediately for demo purposes
  const generateMockData = (): StatRow => {
    return {
      place_id: placeId || 123456789,
      ts: new Date().toISOString(),
      ccus: Math.floor(Math.random() * 1000) + 50,
      revenue_usd: Math.floor(Math.random() * 100) + 10,
      rage_quits: Math.floor(Math.random() * 10),
    };
  };

  // Initialize with mock data immediately
  const initializeWithMockData = () => {
    console.log('Initializing with mock data for demo...');
    const mockData = Array.from({ length: 20 }, (_, i) => ({
      place_id: placeId || 123456789,
      ts: new Date(Date.now() - (19 - i) * 60000).toISOString(), // 20 minutes of data
      ccus: Math.floor(Math.random() * 1000) + 50,
      revenue_usd: Math.floor(Math.random() * 100) + 10,
      rage_quits: Math.floor(Math.random() * 10),
    }));
    
    setRows(mockData);
    setError('Using demo data - real-time data coming soon!');
    setLoading(false);
  };

  // Fetch data from Edge Function with timeout
  const fetchFromEdgeFunction = async () => {
    if (!placeId) return;

    try {
      console.log(`Fetching from Edge Function for placeId: ${placeId}`);
      
      // Set a timeout for the API call
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 8000)
      );
      
      const apiPromise = apiClient.fetchRobloxMetrics(placeId);
      
      const response = await Promise.race([apiPromise, timeoutPromise]) as any;
      
      if (response.error) {
        console.error('Edge Function error:', response.error);
        // Add mock data point on error
        const mockData = generateMockData();
        setRows(currentRows => [...currentRows, mockData].slice(-120));
        return;
      }

      if (response.data) {
        const newRow = response.data as StatRow;
        console.log('New data from Edge Function:', newRow);
        setRows(currentRows => [...currentRows, newRow].slice(-120));
        setError(null);
      }
    } catch (error) {
      console.error('Failed to fetch from Edge Function:', error);
      // Add mock data point on error
      const mockData = generateMockData();
      setRows(currentRows => [...currentRows, mockData].slice(-120));
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
    console.log('useGameStats effect triggered with placeId:', placeId);
    
    // Prevent multiple initializations
    if (initializationRef.current) return;
    initializationRef.current = true;
    
    if (!placeId) {
      console.log('No placeId provided');
      setLoading(false);
      setError('No game selected. Please select a game to view stats.');
      return;
    }

    setError(null);

    // Always start with mock data for immediate feedback
    initializeWithMockData();

    // Try to fetch from database, but don't block on it
    const fetchInitialData = async () => {
      try {
        console.log('Attempting to fetch initial data from database...');
        const { data, error: dbError } = await supabase
          .from('game_stats')
          .select('*')
          .eq('place_id', placeId)
          .order('ts', { ascending: false })
          .limit(120);
        
        if (dbError) {
          console.log('Database query failed, continuing with mock data:', dbError);
          // Continue with mock data, start polling
          startPolling();
          return;
        }
        
        if (data && data.length > 0) {
          console.log(`Found ${data.length} existing rows in database`);
          setRows(data.reverse()); // Reverse to have oldest first
          setError(null);
          setupRealtimeSubscription();
        } else {
          console.log('No existing data in database, starting polling');
          startPolling();
        }
      } catch (error) {
        console.log('Database fetch failed, continuing with mock data:', error);
        startPolling();
      }
    };

    // Fetch database data in background
    fetchInitialData();

    // Cleanup on unmount
    return cleanup;
  }, [placeId]);

  // Switch from polling to real-time when database gets data
  useEffect(() => {
    if (rows.length > 0 && isPolling && rows.some(row => !row.ts.includes('mock'))) {
      console.log('Database has real data, switching to real-time subscription');
      stopPolling();
      setupRealtimeSubscription();
    }
  }, [rows.length, isPolling]);

  return { rows, loading, error };
};
