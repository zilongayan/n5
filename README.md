# MangaView Portal

Un portail manga moderne inspiré de MangaDex, construit avec Next.js 15, TypeScript, Tailwind CSS et une architecture de cache intelligente.

## 🚀 Fonctionnalités

### ✨ Interface Utilisateur
- **Design sombre moderne** avec palette de couleurs personnalisée
- **Navigation responsive** avec support mobile/desktop
- **Système de thème** configurable
- **Support multilingue** (EN/FR/ES/IT/PT/RU) avec détection automatique
- **Composants UI** optimisés avec shadcn/ui

### 📚 Gestion des Manga
- **Intégration MangaDex API v5** complète
- **Recherche avancée** par titre, tags, langue, statut
- **Filtrage par tags** avec mapping UUID intelligent
- **Navigation par chapitres** avec métadonnées complètes
- **Prévisualisation des pages** cliquable

### 🔍 Lecteur de Manga
- **Modes de lecture** multiples (Long strip, Single page, Fit width/height)
- **Navigation clavier** (flèches, espace, Home/End)
- **Contrôles de zoom** (50% à 300%)
- **Préchargement intelligent** des pages
- **Gestion d'erreurs** avec retry automatique
- **Barre d'outils** extensible

### 💾 Système de Cache Intelligent
- **Cache multi-niveaux** : localStorage, sessionStorage, mémoire
- **Cache d'images** avec TTL configurable
- **Cache de composants** avec React.memo
- **Cache de données** avec React Query
- **Gestionnaire de cache** avec interface UI
- **Headers HTTP** optimisés (Cache-Control, ETag)

### 🧪 Tests et Qualité
- **Tests unitaires** avec Vitest + React Testing Library
- **Tests e2e** avec Playwright
- **CI/CD** avec GitHub Actions
- **Linting** et vérification de types
- **Couverture de code** avec rapports

### 📱 PWA et Performance
- **Service Worker** pour le cache offline
- **Manifest** pour l'installation
- **LCP < 2.5s** avec Next.js Image Optimization
- **Lighthouse ≥ 90** avec optimisations CSS/JS
- **Streaming SSR** et ISR

## 🛠️ Architecture Technique

### Stack Principal
- **Next.js 15** avec App Router
- **TypeScript** strict
- **Tailwind CSS 4** avec design system
- **React Query** pour la gestion d'état
- **Prisma** pour la base de données

### Composants Clés
```typescript
// Client MangaDex typé
lib/mangadex.ts          // API client avec retry/backoff
lib/tagMapping.ts        // Mapping tags nom → UUID
lib/cacheConfig.ts       // Configuration cache globale

// Composants UI
components/CachedImage.tsx    // Image avec cache local
components/TagFilter.tsx      // Filtrage par tags
components/ReaderToolbar.tsx  // Contrôles lecteur
components/ModeToggle.tsx     // Modes de lecture
components/ImageList.tsx      // Liste d'images avec préchargement

// Hooks personnalisés
hooks/useCache.ts            // Gestion cache client
hooks/useTranslations.ts     // Internationalisation
```

### Système de Cache
```typescript
// Configuration cache
const CACHE_CONFIG = {
  images: { ttl: 24 * 60 * 60 * 1000, maxSize: 100 },
  data: { ttl: 5 * 60 * 1000, maxSize: 50 },
  components: { ttl: 10 * 60 * 1000, maxSize: 30 }
};

// Utilisation
const { data, isLoading } = useCache('manga-list', fetchMangaList, {
  ttl: CACHE_CONFIG.data.ttl,
  maxSize: CACHE_CONFIG.data.maxSize
});
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Base de données (MySQL/PostgreSQL pour Prisma)

### Installation
```bash
# Cloner le projet
git clone <repository>
cd portal

# Installer les dépendances
npm install

# Configuration environnement
cp .env.example .env.local
# Éditer .env.local avec vos variables

# Générer Prisma client
npm run db:generate

