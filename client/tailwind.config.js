/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Inclut tous les fichiers pertinents pour Tailwind
  ],
  theme: {
    extend: {
      // Ajout de couleurs personnalisées
      colors: {
        primary: "#3b82f6", // Bleu principal
        secondary: "#2563eb", // Bleu foncé
        danger: "#ef4444", // Rouge pour les erreurs
        success: "#10b981", // Vert pour les succès
      },
      // Ajout de polices personnalisées si nécessaire
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Police par défaut
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Plugin pour styliser les formulaires
    require("@tailwindcss/typography"), // Plugin pour améliorer le rendu du texte
  ],
};
