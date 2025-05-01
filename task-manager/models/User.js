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

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    console.log('Mot de passe non modifié, passage au middleware suivant');
    return next();
  }

  try {
    console.log('Hachage du mot de passe en cours...');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Mot de passe haché avec succès');
    next();
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe:', error.message);
    next(error);
  }
});

// Comparaison du mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
