import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, AlertCircle } from 'lucide-react';
import { addDays, subDays } from 'date-fns';
import Layout from '../components/Layout';
import MoodCard from '../components/MoodCard';
import MoodSelector from '../components/MoodSelector';
import ReflectionModal from '../components/ReflectionModal';
import DailyHeader from '../components/DailyHeader';
import { useMood } from '../contexts/MoodContext';
import { MoodLevel } from '../types';
import { getCurrentTimeOfDay, isDateToday } from '../utils/dateUtils';

const DailyView: React.FC = () => {
  const { 
    currentDate, 
    setCurrentDate, 
    dailyMood,
    currentTimeOfDay,
    saveMood,
    saveReflection
  } = useMood();
  
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  
  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };
  
  const handleNextDay = () => {
    const nextDay = addDays(currentDate, 1);
    if (nextDay <= new Date()) {
      setCurrentDate(nextDay);
    }
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleMoodCardClick = (timeOfDay: 'morning' | 'afternoon' | 'evening') => {
    const now = new Date();
    const selectedDate = new Date(currentDate);
    
    // Prevent future entries
    if (selectedDate > now) {
      return;
    }
    
    setSelectedTimeOfDay(timeOfDay);
  };
  
  const handleMoodSelect = (mood: MoodLevel, notes?: string) => {
    if (selectedTimeOfDay) {
      saveMood(mood, selectedTimeOfDay, notes);
      setSelectedTimeOfDay(null);
    }
  };
  
  const handleReflectionComplete = (notes?: string) => {
    saveReflection(true, notes);
    setShowReflection(false);
  };
  
  const isToday = isDateToday(currentDate);
  const currentTimeOfDayStr = getCurrentTimeOfDay();
  const isEvening = currentTimeOfDayStr === 'evening';
  const shouldShowReflectionPrompt = isToday && isEvening && !dailyMood.reflection?.completed;
  
  // Determine which time periods to show based on current time
  const showMorning = true; // Always show morning
  const showAfternoon = !isToday || currentTimeOfDayStr === 'afternoon' || currentTimeOfDayStr === 'evening';
  const showEvening = !isToday || currentTimeOfDayStr === 'evening';
  
  return (
    <Layout title="">
      <DailyHeader
        date={currentDate}
        onPrevious={handlePreviousDay}
        onNext={isToday ? undefined : handleNextDay}
        onToday={handleToday}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {showMorning && (
          <MoodCard
            timeOfDay="morning"
            mood={dailyMood.morning}
            onClick={() => handleMoodCardClick('morning')}
          />
        )}
        {showAfternoon && (
          <MoodCard
            timeOfDay="afternoon"
            mood={dailyMood.afternoon}
            onClick={() => handleMoodCardClick('afternoon')}
          />
        )}
        {showEvening && (
          <MoodCard
            timeOfDay="evening"
            mood={dailyMood.evening}
            onClick={() => handleMoodCardClick('evening')}
          />
        )}
      </div>
      
      <AnimatePresence>
        {shouldShowReflectionPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-4 text-white"
          >
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <Moon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">Evening Thought</h3>
                <p className="text-white/80 text-sm mb-3">
                  Take a minute to reflect. You don't have to. But a minute to being mindful can help.
                </p>
                <button
                  onClick={() => setShowReflection(true)}
                  className="px-3 py-1.5 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
                >
                  Start Reflection
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {dailyMood.reflection?.completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 bg-gray-50 rounded-xl p-4"
          >
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Moon size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Reflection Completed</h3>
                {dailyMood.reflection.notes ? (
                  <p className="text-gray-600">{dailyMood.reflection.notes}</p>
                ) : (
                  <p className="text-gray-500 italic">No notes added</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isToday && !shouldShowReflectionPrompt && !dailyMood.reflection?.completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 bg-gray-50 rounded-xl p-4"
          >
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <AlertCircle size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Evening Reflection</h3>
                <p className="text-gray-600 mb-2">
                  Evening reflection will be available later this evening.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedTimeOfDay && (
          <MoodSelector
            timeOfDay={selectedTimeOfDay}
            date={currentDate}
            onSelect={handleMoodSelect}
            onClose={() => setSelectedTimeOfDay(null)}
          />
        )}
      </AnimatePresence>
      
      <ReflectionModal
        isOpen={showReflection}
        onClose={() => setShowReflection(false)}
        onComplete={handleReflectionComplete}
      />
    </Layout>
  );
};

export default DailyView;