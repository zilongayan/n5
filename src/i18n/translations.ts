export type Locale = 'fr' | 'en';

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      popular: 'Populaire',
      recent: 'Récent',
      random: 'Aléatoire',
      search: 'Rechercher',
      login: 'Connexion',
      signup: 'S\'inscrire',
    },
    
    // Homepage
    home: {
      hero: {
        title: 'MangaView',
        subtitle: 'Découvrez l\'univers infini du manga avec notre collection premium',
        stats: {
          titles: 'Titres',
          chapters: 'Chapitres',
          available: 'Disponible',
        },
        search: {
          placeholder: 'Rechercher un manga...',
          button: 'Rechercher',
        },
      },
      sections: {
        popularNewTitles: 'Titres Populaires Nouveaux',
        latestUpdates: 'Dernières Mises à Jour',
        browseByCategory: 'Parcourir par Catégorie',
        viewAll: 'Voir Tout',
      },
      categories: {
        action: 'Action',
        romance: 'Romance',
        fantasy: 'Fantasy',
        comedy: 'Comédie',
        drama: 'Drame',
        horror: 'Horreur',
      },
      cta: {
        title: 'Prêt à Découvrir de Nouveaux Mangas ?',
        subtitle: 'Rejoignez notre communauté et explorez des milliers de titres',
        explore: 'Explorer la Collection',
        random: 'Découverte Aléatoire',
      },
    },
    
    // Search
    search: {
      title: 'Recherche de Manga',
      form: {
        search: 'Recherche',
        tags: 'Tags',
        searchPlaceholder: 'Entrez des termes de recherche...',
        tagsPlaceholder: 'Filtrer par tags...',
        searchButton: 'Rechercher',
        clearButton: 'Effacer',
      },
      results: {
        title: 'Résultats',
        noResults: 'Aucun résultat trouvé',
        startSearch: 'Commencez votre recherche',
        noResultsFor: 'Aucun manga trouvé pour',
        useFilters: 'Utilisez les filtres ci-dessus pour trouver vos mangas préférés',
        backHome: 'Retour à l\'accueil',
      },
    },
    
    // Tags
    tags: {
      title: 'Tag:',
      subtitle: 'Découvrez tous les mangas du tag',
      noMangaFound: 'Aucun manga trouvé',
      noMangaForTag: 'Aucun manga trouvé pour le tag',
      backHome: 'Retour à l\'accueil',
    },
    
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      retry: 'Réessayer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      page: 'Page',
      of: 'sur',
    },
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      popular: 'Popular',
      recent: 'Recent',
      random: 'Random',
      search: 'Search',
      login: 'Login',
      signup: 'Sign Up',
    },
    
    // Homepage
    home: {
      hero: {
        title: 'MangaView',
        subtitle: 'Discover the infinite universe of manga with our premium collection',
        stats: {
          titles: 'Titles',
          chapters: 'Chapters',
          available: 'Available',
        },
        search: {
          placeholder: 'Search for manga...',
          button: 'Search',
        },
      },
      sections: {
        popularNewTitles: 'Popular New Titles',
        latestUpdates: 'Latest Updates',
        browseByCategory: 'Browse by Category',
        viewAll: 'View All',
      },
      categories: {
        action: 'Action',
        romance: 'Romance',
        fantasy: 'Fantasy',
        comedy: 'Comedy',
        drama: 'Drama',
        horror: 'Horror',
      },
      cta: {
        title: 'Ready to Discover New Manga?',
        subtitle: 'Join our community and explore thousands of titles',
        explore: 'Explore Collection',
        random: 'Random Discovery',
      },
    },
    
    // Search
    search: {
      title: 'Manga Search',
      form: {
        search: 'Search',
        tags: 'Tags',
        searchPlaceholder: 'Enter search terms...',
        tagsPlaceholder: 'Filter by tags...',
        searchButton: 'Search',
        clearButton: 'Clear',
      },
      results: {
        title: 'Results',
        noResults: 'No results found',
        startSearch: 'Start your search',
        noResultsFor: 'No manga found for',
        useFilters: 'Use the filters above to find your favorite manga',
        backHome: 'Back to Home',
      },
    },
    
    // Tags
    tags: {
      title: 'Tag:',
      subtitle: 'Discover all manga for the tag',
      noMangaFound: 'No manga found',
      noMangaForTag: 'No manga found for the tag',
      backHome: 'Back to Home',
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      page: 'Page',
      of: 'of',
    },
  },
};

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}
