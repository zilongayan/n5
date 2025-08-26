# 🚀 Options de Déploiement MangaView

## 📋 Vue d'ensemble

Ce projet peut être déployé sur plusieurs plateformes. Choisissez celle qui correspond le mieux à vos besoins.

## 🌐 Vercel (Recommandé)

### Avantages
- ✅ Déploiement automatique depuis Git
- ✅ CDN global et performance optimale
- ✅ Configuration simple
- ✅ Gratuit pour projets personnels
- ✅ Support Next.js natif

### Scripts disponibles
- `./deploy-vercel.sh` - Crée un package de déploiement
- `./deploy-vercel-direct.sh` - Déploie directement sur Vercel

### Déploiement rapide
```bash
# Option 1: Déploiement direct
./deploy-vercel-direct.sh

# Option 2: Package de déploiement
./deploy-vercel.sh
```

## 🏠 Hostinger

### Avantages
- ✅ Hébergement partagé abordable
- ✅ Contrôle total du serveur
- ✅ Base de données incluse

### Script disponible
- `./deploy.sh` - Crée un package pour Hostinger

### Déploiement
```bash
./deploy.sh
```

## 🔧 Configuration requise

### Variables d'environnement
```bash
# Base de données
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Cache (optionnel)
CACHE_ENABLED="true"
CACHE_TTL="3600"
```

### Génération de clé secrète
```bash
openssl rand -base64 32
```

## 📁 Structure des fichiers de déploiement

```
deploy-vercel-YYYYMMDD-HHMMSS/
├── .next/              ← Build Next.js
├── public/             ← Assets statiques
├── package.json        ← Dépendances
├── next.config.ts      ← Configuration Next.js
├── vercel.json         ← Configuration Vercel
├── DEPLOY-VERCEL.md    ← Instructions
└── README-DEPLOYMENT.md ← Documentation
```

## 🚀 Déploiement automatique

### GitHub Actions (Vercel)
1. Connectez votre repo GitHub à Vercel
2. Chaque push déclenche un déploiement automatique
3. Les variables d'environnement sont configurées dans Vercel

### Webhook (Hostinger)
1. Configurez un webhook sur votre serveur
2. Chaque push déclenche un déploiement automatique
3. Utilisez le script `deploy.sh` dans le webhook

## 🔍 Vérification du déploiement

### Tests de base
- [ ] Page d'accueil se charge
- [ ] Navigation fonctionne
- [ ] API endpoints répondent
- [ ] Base de données connectée
- [ ] Authentification fonctionne

### Outils de monitoring
- Vercel Analytics (si Vercel)
- Google Analytics
- Sentry (gestion d'erreurs)

## 🆘 Dépannage

### Erreurs communes
1. **Build échoue** - Vérifiez les dépendances et la configuration
2. **Variables manquantes** - Configurez toutes les variables d'environnement
3. **Base de données** - Vérifiez la connexion et les permissions
4. **Performance** - Optimisez les images et le code

### Support
- Documentation Vercel: [vercel.com/docs](https://vercel.com/docs)
- Documentation Hostinger: [hostinger.com/help](https://hostinger.com/help)
- Issues GitHub: [github.com/votre-repo/issues](https://github.com/votre-repo/issues)

## 📊 Comparaison des plateformes

| Plateforme | Prix | Performance | Facilité | Support Next.js |
|------------|------|-------------|----------|-----------------|
| Vercel     | Gratuit* | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Hostinger  | €2-10/mois | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Netlify    | Gratuit* | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

*Limites sur les projets gratuits

## 🎯 Recommandation

**Pour la plupart des projets : Vercel**
- Configuration automatique
- Performance optimale
- Déploiement continu
- Support Next.js natif

**Pour un contrôle total : Hostinger**
- Hébergement partagé
- Base de données incluse
- Contrôle du serveur
- Coût prévisible
