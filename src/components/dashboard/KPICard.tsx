
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, TrendingUp, BarChart3, PieChart } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: 'activity' | 'trending-up' | 'bar-chart-3' | 'pie-chart';
}

const iconMap = {
  'activity': Activity,
  'trending-up': TrendingUp,
  'bar-chart-3': BarChart3,
  'pie-chart': PieChart,
};

const KPICard = ({ title, value, subtitle, icon }: KPICardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 min-h-[135px]">
      <CardContent className="p-6 flex flex-col gap-1">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-[#4B6AFF]/10 rounded-lg">
            <IconComponent className="w-6 h-6 text-[#4B6AFF]" />
          </div>
        </div>
        
        <div className="space-y-1 flex-1 flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-[#18181B]">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
