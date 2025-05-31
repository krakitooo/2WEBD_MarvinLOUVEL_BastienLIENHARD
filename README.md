# Explorateur de la Collection du Metropolitan Museum of Art

Ce projet est une interface web moderne pour explorer la collection du Metropolitan Museum of Art. Il offre aux chercheurs, universitaires et passionnés d'art des fonctionnalités de recherche puissantes et une interface élégante pour découvrir les œuvres d'art.

## Fonctionnalités

- **Recherche Rapide** : Accessible sur toutes les pages via l'en-tête
- **Recherche Avancée** : Page dédiée avec plusieurs filtres incluant :
  - Mots-clés
  - Département
  - Périodes
  - Support
  - Statut "mis en avant"
  - Statut "actuellement exposé"
  - Recherche par artiste/culture
- **Page d'Accueil** : Sélection d'œuvres remarquables
- **Vue Détaillée des Œuvres** : Informations complètes sur chaque œuvre incluant :
  - Images haute résolution
  - Vues multiples lorsque disponibles
  - Métadonnées détaillées (artiste, date, support, dimensions, etc.)
  - Information sur le département
  - Mentions de crédit
- **Design Responsive** : Fonctionnel sur tous les appareils

## Installation

Deux méthodes d'installation sont possibles :

### Méthode 1 : Via Git

1. Cloner le dépôt :

```bash
git clone https://github.com/krakitooo/2WEBD_MarvinLOUVEL_BastienLIENHARD
cd 2WEBD_MarvinLOUVEL_BastienLIENHARD
```

### Méthode 2 : Via Archive ZIP

1. Télécharger et dézipper l'archive du projet (`2WEBD_MarvinLOUVEL_BastienLIENHARD`)
2. Ouvrir un terminal dans le dossier dézippé

### Puis pour les deux méthodes :

1. Installer les dépendances :

```bash
npm install
```

2. Démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173` (ou un autre port si le 5173 est occupé).

## Structure du Projet

```
src/
├── api/
│   └── metAPI.js          # Intégration avec l'API du MET
├── components/
│   ├── Footer.jsx         # Pied de page
│   ├── Header.jsx         # En-tête de navigation
│   ├── Loader.jsx         # Animation de chargement
│   ├── ObjectCard.jsx     # Composant carte d'œuvre
│   └── SearchBar.jsx      # Composant de recherche rapide
├── pages/
│   ├── AdvancedSearch.jsx # Page de recherche avancée
│   ├── Home.jsx          # Page d'accueil
│   ├── NotFound.jsx      # Page 404
│   └── ObjectDetail.jsx   # Vue détaillée des œuvres
├── router/
│   └── router.jsx        # Routage de l'application
├── styles/               # Modules CSS pour chaque composant
└── App.jsx              # Composant racine
```

## Technologies Utilisées

- React 19
- React Router pour la navigation
- API du Metropolitan Museum of Art
- Vite pour le build
- CSS pour le style

## Documentation API

Ce projet utilise l'API de la Collection du Metropolitan Museum of Art. Pour plus d'informations sur l'API, visitez :
https://metmuseum.github.io/

## Notes

- L'application nécessite une connexion internet active pour récupérer les données de l'API du MET
- Certaines œuvres peuvent ne pas avoir d'images disponibles
- L'API a des limites de taux de requêtes, donc des recherches consécutives rapides peuvent être limitées

## Auteurs

### **Marvin LOUVEL**

### **Bastien LIENHARD**
