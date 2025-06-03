import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { DailyMood } from '../types';
import { formatShortDate, formatShortDay } from '../utils/dateUtils';
import { getMoodColor } from '../utils/moodUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyChartProps {
  weekDays: Date[];
  weeklyMoods: Record<string, DailyMood>;
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ weekDays, weeklyMoods }) => {
  const labels = weekDays.map(day => `${formatShortDay(day)} ${formatShortDate(day)}`);
  
  const morningData = weekDays.map(day => {
    const formattedDate = day.toISOString().split('T')[0];
    return weeklyMoods[formattedDate]?.morning?.mood || 0;
  });
  
  const afternoonData = weekDays.map(day => {
    const formattedDate = day.toISOString().split('T')[0];
    return weeklyMoods[formattedDate]?.afternoon?.mood || 0;
  });
  
  const eveningData = weekDays.map(day => {
    const formattedDate = day.toISOString().split('T')[0];
    return weeklyMoods[formattedDate]?.evening?.mood || 0;
  });
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value: number) => {
            if (value === 0) return '';
            return value;
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            if (value === 0) return 'No data';
            return `${context.dataset.label}: ${value}/5`;
          }
        }
      }
    },
    barPercentage: 0.85,
    categoryPercentage: 0.8,
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Morning',
        data: morningData,
        backgroundColor: morningData.map(value => value ? getMoodColor(value as any) : 'rgba(0, 0, 0, 0.1)'),
        borderRadius: 4,
        order: 1
      },
      {
        label: 'Afternoon',
        data: afternoonData,
        backgroundColor: afternoonData.map(value => value ? getMoodColor(value as any) : 'rgba(0, 0, 0, 0.1)'),
        borderRadius: 4,
        order: 2
      },
      {
        label: 'Evening',
        data: eveningData,
        backgroundColor: eveningData.map(value => value ? getMoodColor(value as any) : 'rgba(0, 0, 0, 0.1)'),
        borderRadius: 4,
        order: 3
      }
    ]
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Weekly Chart</h3>
      <div className="h-64">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default WeeklyChart