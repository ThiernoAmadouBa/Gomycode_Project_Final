// src/routes/authRoutes.js
const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Importer le middleware d'authentification

const router = express.Router();

// Route pour l'inscription (accessible sans authentification)
router.post('/register', registerUser);

// Route pour la connexion (accessible sans authentification)
router.post('/login', loginUser); // Retirer authMiddleware ici

// Exemple de route protégée (nécessite une authentification)
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Accès autorisé', user: req.user });
});

module.exports = router;
