import React, { useState } from 'react';
import { format, addWeeks, subWeeks, startOfTomorrow, isAfter } from 'date-fns';
import Layout from '../components/Layout';
import DailyHeader from '../components/DailyHeader';
import MoodSelector from '../components/MoodSelector';
import { useMood } from '../contexts/MoodContext';
import { getWeekDays } from '../utils/dateUtils';
import { getMoodEmoji, getMoodGradient } from '../utils/moodUtils';

const WeeklyView: React.FC = () => {
  const { currentDate, setCurrentDate, weeklyMoods, saveMood } = useMood();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | null>(null);
  
  const weekDays = getWeekDays(currentDate);
  const tomorrow = startOfTomorrow();
  
  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  
  const handleNextWeek = () => {
    const nextWeek = addWeeks(currentDate, 1);
    if (!isAfter(nextWeek, tomorrow)) {
      setCurrentDate(nextWeek);
    }
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleMoodSelect = (mood: 1 | 2 | 3 | 4 | 5) => {
    if (selectedDay && selectedTimeOfDay) {
      saveMood(mood, selectedTimeOfDay, undefined);
      setSelectedDay(null);
      setSelectedTimeOfDay(null);
    }
  };
  
  const handleBoxClick = (day: Date, timeOfDay: 'morning' | 'afternoon' | 'evening') => {
    if (isAfter(day, tomorrow)) {
      return;
    }
    
    setCurrentDate(day);
    setSelectedDay(day);
    setSelectedTimeOfDay(timeOfDay);
  };
  
  const getBoxStyles = (day: Date, gradient: string) => {
    const isFutureDate = isAfter(day, tomorrow);
    
    return `aspect-square flex items-center justify-center rounded-md text-4xl ${
      isFutureDate 
        ? 'bg-gray-100 cursor-not-allowed opacity-50' 
        : `cursor-pointer transition-all hover:scale-105 ${
            gradient ? `bg-gradient-to-br ${gradient}` : 'bg-gray-50 hover:bg-gray-100'
          }`
    }`;
  };
  
  return (
    <Layout title="Weekly Overview">
      <DailyHeader
        date={currentDate}
        onPrevious={handlePreviousWeek}
        onNext={!isAfter(addWeeks(currentDate, 1), tomorrow) ? handleNextWeek : undefined}
        onToday={handleToday}
      />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Weekly Overview</h3>
        
        <div className="grid grid-cols-8 gap-1 mb-4">
          <div className="text-sm font-medium text-gray-500"></div>
          {weekDays.map((day, index) => (
            <div key={index} className="text-sm font-medium text-gray-700 text-center">
              {format(day, 'EEE')}
              <div className="text-xs text-gray-500">{format(day, 'd')}</div>
            </div>
          ))}
          
          <div className="text-sm font-medium text-gray-500 flex items-center">Morning</div>
          {weekDays.map((day, index) => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const mood = weeklyMoods[formattedDate]?.morning;
            const gradient = mood ? getMoodGradient(mood.mood) : '';
            
            return (
              <div
                key={`morning-${index}`}
                className={getBoxStyles(day, gradient)}
                onClick={() => handleBoxClick(day, 'morning')}
              >
                {mood ? getMoodEmoji(mood.mood) : '—'}
              </div>
            );
          })}
          
          <div className="text-sm font-medium text-gray-500 flex items-center">Afternoon</div>
          {weekDays.map((day, index) => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const mood = weeklyMoods[formattedDate]?.afternoon;
            const gradient = mood ? getMoodGradient(mood.mood) : '';
            
            return (
              <div
                key={`afternoon-${index}`}
                className={getBoxStyles(day, gradient)}
                onClick={() => handleBoxClick(day, 'afternoon')}
              >
                {mood ? getMoodEmoji(mood.mood) : '—'}
              </div>
            );
          })}
          
          <div className="text-sm font-medium text-gray-500 flex items-center">Evening</div>
          {weekDays.map((day, index) => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const mood = weeklyMoods[formattedDate]?.evening;
            const gradient = mood ? getMoodGradient(mood.mood) : '';
            
            return (
              <div
                key={`evening-${index}`}
                className={getBoxStyles(day, gradient)}
                onClick={() => handleBoxClick(day, 'evening')}
              >
                {mood ? getMoodEmoji(mood.mood) : '—'}
              </div>
            );
          })}
        </div>
        
        <div className="space-y-4">
          {weekDays.map(day => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const dailyMood = weeklyMoods[formattedDate];
            
            if (dailyMood?.reflection?.completed) {
              return (
                <div key={formattedDate} className="border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <span className="text-sm font-medium">
                      {format(day, 'EEEE, MMMM d')} Reflection
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {dailyMood.reflection.notes || 'No notes added'}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      
      {selectedDay && selectedTimeOfDay && (
        <MoodSelector
          timeOfDay={selectedTimeOfDay}
          date={selectedDay}
          onSelect={handleMoodSelect}
          onClose={() => {
            setSelectedDay(null);
            setSelectedTimeOfDay(null);
          }}
        />
      )}
    </Layout>
  );
};

export default WeeklyView;