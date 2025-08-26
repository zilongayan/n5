export const locales = ['fr', 'en', 'es', 'it', 'pt', 'ru'] as const;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = 'fr';
