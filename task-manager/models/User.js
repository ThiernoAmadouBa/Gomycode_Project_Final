const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Veuillez entrer un email valide'],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe:', error.message);
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
