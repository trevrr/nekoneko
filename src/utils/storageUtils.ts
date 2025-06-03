import { MoodEntry, ReflectionEntry, DailyMood } from '../types';

const STORAGE_KEY = 'neko-neko-data';

export interface StoredData {
  moods: MoodEntry[];
  reflections: ReflectionEntry[];
}

export const getStoredData = (): StoredData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return { moods: [], reflections: [] };
  }
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing stored data:', error);
    return { moods: [], reflections: [] };
  }
};

export const saveData = (data: StoredData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveMoodEntry = (entry: MoodEntry): void => {
  const data = getStoredData();
  
  // Check if entry already exists and update it
  const existingIndex = data.moods.findIndex(
    m => m.date === entry.date && m.timeOfDay === entry.timeOfDay
  );
  
  if (existingIndex >= 0) {
    data.moods[existingIndex] = entry;
  } else {
    data.moods.push(entry);
  }
  
  saveData(data);
};

export const saveReflectionEntry = (entry: ReflectionEntry): void => {
  const data = getStoredData();
  
  // Check if entry already exists and update it
  const existingIndex = data.reflections.findIndex(
    r => r.date === entry.date
  );
  
  if (existingIndex >= 0) {
    data.reflections[existingIndex] = entry;
  } else {
    data.reflections.push(entry);
  }
  
  saveData(data);
};

export const getMoodsByDate = (date: string): MoodEntry[] => {
  const data = getStoredData();
  return data.moods.filter(mood => mood.date === date);
};

export const getMoodByDateAndTime = (date: string, timeOfDay: string): MoodEntry | undefined => {
  const data = getStoredData();
  return data.moods.find(mood => mood.date === date && mood.timeOfDay === timeOfDay);
};

export const getReflectionByDate = (date: string): ReflectionEntry | undefined => {
  const data = getStoredData();
  return data.reflections.find(reflection => reflection.date === date);
};

export const getDailyMood = (date: string): DailyMood => {
  const moods = getMoodsByDate(date);
  const reflection = getReflectionByDate(date);
  
  return {
    date,
    morning: moods.find(m => m.timeOfDay === 'morning'),
    afternoon: moods.find(m => m.timeOfDay === 'afternoon'),
    evening: moods.find(m => m.timeOfDay === 'evening'),
    reflection
  };
};

export const getDailyMoods = (dates: string[]): Record<string, DailyMood> => {
  return dates.reduce((acc, date) => {
    acc[date] = getDailyMood(date);
    return acc;
  }, {} as Record<string, DailyMood>);
};

export const getAverageMoodForDay = (date: string): number | null => {
  const dailyMood = getDailyMood(date);
  const moods = [
    dailyMood.morning?.mood,
    dailyMood.afternoon?.mood,
    dailyMood.evening?.mood
  ].filter(Boolean) as number[];
  
  if (moods.length === 0) return null;
  
  const sum = moods.reduce((acc, mood) => acc + mood, 0);
  return sum / moods.length;
};

export const getAverageMoodForPeriod = (dates: string[]): number | null => {
  const averages = dates
    .map(date => getAverageMoodForDay(date))
    .filter(Boolean) as number[];
  
  if (averages.length === 0) return null;
  
  const sum = averages.reduce((acc, avg) => acc + avg, 0);
  return sum / averages.length;
};

export const getCompletedReflectionsCount = (dates: string[]): number => {
  const data = getStoredData();
  return data.reflections.filter(
    r => dates.includes(r.date) && r.completed
  ).length;
};

export const getMoodCompletionRate = (dates: string[]): number => {
  const data = getStoredData();
  const possibleEntries = dates.length * 3; // 3 times per day
  const actualEntries = data.moods.filter(m => dates.includes(m.date)).length;
  
  return actualEntries / possibleEntries;
};