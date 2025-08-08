# Guide de Contribution - N5 Portal

Merci de votre intérêt pour contribuer à N5 Portal ! Ce document vous guidera à travers le processus de contribution.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Git

### Installation du projet
```bash
git clone <repository-url>
cd portal
npm install
cp .env.example .env.local
npm run db:generate
npm run db:push
npm run dev
```

## 📋 Types de Contributions

### 🐛 Rapports de Bugs
- Utilisez le template de bug report
- Incluez des étapes de reproduction claires
- Ajoutez des captures d'écran si possible
- Spécifiez votre environnement (OS, navigateur, etc.)

### ✨ Nouvelles Fonctionnalités
- Créez une issue pour discuter de la fonctionnalité
- Assurez-vous qu'elle s'aligne avec la vision du projet
- Incluez des maquettes ou descriptions détaillées

### 📚 Amélioration de la Documentation
- Corrigez les erreurs de documentation
- Ajoutez des exemples d'utilisation
- Améliorez la clarté des instructions

### 🎨 Améliorations UI/UX
- Respectez le design system existant
- Testez sur différents appareils
- Incluez des animations fluides

## 🔧 Processus de Développement

### 1. Créer une Branche
```bash
git checkout -b feature/nom-de-la-fonctionnalite
# ou
git checkout -b fix/nom-du-bug
```

### 2. Développer
- Suivez les conventions de code
- Écrivez des tests si applicable
- Testez votre code localement

### 3. Commiter
```bash
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
git commit -m "fix: corriger bug d'authentification"
git commit -m "docs: améliorer documentation API"
```

### 4. Pousser et Créer une PR
```bash
git push origin feature/nom-de-la-fonctionnalite
```

## 📝 Conventions de Code

### TypeScript
- Utilisez des types stricts
- Évitez `any` quand possible
- Documentez les interfaces complexes

### React
- Utilisez des hooks fonctionnels
- Évitez les composants de classe
- Suivez les bonnes pratiques React

### CSS/Tailwind
- Utilisez les classes Tailwind
- Évitez le CSS personnalisé
- Respectez le système de design

### Nommage
- **Fichiers** : kebab-case (`user-profile.tsx`)
- **Composants** : PascalCase (`UserProfile`)
- **Fonctions** : camelCase (`getUserData`)
- **Constantes** : UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🧪 Tests

### Tests Unitaires
```bash
npm run test
```

### Tests d'Intégration
```bash
npm run test:integration
```

### Vérification de Types
```bash
npm run type-check
```

## 🔍 Code Review

### Avant de Soumettre
- [ ] Le code compile sans erreurs
- [ ] Les tests passent
- [ ] Le linting est propre
- [ ] La documentation est mise à jour
- [ ] Les variables d'environnement sont configurées

### Checklist du Reviewer
- [ ] Le code suit les conventions
- [ ] La logique est correcte
- [ ] Les performances sont acceptables
- [ ] La sécurité est respectée
- [ ] Les tests couvrent les cas d'usage

## 🚀 Déploiement

### Tests de Pré-production
```bash
npm run build
npm run start
```

### Variables d'Environnement
- Vérifiez que toutes les variables sont définies
- Testez avec des données de production
- Validez les connexions à la base de données

## 📚 Ressources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Outils de Développement
- **Prisma Studio** : `npm run db:studio`
- **Linting** : `npm run lint`
- **Formatage** : `npm run format`

## 🤝 Communication

### Issues
- Utilisez les labels appropriés
- Répondez aux commentaires rapidement
- Fermez les issues résolues

### Discussions
- Soyez respectueux et constructif
- Posez des questions si nécessaire
- Partagez vos idées et suggestions

## 📄 Licence

En contribuant à ce projet, vous acceptez que vos contributions soient sous la même licence MIT que le projet.

---

Merci de contribuer à N5 Portal ! 🎨
