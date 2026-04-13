import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ExpenseProvider } from './context/ExpenseContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Render the React app with global providers
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <App />
          <ToastContainer position="top-right" theme="dark" autoClose={2500} />
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
