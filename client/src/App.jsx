// App.js
import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContextTemps';
import { TaskContext } from './contexts/TaskContext';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

import Login from './auth/Login';
import Register from './auth/Register';

import PrivateRoute from './routes/PrivateRoute';
import api from './services/api';

function App() {
  const { user } = useContext(AuthContext);
  const { setTasks } = useContext(TaskContext);

  // Charger les tâches lorsque l'utilisateur est connecté
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user) {
          const data = await api.get('/tasks');
          setTasks(data);
        }
      } catch (err) {
        console.error('Erreur de récupération des tâches:', err.message);
      }
    };

    fetchTasks();
  }, [user, setTasks]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <DashboardPage />
              </PrivateRoute> 
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute user={user}>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
