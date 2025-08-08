# Changelog - N5 Portal

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Système d'authentification complet avec persistance de session
- Interface multilingue (EN, FR, ES, IT, PT, RU)
- Gestion des favoris avec synchronisation en temps réel
- Système de collections personnalisées
- Design moderne avec thème sombre/clair
- Navigation responsive avec animations fluides
- Recherche avancée avec filtres par tags/artistes
- Pagination intelligente pour les galeries
- Protection des routes privées
- Système de commentaires
- PWA support avec manifest et service worker

### Changed
- Migration vers Next.js 15 avec App Router
- Mise à jour vers React 19
- Amélioration des performances avec Turbopack
- Refactoring complet de l'architecture

### Fixed
- Correction des erreurs d'hydratation React
- Résolution des conflits de layout
- Amélioration de la gestion des erreurs
- Correction des problèmes de navigation

## [0.1.0] - 2024-12-19

### Added
- **Initial Release** 🎉
- Base de données SQLite avec Prisma ORM
- Système d'authentification sécurisé avec bcrypt
- Interface utilisateur moderne avec Tailwind CSS
- Support multilingue complet
- Gestion des favoris et collections
- Design system cohérent
- Documentation complète
- Scripts de développement optimisés

### Technical Stack
- **Frontend** : Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend** : Next.js API Routes, Prisma ORM, SQLite
- **Authentication** : bcryptjs, cookies sécurisés
- **Internationalization** : next-intl
- **Development** : Turbopack, ESLint, TypeScript

---

## Types de Changements

- **Added** : Nouvelles fonctionnalités
- **Changed** : Changements dans les fonctionnalités existantes
- **Deprecated** : Fonctionnalités qui seront supprimées
- **Removed** : Fonctionnalités supprimées
- **Fixed** : Corrections de bugs
- **Security** : Améliorations de sécurité
