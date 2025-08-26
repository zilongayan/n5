#!/bin/bash

# 🧪 Script de Test des Composants de Déploiement MangaView
# Usage: ./test-deployment.sh

set -e

echo "🧪 Test des Composants de Déploiement MangaView"
echo "==============================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compteurs
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Fonction de test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "${BLUE}🔍 Test: $test_name${NC}"
    
    if eval "$test_command" &> /dev/null; then
        echo -e "${GREEN}✅ PASS: $test_name${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL: $test_name${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    echo ""
}

# Test 1: Vérification des prérequis
echo -e "${BLUE}📋 Test des Prérequis${NC}"
echo "=========================="

run_test "Node.js installé" "command -v node"
run_test "npm installé" "command -v npm"
run_test "Git installé" "command -v git"

# Test 2: Vérification des scripts de déploiement
echo -e "${BLUE}📜 Test des Scripts de Déploiement${NC}"
echo "========================================"

run_test "Script Hostinger existe" "test -f deploy.sh"
run_test "Script Vercel existe" "test -f deploy-vercel.sh"
run_test "Script Vercel Direct existe" "test -f deploy-vercel-direct.sh"
run_test "Scripts exécutables" "test -x deploy.sh && test -x deploy-vercel.sh && test -x deploy-vercel-direct.sh"

# Test 3: Vérification des fichiers de configuration
echo -e "${BLUE}⚙️  Test des Fichiers de Configuration${NC}"
echo "=========================================="

run_test "vercel.json existe" "test -f vercel.json"
run_test "next.config.ts existe" "test -f next.config.ts"
run_test "package.json existe" "test -f package.json"

# Test 4: Vérification de la documentation
echo -e "${BLUE}📚 Test de la Documentation${NC}"
echo "================================"

run_test "README-DEPLOYMENT.md existe" "test -f README-DEPLOYMENT.md"
run_test "DEPLOYMENT-OPTIONS.md existe" "test -f DEPLOYMENT-OPTIONS.md"
run_test "DEPLOYMENT-SUMMARY.md existe" "test -f DEPLOYMENT-SUMMARY.md"
run_test "DEPLOY-VERCEL-MANUAL.md existe" "test -f DEPLOY-VERCEL-MANUAL.md"
run_test "vercel-env.md existe" "test -f vercel-env.md"
run_test "GITHUB-SECRETS.md existe" "test -f GITHUB-SECRETS.md"

# Test 5: Vérification des workflows GitHub Actions
echo -e "${BLUE}🔄 Test des Workflows GitHub Actions${NC}"
echo "========================================="

run_test "Workflow Vercel existe" "test -f .github/workflows/deploy-vercel.yml"

# Test 6: Vérification des dépendances
echo -e "${BLUE}📦 Test des Dépendances${NC}"
echo "============================="

run_test "node_modules existe" "test -d node_modules"
run_test "Dépendances installées" "npm list --depth=0 &> /dev/null"

# Test 7: Test de build
echo -e "${BLUE}🔨 Test de Build${NC}"
echo "=================="

echo -e "${BLUE}🔨 Test de build en cours...${NC}"
if npm run build &> /dev/null; then
    echo -e "${GREEN}✅ PASS: Build réussi${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    # Vérification du dossier .next
    if [ -d ".next" ]; then
        echo -e "${GREEN}✅ PASS: Dossier .next créé${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        TOTAL_TESTS=$((TOTAL_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL: Dossier .next manquant${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        TOTAL_TESTS=$((TOTAL_TESTS + 1))
    fi
else
    echo -e "${RED}❌ FAIL: Build échoué${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
fi

# Résumé des tests
echo ""
echo -e "${BLUE}📊 Résumé des Tests${NC}"
echo "======================"
echo -e "Total des tests: ${TOTAL_TESTS}"
echo -e "Tests réussis: ${GREEN}${PASSED_TESTS}${NC}"
echo -e "Tests échoués: ${RED}${FAILED_TESTS}${NC}"

# Calcul du pourcentage de réussite
if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
    echo -e "Taux de réussite: ${SUCCESS_RATE}%"
fi

echo ""

# Recommandations
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 Tous les tests sont passés !${NC}"
    echo -e "${GREEN}🚀 Votre projet est prêt pour le déploiement !${NC}"
    echo ""
    echo -e "${BLUE}📋 Prochaines étapes :${NC}"
    echo "1. Choisissez votre plateforme de déploiement"
    echo "2. Configurez les variables d'environnement"
    echo "3. Lancez le déploiement avec le script approprié"
else
    echo -e "${YELLOW}⚠️  Certains tests ont échoué${NC}"
    echo -e "${BLUE}🔧 Vérifiez les erreurs ci-dessus avant de déployer${NC}"
    echo ""
    echo -e "${BLUE}📋 Actions recommandées :${NC}"
    echo "1. Corrigez les erreurs identifiées"
    echo "2. Relancez ce script de test"
    echo "3. Déployez seulement quand tous les tests passent"
fi

echo ""
echo -e "${BLUE}📚 Documentation disponible :${NC}"
echo "- DEPLOYMENT-SUMMARY.md - Vue d'ensemble"
echo "- DEPLOYMENT-OPTIONS.md - Comparaison des plateformes"
echo "- DEPLOY-VERCEL-MANUAL.md - Guide Vercel étape par étape"
echo "- GITHUB-SECRETS.md - Configuration GitHub Actions"

# Nettoyage
if [ -d ".next" ]; then
    echo ""
    echo -e "${BLUE}🧹 Nettoyage du dossier .next...${NC}"
    rm -rf .next
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
fi
