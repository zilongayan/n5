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
  title: '3Like - Adult Content Portal',
  description: 'Discover the largest collection of adult content with over 550,000 galleries and counting',
  manifest: '/manifest.json',
  themeColor: '#8b5cf6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '3Like'
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

  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </body>
  );
}


