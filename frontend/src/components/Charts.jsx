import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';

const PIE_COLORS = ['#6875f5', '#a855f7', '#ec4899', '#10b981', '#0ea5e9', '#f59e0b', '#ef4444'];

// Custom tooltip for glassmorphism
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card !bg-white/90 dark:!bg-black/80 rounded-xl p-3 border border-white/50 dark:border-white/10 shadow-lg backdrop-blur-md">
        {label && <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">{label}</p>}
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium tracking-wide flex items-center gap-2" style={{ color: entry.color || entry.fill }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
            {entry.name}: $ {Number(entry.value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Charts for category breakdown and monthly totals
const Charts = ({ expenses }) => {
  const pieData = useMemo(() => {
    const totals = {};
    expenses
      .filter((item) => item.type === 'expense')
      .forEach((item) => {
        totals[item.category] = (totals[item.category] || 0) + item.amount;
      });

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const barData = useMemo(() => {
    const monthly = {};
    expenses.forEach((item) => {
      const date = new Date(item.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthly[key]) {
        monthly[key] = { month: key, income: 0, expense: 0 };
      }
      monthly[key][item.type] += item.amount;
    });

    return Object.values(monthly).sort((a, b) => (a.month > b.month ? 1 : -1));
  }, [expenses]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-3xl p-6 md:p-8"
      >
        <h3 className="text-xl font-display font-semibold tracking-tight text-slate-800 dark:text-white mb-6">Expense Breakdown</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={3}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="rgba(0,0,0,0)" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-3xl p-6 md:p-8"
      >
        <h3 className="text-xl font-display font-semibold tracking-tight text-slate-800 dark:text-white mb-6">Monthly Cash Flow</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(104, 117, 245, 0.05)' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="expense" name="Expense" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Charts;
