# 🔐 Secrets GitHub pour Déploiement Vercel

## 📋 Vue d'ensemble

Ce fichier explique comment configurer les secrets GitHub nécessaires pour le déploiement automatique sur Vercel via GitHub Actions.

## 🔑 Secrets requis

### 1. VERCEL_TOKEN
Token d'authentification Vercel pour l'API.

#### Comment l'obtenir :
1. Allez sur [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Cliquez sur "Create Token"
3. Donnez un nom (ex: "GitHub Actions")
4. Copiez le token généré

### 2. ORG_ID
ID de votre organisation Vercel.

#### Comment l'obtenir :
1. Dans le dashboard Vercel, allez dans "Settings"
2. L'ID de l'organisation est affiché en haut de la page
3. Ou utilisez la commande : `vercel orgs ls`

### 3. PROJECT_ID
ID de votre projet Vercel.

#### Comment l'obtenir :
1. Dans le dashboard Vercel, sélectionnez votre projet
2. Allez dans "Settings"
3. L'ID du projet est affiché en haut de la page
4. Ou utilisez la commande : `vercel project ls`

## ⚙️ Configuration des secrets

### Étape 1: Accéder aux secrets
1. Allez sur votre repository GitHub
2. Cliquez sur "Settings"
3. Dans le menu de gauche, cliquez sur "Secrets and variables" > "Actions"

### Étape 2: Ajouter les secrets
Cliquez sur "New repository secret" et ajoutez :

| Nom | Valeur |
|-----|---------|
| `VERCEL_TOKEN` | `votre-token-vercel` |
| `ORG_ID` | `votre-org-id` |
| `PROJECT_ID` | `votre-project-id` |

### Étape 3: Vérification
Vos secrets apparaîtront dans la liste avec des points noirs (masqués).

## 🚀 Test du déploiement

### Déclenchement manuel
1. Allez dans "Actions" sur GitHub
2. Sélectionnez le workflow "Deploy to Vercel"
3. Cliquez sur "Run workflow"
4. Sélectionnez la branche et cliquez sur "Run workflow"

### Déclenchement automatique
Le déploiement se déclenche automatiquement à chaque :
- Push sur `main` ou `master`
- Pull Request vers `main` ou `master`

## 🔍 Vérification

### Dans GitHub Actions
- ✅ Workflow exécuté avec succès
- ✅ Tous les jobs terminés
- ✅ Commentaire ajouté sur les PR

### Dans Vercel
- ✅ Nouveau déploiement visible
- ✅ URL de déploiement générée
- ✅ Variables d'environnement configurées

## 🆘 Dépannage

### Erreurs communes

#### "VERCEL_TOKEN not found"
- Vérifiez que le secret est bien configuré
- Vérifiez l'orthographe du nom du secret

#### "Invalid token"
- Régénérez le token Vercel
- Vérifiez que le token n'a pas expiré

#### "Project not found"
- Vérifiez le PROJECT_ID
- Vérifiez que le projet existe dans Vercel

#### "Organization not found"
- Vérifiez l'ORG_ID
- Vérifiez que vous avez accès à l'organisation

### Logs de débogage
1. Dans GitHub Actions, cliquez sur le job qui a échoué
2. Consultez les logs pour identifier l'erreur
3. Vérifiez que tous les secrets sont corrects

## 🔒 Sécurité

### Bonnes pratiques
- ✅ Ne partagez jamais les tokens
- ✅ Régénérez les tokens régulièrement
- ✅ Utilisez des tokens avec des permissions minimales
- ✅ Surveillez l'utilisation des tokens

### Permissions recommandées
- **VERCEL_TOKEN** : Accès en lecture/écriture aux projets
- **ORG_ID** : Accès en lecture à l'organisation
- **PROJECT_ID** : Accès en lecture au projet

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Vercel API Documentation](https://vercel.com/docs/api)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## 🎯 Prochaines étapes

1. **Configurez les secrets** selon ce guide
2. **Testez le déploiement** avec un push
3. **Surveillez les déploiements** dans Vercel
4. **Configurez les variables d'environnement** dans Vercel
5. **Testez votre site** en production
