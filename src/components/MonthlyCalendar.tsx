import React from 'react';
import { format, getWeek, isAfter, startOfTomorrow, startOfWeek } from 'date-fns';
import { motion } from 'framer-motion';
import { DailyMood } from '../types';
import { getAverageMoodForDay } from '../utils/storageUtils';
import { getMoodGradient } from '../utils/moodUtils';

interface MonthlyCalendarProps {
  monthDays: Date[];
  monthlyMoods: Record<string, DailyMood>;
  onSelectDay: (date: Date) => void;
  onSelectWeek: (date: Date) => void;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  monthDays,
  monthlyMoods,
  onSelectDay,
  onSelectWeek
}) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const firstDayOfMonth = monthDays[0];
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const emptyDaysBefore = Array(firstDayOfWeek).fill(null);
  
  const days = [...emptyDaysBefore, ...monthDays];
  
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  const lastWeek = weeks[weeks.length - 1];
  if (lastWeek.length < 7) {
    const emptyDaysAfter = Array(7 - lastWeek.length).fill(null);
    weeks[weeks.length - 1] = [...lastWeek, ...emptyDaysAfter];
  }
  
  const getColorClass = (day: Date | null) => {
    if (!day) return '';
    
    const formattedDate = format(day, 'yyyy-MM-dd');
    const avgMood = getAverageMoodForDay(formattedDate);
    
    if (avgMood === null) return '';
    
    const roundedMood = Math.round(avgMood) as 1 | 2 | 3 | 4 | 5;
    return getMoodGradient(roundedMood);
  };
  
  const getDayContent = (day: Date | null) => {
    if (!day) return null;
    
    const formattedDate = format(day, 'yyyy-MM-dd');
    const hasReflection = monthlyMoods[formattedDate]?.reflection?.completed;
    
    return (
      <>
        <span>{day.getDate()}</span>
        {hasReflection && (
          <span className="absolute bottom-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
        )}
      </>
    );
  };

  const getWeekNumber = (week: (Date | null)[]): number | null => {
    const firstValidDay = week.find(day => day !== null);
    if (!firstValidDay) return null;
    return getWeek(startOfWeek(firstValidDay));
  };

  const tomorrow = startOfTomorrow();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Overview</h3>
      
      <div className="grid grid-cols-8 gap-1 text-center mb-2">
        <div className="text-xs font-medium text-gray-500 py-1">Week</div>
        {weekdays.map(day => (
          <div key={day} className="text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      {weeks.map((week, weekIndex) => {
        const weekNumber = getWeekNumber(week);
        const isWeekInFuture = week[0] && isAfter(week[0], tomorrow);
        
        return (
          <div key={weekIndex} className="grid grid-cols-8 gap-1 mb-1">
            {weekNumber && (
              <motion.div
                whileHover={{ scale: isWeekInFuture ? 1 : 1.1 }}
                whileTap={{ scale: isWeekInFuture ? 1 : 0.95 }}
                className={`rounded-md flex items-center justify-center text-sm ${
                  isWeekInFuture 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-purple-600 cursor-pointer hover:bg-purple-50'
                }`}
                onClick={() => !isWeekInFuture && week[0] && onSelectWeek(week[0])}
              >
                {weekNumber}
              </motion.div>
            )}
            {week.map((day, dayIndex) => {
              const isDayInFuture = day && isAfter(day, tomorrow);
              
              return (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  whileHover={{ scale: day && !isDayInFuture ? 1.1 : 1 }}
                  whileTap={{ scale: day && !isDayInFuture ? 0.95 : 1 }}
                  className={`
                    aspect-square rounded-md flex items-center justify-center relative text-sm
                    ${day ? (isDayInFuture ? 'cursor-not-allowed opacity-50' : 'cursor-pointer') : 'invisible'}
                    ${day ? `bg-gradient-to-br ${getColorClass(day) || 'bg-gray-100'}` : ''}
                    ${getColorClass(day) ? 'text-white' : 'text-gray-700'}
                  `}
                  onClick={() => day && !isDayInFuture && onSelectDay(day)}
                >
                  {getDayContent(day)}
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyCalendar;