
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ocms-backend.up.railway.app',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserCertificates = async () => {
  return [
    {
      id: 1,
      name: 'Web Development Certification',
      issuer: 'Tech Academy',
      status: 'Completed',
      progress: 100,
      date: '2024-02-10',
      authorized: true,
    },
    {
      id: 2,
      name: 'Data Science Fundamentals',
      issuer: 'Data Institute',
      status: 'In Progress',
      progress: 60,
      date: '2024-02-15',
      authorized: false,
    },
    // ... more certificates
  ];
};

export const addCertificate = async (newCertificate) => {
  try {
    console.log('Sending certificate data:', newCertificate);
    const response = await api.post('/user/certificate/request', newCertificate);
    return response.data;
  } catch (error) {
    console.error('Error Generating certificate:', error);
    throw error;
  }
};

export const getAll = async () => {
  try {
    const response = await api.get('/user/certificate/all');
    return response.data;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const getAllCertificates = async () => {
  try {
    const response = await api.get('/admin/get/all/certificates');
    return response.data;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await api.get('/admin/get/all/users');
    return response.data;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const isGenerated = async () => {
  try {
    const response = await api.get('/user/is-generated');
    return response;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const deleteCertificate = async (id) => {
  try {
    const response = await api.delete('/certificates/' + id);
    return response.status;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const addUser = async (formData) => {
  try {
    console.log('Sending certificate data:', formData);
    const response = await api.post('/admin/create/user', formData);
    return response.data;
  } catch (error) {
    console.error('Error Generating certificate:', error);
    throw error;
  }
};

export const forgotPasswordApi = async (id) => {
  try {
    const response = await api.post('/admin/user/forgot', id);
    return response.data;
  } catch (error) {
    console.error('Error Forgetting password:', error);
    throw error;
  }
};

export const authorizeCertificatebyId = async (id) => {
  try {
    const response = await api.put('/admin/authorize', null, {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error('Error authorizing certificate:', error);
    throw error;
  }
};
// Add to service.js
export const downloadCertificate = async (certificateId) => {
  try {
    const response = await api.get(`/user/certificate/download/${certificateId}`, {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error('Error downloading certificate:', error);
    throw error;
  }
};

export const deauthorizeCertificatebyId = async (id) => {
  try {
    const response = await api.put('/admin/deauthorize', null, {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error('Error authorizing certificate:', error);
    throw error;
  }
};
