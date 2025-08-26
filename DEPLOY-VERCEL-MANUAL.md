# 🚀 Déploiement Manuel MangaView sur Vercel

## 📋 Prérequis

- Compte GitHub
- Compte Vercel (gratuit)
- Projet MangaView prêt

## 🔗 Étape 1: Connexion à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Continue with GitHub"
3. Autorisez Vercel à accéder à votre compte GitHub

## 📁 Étape 2: Import du Projet

1. Dans le dashboard Vercel, cliquez sur "New Project"
2. Sélectionnez votre repository GitHub "n5"
3. Vercel détectera automatiquement que c'est un projet Next.js

## ⚙️ Étape 3: Configuration

### Variables d'environnement
Ajoutez ces variables dans la section "Environment Variables" :

```bash
# Base de données (obligatoire)
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth.js (obligatoire)
NEXTAUTH_SECRET=votre-clé-secrète-générée
NEXTAUTH_URL=https://votre-projet.vercel.app

# Cache (optionnel)
CACHE_ENABLED=true
CACHE_TTL=3600
```

### Génération de NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## 🚀 Étape 4: Déploiement

1. Cliquez sur "Deploy"
2. Vercel va automatiquement :
   - Installer les dépendances
   - Builder le projet
   - Déployer sur leur infrastructure

## 🔍 Étape 5: Vérification

### Tests de base
- [ ] Page d'accueil se charge
- [ ] Navigation fonctionne
- [ ] API endpoints répondent
- [ ] Base de données connectée

### URL de votre site
Votre site sera accessible sur :
```
https://votre-projet.vercel.app
```

## 🌐 Étape 6: Domaine Personnalisé (Optionnel)

1. Dans le dashboard Vercel, allez dans "Settings" > "Domains"
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions Vercel

## 📊 Étape 7: Monitoring

### Vercel Analytics
- Activez Vercel Analytics dans "Settings" > "Analytics"
- Surveillez les performances de votre site

### Logs
- Consultez les logs dans "Functions" pour déboguer les API

## 🔄 Déploiement Automatique

Une fois configuré, chaque push sur votre branche principale déclenchera automatiquement un nouveau déploiement.

## 🆘 Dépannage

### Erreurs communes

#### Build échoue
- Vérifiez que toutes les dépendances sont installées
- Consultez les logs de build dans Vercel

#### Variables manquantes
- Vérifiez que toutes les variables d'environnement sont configurées
- Redéployez après avoir ajouté les variables

#### Base de données
- Vérifiez que votre base de données est accessible depuis Vercel
- Utilisez une base de données cloud (Supabase, PlanetScale, etc.)

### Support
- Documentation Vercel: [vercel.com/docs](https://vercel.com/docs)
- Support Vercel: [vercel.com/support](https://vercel.com/support)
- Issues GitHub: [github.com/votre-repo/issues](https://github.com/votre-repo/issues)

## 🎯 Prochaines étapes

1. **Testez votre site** - Vérifiez toutes les fonctionnalités
2. **Configurez le monitoring** - Activez Vercel Analytics
3. **Optimisez les performances** - Utilisez les outils Vercel
4. **Sécurisez** - Configurez HTTPS et les headers de sécurité
5. **Scalez** - Passez à un plan payant si nécessaire

## 🎉 Félicitations !

Votre site MangaView est maintenant déployé sur Vercel avec :
- ✅ Déploiement automatique
- ✅ CDN global
- ✅ Performance optimale
- ✅ Monitoring intégré
- ✅ Support Next.js natif
