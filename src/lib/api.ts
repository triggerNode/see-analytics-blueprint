
import { supabase } from '@/integrations/supabase/client';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface ApiConfig {
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    // Use the full Supabase URL for edge functions
    this.baseUrl = 'https://xbyazuwuvwcggteiuvtq.supabase.co/functions/v1';
  }

  async callEdgeFunction<T>(
    functionName: string, 
    params?: Record<string, string>,
    config: ApiConfig = {}
  ): Promise<ApiResponse<T>> {
    const { timeout = 10000, retries = 2 } = config;
    
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const url = new URL(`${this.baseUrl}/${functionName}`);
        
        // Add query parameters
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
          });
        }

        console.log(`API call attempt ${attempt + 1}:`, url.toString());

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${supabase.supabaseKey}`,
            'apikey': supabase.supabaseKey,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || `API call failed: ${response.status}`);
        }

        console.log(`API call successful:`, responseData);
        return { data: responseData as T };

      } catch (error) {
        lastError = error as Error;
        console.error(`API call attempt ${attempt + 1} failed:`, error);
        
        // Don't retry on the last attempt
        if (attempt < retries) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    return { 
      error: lastError?.message || 'API call failed after all retries' 
    };
  }

  async fetchRobloxMetrics(placeId: number): Promise<ApiResponse<any>> {
    return this.callEdgeFunction('proxyRobloxMetrics', { 
      placeId: placeId.toString() 
    });
  }
}

export const apiClient = new ApiClient();
