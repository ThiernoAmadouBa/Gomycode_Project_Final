import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Données envoyées pour l\'inscription:', formData); // Log des données

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err.message);
      setError('Erreur lors de l’inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-200 overflow-hidden px-4">

      {/* --- Particules d'arrière-plan --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.15)_0%,transparent_60%)] animate-pulse" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-xl p-8"
      >
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Connexion
        </h3>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 text-white font-semibold rounded-xl transition duration-300 ${
            loading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p className="text-center text-gray-700 mt-6">
          Vous n'avez pas de compte ?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
