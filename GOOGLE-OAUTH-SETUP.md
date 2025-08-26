# 🔐 Configuration Google OAuth pour MangaView

## 📋 Prérequis

- Compte Google
- Projet Google Cloud Console
- Application web configurée

## 🚀 Étape 1: Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un existant
3. Activez l'API Google+ API

## 🔑 Étape 2: Créer les identifiants OAuth

1. Dans le menu, allez dans "APIs & Services" > "Credentials"
2. Cliquez sur "Create Credentials" > "OAuth 2.0 Client IDs"
3. Sélectionnez "Web application"
4. Donnez un nom à votre application (ex: "MangaView OAuth")

## ⚙️ Étape 3: Configurer les URIs autorisés

### URIs de redirection autorisés
```
http://localhost:3000/api/auth/callback/google
https://votre-domaine.vercel.app/api/auth/callback/google
```

### Origines JavaScript autorisées
```
http://localhost:3000
https://votre-domaine.vercel.app
```

## 📝 Étape 4: Récupérer les identifiants

Après la création, vous obtiendrez :
- **Client ID** : `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **Client Secret** : `GOCSPX-abcdefghijklmnopqrstuvwxyz`

## 🌍 Étape 5: Variables d'environnement

Ajoutez ces variables dans votre fichier `.env.local` :

```bash
# Google OAuth
GOOGLE_CLIENT_ID="votre-client-id"
GOOGLE_CLIENT_SECRET="votre-client-secret"

# NextAuth
NEXTAUTH_SECRET="votre-secret-nextauth"
NEXTAUTH_URL="http://localhost:3000"
```

## 🚀 Étape 6: Déploiement

### Développement local
```bash
npm run dev
```

### Production (Vercel)
1. Ajoutez les variables dans le dashboard Vercel
2. Redéployez votre projet

## 🔍 Test de la connexion

1. Allez sur votre page de login
2. Cliquez sur "Continuer avec Google"
3. Vous devriez être redirigé vers Google
4. Après autorisation, vous serez connecté

## 🆘 Dépannage

### Erreur "redirect_uri_mismatch"
- Vérifiez que l'URI de redirection est exactement le même
- Incluez le protocole (http/https) et le port

### Erreur "invalid_client"
- Vérifiez que le Client ID et Secret sont corrects
- Assurez-vous que l'API est activée

### Erreur "access_denied"
- L'utilisateur a annulé l'autorisation
- Vérifiez les scopes demandés

## 🔒 Sécurité

### Bonnes pratiques
- ✅ Ne partagez jamais le Client Secret
- ✅ Utilisez HTTPS en production
- ✅ Limitez les scopes aux minimums nécessaires
- ✅ Surveillez l'utilisation de l'API

### Scopes recommandés
```
openid          # Identité de base
email           # Adresse email
profile         # Informations de profil
```

## 📚 Ressources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google Cloud Console](https://console.cloud.google.com/)

## 🎯 Prochaines étapes

1. **Testez la connexion** en développement
2. **Configurez les variables** en production
3. **Personnalisez l'interface** selon vos besoins
4. **Ajoutez d'autres providers** si nécessaire

---

**Votre authentification Google OAuth est maintenant configurée ! 🎉**
