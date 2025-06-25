
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ChartCardProps {
  type: 'line' | 'bar' | 'area';
  title: string;
  data: any[];
  value?: string;
  subtitle?: string;
  peak?: string;
  color?: string;
}

const ChartCard = ({ type, title, data, value, subtitle, peak, color = "#20243F" }: ChartCardProps) => {
  const chartConfig = {
    value: {
      label: "Value",
      color: color,
    },
  };

  const renderChart = () => {
    const commonProps = {
      data: type === 'line' ? data.map((val, idx) => ({ day: idx, value: val })) : data,
      margin: { top: 5, right: 5, left: 5, bottom: 5 }
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2} 
              dot={false}
            />
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fill={`${color}20`} 
              strokeWidth={2}
            />
          </AreaChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        {peak && (
          <p className="text-sm text-gray-600">Peak: {peak}</p>
        )}
      </CardHeader>
      
      <CardContent>
        {(value || subtitle) && (
          <div className="mb-4">
            {value && <p className="text-2xl font-bold text-gray-900">{value}</p>}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        )}
        
        <ChartContainer config={chartConfig} className="h-[200px]">
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
