import type {Metadata} from 'next';
import '../globals.css';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n/request';
import {Geist, Geist_Mono} from 'next/font/google';
import {PWAMeta} from '@/components/PWAMeta';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'N5 Portal - Adult Content Portal',
  description: 'Discover the largest collection of adult content with over 550,000 galleries and counting',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'N5 Portal'
  },
  icons: {
    icon: [
      {url: '/icon.svg', type: 'image/svg+xml'}
    ],
    apple: [
      {url: '/icon.svg', type: 'image/svg+xml'}
    ]
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#8b5cf6'
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!locales.includes(locale as any)) notFound();

  const activeLocale = locale;

  return children;
}


