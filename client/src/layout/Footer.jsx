// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4" aria-label="Pied de page">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Texte des droits d'auteur */}
        <p>&copy; 2025 Task Manager. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
