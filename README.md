# Eazy Stay

Eazy Stay est une application de location de logements basée sur une architecture microservices. L'objectif est de fournir une plateforme fluide pour les locataires et les propriétaires afin de gérer les offres et les réservations de logements.

## 🚀 Technologies utilisées

- **Back-end** : Node.js avec Express
- **Base de données** : MySQL
- **Communication interservices** : Axios
- **Déploiement** : Docker & Kubernetes

## 📌 Architecture microservices

L'application est divisée en trois services indépendants :

### **1. User Service** (port **8000**)

- Inscription et connexion des utilisateurs
- Gestion des informations utilisateurs
- Récupération de la liste des utilisateurs

### **2. Property Service** (port **8001**)

- Ajout de nouveaux logements
- Recherche et filtrage des logements
- Récupération de la liste des logements disponibles

### **3. Location Service** (port **8002**)

- Vérification de la disponibilité des logements
- Réservation d'un logement
- Gestion des critères de recherche pour la réservation

## 📂 Structure du projet

Chaque service suit une architecture standard :

```
/service_name/
│── app.js          # Initialisation du serveur
│── controller.js   # Logique métier du service
│── routes.js       # Définition des routes API
│── package.json    # Dépendances du projet
│── package-lock.json
```

Autres fichiers importants :

- `` : Script SQL pour créer la base de données
- `` : Suggestions d'améliorations futures

## ⚙️ Installation et exécution

### **1. Cloner le dépôt**

```sh
git clone https://github.com/LouisNG41/eazy-stay.git
cd eazy-stay
```

### **2. Installer les dépendances**

```sh
npm install
```

(À exécuter dans chaque dossier de service : `user_service`, `properties_service`, `locations_service`)

### **3. Lancer les services**

Dans chaque dossier de service, exécuter :

```sh
node app.js
```

### **4. Base de données**

Importer le fichier `eazystaybdd.sql` dans MySQL pour créer la base de données.

## 🔧 Améliorations possibles

- Développement d’une interface utilisateur
- Utilisation d’une ORM
- Sécurisation des données (chiffrement des mots de passe, protection contre les injections SQL)
- Gestion avancée des permissions

---

**Auteur** : *steven-van, BastienLac, nathaliu, LouisNG41*

