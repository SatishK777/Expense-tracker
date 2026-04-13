import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { FiLogOut, FiMoon, FiSun, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Top navigation with user info and actions
const Navbar = ({ onToggleTheme, theme }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-4 glass-card sticky top-4 z-50"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-glow">
          <FiActivity className="text-xl" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase subtle-text mb-0.5">V⚡︎LT Tracker</p>
          <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, <span className="gradient-text">{user?.name || 'Explorer'}</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onToggleTheme} className="btn-secondary px-3 py-2.5">
          {theme === 'dark' ? <FiSun className="text-amber-400" /> : <FiMoon className="text-indigo-600" />}
        </button>
        <button onClick={logout} className="btn-primary">
          <FiLogOut /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
