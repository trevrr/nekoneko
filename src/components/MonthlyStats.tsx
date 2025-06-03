import React from 'react';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, Minus, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { DailyMood } from '../types';
import { getAverageMoodForPeriod, getCompletedReflectionsCount, getMoodCompletionRate } from '../utils/storageUtils';
import { getMoodInsight, getCompletionInsight, getReflectionInsight, getMoodTrend, getTrendInsight } from '../utils/moodUtils';

interface MonthlyStatsProps {
  currentMonth: Date;
  previousMonth: Date;
  monthDays: Date[];
  monthlyMoods: Record<string, DailyMood>;
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({
  currentMonth,
  previousMonth,
  monthDays,
  monthlyMoods
}) => {
  const currentMonthDates = monthDays.map(day => format(day, 'yyyy-MM-dd'));
  const previousMonthDates = monthDays
    .filter(day => day.getMonth() === previousMonth.getMonth())
    .map(day => format(day, 'yyyy-MM-dd'));
  
  const currentAverage = getAverageMoodForPeriod(currentMonthDates);
  const previousAverage = getAverageMoodForPeriod(previousMonthDates);
  
  const completedReflections = getCompletedReflectionsCount(currentMonthDates);
  const moodCompletionRate = getMoodCompletionRate(currentMonthDates);
  
  const moodTrend = getMoodTrend(currentAverage, previousAverage);
  
  const renderTrendIcon = () => {
    switch (moodTrend) {
      case 'up':
        return <TrendingUp size={20} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={20} className="text-red-500" />;
      case 'stable':
        return <Minus size={20} className="text-gray-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Monthly Insights
      </h3>
      
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border-b border-gray-100 pb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-100 p-2 rounded-full">
              {renderTrendIcon()}
            </div>
            <h4 className="font-medium">Trend</h4>
          </div>
          <p className="text-gray-600">
            {currentAverage !== null
              ? `Average: ${currentAverage.toFixed(1)} / 5`
              : 'No data for this month yet.'}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {getTrendInsight(moodTrend)}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-b border-gray-100 pb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-teal-100 p-2 rounded-full">
              <Clock size={20} className="text-teal-500" />
            </div>
            <h4 className="font-medium">Tracking Consistency</h4>
          </div>
          <p className="text-gray-600">
            {`Completed ${(moodCompletionRate * 100).toFixed(0)}% of daily check-ins`}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {getCompletionInsight(moodCompletionRate)}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-amber-100 p-2 rounded-full">
              <Calendar size={20} className="text-amber-500" />
            </div>
            <h4 className="font-medium">Reflection Practice</h4>
          </div>
          <p className="text-gray-600">
            {`Completed ${completedReflections} evening reflections`}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {getReflectionInsight(completedReflections, currentMonthDates.length)}
          </p>
        </motion.div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-3 rounded-lg">
        <h4 className="font-medium mb-2">Insight</h4>
        <p className="text-gray-600 text-sm">
          {getMoodInsight(currentAverage)}
        </p>
      </div>
    </div>
  );
};

export default MonthlyStats;