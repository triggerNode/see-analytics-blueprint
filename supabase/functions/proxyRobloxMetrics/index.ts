
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const url = new URL(req.url);
    const placeId = url.searchParams.get('placeId');

    if (!placeId) {
      return new Response(
        JSON.stringify({ error: 'placeId parameter is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching metrics for placeId: ${placeId}`);

    // First, convert placeId to universeId using Roblox public API
    const universeResponse = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
      {
        headers: {
          'User-Agent': 'TriggerNode-Analytics/1.0'
        }
      }
    );

    if (!universeResponse.ok) {
      throw new Error(`Failed to get universe ID: ${universeResponse.status}`);
    }

    const universeData = await universeResponse.json();
    const universeId = universeData.universeId;

    if (!universeId) {
      throw new Error('Could not find universe ID for this place');
    }

    // Get game info using the universeId
    const gameInfoResponse = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`,
      {
        headers: {
          'User-Agent': 'TriggerNode-Analytics/1.0'
        }
      }
    );

    if (!gameInfoResponse.ok) {
      throw new Error(`Failed to get game info: ${gameInfoResponse.status}`);
    }

    const gameInfo = await gameInfoResponse.json();
    const gameData = gameInfo.data?.[0];

    if (!gameData) {
      throw new Error('No game data found');
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

    console.log(`Successfully fetched data for placeId ${placeId}:`, transformedData);

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
    console.error('Error in proxyRobloxMetrics:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch Roblox metrics',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
