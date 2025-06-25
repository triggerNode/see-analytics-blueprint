
# {s}ee Analytics

> **Real-time game analytics dashboard for data-driven game development**

A comprehensive analytics platform built with React, TypeScript, and Supabase, designed specifically for game developers who need actionable insights about their players and game performance.

![{s}ee Analytics Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![Authentication](https://img.shields.io/badge/Auth-Supabase-blue)
![UI Framework](https://img.shields.io/badge/UI-Shadcn%2FUI-purple)

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure Authentication**: Email/password login with Supabase Auth
- **Admin System**: Automatic admin privileges for designated emails
- **Subscription Tiers**: Free and Pro tiers with feature gating
- **Protected Routes**: Authentication-gated dashboard access

### 📊 Analytics Dashboard
- **Real-time Monitoring**: Live player activity and event tracking
- **Funnel Analysis**: Conversion tracking with interactive visualizations
- **Economy Insights**: Currency sources and sinks analysis
- **Retention Metrics**: Player return rate analysis
- **A/B Testing**: Experimentation framework (coming soon)

### 🎨 Modern UI/UX
- **Glass-morphism Design**: Modern aesthetic with gradient backgrounds
- **Responsive Layout**: Optimized for desktop and mobile
- **Interactive Charts**: Powered by Recharts library
- **Smooth Animations**: Polished user experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd see-analytics

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup
The project includes automatic migrations for:
- User profiles with admin flags
- Events tracking table
- Row-Level Security policies

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Shadcn/UI components
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Charts**: Recharts
- **Routing**: React Router v6

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/             # Shadcn/UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Route components
└── integrations/       # External service integrations

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

## 🔧 Configuration

### Admin Users
Admin privileges are automatically granted to:
- `olu@triggernode.com`
- `founder@triggernode.com`
- `admin@triggernode.com`

### Feature Flags
Premium features are controlled via the `useFeature` hook:
```typescript
const hasPremium = useFeature('premiumOnly');
```

## 📚 Documentation

- [**Project Status Report**](PROJECT_STATUS_REPORT.md) - Comprehensive current state
- [**Changelog**](CHANGELOG.md) - Version history and updates
- [**Deployment Guide**](DEPLOYMENT_GUIDE.md) - Production deployment instructions

## 🛡️ Security

- Row-Level Security (RLS) enabled on all database tables
- Admin access controlled via email whitelist
- Protected API endpoints with authentication
- Secure edge functions with proper CORS handling

## 🎯 Use Cases

Perfect for game developers who need:
- **Player Behavior Analysis**: Understand how players interact with your game
- **Conversion Optimization**: Track and improve key game metrics
- **Real-time Monitoring**: Stay informed about live game performance
- **Business Intelligence**: Make data-driven decisions about game development

## 🔄 Development Status

| Feature | Status |
|---------|--------|
| Authentication System | ✅ Complete |
| Dashboard UI | ✅ Complete |
| Real-time Feed | ✅ Complete |
| Funnel Analysis | ✅ UI Complete |
| Economy Tracking | ✅ UI Complete |
| Retention Analysis | 🔄 In Development |
| A/B Testing | 🔄 Planned |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is proprietary software developed for game analytics.

## 🏢 About

**{s}ee Analytics** is developed by [TriggerNode](https://triggernode.com), a tech partner specializing in AI and automation solutions for growing companies.

---

**Live Preview**: [https://loving-hugle-c2b5d0.lovable.app](https://loving-hugle-c2b5d0.lovable.app)

*Built with ❤️ for the game development community*
