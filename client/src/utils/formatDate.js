// formatDate.js
export const formatDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    console.error('Date invalide fournie à formatDate:', date);
    return 'Date invalide';
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('fr-FR', options);
};
