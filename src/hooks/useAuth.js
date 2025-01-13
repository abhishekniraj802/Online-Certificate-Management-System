import { useState, useEffect } from 'react';
import { getAuthStatus, loginUser, logoutUser } from '../services/authservice';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const status = await getAuthStatus();
      setIsAuthenticated(status);
    };
    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    const success = await loginUser(credentials);
    setIsAuthenticated(success);
  };

  const logout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};