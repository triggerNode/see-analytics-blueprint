
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', badge: null },
    { name: 'Real-Time', path: '/realtime', badge: '3' },
    { name: 'Funnels', path: '#', badge: null },
    { name: 'A/B Tests', path: '#', badge: null },
    { name: 'Retention', path: '#', badge: null },
    { name: 'Settings', path: '#', badge: null }
  ];

  const handleNavigation = (path: string) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-[#20243F] text-white transition-all duration-300 z-30 ${
        collapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#A992FF] to-[#7C3AED] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{'{s}'}</span>
              </div>
              <span className="text-xl font-bold">ee Analytics</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-white hover:bg-white/10 w-8 h-8"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleNavigation(item.path)}
              className={`w-full justify-start text-left transition-all duration-200 ${
                collapsed ? 'px-3' : 'px-4'
              } ${
                isActive 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={collapsed ? 'sr-only' : ''}>{item.name}</span>
                {item.badge && !collapsed && (
                  <Badge variant="destructive" className="bg-red-500 text-white text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
