const API_URL = import.meta.env.VITE_API_URL || 'https://gomycode-project-final.onrender.com/api';

const addTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token'); // Récupère le token JWT
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Envoie le token JWT
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'ajout de la tâche');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche:', error.message);
    throw error;
  }
};

// Fonction pour récupérer les tâches
const getAllTasks = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la récupération des tâches');
  }

  return await response.json();
};

// Fonction pour supprimer une tâche
const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token'); // Récupère le token JWT
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Envoie le token JWT
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la suppression de la tâche');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error.message);
    throw error;
  }
};

// Fonction pour mettre à jour une tâche
const updateTask = async (taskId, updatedData) => {
  try {
    const token = localStorage.getItem('token'); // Récupère le token JWT
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Envoie le token JWT
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la mise à jour de la tâche');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error.message);
    throw error;
  }
};

// Exportez toutes les fonctions nécessaires
export { addTask, getAllTasks, deleteTask, updateTask };
