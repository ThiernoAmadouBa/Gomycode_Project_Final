// src/services/api.js

// URL de l'API backend
const API_URL = import.meta.env.VITE_API_URL || 'https://gomycode-project-final.onrender.com/api'; // Utilisation de import.meta.env pour Vite



// Fonction pour récupérer le token d'authentification
const getAuthToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Token récupéré:', user?.token); // Ajoutez ce log
    return user ? user.token : null;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    return null;
  }
};

// Fonction pour gérer les erreurs de manière centralisée
const handleApiError = (error, defaultMessage) => {
  const message = error.message || defaultMessage || 'Une erreur est survenue';
  console.error(message);
  throw new Error(message);
};

// Fonction générique pour effectuer des requêtes Fetch
const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  console.log('Token envoyé:', token); // Vérifiez le token ici

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la requête');
    }

    return await response.json();
  } catch (error) {
    handleApiError(error, 'Erreur lors de la requête');
  }
};

// API pour récupérer toutes les tâches
const getTasks = async () => {
  return await fetchWithAuth('/tasks', { method: 'GET' });
};

// API pour récupérer une tâche par son ID
const getTaskById = async (taskId) => {
  return await fetchWithAuth(`/tasks/${taskId}`, { method: 'GET' });
};

// API pour créer une nouvelle tâche
const createTask = async (taskData) => {
  return await fetchWithAuth('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};

// API pour mettre à jour une tâche
const updateTask = async (taskId, taskData) => {
  return await fetchWithAuth(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
};

// API pour supprimer une tâche
const deleteTask = async (taskId) => {
  return await fetchWithAuth(`/tasks/${taskId}`, { method: 'DELETE' });
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

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




