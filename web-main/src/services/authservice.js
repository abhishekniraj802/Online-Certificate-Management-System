import axios from 'axios';

export const getAuthStatus = async () => {
  try {
    const response = await axios.get('/auth/status');
    return response.data.isAuthenticated;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};