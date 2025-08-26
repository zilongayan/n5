#!/bin/bash

# 🚀 Déploiement Direct MangaView sur Vercel
# Usage: ./deploy-vercel-direct.sh

set -e

echo "🚀 Déploiement Direct MangaView sur Vercel"
echo "=========================================="

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

echo -e "${GREEN}🎉 Déploiement Vercel terminé avec succès !${NC}"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo "1. Configurez vos variables d'environnement dans le dashboard Vercel"
echo "2. Ajoutez votre domaine personnalisé si nécessaire"
echo "3. Vérifiez que votre site fonctionne correctement"
echo ""
echo -e "${GREEN}🚀 Votre site MangaView est maintenant en ligne sur Vercel !${NC}"
