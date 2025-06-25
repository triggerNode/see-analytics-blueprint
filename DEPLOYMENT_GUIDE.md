
# Deployment Guide - {s}ee Analytics

## 📋 Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Git repository (recommended: GitHub)

## 🚀 Quick Start

### 1. Environment Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase project and obtain credentials
4. Configure environment variables (handled via Supabase secrets)

### 2. Database Setup
The project includes migrations that will automatically set up:
- `profiles` table for user authentication
- `events` table for analytics data
- Row-Level Security policies
- Edge function for profile creation

### 3. Authentication Configuration
The system automatically grants admin privileges to these emails:
- `olu@triggernode.com`
- `founder@triggernode.com`
- `admin@triggernode.com`

To modify admin emails, update the `create-profile` edge function.

### 4. Development
```bash
npm run dev
```

### 5. Production Deployment
The application can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service

## 🔧 Configuration

### Supabase Settings
1. **Authentication > URL Configuration**
   - Site URL: Your production domain
   - Redirect URLs: Add your domains

2. **Database > Realtime** (optional)
   - Enable for real-time event updates

3. **Edge Functions**
   - The `create-profile` function deploys automatically

### Feature Flags
Premium features are controlled by the `useFeature` hook:
```typescript
const hasPremium = useFeature('premiumOnly');
// Returns true for admin users or 'pro' tier subscribers
```

## 🛡️ Security Checklist
- ✅ RLS enabled on all tables
- ✅ Admin privileges restricted to whitelist
- ✅ Protected routes implemented
- ✅ Secure edge functions with CORS
- ✅ Input validation on forms

## 📊 Analytics Integration
To connect real game data:
1. Send events to the `events` table via Supabase client
2. Update dashboard queries to use real data
3. Configure retention calculations in database

## 🔍 Monitoring
- Supabase Dashboard: Database metrics and logs
- Browser DevTools: Client-side debugging
- Edge Function Logs: Server-side debugging

## 🚨 Troubleshooting

### Common Issues
1. **Auth redirect errors**: Check URL configuration in Supabase
2. **RLS policy violations**: Ensure user_id is set correctly
3. **Edge function errors**: Check logs in Supabase dashboard

### Support
- Check the PROJECT_STATUS_REPORT.md for current implementation status
- Review CHANGELOG.md for recent changes
- Consult Supabase documentation for backend issues
