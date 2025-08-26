#!/bin/bash

# 🚀 Script de Déploiement MangaView pour Vercel
# Usage: ./deploy-vercel.sh

set -e

echo "🚀 Déploiement MangaView sur Vercel"
echo "==================================="

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

if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI n'est pas installé${NC}"
    echo -e "${BLUE}📦 Installation de Vercel CLI...${NC}"
    npm install -g vercel
fi

echo -e "${GREEN}✅ Prérequis vérifiés${NC}"

# Nettoyage des builds précédents
echo -e "${BLUE}🧹 Nettoyage des builds précédents...${NC}"
rm -rf .next out dist .vercel

# Installation des dépendances
echo -e "${BLUE}📦 Installation des dépendances...${NC}"
npm install --legacy-peer-deps

# Build de production
echo -e "${BLUE}🔨 Build de production...${NC}"
npm run build

# Vérification du build
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ Le build a échoué - dossier .next manquant${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build réussi !${NC}"

# Création du fichier vercel.json
echo -e "${BLUE}📝 Création de la configuration Vercel...${NC}"
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
EOF

# Création du package de déploiement
echo -e "${BLUE}📦 Création du package de déploiement...${NC}"
DEPLOY_DIR="deploy-vercel-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copie des fichiers nécessaires
cp -r .next "$DEPLOY_DIR/"
cp -r public "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"
cp next.config.ts "$DEPLOY_DIR/"
cp vercel.json "$DEPLOY_DIR/"
cp README-DEPLOYMENT.md "$DEPLOY_DIR/"

# Création du guide de déploiement Vercel
cat > "$DEPLOY_DIR/DEPLOY-VERCEL.md" << 'EOF'
# 🚀 Déploiement Vercel MangaView

## 1. Installation de Vercel CLI
```bash
npm install -g vercel
```

## 2. Connexion à Vercel
```bash
vercel login
```

## 3. Déploiement
```bash
vercel --prod
```

## 4. Variables d'environnement
Configurez vos variables d'environnement dans le dashboard Vercel :
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL

## 5. Domaine personnalisé
Dans le dashboard Vercel, ajoutez votre domaine personnalisé.

## 🎯 Votre site sera accessible sur : https://votre-projet.vercel.app
EOF

# Création de l'archive de déploiement
echo -e "${BLUE}📦 Création de l'archive de déploiement...${NC}"
tar -czf "${DEPLOY_DIR}.tar.gz" "$DEPLOY_DIR"

# Nettoyage du dossier temporaire
rm -rf "$DEPLOY_DIR"

echo -e "${GREEN}🎉 Package de déploiement Vercel créé avec succès !${NC}"
echo -e "${YELLOW}📁 Archive: ${DEPLOY_DIR}.tar.gz${NC}"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo "1. Uploadez ${DEPLOY_DIR}.tar.gz sur votre serveur"
echo "2. Extrayez l'archive"
echo "3. Suivez les instructions dans DEPLOY-VERCEL.md"
echo ""
echo -e "${GREEN}🚀 Votre site MangaView est prêt pour Vercel !${NC}"

# Déploiement automatique sur Vercel (optionnel)
echo ""
echo -e "${BLUE}🚀 Déploiement automatique sur Vercel...${NC}"
read -p "Voulez-vous déployer maintenant sur Vercel ? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📤 Déploiement en cours...${NC}"
    vercel --prod
else
    echo -e "${YELLOW}⏭️  Déploiement manuel - suivez les instructions dans DEPLOY-VERCEL.md${NC}"
fi

# Affichage des statistiques du build
echo ""
echo -e "${BLUE}📊 Statistiques du build :${NC}"
echo "Dossier .next: $(du -sh .next | cut -f1)"
echo "Dossier public: $(du -sh public | cut -f1)"
echo "Total: $(du -sh .next public | awk '{sum+=$1} END {print sum "K"}')"
echo ""
echo -e "${GREEN}✅ Déploiement Vercel terminé avec succès !${NC}"
