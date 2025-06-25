
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface InsightCardProps {
  retentionCount: number;
  anomalyCount: number;
}

const InsightCard = ({ retentionCount, anomalyCount }: InsightCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-[#14B8A6] to-[#0891B2] border-0 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200 text-white">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Insights & Alerts</h3>
            <p className="text-white/90">
              You have <span className="font-bold">{retentionCount}</span> new retention insights and{' '}
              <span className="font-bold">{anomalyCount}</span> anomaly alerts.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
