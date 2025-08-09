import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/request';

export default createMiddleware({
  locales: Array.from(locales),
  defaultLocale,
  localePrefix: 'as-needed',
  // Détection automatique de la langue basée sur Accept-Language du navigateur
  localeDetection: true
});

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next (static files)
    // - _vercel (Vercel internals)
    // - static files
    // - root path (handled by rewrite)
    '/((?!api|_next|_vercel|.*\\..*|^$).*)'
  ]
};


