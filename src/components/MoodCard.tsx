import React from 'react';
import { motion } from 'framer-motion';
import { MoodEntry } from '../types';
import { getMoodEmoji, getMoodGradient, getTimeOfDayLabel } from '../utils/moodUtils';

interface MoodCardProps {
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  mood?: MoodEntry;
  onClick: () => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ timeOfDay, mood, onClick }) => {
  const timeLabel = getTimeOfDayLabel(timeOfDay);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer min-h-[200px] flex flex-col items-center justify-center ${
        mood ? `bg-gradient-to-br ${getMoodGradient(mood.mood)} text-white` : ''
      }`}
      onClick={onClick}
    >
      <h3 className="text-xl font-medium mb-4">{timeLabel}</h3>
      
      {mood && (
        <>
          <span className="text-4xl mb-2">{getMoodEmoji(mood.mood)}</span>
          {mood.notes && (
            <p className="text-sm mt-2 opacity-90 text-center">{mood.notes}</p>
          )}
        </>
      )}
    </motion.div>
  );
};

export default MoodCard;