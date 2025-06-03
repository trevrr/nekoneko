import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isToday, isSameDay, subWeeks, addWeeks, parseISO, isWithinInterval, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEEE, MMMM d, yyyy');
};

export const formatShortDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM d');
};

export const formatShortDay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEE');
};

export const getCurrentTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
  const hours = new Date().getHours();
  if (hours < 12) return 'morning';
  if (hours < 18) return 'afternoon';
  return 'evening';
};

export const getWeekDays = (date: Date = new Date()): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  
  return eachDayOfInterval({ start, end });
};

export const getMonthDays = (date: Date = new Date()): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  return eachDayOfInterval({ start, end });
};

export const getNextWeek = (date: Date): Date => {
  return addWeeks(date, 1);
};

export const getPreviousWeek = (date: Date): Date => {
  return subWeeks(date, 1);
};

export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

export const getPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

export const isDateToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isToday(dateObj);
};

export const isSameDate = (date1: Date | string, date2: Date | string): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameDay(dateObj1, dateObj2);
};

export const isDateInCurrentWeek = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const start = startOfWeek(new Date(), { weekStartsOn: 0 });
  const end = endOfWeek(new Date(), { weekStartsOn: 0 });
  
  return isWithinInterval(dateObj, { start, end });
};

export const isDateInWeek = (date: Date | string, weekDate: Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const start = startOfWeek(weekDate, { weekStartsOn: 0 });
  const end = endOfWeek(weekDate, { weekStartsOn: 0 });
  
  return isWithinInterval(dateObj, { start, end });
};

export const isDateInMonth = (date: Date | string, monthDate: Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  
  return isWithinInterval(dateObj, { start, end });
};