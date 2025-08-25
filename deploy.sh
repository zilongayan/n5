#!/bin/bash

# 🚀 Script de Déploiement MangaView pour Hostinger
# Usage: ./deploy.sh

set -e

echo "🚀 Déploiement MangaView sur Hostinger"
echo "======================================"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérification des prérequis
echo -e "${BLUE}📋 Vérification des prérequis...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prérequis vérifiés${NC}"

# Nettoyage des builds précédents
echo -e "${BLUE}🧹 Nettoyage des builds précédents...${NC}"
rm -rf .next out dist

# Installation des dépendances
echo -e "${BLUE}📦 Installation des dépendances...${NC}"
npm install

# Build de production
echo -e "${BLUE}🔨 Build de production...${NC}"
npm run build

# Vérification du build
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ Le build a échoué - dossier .next manquant${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build réussi !${NC}"

# Création du package de déploiement
echo -e "${BLUE}📦 Création du package de déploiement...${NC}"
DEPLOY_DIR="deploy-mangaview-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copie des fichiers nécessaires
cp -r .next "$DEPLOY_DIR/"
cp -r public "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"
cp next.config.ts "$DEPLOY_DIR/"
cp .htaccess "$DEPLOY_DIR/"
cp DEPLOYMENT.md "$DEPLOY_DIR/"

# Création du fichier de configuration serveur
cat > "$DEPLOY_DIR/server.js" << 'EOF'
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
EOF

# Création du package.json de production
cat > "$DEPLOY_DIR/package-prod.json" << 'EOF'
{
  "name": "mangaview-production",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js",
    "start:prod": "NODE_ENV=production node server.js"
  },
  "dependencies": {
    "next": "^15.4.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Création du guide de déploiement rapide
cat > "$DEPLOY_DIR/DEPLOY-QUICK.md" << 'EOF'
# 🚀 Déploiement Rapide MangaView

## 1. Upload sur Hostinger
Uploadez TOUS les fichiers de ce dossier vers `public_html/` sur votre hébergement Hostinger.

## 2. Structure finale
```
public_html/
├── .next/          ← Dossier de build Next.js
├── public/         ← Assets statiques
├── package.json    ← Dépendances
├── next.config.ts  ← Configuration Next.js
├── .htaccess      ← Configuration Apache
└── server.js      ← Serveur Node.js
```

## 3. Installation des dépendances
```bash
cd public_html
npm install --production
```

## 4. Démarrage du serveur
```bash
npm start
```

## 5. Configuration du domaine
- Pointez votre domaine vers ce dossier
- Activez HTTPS si disponible
- Vérifiez que le port 3000 est ouvert

## 🎯 Votre site sera accessible sur : https://votre-domaine.com
EOF

# Création de l'archive de déploiement
echo -e "${BLUE}📦 Création de l'archive de déploiement...${NC}"
tar -czf "${DEPLOY_DIR}.tar.gz" "$DEPLOY_DIR"

# Nettoyage du dossier temporaire
rm -rf "$DEPLOY_DIR"

echo -e "${GREEN}🎉 Package de déploiement créé avec succès !${NC}"
echo -e "${YELLOW}📁 Archive: ${DEPLOY_DIR}.tar.gz${NC}"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo "1. Uploadez ${DEPLOY_DIR}.tar.gz sur Hostinger"
echo "2. Extrayez l'archive dans public_html/"
echo "3. Suivez les instructions dans DEPLOY-QUICK.md"
echo ""
echo -e "${GREEN}🚀 Votre site MangaView est prêt pour la production !${NC}"

# Affichage des statistiques du build
echo ""
echo -e "${BLUE}📊 Statistiques du build :${NC}"
echo "Dossier .next: $(du -sh .next | cut -f1)"
echo "Dossier public: $(du -sh public | cut -f1)"
echo "Total: $(du -sh .next public | awk '{sum+=$1} END {print sum "K"}')"
echo ""
echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"
