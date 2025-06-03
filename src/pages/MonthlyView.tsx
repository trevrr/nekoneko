import React from 'react';
import { format, addMonths, subMonths, startOfMonth, isAfter, startOfTomorrow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MonthlyCalendar from '../components/MonthlyCalendar';
import MonthlyStats from '../components/MonthlyStats';
import DailyHeader from '../components/DailyHeader';
import { useMood } from '../contexts/MoodContext';
import { getMonthDays } from '../utils/dateUtils';

const MonthlyView: React.FC = () => {
  const { currentDate, setCurrentDate, weeklyMoods } = useMood();
  const navigate = useNavigate();
  
  const monthDays = getMonthDays(currentDate);
  const monthTitle = format(currentDate, 'MMMM yyyy');
  
  const previousMonth = subMonths(currentDate, 1);
  const tomorrow = startOfTomorrow();
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    if (!isAfter(startOfMonth(nextMonth), tomorrow)) {
      setCurrentDate(nextMonth);
    }
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleSelectDay = (date: Date) => {
    if (!isAfter(date, tomorrow)) {
      setCurrentDate(date);
      navigate('/');
    }
  };
  
  const handleSelectWeek = (date: Date) => {
    if (!isAfter(date, tomorrow)) {
      setCurrentDate(date);
      navigate('/week');
    }
  };
  
  return (
    <Layout title="Monthly Overview">
      <DailyHeader
        date={startOfMonth(currentDate)}
        onPrevious={handlePreviousMonth}
        onNext={!isAfter(startOfMonth(addMonths(currentDate, 1)), tomorrow) ? handleNextMonth : undefined}
        onToday={handleToday}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyCalendar
          monthDays={monthDays}
          monthlyMoods={weeklyMoods}
          onSelectDay={handleSelectDay}
          onSelectWeek={handleSelectWeek}
        />
        
        <MonthlyStats
          currentMonth={currentDate}
          previousMonth={previousMonth}
          monthDays={monthDays}
          monthlyMoods={weeklyMoods}
        />
      </div>
    </Layout>
  );
};

export default MonthlyView;