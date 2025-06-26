
import React, { useState, useEffect } from 'react';
import KPICard from '@/components/dashboard/KPICard';
import ChartCard from '@/components/dashboard/ChartCard';
import InsightCard from '@/components/dashboard/InsightCard';
import DataTable from '@/components/dashboard/DataTable';
import GameSelectorModal from '@/components/dashboard/GameSelectorModal';
import { useGameStats } from '@/hooks/useGameStats';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [placeId, setPlaceId] = useState<number | null>(null);
  const [showGameSelector, setShowGameSelector] = useState(false);
  const { rows, loading, error } = useGameStats(placeId || undefined);

  useEffect(() => {
    console.log('Dashboard: Checking for stored placeId...');
    const storedPlaceId = localStorage.getItem('placeId');
    if (storedPlaceId) {
      const parsedPlaceId = parseInt(storedPlaceId);
      console.log('Dashboard: Found stored placeId:', parsedPlaceId);
      setPlaceId(parsedPlaceId);
    } else {
      console.log('Dashboard: No stored placeId found, showing game selector');
      setShowGameSelector(true);
    }
  }, []);

  const handlePlaceIdSelected = (newPlaceId: number) => {
    console.log('Dashboard: New placeId selected:', newPlaceId);
    setPlaceId(newPlaceId);
    setShowGameSelector(false);
  };

  const handleChangeGame = () => {
    console.log('Dashboard: User requested to change game');
    setShowGameSelector(true);
  };

  // Show loading only when we have no data and are actually loading
  if (loading && rows.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-[#4B6AFF]" />
          <div className="text-2xl font-bold text-[#18181B] mb-2">Loading Dashboard...</div>
          <p className="text-gray-600">
            {placeId ? `Fetching data for Place ID: ${placeId}` : 'Connecting to real-time data'}
          </p>
        </div>
      </div>
    );
  }

  // Calculate metrics from data
  const live = rows.at(-1);
  const today = new Date().toDateString();
  const todayRows = rows.filter(row => new Date(row.ts).toDateString() === today);
  const revenueToday = todayRows.reduce((sum, row) => sum + (row.revenue_usd || 0), 0);
  
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentRageQuits = rows.filter(row => new Date(row.ts) > oneHourAgo)
    .reduce((sum, row) => sum + (row.rage_quits || 0), 0);

  const kpiData = [
    { 
      title: "Active Players", 
      value: (live?.ccus || 0).toLocaleString(), 
      subtitle: "current CCU", 
      icon: "activity" as const 
    },
    { 
      title: "Revenue Today", 
      value: `$${revenueToday.toFixed(2)}`, 
      subtitle: `from ${todayRows.length} data points`, 
      icon: "trending-up" as const 
    },
    { 
      title: "Rage Quits", 
      value: recentRageQuits.toString(), 
      subtitle: "last hour", 
      icon: "bar-chart-3" as const 
    },
    { 
      title: "Data Points", 
      value: rows.length.toString(), 
      subtitle: "total collected", 
      icon: "pie-chart" as const 
    }
  ];

  // Transform data for charts
  const chartData = {
    playerHistory: {
      title: "Player Count Over Time",
      data: rows.slice(-20).map((row, idx) => ({ 
        time: idx, 
        value: row.ccus 
      })),
    },
    revenueChart: {
      title: "Revenue Tracking",
      value: `$${revenueToday.toFixed(2)}`,
      subtitle: "today's earnings",
      data: todayRows.map((row, idx) => ({ 
        name: `${idx + 1}`, 
        value: row.revenue_usd 
      })),
    },
    rageQuitTrend: {
      title: "Rage Quit Analysis",
      value: recentRageQuits.toString(),
      subtitle: "recent hour",
      data: rows.slice(-10).map((row, idx) => ({ 
        name: `${idx + 1}`, 
        value: row.rage_quits 
      })),
    }
  };

  const tableData = rows.slice(-3).reverse().map((row, index) => ({
    player: `Place_${row.place_id}`,
    time: new Date(row.ts).toLocaleTimeString(),
    event: `CCU: ${row.ccus}, Revenue: $${row.revenue_usd}`,
    status: row.rage_quits > 5 ? 'error' as const : 
            row.rage_quits > 2 ? 'warning' as const : 'success' as const
  }));

  return (
    <div className="max-w-7xl mx-auto">
      {error && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              onClick={handleChangeGame}
              variant="outline"
              size="sm"
              className="ml-4"
            >
              Change Game
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {placeId && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#18181B]">
              Dashboard - Place ID: {placeId}
            </h1>
            <p className="text-gray-600">
              Showing {rows.length} data points
              {error?.includes('demo') && ' (demo mode)'}
            </p>
          </div>
          <Button
            onClick={handleChangeGame}
            variant="outline"
            className="border-[#4B6AFF] text-[#4B6AFF] hover:bg-[#4B6AFF] hover:text-white"
          >
            Change Game
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-12 gap-6">
        {/* KPI Cards */}
        {kpiData.map((kpi, index) => (
          <div 
            key={index}
            className="col-span-12 lg:col-span-3 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <KPICard {...kpi} />
          </div>
        ))}

        {/* Charts Row */}
        <div className="col-span-12 lg:col-span-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <ChartCard 
            type="line"
            title={chartData.playerHistory.title}
            data={chartData.playerHistory.data}
            peak={live?.ccus.toString() || "0"}
          />
        </div>
        
        <div className="col-span-12 lg:col-span-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <ChartCard 
            type="bar"
            title={chartData.revenueChart.title}
            value={chartData.revenueChart.value}
            subtitle={chartData.revenueChart.subtitle}
            data={chartData.revenueChart.data}
            color="#22C55E"
          />
        </div>
        
        <div className="col-span-12 animate-fade-in" style={{ animationDelay: '700ms' }}>
          <ChartCard 
            type="area"
            title={chartData.rageQuitTrend.title}
            value={chartData.rageQuitTrend.value}
            subtitle={chartData.rageQuitTrend.subtitle}
            data={chartData.rageQuitTrend.data}
            color="#EC4899"
          />
        </div>

        {/* Insights and Table */}
        <div className="col-span-12 lg:col-span-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <InsightCard retentionCount={rows.length} anomalyCount={recentRageQuits} />
        </div>
        
        <div className="col-span-12 lg:col-span-6 animate-fade-in" style={{ animationDelay: '900ms' }}>
          <DataTable data={tableData.length > 0 ? tableData : [
            { player: "Demo", time: "now", event: "Sample data", status: "success" as const }
          ]} />
        </div>
      </div>

      <GameSelectorModal 
        open={showGameSelector}
        onPlaceIdSelected={handlePlaceIdSelected}
      />
    </div>
  );
};

export default Dashboard;
