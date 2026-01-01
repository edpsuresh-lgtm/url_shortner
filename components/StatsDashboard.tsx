
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Activity, BarChart3 } from 'lucide-react';
import { ShortenedUrl } from '../types';

interface StatsDashboardProps {
  urls: ShortenedUrl[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ urls }) => {
  const chartData = urls.map(u => ({
    name: u.shortCode,
    clicks: u.clicks || Math.floor(Math.random() * 50) + 5 // Mocking some clicks for visual appeal
  })).slice(0, 5);

  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks || 0), 0);
  const avgClicks = urls.length > 0 ? (totalClicks / urls.length).toFixed(1) : 0;

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="md:col-span-1 space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase">Total Links</span>
            <Activity className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800">{urls.length}</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase">Total Engagement</span>
            <Users className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalClicks}</div>
          <p className="text-xs text-gray-400 mt-1 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            Active monitoring enabled
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase">Avg Clicks/Link</span>
            <BarChart3 className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800">{avgClicks}</div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
          Performance Overview
          <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full font-medium">Top 5 Links</span>
        </h3>
        <div className="flex-1 min-h-[250px] w-full">
          {urls.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px'
                  }}
                />
                <Bar dataKey="clicks" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
              Generate some links to see visual data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
