import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (notes?: string) => void;
}

const ReflectionModal: React.FC<ReflectionModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [notes, setNotes] = useState('');
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (isOpen && !isActive) {
      setIsActive(true);
    }
    
    if (!isOpen) {
      setTimer(60);
      setIsActive(false);
      setShowForm(false);
      setNotes('');
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (isActive && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      setShowForm(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timer]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const skipTimer = () => {
    setTimer(0);
    setIsActive(false);
    setShowForm(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  
  const handleSubmit = () => {
    onComplete(notes || undefined);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isActive) onClose();
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
                {!showForm ? 'Evening Reflection' : 'Complete Your Reflection'}
              </h2>
              {!isActive && (
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            {!showForm ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <div className="text-3xl font-medium text-purple-600">
                      {formatTime(timer)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Take a minute to reflect on your day. Breathe deeply and think about what went well and what you could improve.
                  </p>
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">60 seconds</span>
                  </div>
                </div>
                
                {!showForm && (
                  <button
                    onClick={skipTimer}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-sm"
                  >
                    Skip to reflection
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  How was your day? Note down any thoughts or insights from your reflection.
                </p>
                
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors mb-4"
                  rows={4}
                  placeholder="My reflections on today..."
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex-1"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex-1"
                  >
                    Complete
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReflectionModal;