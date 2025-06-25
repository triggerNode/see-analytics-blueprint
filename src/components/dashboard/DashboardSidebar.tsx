
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { routes } from '@/routes';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const { user, isAdmin, tier, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: routes.dashboard.root, badge: null },
    { name: 'Real-Time', path: routes.dashboard.realtime, badge: '3' },
    { name: 'Funnels', path: routes.dashboard.funnels, badge: null },
    { name: 'Economy', path: routes.dashboard.economy, badge: null },
    { name: 'A/B Tests', path: routes.dashboard.abtests, badge: null },
    { name: 'Retention', path: routes.dashboard.retention, badge: null }
  ];

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
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === routes.dashboard.root}
            className={({ isActive }) =>
              `flex items-center justify-start text-left transition-all duration-200 rounded-md ${
                collapsed ? 'px-3 py-2' : 'px-4 py-2'
              } ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <div className="flex items-center justify-between w-full">
              <span className={collapsed ? 'sr-only' : ''}>{item.name}</span>
              {item.badge && !collapsed && (
                <Badge variant="destructive" className="bg-red-500 text-white text-xs">
                  {item.badge}
                </Badge>
              )}
            </div>
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        {!collapsed && user && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-white/60 capitalize">{tier}</span>
                  {isAdmin && (
                    <Badge className="bg-gradient-to-r from-[#A992FF] to-[#7C3AED] text-white text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={`w-full text-white/70 hover:text-white hover:bg-white/5 ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
