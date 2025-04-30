import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContextTemps";
import { LogOut, User, LayoutDashboard, LogIn, UserPlus, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      console.error("La fonction logout n'est pas définie.");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Inverse l'état du menu
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg" aria-label="Barre de navigation">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo ou titre */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide hover:opacity-90 transition-opacity" aria-label="Page d'accueil">
          Task<span className="text-yellow-300">Manager</span>
        </Link>

        {/* Bouton hamburger pour le responsive */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Liens de navigation */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 text-lg font-semibold`}
        >
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
