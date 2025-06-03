import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Sunset, Lock, Database, Github } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [skipLanding, setSkipLanding] = useState(false);

  const handleGetStarted = () => {
    if (skipLanding) {
      localStorage.setItem('skipLanding', 'true');
    }
    navigate('/day');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Track Your Daily Journey with Your Own
            <span className="text-purple-600"> Neko-Neko</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg">
            A private, secure way to track whatever you want to.
          </p>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg">
            You might use this to track your daily mood, daily habits or just how things are going.
          </p>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg">
            At the end of each day you can perform a reflection or meditation if you want.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="text-amber-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Morning Check-in</h3>
              <p className="text-gray-600">Start your day by recording your morning mood</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sunset className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Afternoon Update</h3>
              <p className="text-gray-600">Track how your day is progressing</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Moon className="text-indigo-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Evening Reflection</h3>
              <p className="text-gray-600">End your day with a mindful reflection</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">100% Private</h3>
            <p className="text-gray-600">
              Your data stays on your device. No servers, no tracking, just your personal space.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Database className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Local Storage Only</h3>
            <p className="text-gray-600">
              Everything is stored securely in your browser's local storage, giving you complete control.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Github className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Open Source</h3>
            <p className="text-gray-600">
              Transparent and community-driven development ensures trust and continuous improvement.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-sm p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Details</h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              Neko-Neko uses your browser's Local Storage to securely store your mood data and reflections. 
              This means:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All data remains on your device</li>
              <li>No external servers or databases are used</li>
              <li>Your data persists between sessions</li>
              <li>You can clear your data at any time through your browser settings</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Get Started
          </button>
          <div className="mt-4 flex items-center justify-center">
            <input
              type="checkbox"
              id="skipLanding"
              checked={skipLanding}
              onChange={(e) => setSkipLanding(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="skipLanding" className="ml-2 text-sm text-gray-600">
              Don't show this page again
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;