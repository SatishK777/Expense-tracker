import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import OAuthCallback from './pages/OAuthCallback.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Root app component with routing and theme state
const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const pageTransition = useMemo(
    () => ({
      initial: { opacity: 0, y: 15, filter: 'blur(10px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: -15, filter: 'blur(10px)' },
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
    []
  );

  return (
    <div className="min-h-screen text-slate-900 dark:text-white transition-colors duration-500">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/login"
            element={
              <motion.div {...pageTransition} className="h-full w-full">
                <LoginPage onToggleTheme={toggleTheme} theme={theme} />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div {...pageTransition} className="h-full w-full">
                <RegisterPage onToggleTheme={toggleTheme} theme={theme} />
              </motion.div>
            }
          />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <motion.div {...pageTransition} className="h-full w-full">
                  <DashboardPage onToggleTheme={toggleTheme} theme={theme} />
                </motion.div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
