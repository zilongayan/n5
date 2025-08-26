#!/bin/bash

# 🚀 Déploiement Vercel MangaView - Version Ultra-Minimal
# Usage: ./deploy-vercel-ultra-minimal.sh

set -e

echo "🚀 Déploiement Vercel MangaView - Version Ultra-Minimal"
echo "========================================================"

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
rm -rf .next out dist .vercel node_modules package-lock.json

# Sauvegarde des fichiers originaux
echo -e "${BLUE}💾 Sauvegarde des fichiers originaux...${NC}"
cp package.json package.json.backup
cp src/app/globals.css src/app/globals.css.backup

# Remplacement par les versions ultra-minimales
echo -e "${BLUE}📦 Utilisation des versions ultra-minimales...${NC}"
cp package-ultra-minimal.json package.json
cp src/app/globals-ultra-simple.css src/app/globals.css

# Installation des dépendances ultra-minimales
echo -e "${BLUE}📦 Installation des dépendances ultra-minimales...${NC}"
npm install

# Build de production
echo -e "${BLUE}🔨 Build de production...${NC}"
npm run build

# Vérification du build
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ Le build a échoué - dossier .next manquant${NC}"
    # Restauration des fichiers originaux
    cp package.json.backup package.json
    cp src/app/globals.css.backup src/app/globals.css
    exit 1
fi

echo -e "${GREEN}✅ Build réussi !${NC}"

# Vérification de la connexion Vercel
echo -e "${BLUE}🔐 Vérification de la connexion Vercel...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vous n'êtes pas connecté à Vercel${NC}"
    echo -e "${BLUE}🔑 Connexion à Vercel...${NC}"
    vercel login
fi

echo -e "${GREEN}✅ Connecté à Vercel${NC}"

# Déploiement sur Vercel
echo -e "${BLUE}🚀 Déploiement sur Vercel...${NC}"
echo -e "${YELLOW}📝 Suivez les instructions à l'écran...${NC}"

vercel --prod

# Restauration des fichiers originaux
echo -e "${BLUE}🔄 Restauration des fichiers originaux...${NC}"
cp package.json.backup package.json
cp src/app/globals.css.backup src/app/globals.css

echo -e "${GREEN}🎉 Déploiement Vercel terminé avec succès !${NC}"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo "1. Configurez vos variables d'environnement dans le dashboard Vercel"
echo "2. Configurez Google OAuth dans Google Cloud Console"
echo "3. Ajoutez les variables Google OAuth dans Vercel"
echo "4. Testez l'authentification Google sur votre site déployé"
echo ""
echo -e "${GREEN}🚀 Votre site MangaView est maintenant en ligne sur Vercel !${NC}"
echo ""
echo -e "${BLUE}📚 Documentation :${NC}"
echo "- GOOGLE-AUTH-SUMMARY.md - Configuration Google OAuth"
echo "- VERCEL-ENV-SETUP.md - Variables d'environnement Vercel"
echo ""
echo -e "${YELLOW}⚠️  Note : Cette version ultra-minimal n'inclut que Next.js de base${NC}"
echo -e "${YELLOW}   Vous pourrez ajouter les fonctionnalités après le déploiement initial${NC}"
echo -e "${YELLOW}   et la configuration des variables d'environnement${NC}"
