import React, { useContext, useMemo, useEffect } from 'react';
import { AuthContext } from "../contexts/AuthContextTemps";
import { TaskContext } from "../contexts/TaskContext";
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Edit3 } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);
  const navigate = useNavigate();

  // Redirigez l'utilisateur vers la page de connexion s'il n'est pas connecté
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirection vers la page de connexion
    }
  }, [user, navigate]);

  const userTasks = useMemo(() => {
    if (tasks && user) {
      return tasks.filter(task => task.userId === user._id);
    }
    return [];
  }, [tasks, user]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.15)_0%,transparent_60%)] animate-pulse" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
          👤 Profil de {user?.name || 'Utilisateur'}
        </h2>

        {/* Informations sur le compte */}
        <div className="bg-white border-l-8 border-indigo-400 shadow-md rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">📄 Informations sur le compte</h3>
          <p className="text-gray-700"><strong>📧 Email :</strong> {user?.email || 'Non disponible'}</p>
          <p className="text-gray-700 mt-2"><strong>🧑‍💼 Nom :</strong> {user?.name || 'Non disponible'}</p>
        </div>

        {/* Liste des tâches */}
        <div className="bg-white border-l-8 border-pink-400 shadow-md rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-semibold text-pink-600 mb-4">📋 Mes Tâches</h3>
          {userTasks.length > 0 ? (
            <ul className="space-y-4">
              {userTasks.map(task => (
                <li key={task._id} className="flex justify-between items-start bg-gray-50 p-4 rounded-md border border-gray-200 hover:shadow">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{task.title}</h4>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">
                      📅 Date limite : {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Non définie'}
                    </p>
                  </div>
                  <Link
                    to={`/dashboard/edit/${task._id}`}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                    aria-label={`Modifier la tâche : ${task.title}`}
                  >
                    <Edit3 size={18} /> Modifier
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucune tâche en cours.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
            aria-label="Se déconnecter"
          >
            <LogOut size={18} /> Se déconnecter
          </button>
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
            aria-label="Retour au tableau de bord"
          >
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
