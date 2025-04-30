import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200 overflow-hidden px-6">

      {/* --- Effet de particules animées --- */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2)_0%,transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15)_0%,transparent_60%)] animate-pulse" />
      </div>

      {/* --- Contenu principal --- */}
      <div className="z-10 text-center max-w-xl bg-white/50 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/30">

        {/* Titre animé */}
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 70, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4"
        >
          Welcome to <span className="text-purple-600">TaskManager</span> 🚀
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-800 mb-8"
        >
          Organisez, suivez et gérez vos tâches avec simplicité et style.
        </motion.p>

        {/* Boutons d'action */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
          >
            S'inscrire
          </Link>
          <Link
            to="/login"
            className="bg-white/80 text-blue-700 border border-blue-300 px-6 py-3 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Se connecter
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
