import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface DashboardStatsProps {
  destinationsCount: number;
  usersCount: number;
  reviewsCount: number;
}

const COLORS = [
  '#10B981', // Green
  '#3B82F6', // Blue
  '#F59E42', // Orange
];

export default function DashboardStats({ destinationsCount, usersCount, reviewsCount }: DashboardStatsProps) {
  const stats = [
    { label: 'Destinations', value: destinationsCount, color: COLORS[0] },
    { label: 'Users', value: usersCount, color: COLORS[1] },
    { label: 'Reviews', value: reviewsCount, color: COLORS[2] },
  ];

  // Donut chart data
  const donutData = {
    labels: stats.map((s) => s.label),
    datasets: [
      {
        data: stats.map((s) => s.value),
        backgroundColor: COLORS,
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: stats.map((s) => s.label),
    datasets: [
      {
        label: 'Count',
        data: stats.map((s) => s.value),
        backgroundColor: COLORS,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Donut Chart */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview (Donut Chart)</h3>
        <div className="w-64 h-64">
          <Doughnut data={donutData} options={{ plugins: { legend: { position: 'bottom' } } }} />
        </div>
        <div className="flex justify-center gap-6 mt-6">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full" style={{ background: s.color }}></span>
              <span className="text-sm text-gray-700 mt-1">{s.label}</span>
              <span className="font-bold text-lg" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview (Bar Chart)</h3>
        <div className="w-full h-64">
          <Bar data={barData} options={{
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
            responsive: true,
            maintainAspectRatio: false,
          }} />
        </div>
      </div>
    </div>
  );
} 