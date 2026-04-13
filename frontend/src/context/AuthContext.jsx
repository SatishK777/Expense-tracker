import React, { createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance.js';

export const AuthContext = createContext();

// Provider that manages auth state and actions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Restore session from stored token
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const { data } = await axiosInstance.get('/api/auth/me');
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch (error) {
        setUser(null);
        setToken(null);
      }
    };

    fetchProfile();
  }, [token]);

  // Register a new user and store token
  const register = async (payload) => {
    try {
      const { data } = await axiosInstance.post('/api/auth/register', payload);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Welcome aboard!');
      return { ok: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Registration failed';
      toast.error(message);
      return { ok: false, message };
    }
  };

  // Login an existing user and store token
  const login = async (payload) => {
    try {
      const { data } = await axiosInstance.post('/api/auth/login', payload);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Welcome back!');
      return { ok: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Login failed';
      toast.error(message);
      return { ok: false, message };
    }
  };

  // Clear local session
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const setSession = (authToken, authUser = null) => {
    setToken(authToken);
    localStorage.setItem('token', authToken);
    if (authUser) {
      setUser(authUser);
      localStorage.setItem('user', JSON.stringify(authUser));
    }
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout, setSession }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
