# Projet BeerHub

Ce projet est une application NestJS.

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
