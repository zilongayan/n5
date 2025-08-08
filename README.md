# N5 Portal - Galerie d'Art Numérique

Une plateforme moderne de galerie d'art numérique avec système d'authentification, gestion des favoris, collections et interface multilingue.

## 🚀 Fonctionnalités

### ✨ Interface Utilisateur
- **Design moderne** avec thème sombre/clair
- **Interface responsive** adaptée mobile/desktop
- **Navigation fluide** avec animations
- **Recherche avancée** avec filtres par tags/artistes
- **Système de pagination** pour les galeries

### 🔐 Authentification
- **Inscription/Connexion** sécurisée
- **Persistance de session** avec localStorage
- **Protection des routes** privées
- **Gestion des profils** utilisateur
- **Déconnexion** automatique

### ❤️ Gestion des Favoris
- **Ajout/Suppression** de favoris
- **Page dédiée** aux favoris
- **Synchronisation** en temps réel
- **Interface intuitive** avec boutons d'action

### 📚 Collections
- **Création de collections** personnalisées
- **Gestion des items** dans les collections
- **Partage public/privé** des collections
- **Interface de gestion** complète

### 🌍 Internationalisation
- **Support multilingue** (EN, FR, ES, IT, PT, RU)
- **Sélecteur de langue** dans la navbar
- **Traductions complètes** de l'interface
- **Détection automatique** de la langue

### 🎨 Galeries
- **Catalogue dynamique** avec données mockées
- **Pages populaires/récentes** avec tri intelligent
- **Galerie aléatoire** pour la découverte
- **Détails complets** des œuvres

## 🛠️ Technologies

### Frontend
- **Next.js 15** avec App Router
- **React 18** avec hooks modernes
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations

### Backend
- **Next.js API Routes** pour l'API
- **Prisma ORM** pour la base de données
- **SQLite** pour le stockage local
- **bcryptjs** pour le hachage des mots de passe
- **Cookies sécurisés** pour les sessions

### Base de Données
- **SQLite** avec Prisma
- **Modèles** : User, Favorite, Collection, Comment
- **Relations** optimisées avec cascade
- **Migrations** automatiques

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd portal
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env.local
```

4. **Configuration de la base de données**
```bash
npx prisma generate
npx prisma db push
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🔧 Configuration

### Variables d'environnement
```env
# Base de données
DATABASE_URL="file:./dev.db"

# URL de base (optionnel)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Scripts disponibles
```bash
# Développement
npm run dev          # Lance le serveur de développement
npm run build        # Build de production
npm run start        # Lance le serveur de production

# Base de données
npm run db:generate  # Génère le client Prisma
npm run db:push      # Pousse le schéma vers la DB
npm run db:studio    # Ouvre Prisma Studio

# Linting et formatage
npm run lint         # Vérifie le code
npm run format       # Formate le code
```

## 📁 Structure du Projet

```
portal/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── [locale]/          # Routes internationalisées
│   │   │   ├── login/         # Page de connexion
│   │   │   ├── signup/        # Page d'inscription
│   │   │   ├── profile/       # Page de profil
│   │   │   ├── favorites/     # Page des favoris
│   │   │   └── collections/   # Page des collections
│   │   └── api/               # Routes API
│   │       ├── auth/          # Vérification d'auth
│   │       ├── login/         # Connexion
│   │       ├── logout/        # Déconnexion
│   │       └── signup/        # Inscription
│   ├── components/            # Composants React
│   │   ├── NavBar.tsx        # Navigation principale
│   │   ├── AgeGate.tsx       # Vérification d'âge
│   │   ├── FavoriteButton.tsx # Bouton favoris
│   │   └── ...
│   ├── hooks/                # Hooks personnalisés
│   │   ├── useAuth.ts        # Hook d'authentification
│   │   └── useTranslations.ts # Hook de traduction
│   ├── lib/                  # Utilitaires
│   │   ├── auth.ts           # Logique d'authentification
│   │   ├── db.ts             # Configuration Prisma
│   │   └── cookies.ts        # Gestion des cookies
│   ├── data/                 # Données mockées
│   │   └── catalog.ts        # Catalogue des galeries
│   ├── i18n/                 # Internationalisation
│   │   ├── locales.ts        # Langues supportées
│   │   └── translations.ts   # Système de traduction
│   └── messages/             # Fichiers de traduction
│       ├── en.json           # Anglais
│       ├── fr.json           # Français
│       └── ...
├── prisma/                   # Configuration Prisma
│   └── schema.prisma         # Schéma de base de données
├── public/                   # Assets statiques
└── package.json              # Dépendances et scripts
```

## 🎯 Fonctionnalités Principales

### Système d'Authentification
- **Inscription** avec validation email/mot de passe
- **Connexion** sécurisée avec hachage bcrypt
- **Sessions persistantes** avec cookies + localStorage
- **Protection des routes** privées
- **Déconnexion** avec nettoyage des données

### Gestion des Favoris
- **Ajout/Suppression** en un clic
- **Synchronisation** en temps réel
- **Page dédiée** avec interface moderne
- **Intégration** dans les galeries

### Collections Personnalisées
- **Création** de collections personnalisées
- **Gestion** des items dans les collections
- **Partage** public/privé
- **Interface** de gestion complète

### Catalogue Dynamique
- **Données mockées** pour le développement
- **Pagination** intelligente
- **Recherche** avancée avec filtres
- **Tri** par popularité/récent

## 🔒 Sécurité

- **Hachage des mots de passe** avec bcrypt
- **Cookies sécurisés** pour les sessions
- **Validation** côté client et serveur
- **Protection CSRF** intégrée
- **Sanitisation** des données utilisateur

## 🌐 Internationalisation

### Langues Supportées
- 🇫🇷 Français (par défaut)
- 🇺🇸 Anglais
- 🇪🇸 Espagnol
- 🇮🇹 Italien
- 🇵🇹 Portugais
- 🇷🇺 Russe

### Système de Traduction
- **Fichiers JSON** organisés par langue
- **Hook useTranslations** pour l'accès facile
- **Sélecteur de langue** dans la navbar
- **Détection automatique** de la langue

## 🎨 Design System

### Thèmes
- **Mode clair/sombre** avec toggle
- **Couleurs cohérentes** avec variables CSS
- **Typography** optimisée pour la lisibilité
- **Animations** fluides et modernes

### Composants
- **Cards** avec hover effects
- **Boutons** avec états multiples
- **Formulaires** avec validation
- **Modals** et overlays

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Autres Plateformes
- **Netlify** : Compatible avec Next.js
- **Railway** : Déploiement simple
- **Docker** : Support complet

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Next.js** pour le framework React
- **Prisma** pour l'ORM moderne
- **Tailwind CSS** pour le système de design
- **Vercel** pour l'hébergement

---

**N5 Portal** - Une expérience moderne de galerie d'art numérique 🎨
