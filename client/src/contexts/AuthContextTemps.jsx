// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Assurez-vous que le chemin est correct

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
      const loggedInUser = await login(credentials);
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.message || error);
      throw new Error('Impossible de se connecter. Veuillez vérifier vos identifiants.');
    }
  };

  const handleRegister = async (userData) => {
    try {
      console.log('Données envoyées au backend:', userData); // Log des données

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur du backend:', errorData); // Log des erreurs du backend
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      const data = await response.json();
      console.log('Réponse du backend:', data); // Log de la réponse
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.message); // Log des erreurs
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

// Fonction login séparée
const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la connexion');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.message);
    throw error;
  }
};

export { AuthProvider, AuthContext };
