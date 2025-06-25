
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { uiConfig } from '@/lib/uiConfig';

const EconomyPage = () => {
  // Static dummy data
  const sourcesData = [
    { name: 'Mon', value: 1200 },
    { name: 'Tue', value: 1800 },
    { name: 'Wed', value: 1600 },
    { name: 'Thu', value: 2100 },
    { name: 'Fri', value: 1900 },
    { name: 'Sat', value: 2400 },
    { name: 'Sun', value: 2200 }
  ];

  const sinksData = [
    { name: 'Mon', value: 800 },
    { name: 'Tue', value: 1200 },
    { name: 'Wed', value: 1100 },
    { name: 'Thu', value: 1500 },
    { name: 'Fri', value: 1300 },
    { name: 'Sat', value: 1800 },
    { name: 'Sun', value: 1600 }
  ];

  const totalSources = sourcesData.reduce((sum, item) => sum + item.value, 0);
  const totalSinks = sinksData.reduce((sum, item) => sum + item.value, 0);
  const sinkPercentage = (totalSinks / totalSources) * 100;

  const sourcesConfig = {
    value: { label: "Currency Earned", color: "#22C55E" }
  };

  const sinksConfig = {
    value: { label: "Currency Spent", color: "#EF4444" }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#20243F]">Economy Overview</h1>

      {sinkPercentage < 50 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Currency sinks are below 50% of sources. Consider adding more spending opportunities to maintain economic balance.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`${uiConfig.colors.card.background} ${uiConfig.colors.card.backdrop} border-0 ${uiConfig.colors.card.shadow}`}>
          <CardHeader>
            <CardTitle className="text-[#20243F] flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Currency Sources
            </CardTitle>
            <p className="text-sm text-gray-600">How players earn currency</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#20243F] mb-4">
              {totalSources.toLocaleString()} coins/week
            </div>
            <ChartContainer config={sourcesConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={sourcesData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-value)" 
                    fill="var(--color-value)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className={`${uiConfig.colors.card.background} ${uiConfig.colors.card.backdrop} border-0 ${uiConfig.colors.card.shadow}`}>
          <CardHeader>
            <CardTitle className="text-[#20243F] flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Currency Sinks
            </CardTitle>
            <p className="text-sm text-gray-600">How players spend currency</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#20243F] mb-4">
              {totalSinks.toLocaleString()} coins/week ({sinkPercentage.toFixed(1)}%)
            </div>
            <ChartContainer config={sinksConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={sinksData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-value)" 
                    fill="var(--color-value)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EconomyPage;
