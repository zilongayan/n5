#!/bin/bash

# 🚀 Déploiement Vercel MangaView - Version Propre
# Usage: ./deploy-vercel-clean.sh

set -e

echo "🚀 Déploiement Vercel MangaView - Version Propre"
echo "================================================"

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

# Sauvegarde du package.json original
echo -e "${BLUE}💾 Sauvegarde du package.json original...${NC}"
cp package.json package.json.backup

# Remplacement par le package.json de production
echo -e "${BLUE}📦 Utilisation du package.json de production...${NC}"
cp package-prod.json package.json

# Installation des dépendances de production
echo -e "${BLUE}📦 Installation des dépendances de production...${NC}"
npm install --legacy-peer-deps

# Build de production
echo -e "${BLUE}🔨 Build de production...${NC}"
npm run build

# Vérification du build
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ Le build a échoué - dossier .next manquant${NC}"
    # Restauration du package.json original
    cp package.json.backup package.json
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

# Restauration du package.json original
echo -e "${BLUE}🔄 Restauration du package.json original...${NC}"
cp package.json.backup package.json

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
