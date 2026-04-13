import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext.jsx';
import { FiTrendingDown, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Summary cards for income, expenses, and balance
const Dashboard = () => {
  const { summary } = useContext(ExpenseContext);

  const cards = [
    {
      label: 'Gross Income',
      value: summary.income,
      icon: <FiTrendingUp />,
      accent: 'from-emerald-500/20 to-emerald-400/5',
      iconColor: 'text-emerald-500 dark:text-emerald-400'
    },
    {
      label: 'Total Expenses',
      value: summary.expense,
      icon: <FiTrendingDown />,
      accent: 'from-rose-500/20 to-rose-400/5',
      iconColor: 'text-rose-500 dark:text-rose-400'
    },
    {
      label: 'Net Balance',
      value: summary.balance,
      icon: <FiDollarSign />,
      accent: 'from-brand-500/20 to-sky-400/5',
      iconColor: 'text-brand-600 dark:text-brand-400'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.section 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="grid gap-6 md:grid-cols-3"
    >
      {cards.map((card) => (
        <motion.div
          variants={item}
          key={card.label}
          whileHover={{ y: -5, scale: 1.02 }}
          className={`glass-card relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br transition-all duration-300 ${card.accent}`}
        >
          {/* Subtle background glow element inside the card */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 dark:bg-white/5 blur-2xl"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm font-semibold tracking-wide uppercase subtle-text mb-1">{card.label}</p>
              <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-white tracking-tight">
                $ {card.value.toLocaleString()}
              </h2>
            </div>
            <div className={`p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm border border-white/20 dark:border-white/10 ${card.iconColor} text-2xl`}>
              {card.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Dashboard;
