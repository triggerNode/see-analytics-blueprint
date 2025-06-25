
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uiConfig } from '@/lib/uiConfig';

const RetentionPage = () => {
  // TODO: Connect to dailyAggregates table for real retention data
  const retentionMetrics = [
    { 
      title: 'D1 Retention', 
      value: '0%', 
      description: 'Players returning after 1 day',
      color: 'text-blue-600'
    },
    { 
      title: 'D7 Retention', 
      value: '0%', 
      description: 'Players returning after 7 days',
      color: 'text-green-600'
    },
    { 
      title: 'D30 Retention', 
      value: '0%', 
      description: 'Players returning after 30 days',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#20243F]">Retention Analysis</h1>
        <div className="text-sm text-gray-500">
          Last updated: Never
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {retentionMetrics.map((metric, index) => (
          <Card 
            key={metric.title}
            className={`${uiConfig.colors.card.background} ${uiConfig.colors.card.backdrop} border-0 ${uiConfig.colors.card.shadow} ${uiConfig.colors.card.hover} ${uiConfig.animation.transition}`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-[#20243F] text-lg">{metric.title}</CardTitle>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-xs text-gray-500">
                No data available yet
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className={`${uiConfig.colors.card.background} ${uiConfig.colors.card.backdrop} border-0 ${uiConfig.colors.card.shadow}`}>
        <CardHeader>
          <CardTitle className="text-[#20243F]">Retention Cohort Analysis</CardTitle>
          <p className="text-sm text-gray-600">
            Track how different player cohorts perform over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-gray-500">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">No retention data available</div>
              <div className="text-sm">
                Connect your dailyAggregates table to start tracking retention metrics
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionPage;
