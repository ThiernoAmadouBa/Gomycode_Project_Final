// index.js ou App.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Utilisation de React 18
import App from './App';
import { AuthProvider } from './contexts/AuthContextTemps';
import { TaskProvider } from './contexts/TaskContext';
import './index.css'; // Importation du fichier CSS principal
import { BrowserRouter } from 'react-router-dom';

// Rendu de l'application principale
const rootElement = document.getElementById('root'); // Correction : suppression du caractère '#'
if (!rootElement) {
  throw new Error("L'élément avec l'ID 'root' est introuvable dans index.html");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
