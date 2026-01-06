/**
 * Stats Page V2
 *
 * New page showing comprehensive learning statistics with heatmap.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Layers, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/progress/StatCard';
import { StreakBadge } from '@/components/progress/StreakBadge';
import { ActivityHeatmap, type ActivityData } from '@/components/progress/ActivityHeatmap';

export const StatsPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data (will be replaced with real API data)
  const mockStats = {
    streak: 13,
    totalCardsStudied: 2847,
    retentionRate: 87,
    totalStudyTime: '24h 32m',
  };

  // Mock activity data for heatmap
  const mockActivityData: ActivityData[] = generateMockActivity();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
            </div>
            <StreakBadge count={mockStats.streak} size="sm" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <StatCard
            icon={Flame}
            value={mockStats.streak}
            label="Current Streak"
            meta="Best: 21 days"
            iconBg="accent"
          />
          <StatCard
            icon={Layers}
            value={mockStats.totalCardsStudied.toLocaleString()}
            label="Cards Studied"
            meta="This month: 312"
            iconBg="primary"
          />
          <StatCard
            icon={TrendingUp}
            value={`${mockStats.retentionRate}%`}
            label="Retention Rate"
            meta="+3% vs last month"
            trend="up"
            iconBg="success"
          />
          <StatCard
            icon={Clock}
            value={mockStats.totalStudyTime}
            label="Study Time"
            meta="This month: 8h 15m"
            iconBg="gray"
          />
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <ActivityHeatmap data={mockActivityData} year={2026} />
        </div>

        {/* Charts Section (Placeholder) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Retention Over Time</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart coming soon
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Time by Day</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart coming soon
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Generate mock activity data for demonstration
function generateMockActivity(): ActivityData[] {
  const data: ActivityData[] = [];
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 50) : 0;

    data.push({
      date: date.toISOString().split('T')[0],
      count,
    });
  }

  return data;
}
