# Architecture - N5 Portal

Ce document décrit l'architecture technique de N5 Portal, une application Next.js moderne avec authentification, gestion de contenu et interface multilingue.

## 🏗️ Architecture Générale

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (SQLite)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client State  │    │   Server State  │    │   Data Layer    │
│   (localStorage)│    │   (Cookies)     │    │   (Prisma)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Structure des Dossiers

### `/src/app/` - App Router Next.js
```
app/
├── [locale]/              # Routes internationalisées
│   ├── (catalog)/         # Pages de catalogue
│   ├── (browse)/          # Pages de navigation
│   ├── login/             # Authentification
│   ├── signup/            # Inscription
│   ├── profile/           # Profil utilisateur
│   ├── favorites/         # Favoris
│   ├── collections/       # Collections
│   └── gallery/[id]/      # Détails galerie
├── api/                   # Routes API
│   ├── auth/              # Vérification auth
│   ├── login/             # Connexion
│   ├── logout/            # Déconnexion
│   ├── signup/            # Inscription
│   ├── favorites/         # Gestion favoris
│   ├── collections/       # Gestion collections
│   └── comments/          # Système commentaires
└── globals.css            # Styles globaux
```

### `/src/components/` - Composants React
```
components/
├── NavBar.tsx            # Navigation principale
├── AgeGate.tsx           # Vérification d'âge
├── FavoriteButton.tsx    # Bouton favoris
├── ThemeToggle.tsx       # Toggle thème
├── LanguageSelector.tsx  # Sélecteur langue
├── SearchModal.tsx       # Modal recherche
└── ...
```

### `/src/hooks/` - Hooks Personnalisés
```
hooks/
├── useAuth.ts            # Authentification
├── useTranslations.ts    # Internationalisation
└── useToast.ts          # Notifications
```

### `/src/lib/` - Utilitaires
```
lib/
├── auth.ts               # Logique authentification
├── db.ts                 # Configuration Prisma
└── cookies.ts            # Gestion cookies
```

## 🔐 Système d'Authentification

### Architecture de Sécurité
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client        │    │   Server        │    │   Database      │
│                 │    │                 │    │                 │
│ localStorage    │◄──►│   Cookies       │◄──►│   Users Table   │
│ (User State)    │    │   (Session)     │    │   (Hashed PWD)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Flux d'Authentification
1. **Inscription** : Hash bcrypt → DB → Session
2. **Connexion** : Vérification → Session → localStorage
3. **Vérification** : Cookies → Server → Client
4. **Déconnexion** : Clear cookies + localStorage

### Sécurité
- **Hachage** : bcrypt avec salt
- **Sessions** : Cookies sécurisés
- **Validation** : Côté client et serveur
- **Protection** : Routes privées

## 🌍 Internationalisation

### Architecture i18n
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Middleware    │    │   Components    │    │   Messages      │
│   (Locale)      │◄──►│   (useTranslations)│◄──►│   (JSON Files)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Langues Supportées
- **Français** (défaut)
- **Anglais**
- **Espagnol**
- **Italien**
- **Portugais**
- **Russe**

## 🗄️ Base de Données

### Schéma Prisma
```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  password  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  favorites Favorite[]
  collections Collection[]
  comments Comment[]
}

model Favorite {
  id        String   @id @default(cuid())
  userId    String
  itemId    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, itemId])
}

model Collection {
  id          String   @id @default(cuid())
  name        String
  description String?
  isPublic    Boolean  @default(false)
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  items       CollectionItem[]
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  itemId    String
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## 🎨 Design System

### Architecture CSS
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Tailwind CSS  │    │   Custom CSS    │    │   Components    │
│   (Utility)     │◄──►│   (Variables)   │◄──►│   (Styled)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Thèmes
- **Mode clair** : Couleurs douces, contraste élevé
- **Mode sombre** : Couleurs sombres, contraste modéré
- **Transitions** : Animations fluides (300ms)

### Composants
- **Cards** : Bordures arrondies, ombres
- **Boutons** : États hover, focus, disabled
- **Formulaires** : Validation visuelle
- **Navigation** : Responsive, animations

## 🚀 Performance

### Optimisations
- **Turbopack** : Compilation rapide
- **Code Splitting** : Chargement à la demande
- **Image Optimization** : Next.js Image
- **Caching** : Static generation
- **Bundle Analysis** : Optimisation taille

### Métriques
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

## 🔧 Configuration

### Environnement
```env
# Base de données
DATABASE_URL="file:./dev.db"

# URL de base
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Production
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

### Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "db:generate": "prisma generate",
  "db:push": "prisma db push",
  "db:studio": "prisma studio"
}
```

## 🧪 Tests

### Stratégie de Tests
- **Unit Tests** : Composants isolés
- **Integration Tests** : Flux utilisateur
- **E2E Tests** : Scénarios complets
- **Performance Tests** : Métriques Web Vitals

### Outils
- **Jest** : Framework de tests
- **React Testing Library** : Tests composants
- **Playwright** : Tests E2E
- **Lighthouse** : Performance

## 🚀 Déploiement

### Plateformes Supportées
- **Vercel** : Optimisé Next.js
- **Netlify** : Compatible
- **Railway** : Simple
- **Docker** : Containerisé

### CI/CD
```yaml
# GitHub Actions
- Build & Test
- Lint & Format
- Deploy Preview
- Deploy Production
```

## 🔒 Sécurité

### Mesures
- **HTTPS** : Obligatoire en production
- **CORS** : Configuration stricte
- **Rate Limiting** : Protection API
- **Input Validation** : Sanitisation
- **SQL Injection** : Prisma ORM
- **XSS** : React sanitization

## 📊 Monitoring

### Métriques
- **Performance** : Web Vitals
- **Erreurs** : Sentry integration
- **Utilisation** : Analytics
- **Sécurité** : Audit logs

---

Cette architecture garantit une application moderne, performante et maintenable. 🚀
