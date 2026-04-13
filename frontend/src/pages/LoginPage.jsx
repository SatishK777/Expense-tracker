import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { FiArrowRight, FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

// Login page with validation
const LoginPage = ({ onToggleTheme, theme }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(form);
    if (result.ok) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Premium animated background elements specifically for auth pages */}
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] bg-sky-400/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card relative w-full max-w-[420px] rounded-[2rem] p-8 sm:p-10 z-10 before:absolute before:inset-0 before:-z-10 before:rounded-[2rem] before:bg-gradient-to-b before:from-white/10 before:to-transparent"
      >
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="inline-flex h-16 w-16 mb-4 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-glow">
             <FiLock className="text-3xl" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-2">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Log in to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
              <FiMail />
            </div>
            <input
              className="input-field pl-11 py-3.5 bg-slate-50/50 dark:bg-black/20"
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
              <FiLock />
            </div>
            <input
              className="input-field pl-11 py-3.5 bg-slate-50/50 dark:bg-black/20"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          
          {error && <p className="text-sm text-rose-500 dark:text-rose-400 font-medium text-center bg-rose-500/10 p-2 rounded-lg">{error}</p>}
          
          <button type="submit" className="btn-primary w-full py-3.5 mt-2 text-base">
            Sign in
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10"></span>
          OR
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10"></span>
        </div>

        <a href={`${apiUrl}/api/auth/google`} className="btn-secondary w-full py-3.5 justify-center bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10">
          <FcGoogle className="text-xl" /> <span className="font-semibold">Continue with Google</span>
        </a>

        <p className="text-sm font-medium text-center text-slate-600 dark:text-slate-400 mt-8">
          New here? <Link className="text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors hover:underline" to="/register">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
