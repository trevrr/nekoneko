import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MoodEntry, ReflectionEntry, DailyMood } from '../types';
import { formatDate, getCurrentTimeOfDay, getWeekDays, isDateToday } from '../utils/dateUtils';
import { saveMoodEntry, saveReflectionEntry, getDailyMood, getDailyMoods } from '../utils/storageUtils';

interface MoodContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  currentTimeOfDay: 'morning' | 'afternoon' | 'evening';
  dailyMood: DailyMood;
  weeklyMoods: Record<string, DailyMood>;
  saveMood: (mood: number, timeOfDay: 'morning' | 'afternoon' | 'evening', notes?: string) => void;
  saveReflection: (completed: boolean, notes?: string) => void;
  refreshData: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>(getCurrentTimeOfDay());
  const [dailyMood, setDailyMood] = useState<DailyMood>({ date: formatDate(currentDate) });
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, DailyMood>>({});

  // Update time of day when it changes
  useEffect(() => {
    const checkTimeOfDay = () => {
      const newTimeOfDay = getCurrentTimeOfDay();
      if (newTimeOfDay !== currentTimeOfDay) {
        setCurrentTimeOfDay(newTimeOfDay);
      }
    };

    // Check every 15 minutes
    const interval = setInterval(checkTimeOfDay, 15 * 60 * 1000);
    
    // Check initially
    checkTimeOfDay();
    
    return () => clearInterval(interval);
  }, [currentTimeOfDay]);

  // Load data for current date
  useEffect(() => {
    const formattedDate = formatDate(currentDate);
    const dailyData = getDailyMood(formattedDate);
    setDailyMood(dailyData);
    
    // Load weekly data
    loadWeeklyData();
  }, [currentDate]);

  const loadWeeklyData = () => {
    const weekDays = getWeekDays(currentDate);
    const formattedDays = weekDays.map(day => formatDate(day));
    const weekData = getDailyMoods(formattedDays);
    setWeeklyMoods(weekData);
  };

  const refreshData = () => {
    const formattedDate = formatDate(currentDate);
    const dailyData = getDailyMood(formattedDate);
    setDailyMood(dailyData);
    loadWeeklyData();
  };

  const saveMood = (mood: number, timeOfDay: 'morning' | 'afternoon' | 'evening', notes?: string) => {
    const formattedDate = formatDate(currentDate);
    const selectedDate = new Date(formattedDate);
    const now = new Date();
    
    // Prevent future entries
    if (selectedDate > now) {
      console.error('Cannot record moods for future dates');
      return;
    }
    
    const moodEntry: MoodEntry = {
      id: `${formattedDate}-${timeOfDay}`,
      date: formattedDate,
      timeOfDay,
      mood: mood as 1 | 2 | 3 | 4 | 5,
      notes
    };
    
    saveMoodEntry(moodEntry);
    refreshData();
  };

  const saveReflection = (completed: boolean, notes?: string) => {
    const formattedDate = formatDate(currentDate);
    
    const reflectionEntry: ReflectionEntry = {
      id: formattedDate,
      date: formattedDate,
      completed,
      notes
    };
    
    saveReflectionEntry(reflectionEntry);
    refreshData();
  };

  return (
    <MoodContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentTimeOfDay,
        dailyMood,
        weeklyMoods,
        saveMood,
        saveReflection,
        refreshData
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};