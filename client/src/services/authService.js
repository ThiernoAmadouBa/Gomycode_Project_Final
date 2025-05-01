// src/services/authService.js

// Utilisation de la variable d'environnement pour définir l'URL de l'API
const API_URL = import.meta.env.VITE_API_URL || 'https://gomycode-project-final.onrender.com/api';

// Inscription d'un utilisateur
const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l’inscription');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Stocke le token
    localStorage.setItem('user', JSON.stringify(data.user)); // Stocke les infos utilisateur
    return data;
  } catch (error) {
    console.error('Erreur lors de l’inscription:', error.message);
    throw error;
  }
};

// Connexion d'un utilisateur
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
    localStorage.setItem('token', data.token); // Stocke le token
    localStorage.setItem('user', JSON.stringify(data.user)); // Stocke l'utilisateur
    return data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.message);
    throw error;
  }
};

// Déconnexion de l'utilisateur
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Récupération des informations de l'utilisateur connecté
const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
};

// Vérifie si un utilisateur est authentifié
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default {
  register,
  login,
  logout,
  getUser,
  isAuthenticated,
};
