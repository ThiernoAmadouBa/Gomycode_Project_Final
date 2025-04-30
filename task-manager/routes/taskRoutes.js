// src/routes/taskRoutes.js
const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTask); // Ajouter une tâche
router.get('/', authMiddleware, getTasks); // Récupérer toutes les tâches
router.get('/:id', authMiddleware, getTaskById); // Récupérer une tâche par ID
router.put('/:id', authMiddleware, updateTask); // Mettre à jour une tâche
router.delete('/:id', authMiddleware, deleteTask); // Supprimer une tâche

module.exports = router;
