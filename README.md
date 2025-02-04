# Projet BeerHub

BeerHub est une application web dédiée à la gestion et à la découverte des bars et des événements associés. Elle offre une plateforme complète pour les utilisateurs et les propriétaires de bars, avec des fonctionnalités variées pour améliorer l'expérience utilisateur.

## Fonctionnalités principales

- **Création d'événements pour les bars** : Les propriétaires de bars peuvent créer et gérer des événements pour attirer plus de clients.
- **Back office pour les bars** : Une interface dédiée aux propriétaires de bars pour gérer leurs établissements, événements et interactions avec les clients.
- **Rating** : Les utilisateurs peuvent évaluer les bars et laisser des commentaires.
- **Favoris** : Les utilisateurs peuvent ajouter des bars à leurs favoris pour un accès rapide.
- **Intéressé par un événement** : Les utilisateurs peuvent indiquer leur intérêt pour des événements spécifiques.

## Pages de l'application

- **Accueil** : Page d'accueil avec une animation 3D, une liste des bars et des événements.
- **Filtre** : Page de filtrage pour afficher les bars (avec une carte), les événements des bars et les catégories.
- **Détail des bars** : Page de détails pour chaque bar avec des informations, une carte et une option pour ajouter aux favoris.
- **Compte** : Gestion du compte utilisateur avec des interfaces pour le front-end et le back-end.
- **Création d'événements** : Interface pour créer et gérer des événements.
- **Notifications** : Envoi de notifications aux utilisateurs via des tokens.
- **Suivi des critères de popularité** : Idée pour ajouter des critères supplémentaires pour suivre la popularité des bars et des événements

## Prérequis

- Node Js v20.11.0
- Nest JS 10.4.5

## Installation du Back

Clonez le dépôt et naviguez dans le répertoire du projet :

```sh
git clone https://github.com/BeerHubYnov/beerhub-nest.git
cd beerhub-nest
```

### Compilation et Packaging

Pour compiler et packager le projet, utilisez la commande suivante :

```sh
npm install
```

### Lancer l'application en mode développement

Pour lancer l'application en mode développement avec rechargement à chaud, utilisez la commande suivante :

```sh
npm run start
```

### Exécuter les tests

Pour exécuter les tests unitaires et d'intégration, utilisez la commande suivante :

```sh
npm run test
```

### Accéder à l'application

Par défaut, l'application sera accessible à l'adresse suivante : <http://localhost:3000>

### Swagger

<http://localhost:3000/api>

### Variables d'environnement

Assurez-vous de configurer les variables d'environnement nécessaires dans un fichier .env :

```sh
# Configuration de la base de données
DATABASE_URL="postgresql://db_user:db_password@db_name:5432/beerhubynov_postgres?schema=public"
# Jwt Secret Key
JWT_SECRET="SecretKeyJWT"

```

### Prisma Migrate

Rajouter cette variable d'environnement dans le .env :

```sh
 SHADOW_DATABASE_URL="postgresql://beerhubynov:YnovHub123@postgresql-beerhubynov.alwaysdata.net:5432/beerhubynov_postgres?schema=public"
```

Ajouter dans le schema.prisma :

```sh
shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
```

Puis executer cette commande :

```sh
npx prisma migrate dev --name
```
