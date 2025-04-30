// src/controllers/taskController.js
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware'); // Importer le middleware d'authentification

// Créer une tâche
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: 'Le titre et la date limite sont obligatoires.' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      status,
      user: req.user.userId, // Associe la tâche à l'utilisateur connecté
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Erreur lors de la création de la tâche:', err.message);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Récupérer toutes les tâches
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }); // Récupère les tâches de l'utilisateur connecté
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Erreur lors de la récupération des tâches:', err.message);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Récupérer une tâche par ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Mettre à jour une tâche
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    await task.remove();

    res.status(200).json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

// console.log('createTask:', createTask);
// console.log('getTasks:', getTasks);
// console.log('getTaskById:', getTaskById);
// console.log('updateTask:', updateTask);
// console.log('deleteTask:', deleteTask);
// console.log('authMiddleware:', authMiddleware);