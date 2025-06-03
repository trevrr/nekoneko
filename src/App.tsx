import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MoodProvider } from './contexts/MoodContext';
import DailyView from './pages/DailyView';
import WeeklyView from './pages/WeeklyView';
import MonthlyView from './pages/MonthlyView';
import LandingPage from './components/LandingPage';

function App() {
  const skipLanding = localStorage.getItem('skipLanding') === 'true';
  const initialRoute = skipLanding ? '/day' : '/welcome';

  return (
    <MoodProvider>
      <Router>
        <Routes>
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/day" element={<DailyView />} />
          <Route path="/week" element={<WeeklyView />} />
          <Route path="/month" element={<MonthlyView />} />
          <Route path="/" element={<Navigate to={initialRoute} replace />} />
          <Route path="*" element={<Navigate to={initialRoute} replace />} />
        </Routes>
      </Router>
    </MoodProvider>
  );
}

export default App;