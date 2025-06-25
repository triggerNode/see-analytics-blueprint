
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F5F2FF] to-[#E0EEFF] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-[#20243F] mb-2">
            {"{s}ee"} Analytics
          </div>
          <p className="text-gray-600">Create your account</p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          view="sign_up"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#20243F',
                  brandAccent: '#2a2f4f',
                  brandButtonText: 'white',
                  defaultButtonBackground: '#20243F',
                  defaultButtonBackgroundHover: '#2a2f4f',
                  inputBackground: 'white',
                  inputBorder: '#e2e8f0',
                  inputBorderHover: '#20243F',
                  inputBorderFocus: '#20243F',
                }
              }
            },
            className: {
              container: 'auth-container',
              button: 'auth-button',
              input: 'auth-input',
            }
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/dashboard`}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#20243F] hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
