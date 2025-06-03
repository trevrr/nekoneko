import { MoodLevel } from '../types';

export const getMoodEmoji = (mood: MoodLevel): string => {
  switch (mood) {
    case 1: return '😢';
    case 2: return '😕';
    case 3: return '😐';
    case 4: return '🙂';
    case 5: return '😄';
    default: return '❓';
  }
};

export const getMoodLabel = (mood: MoodLevel): string => {
  switch (mood) {
    case 1: return 'Very Bad';
    case 2: return 'Bad';
    case 3: return 'Neutral';
    case 4: return 'Good';
    case 5: return 'Very Good';
    default: return 'Unknown';
  }
};

export const getMoodColor = (mood: MoodLevel): string => {
  switch (mood) {
    case 1: return '#FF6B6B';
    case 2: return '#FFB347';
    case 3: return '#FFDB58';
    case 4: return '#77DD77';
    case 5: return '#48BF91';
    default: return '#CBD5E1';
  }
};

export const getMoodGradient = (mood: MoodLevel): string => {
  switch (mood) {
    case 1: return 'from-red-400 to-red-500';
    case 2: return 'from-orange-400 to-orange-500';
    case 3: return 'from-yellow-400 to-yellow-500';
    case 4: return 'from-green-400 to-green-500';
    case 5: return 'from-emerald-400 to-emerald-500';
    default: return 'from-gray-300 to-gray-400';
  }
};

export const getTimeOfDayLabel = (timeOfDay: string): string => {
  switch (timeOfDay) {
    case 'morning': return 'Morning';
    case 'afternoon': return 'Afternoon';
    case 'evening': return 'Evening';
    default: return timeOfDay;
  }
};

export const getMoodInsight = (averageMood: number | null): string => {
  if (averageMood === null) return "No data available yet.";
  
  if (averageMood >= 4.5) return "Fantastic! You've been doing great lately.";
  if (averageMood >= 4) return "You've been doing well overall.";
  if (averageMood >= 3.5) return "You've been doing pretty good lately.";
  if (averageMood >= 3) return "You've been doing okay. Not bad, not great.";
  if (averageMood >= 2.5) return "You've been a bit down lately.";
  if (averageMood >= 2) return "You've been having a rough time. Remember to take care of yourself.";
  return "You've been very low. Consider reaching out for support.";
};

export const getCompletionInsight = (rate: number): string => {
  if (rate >= 0.9) return "Excellent tracking consistency!";
  if (rate >= 0.7) return "Good tracking consistency.";
  if (rate >= 0.5) return "Moderate tracking consistency.";
  if (rate >= 0.3) return "Try to track more regularly.";
  return "Consider setting reminders to track more often.";
};

export const getReflectionInsight = (count: number, totalDays: number): string => {
  const rate = count / totalDays;
  
  if (rate >= 0.8) return "You've been very consistent with your reflections!";
  if (rate >= 0.6) return "You've been good with your reflections.";
  if (rate >= 0.4) return "You've done some reflections. Keep it up!";
  if (rate >= 0.2) return "Consider doing more reflections for better self-awareness.";
  return "Try to make time for evening reflections.";
};

export const getMoodTrend = (current: number | null, previous: number | null): 'up' | 'down' | 'stable' | 'unknown' => {
  if (current === null || previous === null) return 'unknown';
  
  const difference = current - previous;
  if (Math.abs(difference) < 0.3) return 'stable';
  return difference > 0 ? 'up' : 'down';
};

export const getTrendInsight = (trend: 'up' | 'down' | 'stable' | 'unknown'): string => {
  switch (trend) {
    case 'up': return "You're improving! Keep up whatever you're doing.";
    case 'down': return "You've been declining. Consider what might be affecting you.";
    case 'stable': return "You've been stable lately.";
    case 'unknown': return "Not enough data to determine a trend.";
    default: return "";
  }
};