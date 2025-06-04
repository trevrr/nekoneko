import React, { ReactNode } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Calendar, BarChart2, Activity, Cat, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { setCurrentDate } = useMood();

  const handleLogoClick = () => {
    setCurrentDate(new Date());
    navigate('/day');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleLogoClick}
          >
            <Cat size={24} />
            <h1 className="text-xl font-semibold">Niko-Niko - Track How Things Are Going</h1>
          </motion.div>
          <Link 
            to="/welcome" 
            className="text-white/90 hover:text-white flex items-center gap-1"
          >
            <HelpCircle size={20} />
            <span>FAQ</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        {children}
      </main>

      <nav className="bg-white border-t border-gray-200 p-2 shadow-inner">
        <div className="container mx-auto flex justify-around">
          <NavLink 
            to="/day" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Calendar size={20} />
            <span className="text-xs mt-1">Today</span>
          </NavLink>
          
          <NavLink 
            to="/week" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BarChart2 size={20} />
            <span className="text-xs mt-1">Week</span>
          </NavLink>
          
          <NavLink 
            to="/month" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Activity size={20} />
            <span className="text-xs mt-1">Month</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;