
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  useEffect(() => {
    if (!placeId) {
      setLoading(false);
      return;
    }

    // Fetch initial data
    const fetchInitialData = async () => {
      const { data } = await supabase
        .from('game_stats')
        .select('*')
        .eq('place_id', placeId)
        .order('ts', { ascending: false })
        .limit(120);
      
      if (data) {
        setRows(data.reverse()); // Reverse to have oldest first
      }
      setLoading(false);
    };

    fetchInitialData();

    // Set up real-time subscription
    const channel = supabase
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
          setRows(currentRows => [...currentRows.slice(-119), payload.new as StatRow]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [placeId]);

  return { rows, loading };
};
