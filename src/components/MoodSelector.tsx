import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MoodLevel } from '../types';
import { getTimeOfDayLabel, getMoodEmoji } from '../utils/moodUtils';
import { isDateToday } from '../utils/dateUtils';

interface MoodSelectorProps {
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  date: Date;
  onSelect: (mood: MoodLevel, notes?: string) => void;
  onClose: () => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ timeOfDay, date, onSelect, onClose }) => {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const timeLabel = getTimeOfDayLabel(timeOfDay);
  const isToday = isDateToday(date);
  
  const handleMoodSelect = (mood: MoodLevel) => {
    onSelect(mood);
    onClose();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isToday 
              ? `How are you getting on this ${timeLabel.toLowerCase()}?`
              : `How did it go for you that ${timeLabel.toLowerCase()}?`}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {([1, 2, 3, 4, 5] as MoodLevel[]).map((mood) => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => handleMoodSelect(mood)}
            >
              <span className="text-6xl">{getMoodEmoji(mood)}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodSelector;