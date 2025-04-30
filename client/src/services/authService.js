// src/services/authService.js
import axios from 'axios';

// Utilisation de la variable d'environnement pour définir l'URL de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l’inscription:', error.message);
    throw error;
  }
};

// Exemple d'utilisation de la fonction d'inscription
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));

// Connexion d'un utilisateur
const login = async ({ email, password }) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
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
    localStorage.setItem('token', data.token); // Stocke le token JWT
    return data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.message);
    throw error;
  }
};

// Déconnexion de l'utilisateur
const logout = () => {
  localStorage.removeItem('user'); // Supprime l'utilisateur du stockage local
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

// Fonction pour vérifier si l'utilisateur est authentifié
const isAuthenticated = () => {
  return !!getUser();
};

export default {
  register,
  login,
  logout,
  getUser,
  isAuthenticated,
};


