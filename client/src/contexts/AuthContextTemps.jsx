// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Assurez-vous que le chemin est correct

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté à chaque chargement de la page
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Gestion de la connexion
  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await login(credentials); // Appel de la fonction login
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      navigate('/dashboard'); // Redirection vers le tableau de bord
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.message || error);
      throw new Error('Impossible de se connecter. Veuillez vérifier vos identifiants.');
    }
  };

  // Gestion de l'inscription
  const handleRegister = async (userData) => {
    try {
      const newUser = await authService.register(userData); // Appel de la fonction register
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard'); // Redirection vers le tableau de bord
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.message || error);
      throw new Error('Impossible de s\'inscrire. Veuillez réessayer.');
    }
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    try {
      authService.logout(); // Appel de la fonction logout
      setUser(null);
      localStorage.removeItem('user');
      navigate('/'); // Redirection vers la page d'accueil
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

const login = async ({ email, password }) => {
  try {
    const response = await fetch('https://gomycode-project-final.onrender.com/api/auth/login', {
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
    localStorage.setItem('user', JSON.stringify(data)); // Stocke les informations utilisateur
    return data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.message);
    throw error;
  }
};

export { AuthProvider, AuthContext };

