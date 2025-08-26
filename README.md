# 🎌 MangaView - Plateforme de Lecture de Manga

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zilongayan/n5)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 **Vue d'ensemble**

**MangaView** est une plateforme moderne de lecture de manga construite avec **Next.js 15**, **NextAuth.js**, et **Prisma**. Elle offre une expérience utilisateur fluide avec authentification Google OAuth, gestion des favoris, collections personnalisées, et une interface responsive.

## ✨ **Fonctionnalités Principales**

- 🔐 **Authentification Google OAuth** - Connexion sécurisée avec Google
- 📚 **Catalogue de Manga** - Navigation par type, popularité, récent
- ❤️ **Système de Favoris** - Sauvegarde de vos mangas préférés
- 📁 **Collections Personnalisées** - Organisez vos mangas par thème
- 🌍 **Support Multilingue** - Français, Anglais, Espagnol, Italien, Portugais, Russe
- 📱 **Design Responsive** - Optimisé pour tous les appareils
- ⚡ **Performance Optimisée** - Build Next.js optimisé avec Vercel

## 🚀 **Déploiement Rapide**

### **Option 1: Déploiement Automatique (Recommandé)**
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zilongayan/n5)

### **Option 2: Déploiement Local**
```bash
# Clone du repository
git clone https://github.com/zilongayan/n5.git
cd n5/portal

# Installation des dépendances
npm install

# Configuration de la base de données
npx prisma generate
npx prisma db push

# Lancement en développement
npm run dev
```

## 🛠️ **Technologies Utilisées**

- **Frontend:** Next.js 15, React 19, TypeScript
- **Authentification:** NextAuth.js v4, Google OAuth
- **Base de données:** Prisma ORM, SQLite
- **Styling:** CSS Modules, Responsive Design
- **Déploiement:** Vercel, GitHub Actions
- **Internationalisation:** next-intl

## 📁 **Structure du Projet**

```
portal/
├── src/
│   ├── app/                 # App Router Next.js 15
│   ├── components/          # Composants React réutilisables
│   ├── hooks/              # Hooks personnalisés
│   ├── lib/                # Utilitaires et configurations
│   └── i18n/               # Fichiers de traduction
├── prisma/                 # Schéma et migrations de base de données
├── .github/                # Workflows GitHub Actions
├── scripts/                # Scripts de déploiement
└── docs/                   # Documentation complète
```

## 🔧 **Configuration Requise**

### **Variables d'Environnement**
```bash
# Base de données
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="votre-secret-ici"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="votre-client-id"
GOOGLE_CLIENT_SECRET="votre-client-secret"
```

### **Configuration Google OAuth**
1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un projet "MangaView OAuth"
3. Activez l'API Google+ API
4. Créez des identifiants OAuth 2.0
5. Ajoutez les URIs de redirection

## 📱 **Fonctionnalités Utilisateur**

### **Navigation**
- **Accueil** - Découvrez les mangas populaires
- **Catalogue** - Parcourez par type, popularité, récent
- **Recherche** - Trouvez vos mangas préférés
- **Favoris** - Accédez rapidement à vos mangas sauvegardés
- **Collections** - Organisez vos mangas par thème

### **Lecture**
- **Lecteur Optimisé** - Navigation fluide entre chapitres
- **Mode Sombre/Clair** - Adaptation à vos préférences
- **Zoom et Navigation** - Contrôles tactiles et clavier
- **Historique** - Reprenez où vous vous êtes arrêté

## 🚀 **Déploiement sur Vercel**

### **Automatique (Recommandé)**
1. Cliquez sur le bouton "Deploy to Vercel" ci-dessus
2. Connectez-vous avec votre compte GitHub
3. Configurez les variables d'environnement
4. Déployez en un clic !

### **Manuel via CLI**
```bash
# Installation de Vercel CLI
npm i -g vercel

# Connexion et déploiement
vercel login
vercel --prod
```

## 🔄 **Workflow GitHub Actions**

Le projet inclut un workflow automatisé pour le déploiement :
- **Tests automatiques** à chaque push
- **Build et déploiement** automatiques sur Vercel
- **Validation de qualité** du code

## 📊 **Statistiques du Projet**

- **⭐ Stars:** [Ajoutez votre étoile !](https://github.com/zilongayan/n5)
- **🔄 Forks:** Contribuez au projet
- **🐛 Issues:** Signalez les bugs
- **💡 Pull Requests:** Proposez des améliorations

## 🤝 **Contribution**

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité
3. **Commitez** vos changements
4. **Poussez** vers la branche
5. **Ouvrez** une Pull Request

## 📄 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 **Remerciements**

- **Next.js** - Framework React moderne
- **Vercel** - Plateforme de déploiement
- **NextAuth.js** - Authentification sécurisée
- **Prisma** - ORM moderne pour Node.js
- **Communauté open source** - Pour tous les outils et bibliothèques

## 📞 **Support**

- **Documentation:** Consultez les fichiers `.md` dans le projet
- **Issues:** [GitHub Issues](https://github.com/zilongayan/n5/issues)
- **Discussions:** [GitHub Discussions](https://github.com/zilongayan/n5/discussions)

---

## 🎯 **Prochaines Étapes**

1. **Déployez** sur Vercel avec le bouton ci-dessus
2. **Configurez** Google OAuth dans Google Cloud Console
3. **Ajoutez** vos variables d'environnement dans Vercel
4. **Testez** l'authentification Google
5. **Personnalisez** selon vos besoins

**Votre plateforme MangaView sera en ligne en moins de 5 minutes ! 🚀**

---

<div align="center">
  <strong>⭐ N'oubliez pas d'ajouter une étoile au projet ! ⭐</strong>
</div>
