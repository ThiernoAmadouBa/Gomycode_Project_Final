// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // Importation du module path

const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Utiliser CORS pour permettre les requêtes cross-origin
app.use(cors({ origin: 'http://localhost:4000' }));

// Middleware pour parser le body en JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// // Gestion des erreurs pour les routes non trouvées
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route non trouvée' });

// });

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client', 'dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
//   });
// }

// // Middleware global pour la gestion des erreurs
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Erreur serveur' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
