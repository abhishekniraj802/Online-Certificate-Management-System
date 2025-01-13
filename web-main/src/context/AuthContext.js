import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [authState, setAuthState] = useState({ isAuthenticated });

  useEffect(() => {
    setAuthState({ isAuthenticated });
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};