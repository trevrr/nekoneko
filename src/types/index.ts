export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  id: string;
  date: string;
  timeOfDay: TimeOfDay;
  mood: MoodLevel;
  notes?: string;
}

export interface ReflectionEntry {
  id: string;
  date: string;
  completed: boolean;
  notes?: string;
}

export interface DailyMood {
  date: string;
  morning?: MoodEntry;
  afternoon?: MoodEntry;
  evening?: MoodEntry;
  reflection?: ReflectionEntry;
}

export interface WeeklyMoods {
  [date: string]: DailyMood;
}