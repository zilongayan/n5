# 🚀 Guide de Déploiement sur Hostinger

## 📋 Prérequis

- Compte Hostinger actif
- Node.js 18+ installé localement
- Git configuré
- Accès FTP/SFTP à votre hébergement

## 🛠️ Préparation du Build

### 1. Build de Production

```bash
# Installation des dépendances
npm install

# Build optimisé pour la production
npm run build:production

# Ou utilisez le script de déploiement
npm run deploy:hostinger
```

### 2. Vérification du Build

Le build crée un dossier `.next` contenant :
- Pages optimisées
- Assets compressés
- Bundle JavaScript optimisé
- Fichiers de cache

## 📤 Déploiement sur Hostinger

### Option 1: Déploiement via FTP/SFTP

1. **Connexion à votre hébergement**
   - Utilisez FileZilla ou un client FTP similaire
   - Connectez-vous avec vos identifiants Hostinger

2. **Upload des fichiers**
   ```
   📁 public/ → public_html/
   📁 .next/ → public_html/.next/
   📄 package.json → public_html/
   📄 next.config.ts → public_html/
   📄 .htaccess → public_html/
   ```

3. **Structure finale sur Hostinger**
   ```
   public_html/
   ├── .next/
   ├── public/
   ├── package.json
   ├── next.config.ts
   └── .htaccess
   ```

### Option 2: Déploiement via Git (Recommandé)

1. **Configuration Git sur Hostinger**
   ```bash
   # Sur votre serveur Hostinger
   cd public_html
   git init
   git remote add origin https://github.com/votre-username/mangaview.git
   ```

2. **Pull et Build automatique**
   ```bash
   git pull origin main
   npm install
   npm run build:production
   ```

## ⚙️ Configuration Serveur

### 1. Configuration Node.js

Si Hostinger supporte Node.js :

```bash
# Installation des dépendances
npm install --production

# Démarrage du serveur
npm run start:production
```

### 2. Configuration Apache (.htaccess)

Le fichier `.htaccess` est déjà configuré avec :
- Compression Gzip
- Cache des navigateurs
- Headers de sécurité
- Redirections SEO

### 3. Configuration PHP (Alternative)

Si Node.js n'est pas supporté, utilisez l'export statique :

```bash
npm run export
```

Puis uploadez le dossier `out/` vers `public_html/`.

## 🔧 Optimisations Post-Déploiement

### 1. Vérification des Performances

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 2. Configuration CDN

Si disponible sur Hostinger :
- Activez le CDN pour les assets statiques
- Configurez la compression Brotli
- Optimisez la mise en cache

### 3. Monitoring

- Configurez Google Analytics
- Activez les alertes de performance
- Surveillez les erreurs 404

## 🚨 Résolution des Problèmes

### Erreur 500
- Vérifiez les logs d'erreur
- Assurez-vous que Node.js est installé
- Vérifiez les permissions des fichiers

### Erreur 404
- Vérifiez la configuration des routes
- Assurez-vous que `.htaccess` est présent
- Vérifiez la configuration Next.js

### Problèmes de Performance
- Activez la compression Gzip
- Vérifiez la mise en cache
- Optimisez les images

## 📱 Configuration Mobile

### 1. PWA
- Vérifiez que `manifest.json` est accessible
- Testez l'installation sur mobile
- Vérifiez le service worker

### 2. Responsive Design
- Testez sur différents appareils
- Vérifiez la vitesse de chargement mobile
- Optimisez les images pour mobile

## 🔍 Vérification Post-Déploiement

### 1. Tests Fonctionnels
- [ ] Navigation entre les pages
- [ ] Recherche fonctionnelle
- [ ] Affichage des mangas
- [ ] Responsive design
- [ ] Performance acceptable

### 2. Tests SEO
- [ ] Sitemap accessible
- [ ] Robots.txt fonctionnel
- [ ] Métadonnées correctes
- [ ] Structure des URLs
- [ ] Temps de chargement

### 3. Tests de Sécurité
- [ ] Headers de sécurité
- [ ] Protection XSS
- [ ] Protection CSRF
- [ ] HTTPS (si disponible)

## 📞 Support

En cas de problème :
1. Vérifiez les logs d'erreur
2. Consultez la documentation Hostinger
3. Contactez le support Hostinger
4. Vérifiez la configuration Next.js

## 🎯 Checklist de Déploiement

- [ ] Build de production réussi
- [ ] Fichiers uploadés sur Hostinger
- [ ] Configuration serveur correcte
- [ ] Tests fonctionnels passés
- [ ] Performance validée
- [ ] SEO vérifié
- [ ] Sécurité testée
- [ ] Monitoring configuré

---

**🚀 Votre site MangaView est maintenant prêt pour la production sur Hostinger !**
