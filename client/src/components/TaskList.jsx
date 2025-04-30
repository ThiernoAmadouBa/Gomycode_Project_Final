// src/components/tasks/TaskList.jsx
import React, { useContext, useEffect } from 'react';
import { TaskContext } from "../contexts/TaskContext"; // Correction de l'importation
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, fetchTasks, loading, error } = useContext(TaskContext);

  // Charger les tâches au montage du composant
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Ajout de fetchTasks dans les dépendances

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Liste des tâches</h2>

      {/* Message de chargement */}
      {loading && (
        <p className="text-blue-500" aria-live="polite">
          Chargement des tâches...
        </p>
      )}

      {/* Message d'erreur */}
      {error && (
        <p className="text-red-500" aria-live="assertive">
          Erreur : {error}
        </p>
      )}

      {/* Message si aucune tâche n'est disponible */}
      {tasks.length === 0 && !loading && !error ? (
        <p className="text-gray-500">Aucune tâche pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
