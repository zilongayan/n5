# 🌍 Variables d'Environnement Vercel

## Variables Requises

### Base de données
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
```

### NextAuth.js
```bash
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

## Variables Optionnelles

### MangaDex API
```bash
MANGA_DEX_API_URL="https://api.mangadex.org"
```

### Cache
```bash
CACHE_ENABLED="true"
CACHE_TTL="3600"
```

### Sécurité
```bash
CORS_ORIGIN="https://your-domain.vercel.app"
```

## Configuration dans Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"
4. Ajoutez chaque variable avec sa valeur
5. Redéployez votre projet

## Génération de NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```
