// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Assurez-vous que le chemin est correct
import api from '../services/api';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      console.log('Données envoyées pour la connexion:', credentials);
      const data = await api.post('/auth/login', credentials);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.message);
      throw new Error('Impossible de se connecter. Veuillez vérifier vos identifiants.');
    }
  };

  const handleRegister = async (userData) => {
    try {
      console.log('Données envoyées au backend:', userData);
      const data = await api.post('/auth/register', userData);
      console.log('Réponse du backend:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.message);
      throw error;
    }
  };

  const handleLogout = () => {
    try {
      authService.logout();
      setUser(null);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error.message || error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
