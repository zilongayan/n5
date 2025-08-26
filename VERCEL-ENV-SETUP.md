# 🌍 Configuration Variables d'Environnement Vercel

## 📋 Variables Requises pour Google OAuth

### 1. Google OAuth
```bash
GOOGLE_CLIENT_ID=votre-client-id-google
GOOGLE_CLIENT_SECRET=votre-client-secret-google
```

### 2. NextAuth.js
```bash
NEXTAUTH_SECRET=votre-secret-nextauth
NEXTAUTH_URL=https://votre-projet.vercel.app
```

### 3. Base de données
```bash
DATABASE_URL=votre-url-base-de-donnees
```

## 🚀 Configuration dans Vercel

### Étape 1: Accéder aux variables d'environnement
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"

### Étape 2: Ajouter les variables
Cliquez sur "Add New" et ajoutez chaque variable :

| Nom | Valeur | Environnement |
|-----|---------|---------------|
| `GOOGLE_CLIENT_ID` | `votre-client-id` | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | `votre-client-secret` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `votre-secret` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://votre-projet.vercel.app` | Production, Preview, Development |
| `DATABASE_URL` | `votre-url-db` | Production, Preview, Development |

### Étape 3: Générer NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## 🔑 Obtention des identifiants Google

### 1. Google Cloud Console
1. Allez sur [console.cloud.google.com](https://console.cloud.google.com)
2. Créez un projet ou sélectionnez un existant
3. Activez l'API Google+ API

### 2. Créer les identifiants OAuth
1. "APIs & Services" > "Credentials"
2. "Create Credentials" > "OAuth 2.0 Client IDs"
3. Type: "Web application"
4. Nom: "MangaView OAuth"

### 3. URIs autorisés
```
Origines JavaScript autorisées:
https://votre-projet.vercel.app

URIs de redirection autorisés:
https://votre-projet.vercel.app/api/auth/callback/google
```

## 🌐 Configuration des domaines

### Domaine principal
```
https://votre-projet.vercel.app
```

### Domaines personnalisés
Si vous avez un domaine personnalisé, ajoutez aussi :
```
https://votre-domaine.com/api/auth/callback/google
```

## 🔍 Test de la configuration

### 1. Redéployez votre projet
Après avoir ajouté les variables, redéployez automatiquement.

### 2. Testez la connexion Google
1. Allez sur votre site déployé
2. Page de login
3. Cliquez sur "Continuer avec Google"
4. Vérifiez la redirection et la connexion

## 🆘 Dépannage

### Erreur "redirect_uri_mismatch"
- Vérifiez que l'URI dans Google Cloud correspond exactement
- Incluez le protocole HTTPS et le domaine complet

### Erreur "invalid_client"
- Vérifiez GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET
- Assurez-vous que l'API est activée

### Erreur "NEXTAUTH_SECRET not set"
- Vérifiez que NEXTAUTH_SECRET est configuré
- Régénérez le secret si nécessaire

## 🔒 Sécurité

### Bonnes pratiques
- ✅ Ne partagez jamais les secrets
- ✅ Utilisez des secrets forts (32+ caractères)
- ✅ Limitez l'accès aux variables d'environnement
- ✅ Surveillez l'utilisation de l'API

### Rotation des secrets
- Régénérez GOOGLE_CLIENT_SECRET régulièrement
- Mettez à jour NEXTAUTH_SECRET périodiquement
- Surveillez les logs d'authentification

## 📊 Monitoring

### Vercel Analytics
- Surveillez les performances de votre site
- Vérifiez les erreurs de build et de runtime

### Logs d'authentification
- Surveillez les tentatives de connexion
- Vérifiez les erreurs d'authentification

## 🎯 Prochaines étapes

1. **Configurez Google Cloud Console**
2. **Ajoutez les variables dans Vercel**
3. **Redéployez votre projet**
4. **Testez l'authentification Google**
5. **Configurez le monitoring**

---

**Votre authentification Google OAuth est maintenant prête pour la production ! 🚀**
