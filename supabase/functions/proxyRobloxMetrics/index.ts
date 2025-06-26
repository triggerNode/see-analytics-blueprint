
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

serve(async (req) => {
  console.log('proxyRobloxMetrics: Function invoked with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('proxyRobloxMetrics: Handling CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    console.log('proxyRobloxMetrics: Method not allowed:', req.method);
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const url = new URL(req.url);
    const placeId = url.searchParams.get('placeId');

    console.log('proxyRobloxMetrics: Processing request for placeId:', placeId);

    if (!placeId) {
      console.error('proxyRobloxMetrics: No placeId provided');
      return new Response(
        JSON.stringify({ error: 'placeId parameter is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`proxyRobloxMetrics: Fetching metrics for placeId: ${placeId}`);

    // First, convert placeId to universeId using Roblox public API
    console.log('proxyRobloxMetrics: Converting placeId to universeId...');
    const universeResponse = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
      {
        headers: {
          'User-Agent': 'TriggerNode-Analytics/1.0'
        }
      }
    );

    if (!universeResponse.ok) {
      const errorMsg = `Failed to get universe ID: ${universeResponse.status}`;
      console.error('proxyRobloxMetrics:', errorMsg);
      throw new Error(errorMsg);
    }

    const universeData = await universeResponse.json();
    const universeId = universeData.universeId;

    console.log('proxyRobloxMetrics: Got universeId:', universeId);

    if (!universeId) {
      const errorMsg = 'Could not find universe ID for this place';
      console.error('proxyRobloxMetrics:', errorMsg);
      throw new Error(errorMsg);
    }

    // Get game info using the universeId
    console.log('proxyRobloxMetrics: Fetching game info...');
    const gameInfoResponse = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`,
      {
        headers: {
          'User-Agent': 'TriggerNode-Analytics/1.0'
        }
      }
    );

    if (!gameInfoResponse.ok) {
      const errorMsg = `Failed to get game info: ${gameInfoResponse.status}`;
      console.error('proxyRobloxMetrics:', errorMsg);
      throw new Error(errorMsg);
    }

    const gameInfo = await gameInfoResponse.json();
    const gameData = gameInfo.data?.[0];

    if (!gameData) {
      const errorMsg = 'No game data found';
      console.error('proxyRobloxMetrics:', errorMsg);
      throw new Error(errorMsg);
    }

    // Transform the data to match our StatRow interface
    const currentTime = new Date().toISOString();
    const transformedData = {
      place_id: parseInt(placeId),
      ts: currentTime,
      ccus: gameData.playing || 0,
      revenue_usd: 0, // Not available in public API
      rage_quits: Math.floor(Math.random() * 10), // Mock data for demo
    };

    console.log(`proxyRobloxMetrics: Successfully processed data for placeId ${placeId}:`, transformedData);

    return new Response(
      JSON.stringify(transformedData),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=5', // 5-second cache
        },
      }
    );

  } catch (error) {
    console.error('proxyRobloxMetrics: Error occurred:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch Roblox metrics',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
