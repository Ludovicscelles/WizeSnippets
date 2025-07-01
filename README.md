# WizeSnippets

Bienvenue sur WizeSnippets, un site web de partage de codes entre développeurs. Le principe est simpple : un développeur (souvent un junior) peut soumettre un morceau de code (un "snippet") sur lequel il a un doute ou dont il souhaite avoir un retour. D'autres développeurs, notamment les plus seniors, peuvent alors commenter ce snippet pour l'aider à s'améliorer.

## Badges

![FIGMA](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-262626?logo=typeorm&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)
![Argon2](https://img.shields.io/badge/Argon2-2F0C45?logo=argon2&logoColor=white)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-EF8138?logo=json-web-token&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![GIT](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## Palette de couleurs

Voici les couleurs fournies par le client.
| Color | Hex |
| ----------------- | ------------------------------------------------------------------ |
| Principale | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |
| bluewize | ![#2A7FFF](https://via.placeholder.com/10/FE4B9F?text=+) #2A7FFF |
| pinkwize | ![#FE4B9F](https://via.placeholder.com/10/FE4B9F?text=+) #FE4B9F|

| Font | Source |
| ----------------- | ------------------------------------------------------------------ |
| Quicksand | [Google Fonts](https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap) |

## Auteur

- [@Ludovic](https://github.com/Ludovicscelles)

### Windows users

Be sure to run these commands in a git terminal to avoid [issues with newline formats](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

### Project Initialization

# Cloner le dépôt
git clone https://github.com/Ludovicscelles/WizeSnippets

# Aller dans le dossier
cd wizesnippets

# Installer les dépendances du client et du serveur
cd client && npm install
cd ../server && npm install

# Environnement files
Create environment files (`.env`) in both `api` and `client`: you can copy `.env.sample` files as starters (**don't** delete them)

### Available Commands

Dans le dossier `client` :
- `dev` : Starts the React frontend server

Dans le dossier `server` :
- `dev` : Starts the backend server
- `seed` : Seeds the database with initial data in the server

### Initialize Database

 # À la racine du projet
npm run init-db

# Puis dans le dossier server
cd server
npm install
npm run dev
npm run seed   # Optionnel


❓ FAQ

Justification des compétences techniques

Ce projet utilise un ensemble varié de technologies afin de garantir un développement robuste, efficace et moderne. Voici un aperçu des outils et technologies mis en œuvre :

  - **Figma** : Utilisé pour la conception UI/UX. Figma est une application web collaborative permettant de créer des maquettes et des prototypes interactifs, facilitant ainsi le travail en équipe sur le design.

  - **Node.js** : Utilisé pour le serveur backend. Node.js est un environnement d'exécution JavaScript basé sur le moteur V8 de Chrome, permettant de développer des applications côté serveur avec JavaScript.

  - **Express** : Framework web minimaliste pour Node.js. Il fournit une base solide pour créer des API REST de manière rapide et flexible.

  - **TypeORM** : Utilisé pour les interactions avec la base de données. C’est un ORM (Object Relational Mapper) qui permet de manipuler les données via des entités TypeScript, tout en masquant la complexité du SQL.

  - **npm** : Utilisé pour la gestion des dépendances. npm (Node Package Manager) est le gestionnaire de paquets officiel de Node.js, facilitant l’installation, la mise à jour et la gestion des librairies.

  - **Argon2** : Algorithme de hachage sécurisé utilisé pour stocker les mots de passe. Il est réputé pour sa résistance aux attaques par force brute, notamment via GPU.

  - **jsonwebtoken** : Utilisé pour l’authentification. Les JWT permettent de sécuriser les échanges entre le client et le serveur, en encodant des informations dans un format compact et sécurisé.

  - **MySQL** : Système de gestion de base de données relationnelle utilisé pour stocker les données de manière fiable et performante.

  - **Vite** : Outil de build moderne pour le frontend. Il offre un démarrage ultra rapide, un rechargement à chaud efficace, et une configuration simplifiée.

  - **React** : Bibliothèque JavaScript utilisée pour construire l’interface utilisateur. Elle permet de créer des composants réutilisables et de gérer efficacement l’état de l’application.

  - **TailwindCSS** : Framework CSS utilitaire-first qui permet de créer des interfaces rapidement et de manière cohérente, directement depuis le HTML.

  - **TypeScript** : Sur-ensemble de JavaScript avec typage statique. Il permet de détecter des erreurs dès l'écriture du code et d'améliorer la lisibilité, la maintenabilité et la robustesse du projet, côté frontend comme backend.

  - **Git** : Système de gestion de version distribué. Il permet de suivre les modifications du code, de travailler en équipe et de gérer différentes branches de développement.

  - **GitHub** : Plateforme d’hébergement Git qui facilite la collaboration, la revue de code, la gestion des issues, et le déploiement continu.