import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/request';
import {NextRequest} from 'next/server';

const intlMiddleware = createMiddleware({
  locales: Array.from(locales),
  defaultLocale,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  // Skip middleware for root path, let rewrite handle it
  if (request.nextUrl.pathname === '/') {
    return;
  }
  
  return intlMiddleware(request);
}

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


