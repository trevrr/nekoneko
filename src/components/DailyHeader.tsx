import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDisplayDate, isDateToday } from '../utils/dateUtils';

interface DailyHeaderProps {
  date: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const DailyHeader: React.FC<DailyHeaderProps> = ({
  date,
  onPrevious,
  onNext,
  onToday
}) => {
  const isToday = isDateToday(date);
  
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center justify-between w-full mb-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrevious}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} />
        </motion.button>
        
        <motion.h2 
          className="text-xl font-medium text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={date.toISOString()}
        >
          {formatDisplayDate(date)}
        </motion.h2>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
      
      {!isToday && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm px-3 py-1 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
          onClick={onToday}
        >
          Back to Today
        </motion.button>
      )}
    </div>
  );
};

export default DailyHeader;