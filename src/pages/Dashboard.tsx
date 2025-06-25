
import React from 'react';
import KPICard from '@/components/dashboard/KPICard';
import ChartCard from '@/components/dashboard/ChartCard';
import InsightCard from '@/components/dashboard/InsightCard';
import DataTable from '@/components/dashboard/DataTable';

const Dashboard = () => {
  const kpiData = [
    { title: "Active Players", value: "4,982", subtitle: "in last 5 min", icon: "circle-check" },
    { title: "Sessions Today", value: "12,436", subtitle: "+8% vs yesterday", icon: "circle-chevron-up" },
    { title: "Avg Session Length", value: "4m 12s", subtitle: "median", icon: "square-arrow-up" },
    { title: "Tutorial Completion", value: "73%", subtitle: "▲ 4 pts", icon: "circle-check" }
  ];

  const chartData = {
    totalPlayers: {
      title: "Total Players (7 days)",
      peak: "57k",
      data: [45000, 48000, 52000, 49000, 57000, 54000, 51000]
    },
    events: {
      title: "Successful Events",
      value: "8,941",
      subtitle: "+23% conversion",
      data: [
        { name: 'Mon', value: 1200 },
        { name: 'Tue', value: 1800 },
        { name: 'Wed', value: 1600 },
        { name: 'Thu', value: 2100 },
        { name: 'Fri', value: 1900 },
        { name: 'Sat', value: 2400 },
        { name: 'Sun', value: 2200 }
      ]
    },
    funnel: {
      title: "Funnel Analysis",
      value: "985",
      subtitle: "Actual vs Expected",
      data: [
        { name: 'Start', value: 1000 },
        { name: 'Tutorial', value: 850 },
        { name: 'First Level', value: 720 },
        { name: 'Complete', value: 985 }
      ]
    }
  };

  const tableData = [
    { player: "Player_123", time: "2m ago", event: "Level Complete", status: "success" as const },
    { player: "Player_456", time: "5m ago", event: "Purchase Failed", status: "error" as const },
    { player: "Player_789", time: "8m ago", event: "Tutorial Start", status: "warning" as const }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div 
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <KPICard {...kpi} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <ChartCard 
            type="line"
            title={chartData.totalPlayers.title}
            data={chartData.totalPlayers.data}
            peak={chartData.totalPlayers.peak}
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <ChartCard 
            type="bar"
            title={chartData.events.title}
            value={chartData.events.value}
            subtitle={chartData.events.subtitle}
            data={chartData.events.data}
            color="#22C55E"
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
          <ChartCard 
            type="area"
            title={chartData.funnel.title}
            value={chartData.funnel.value}
            subtitle={chartData.funnel.subtitle}
            data={chartData.funnel.data}
            color="#EC4899"
          />
        </div>
      </div>

      {/* Insights and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
          <InsightCard retentionCount={6} anomalyCount={12} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
          <DataTable data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
