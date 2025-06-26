
-- Create game_stats table for real-time dashboard data
CREATE TABLE IF NOT EXISTS public.game_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id BIGINT NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT now(),
  ccus INTEGER DEFAULT 0,
  revenue_usd NUMERIC(10,2) DEFAULT 0,
  rage_quits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient real-time queries
CREATE INDEX IF NOT EXISTS idx_game_stats_place_id_ts ON public.game_stats(place_id, ts DESC);

-- Enable row level security
ALTER TABLE public.game_stats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read game stats
CREATE POLICY "Allow authenticated users to read game stats" ON public.game_stats
  FOR SELECT TO authenticated
  USING (true);

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_stats;

-- Set replica identity for real-time updates
ALTER TABLE public.game_stats REPLICA IDENTITY FULL;
