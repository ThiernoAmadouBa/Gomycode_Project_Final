import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const DashboardPage = () => {
  const { tasks, fetchTasks, loading, error } = useContext(TaskContext);

  useEffect(() => {
    if (fetchTasks) {
      fetchTasks();
    }
  }, [fetchTasks]);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.15)_0%,transparent_60%)] animate-pulse" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 p-6">
        <h1 className="text-5xl font-extrabold text-center text-white mb-10 drop-shadow-lg">
          🎯 Tableau de bord
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire pour ajouter ou modifier une tâche */}
          <div className="bg-white border-l-8 border-indigo-400 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-indigo-500 mb-4">➕ Nouvelle tâche</h2>
            <TaskForm />
          </div>

          {/* Liste des tâches */}
          <div className="bg-white border-l-8 border-pink-400 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">📋 Vos tâches</h2>

            {loading && (
              <p className="text-blue-500 font-medium animate-pulse" aria-live="polite">
                Chargement des tâches...
              </p>
            )}
            {error && (
              <p className="text-red-500 font-semibold" aria-live="assertive">
                Erreur : {error}
              </p>
            )}
            {!loading && !error && tasks && tasks.length === 0 && (
              <p className="text-gray-500">Aucune tâche à afficher.</p>
            )}
            {!loading && !error && tasks && tasks.length > 0 && <TaskList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
