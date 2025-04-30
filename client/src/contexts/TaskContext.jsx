import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des tâches');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token'); // Récupère le token JWT
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout de la tâche');
      }

      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]); // Ajoute la nouvelle tâche à la liste
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la tâche:', err.message);
      throw err;
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, loading, error }}>
      {children}
    </TaskContext.Provider>
  );
};
