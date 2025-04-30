// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de login
    // avec l'état pour revenir à la page précédente après la connexion
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si l'utilisateur est connecté, affiche les enfants
  return children;
};

export default PrivateRoute;
