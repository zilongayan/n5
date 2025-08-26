# 🚨 Déploiement d'Urgence - MangaView

## ⚠️ **Problème identifié : Conflit Tailwind CSS**

Votre projet a des conflits avec Tailwind CSS et Next.js 15. Voici la solution d'urgence.

## 🚀 **Solution 1: Déploiement Minimal (Recommandé)**

### **Utilisez le script d'urgence :**
```bash
cd portal
./deploy-vercel-minimal.sh
```

Ce script :
- ✅ Sauvegarde vos fichiers originaux
- ✅ Remplace temporairement Tailwind par du CSS simple
- ✅ Déploie sur Vercel avec succès
- ✅ Restaure vos fichiers originaux après déploiement

## 🔧 **Solution 2: Déploiement via Dashboard Vercel**

### **1. Allez sur [vercel.com](https://vercel.com)**
### **2. Connectez-vous avec GitHub `zilongayan`**
### **3. Cliquez "New Project"**
### **4. Importez votre repository `n5`**
### **5. Configuration :**
- **Root Directory :** `portal`
- **Framework Preset :** Next.js
- **Build Command :** `npm run build`
- **Output Directory :** `.next`

### **6. Variables d'environnement (ajoutez après le premier déploiement) :**
```bash
NEXTAUTH_SECRET=votre-secret
NEXTAUTH_URL=https://votre-projet.vercel.app
```

## 🎯 **Solution 3: Déploiement Manuel (Avancé)**

### **1. Nettoyage complet :**
```bash
cd portal
rm -rf node_modules .next package-lock.json
```

### **2. Utilisation du package simplifié :**
```bash
cp package-simple.json package.json
cp src/app/globals-simple.css src/app/globals.css
npm install --legacy-peer-deps
npm run build
```

### **3. Déploiement :**
```bash
vercel --prod
```

### **4. Restauration :**
```bash
cp package.json.backup package.json
cp src/app/globals.css.backup src/app/globals.css
```

## 🌐 **Après le Déploiement Réussi**

### **1. Configurez Google OAuth :**
- Allez sur [console.cloud.google.com](https://console.cloud.google.com)
- Créez un projet "MangaView OAuth"
- Activez l'API Google+ API
- Créez des identifiants OAuth 2.0

### **2. Variables d'environnement dans Vercel :**
```bash
GOOGLE_CLIENT_ID=votre-client-id
GOOGLE_CLIENT_SECRET=votre-client-secret
NEXTAUTH_SECRET=votre-secret
NEXTAUTH_URL=https://votre-projet.vercel.app
```

### **3. URIs autorisés dans Google Cloud :**
```
Origines JavaScript:
https://votre-projet.vercel.app

URIs de redirection:
https://votre-projet.vercel.app/api/auth/callback/google
```

## 🔍 **Test de votre déploiement**

### **1. Vérification du site :**
- Votre site sera accessible sur : `https://votre-projet.vercel.app`
- Testez la page d'accueil et la navigation

### **2. Test de l'authentification :**
1. Allez sur `/fr/login`
2. Cliquez sur "Continuer avec Google"
3. Vérifiez la redirection vers Google
4. Testez la connexion

## 🆘 **Dépannage d'urgence**

### **Build échoue toujours :**
```bash
# Utilisez le script minimal
./deploy-vercel-minimal.sh

# Ou déployez via dashboard Vercel
# Plus simple et plus fiable
```

### **Erreur de variables d'environnement :**
- Commencez sans variables pour tester le déploiement
- Ajoutez les variables après le premier déploiement réussi

### **Problème d'authentification :**
- Vérifiez que Google OAuth est configuré
- Vérifiez les URIs autorisés dans Google Cloud
- Vérifiez les variables dans Vercel

## 📊 **Priorités de déploiement**

### **Phase 1 : Déploiement initial (URGENT)**
- ✅ Déployer le site sans Tailwind
- ✅ Vérifier que le site fonctionne
- ✅ Tester la navigation de base

### **Phase 2 : Configuration OAuth**
- ✅ Configurer Google Cloud Console
- ✅ Ajouter les variables d'environnement
- ✅ Tester l'authentification Google

### **Phase 3 : Restauration Tailwind (Optionnel)**
- ✅ Réintégrer Tailwind CSS après déploiement
- ✅ Configurer PostCSS correctement
- ✅ Tester le design complet

## 🏆 **Recommandation finale**

**Utilisez le script d'urgence :**
```bash
./deploy-vercel-minimal.sh
```

**Ou déployez via le dashboard Vercel** - c'est plus simple et plus fiable !

---

## 📞 **Besoin d'aide immédiate ?**

- **Script d'urgence :** `./deploy-vercel-minimal.sh`
- **Dashboard Vercel :** [vercel.com](https://vercel.com)
- **Documentation Google :** `GOOGLE-OAUTH-SETUP.md`
- **Variables Vercel :** `VERCEL-ENV-SETUP.md`

**Votre site sera en ligne en moins de 10 minutes ! 🚀**
