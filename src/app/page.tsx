import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {ScrollToTop} from '@/components/ScrollToTop';
import {getCatalogPage} from '@/data/catalog';
import {translations} from '@/i18n/translations';
import Link from 'next/link';

export default async function HomePage() {
  const {recent, popular} = await getCatalogPage({page: 1});
  
  // Use English as default locale for root page
  const t = (key: string): string => {
    const currentTranslations = translations.en;
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <AgeGate />
      <NavBar />
      <ScrollToTop />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 animate-fade-in-up">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
                {t('home.hero.subtitle')}
              </p>
              <Link 
                href="/gallery"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-up animation-delay-400"
              >
                {t('home.hero.cta')} →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{recent.length + popular.length}</div>
                <div className="text-secondary">{t('home.hero.stats.galleries')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-secondary">{t('home.hero.stats.artists')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-secondary">{t('home.hero.stats.visitors')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Galleries */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">{t('home.sections.featured')}</h2>
              <p className="text-secondary text-lg">{t('home.hero.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popular.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  href={`/gallery/${item.id}`}
                  className="group theme-card overflow-hidden hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="aspect-[3/4] w-full object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-secondary text-sm line-clamp-2">
                      {item.tags.join(', ')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/gallery"
                className="theme-button-primary px-8 py-4 text-lg font-semibold"
              >
                {t('home.hero.cta')} →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">🎨 {t('home.hero.title')}</h2>
            <p className="text-xl mb-8 opacity-90">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                {t('nav.signup')} →
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t('home.hero.cta')} →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
