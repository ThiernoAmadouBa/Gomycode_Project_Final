import api from './api';

const addTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token'); // Récupère le token JWT
    const response = await fetch(`${API_URL}/api/tasks`, {
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

const getAllTasks = async () => {
  return await api.get('/tasks');
};

const deleteTask = async (taskId) => {
  return await api.delete(`/tasks/${taskId}`);
};

const updateTask = async (taskId, updatedData) => {
  return await api.put(`/tasks/${taskId}`, updatedData);
};

export { addTask, getAllTasks, deleteTask, updateTask };
