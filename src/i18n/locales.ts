export const locales = ['en', 'es', 'fr', 'it', 'pt', 'ru'] as const;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = 'en';
