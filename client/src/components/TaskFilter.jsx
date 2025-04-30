// src/components/tasks/TaskFilter.jsx
import React, { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const TaskFilter = () => {
  const { setFilter, setSearchTerm, setSortBy } = useContext(TaskContext);
  const [search, setSearch] = useState('');

  // Gestion de la recherche
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  // Gestion du filtre par statut
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Gestion du tri
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row md:items-center gap-4">
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={search}
        onChange={handleSearch}
        className="w-full md:w-1/3 p-2 border rounded"
        aria-label="Rechercher une tâche"
      />

      {/* Filtre par statut */}
      <select
        onChange={handleFilterChange}
        className="w-full md:w-1/4 p-2 border rounded"
        aria-label="Filtrer par statut"
        defaultValue=""
      >
        <option value="">Tous les statuts</option>
        <option value="pending">En cours</option>
        <option value="completed">Terminées</option>
      </select>

      {/* Tri par date */}
      <select
        onChange={handleSortChange}
        className="w-full md:w-1/4 p-2 border rounded"
        aria-label="Trier par"
        defaultValue=""
      >
        <option value="">Trier par</option>
        <option value="dueDate">Date limite</option>
        <option value="createdAt">Date de création</option>
      </select>
    </div>
  );
};

export default TaskFilter;
