
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { uiConfig } from '@/lib/uiConfig';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${uiConfig.colors.background.gradient} w-full`}>
      {/* Diamond grid background */}
      <div 
        className={`fixed inset-0 ${uiConfig.colors.background.diamond.opacity} pointer-events-none`}
        style={{
          backgroundImage: uiConfig.colors.background.diamond.pattern,
          backgroundSize: uiConfig.colors.background.diamond.size
        }}
      />
      
      <div className="flex w-full">
        <DashboardSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`flex-1 ${uiConfig.animation.transition} ${
          sidebarCollapsed ? uiConfig.sidebar.collapsed : uiConfig.sidebar.expanded
        }`}>
          <DashboardHeader scrolled={scrolled} />
          
          <div className="p-6">
            <div className={uiConfig.animation.fadeIn}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
