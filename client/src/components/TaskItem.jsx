import React, { useContext, useCallback } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { formatDate } from '../utils/formatDate'; // Correction : Importation correcte de la fonction

const TaskItem = ({ task }) => {
  const { deleteTask, setSelectedTask } = useContext(TaskContext);

  // Gestion de l'édition de la tâche
  const handleEdit = useCallback(() => {
    setSelectedTask(task);
  }, [setSelectedTask, task]);

  // Gestion de la suppression de la tâche
  const handleDelete = useCallback(() => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      deleteTask(task._id);
    }
  }, [deleteTask, task]);

  return (
    <li className="bg-white p-4 rounded shadow flex justify-between items-start mb-4">
      <div>
        {/* Titre de la tâche */}
        <h3 className="text-lg font-bold">{task.title}</h3>

        {/* Description de la tâche */}
        {task.description && (
          <p className="text-gray-700 mt-1">{task.description}</p>
        )}

        {/* Date limite de la tâche */}
        {task.dueDate && (
          <p className="text-sm text-gray-500 mt-1">
            Date limite : {formatDate(task.dueDate)} {/* Correction : Utilisation correcte de la fonction */}
          </p>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700"
          aria-label={`Modifier la tâche : ${task.title}`}
        >
          Modifier
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
          aria-label={`Supprimer la tâche : ${task.title}`}
        >
          Supprimer
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
