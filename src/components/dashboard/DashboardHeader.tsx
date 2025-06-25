
import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  scrolled: boolean;
}

const DashboardHeader = ({ scrolled }: DashboardHeaderProps) => {
  return (
    <header 
      className={`sticky top-0 z-20 h-16 flex items-center justify-between px-6 transition-all duration-200 ${
        scrolled 
          ? 'bg-white/72 backdrop-blur-md border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-[#20243F]">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-[#20243F] hover:bg-white/50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-[#20243F] hover:bg-white/50 relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 7h6m0 4h6m-6 4h6m-6 4h6" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
