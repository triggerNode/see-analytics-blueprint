
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;

      setMagicLinkSent(true);
      toast({
        title: "Magic link sent!",
        description: "Check your email for a sign-in link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for social auth (commented until env vars are set)
  const handleSocialAuth = async (provider: 'google' | 'discord') => {
    toast({
      title: "Coming Soon",
      description: `${provider} authentication will be available once configured.`,
    });
    
    // Uncomment when client IDs are configured:
    // const { error } = await supabase.auth.signInWithOAuth({
    //   provider,
    //   options: {
    //     redirectTo: `${window.location.origin}/dashboard`
    //   }
    // });
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-purple-50/30 to-blue-50/40 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center">
          <div className="text-3xl font-bold text-[#1A2136] mb-2">
            Check Your Email
          </div>
          <p className="text-gray-600 mb-6">
            We've sent a magic link to <strong>{email}</strong>
          </p>
          <Button
            onClick={() => setMagicLinkSent(false)}
            variant="outline"
            className="border-[#1A2136] text-[#1A2136] hover:bg-[#1A2136] hover:text-white"
          >
            Try Different Email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-purple-50/30 to-blue-50/40 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-[#1A2136] mb-2">
            {"{s}ee"} Analytics
          </div>
          <p className="text-gray-600">Sign in to your dashboard</p>
        </div>
        
        <form onSubmit={handleMagicLink} className="space-y-4 mb-6">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 focus:border-[#22D3EE] rounded-xl"
            required
          />
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A2136] hover:bg-[#1A2136]/90 text-white py-3 rounded-xl font-semibold"
          >
            {isLoading ? 'Sending...' : 'Send Magic Link'}
          </Button>
        </form>

        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <Button
            onClick={() => handleSocialAuth('google')}
            variant="outline"
            disabled
            className="w-full border-2 border-gray-300 text-gray-400 py-3 rounded-xl"
          >
            🔒 Google (Coming Soon)
          </Button>
          
          <Button
            onClick={() => handleSocialAuth('discord')}
            variant="outline"
            disabled
            className="w-full border-2 border-gray-300 text-gray-400 py-3 rounded-xl"
          >
            🔒 Discord (Coming Soon)
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to {"{s}ee"} Analytics?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[#22D3EE] hover:underline font-medium"
            >
              Start free trial
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
