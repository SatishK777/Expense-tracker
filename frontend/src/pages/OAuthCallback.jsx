import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

// Handles OAuth redirect from backend and stores token
const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      setSession(token);
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [location.search, navigate, setSession]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-6 text-center">
        <h2 className="section-title">Signing you in...</h2>
        <p className="subtle-text mt-2">Redirecting to your dashboard.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
