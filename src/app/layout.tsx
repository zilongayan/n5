import {redirect} from 'next/navigation';
import {defaultLocale, locales} from '@/i18n/request';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {PWAMeta} from '@/components/PWAMeta';
import { QueryProvider } from '@/components/QueryProvider';
import Link from 'next/link';

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
  description: 'Découvrez une collection moderne de galeries numériques',
  manifest: '/manifest.json',
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
        <meta name="theme-color" content="#0B0C0F" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0C0F] text-[#E6E7EB]`}>
        <QueryProvider>
          {children}
          <footer className="mt-16 border-t border-purple-500/20 py-12 text-center bg-gradient-to-r from-slate-900/50 via-purple-900/20 to-slate-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Brand */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🎌</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MangaView</span>
                  </div>
                  <p className="text-gray-400 text-sm">Votre portail manga premium</p>
                </div>
                
                {/* Quick Links */}
                <div className="text-center">
                  <h4 className="text-white font-semibold mb-4">Navigation Rapide</h4>
                  <div className="space-y-2">
                    <Link href="/en/gallery" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">📚 Collection</Link>
                    <Link href="/en/popular" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">🔥 Trending</Link>
                    <Link href="/en/recent" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">🆕 Dernières Sorties</Link>
                  </div>
                </div>
                
                {/* Social */}
                <div className="text-center">
                  <h4 className="text-white font-semibold mb-4">Communauté</h4>
                  <div className="space-y-2">
                    <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">💬 Discord</a>
                    <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">🐦 Twitter</a>
                    <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">📖 Blog</a>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-purple-500/20 pt-6">
                <p className="text-gray-400 text-sm mb-2">
                  Ce site utilise l'API publique MangaDex. © Propriétaires respectifs. Données de MangaDex.
                </p>
                                 <p className="text-gray-500 text-xs">
                   Made with ❤️ for the otaku community
                 </p>
               </div>
             </div>
           </footer>
        </QueryProvider>
      </body>
    </html>
  );
} 