# Démarrer en développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev              # Démarrage développement
npm run build            # Build production
npm run start            # Démarrage production
npm run lint             # Linting ESLint
npm run type-check       # Vérification TypeScript
npm run test             # Tests unitaires (watch)
npm run test:unit        # Tests unitaires (once)
npm run test:e2e         # Tests end-to-end
npm run test:e2e:ui      # Tests e2e avec interface
```

## 🔧 Configuration

### Variables d'Environnement
```bash
# Base de données
DATABASE_URL="mysql://user:pass@localhost:3306/mangaview"

# MangaDex API
MANGADEX_API_URL="https://api.mangadex.org"
MANGADEX_UPLOADS_URL="https://uploads.mangadex.org"

# Cache
CACHE_TTL_IMAGES=86400000      # 24h
CACHE_TTL_DATA=300000          # 5min
CACHE_MAX_SIZE=100             # Éléments max
```

### Configuration Next.js
```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'uploads.mangadex.org' },
      { hostname: '*.mangadex.network' }
    ]
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@tanstack/react-query']
  }
};
```

## 📊 Tests et Qualité

### Tests Unitaires
```bash
# Lancer tous les tests
npm run test:unit

# Avec couverture
npm run test:unit:coverage

# Tests spécifiques
npm run test:unit -- --run src/lib/__tests__/mangadex.test.ts
```

### Tests End-to-End
```bash
# Lancer Playwright
npm run test:e2e

# Interface graphique
npm run test:e2e:ui

# Mode debug
npm run test:e2e:debug
```

### CI/CD
Le projet inclut un workflow GitHub Actions qui :
- Lance les tests sur Node.js 18 et 20
- Vérifie le linting et les types
- Exécute les tests unitaires et e2e
- Build le projet
- Upload la couverture de code

## 🎨 Design System

### Palette de Couleurs
```css
/* Couleurs principales */
--bg-primary: #0B0C0F        /* Fond principal */
--surface-primary: #151821    /* Surfaces */
--text-primary: #E6E7EB      /* Texte principal */
--text-muted: #9AA3B2        /* Texte secondaire */
--accent-primary: #7C5CFF    /* Accent principal */

/* États */
--success: #10B981
--warning: #F59E0B
--error: #EF4444
--info: #3B82F6
```

### Composants
- **Boutons** : `theme-button-primary`, `theme-button-secondary`
- **Cartes** : `theme-card` avec hover effects
- **Tags** : `tag-primary` avec animations
- **Formulaires** : Inputs stylisés avec validation

## 🔍 API et Intégrations

### MangaDex API v5
```typescript
// Endpoints supportés
GET /manga                    // Liste des manga
GET /manga/{id}              // Détails manga
GET /cover/{id}              // Images de couverture
GET /chapter                 // Liste des chapitres
GET /at-home/server/{id}     // Serveur de lecture

// Paramètres de recherche
{
  limit: 24,                 // Résultats par page
  offset: 0,                 // Pagination
  title: "search term",      // Recherche par titre
  includedTags: ["uuid"],    // Filtrage par tags
  order: { followedCount: "desc" }  // Tri
}
```

### Proxy API Local
```typescript
// Route handler Edge
app/api/mdx/[...path]/route.ts

// Fonctionnalités
- Cache-Control headers
- Rate limiting
- CORS configuration
- Error handling
- Retry logic
```

## 📱 PWA et Offline

### Service Worker
- Cache des pages visitées
- Cache des images et assets
- Stratégie "Cache First" pour les ressources statiques
- Stratégie "Network First" pour l'API

### Manifest
```json
{
  "name": "MangaView Portal",
  "short_name": "MangaView",
  "theme_color": "#0B0C0F",
  "background_color": "#0B0C0F",
  "display": "standalone"
}
```

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribution

### Guidelines
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- **TypeScript strict** avec types explicites
- **ESLint** + **Prettier** pour la cohérence
- **Tests unitaires** pour les nouvelles fonctionnalités
- **Tests e2e** pour les flux utilisateur
- **Documentation** des composants complexes

## 📄 Licence

Ce projet est sous licence MIT. Voir `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **MangaDex** pour l'API publique et l'inspiration
- **Next.js** pour le framework React
- **Tailwind CSS** pour le système de design
- **Communauté open source** pour les composants et outils

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

---

**MangaView Portal** - Découvrez et lisez vos manga préférés avec une expérience moderne et intuitive ! 🎌📚
