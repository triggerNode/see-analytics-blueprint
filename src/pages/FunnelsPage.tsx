
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { uiConfig } from '@/lib/uiConfig';

const FunnelsPage = () => {
  // Placeholder data - will be replaced with Supabase RPC call
  const funnelData = [
    { step: 'Tutorial Start', completed: 1000 },
    { step: 'First Level', completed: 850 },
    { step: 'Second Level', completed: 720 },
    { step: 'Purchase Prompt', completed: 580 },
    { step: 'Purchase Complete', completed: 230 },
  ];

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#A992FF",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#20243F]">Funnel Analysis</h1>
        <Button disabled className="opacity-50 cursor-not-allowed">
          Add Step
        </Button>
      </div>

      <Card className={`${uiConfig.colors.card.background} ${uiConfig.colors.card.backdrop} border-0 ${uiConfig.colors.card.shadow}`}>
        <CardHeader>
          <CardTitle className="text-[#20243F]">Conversion Funnel</CardTitle>
          <p className="text-sm text-gray-600">
            Track user progression through key game milestones
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={funnelData}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis 
                  dataKey="step" 
                  type="category" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="completed" 
                  fill="var(--color-completed)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {funnelData.map((step, index) => {
          const conversionRate = index === 0 ? 100 : ((step.completed / funnelData[0].completed) * 100).toFixed(1);
          return (
            <Card key={step.step} className={`${uiConfig.colors.card.background} ${uiConfig.colors.card.backdrop} border-0 shadow-md`}>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-gray-600 mb-1">{step.step}</div>
                <div className="text-2xl font-bold text-[#20243F]">{step.completed.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{conversionRate}% conversion</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FunnelsPage;
