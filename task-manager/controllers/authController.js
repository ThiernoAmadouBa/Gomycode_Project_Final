// src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET, // Utilisation de la clé secrète
    { expiresIn: '1h' } // Durée de validité
  );
};

const registerUser = async (req, res) => {
  try {
    console.log('Données reçues pour l\'inscription:', req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.error('Champs requis manquants');
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('Utilisateur déjà existant avec cet email:', email);
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const user = new User({ name, email, password });
    await user.save();
    console.log('Utilisateur créé avec succès:', user);

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err.message);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

const loginUser = async (req, res) => {
  try {
    const {name, email, password } = req.body;

    // Vérifiez si l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // Recherchez l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    // Comparez le mot de passe fourni avec le mot de passe haché
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = generateToken(user);

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = { registerUser, loginUser };