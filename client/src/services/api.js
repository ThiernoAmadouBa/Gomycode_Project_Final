// src/services/api.js

// URL de l'API backend
const API_URL = import.meta.env.VITE_API_URL;



const api = {
  get: async (endpoint) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des données');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API GET:', error.message);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'envoi des données');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API POST:', error.message);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API DELETE:', error.message);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API PUT:', error.message);
      throw error;
    }
  },
};

export default api;

import api from '../services/api'; // Importez le fichier api.js

const fetchTasks = async () => {
  try {
    const tasks = await api.getTasks(); // Appelle la fonction getTasks de api.js
    setTasks(tasks); // Met à jour l'état des tâches
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.message);
    setError('Erreur lors de la récupération des tâches');
  }
};




