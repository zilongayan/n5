import {redirect} from 'next/navigation';
import {defaultLocale, locales} from '@/i18n/request';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {PWAMeta} from '@/components/PWAMeta';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function ThemeInitScript() {
  const code = `(() => {
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? 'dark' : 'light');
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch {}
  })();`;
  return <script dangerouslySetInnerHTML={{__html: code}} />;
}

export const metadata = {
  title: 'N5 Portal - Galerie d\'Art Numérique',
  description: 'Découvrez une collection unique d\'art numérique et de galeries créatives',
  keywords: 'art numérique, galerie, créativité, design',
  authors: [{name: 'N5 Portal'}],
  creator: 'N5 Portal',
  publisher: 'N5 Portal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://n5portal.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'fr': '/fr',
      'es': '/es',
      'de': '/de',
      'it': '/it',
      'pt': '/pt',
      'ru': '/ru',
    },
  },
  openGraph: {
    title: 'N5 Portal - Galerie d\'Art Numérique',
    description: 'Découvrez une collection unique d\'art numérique et de galeries créatives',
    url: 'https://n5portal.com',
    siteName: 'N5 Portal',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'N5 Portal - Galerie d\'Art Numérique',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N5 Portal - Galerie d\'Art Numérique',
    description: 'Découvrez une collection unique d\'art numérique et de galeries créatives',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

import {headers} from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const path = headersList.get('next-url') || '/';
  const first = path.split('/')[1];
  const htmlLang = locales.includes(first as any) ? first : defaultLocale;
  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <ThemeInitScript />
        <PWAMeta />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
} 
