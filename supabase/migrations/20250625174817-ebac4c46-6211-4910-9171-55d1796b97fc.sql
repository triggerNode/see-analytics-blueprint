
-- Create events table for real-time game events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  player_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (make events publicly readable for demo)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (since this is a demo dashboard)
CREATE POLICY "Events are publicly readable" 
  ON public.events 
  FOR SELECT 
  USING (true);

-- Create policy for inserting events (for testing/seeding data)
CREATE POLICY "Anyone can insert events" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (true);

-- Enable realtime for the events table
ALTER TABLE public.events REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;

-- Insert some sample events for testing
INSERT INTO public.events (event_type, player_id, data) VALUES
  ('player_join', 'Player_001', '{"level": 1, "source": "tutorial"}'),
  ('level_complete', 'Player_123', '{"level": 3, "time": 145, "score": 2840}'),
  ('purchase_success', 'Player_456', '{"item": "sword", "price": 99, "currency": "gold"}'),
  ('player_death', 'Player_789', '{"level": 2, "cause": "monster", "position": {"x": 100, "y": 200}}'),
  ('tutorial_start', 'Player_001', '{"step": 1}');
