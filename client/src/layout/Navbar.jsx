import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContextTemps";
import { LogOut, User, LayoutDashboard, LogIn, UserPlus, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      console.error("La fonction logout n'est pas définie.");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg" aria-label="Barre de navigation">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo ou titre */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide hover:opacity-90 transition-opacity" aria-label="Page d'accueil">
          Task<span className="text-yellow-300">Manager</span>
        </Link>

        {/* Liens de navigation */}
        <div className="flex items-center space-x-6 text-lg font-semibold">
          <Link to="/" className="flex items-center gap-2 hover:text-yellow-200 transition" aria-label="Accueil">
            <Home size={22} /> Accueil
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-yellow-200 transition" aria-label="Tableau de bord">
                <LayoutDashboard size={22} /> Tableau de bord
              </Link>
              <Link to="/profile" className="flex items-center gap-2 hover:text-yellow-200 transition" aria-label="Profil">
                <User size={22} /> Profil
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-full text-white transition"
                aria-label="Déconnexion"
              >
                <LogOut size={20} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 hover:text-yellow-200 transition" aria-label="Connexion">
                <LogIn size={22} /> Connexion
              </Link>
              <Link to="/register" className="flex items-center gap-2 hover:text-yellow-200 transition" aria-label="Inscription">
                <UserPlus size={22} /> Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
