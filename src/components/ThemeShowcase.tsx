'use client';

export function ThemeShowcase() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Showcase des Thèmes</h1>
        <p className="text-secondary">Démonstration de toutes les couleurs et composants du système de thème</p>
      </div>

      {/* Colors Palette */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Palette de Couleurs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="theme-card p-4 text-center">
            <div className="w-full h-12 bg-primary rounded mb-2"></div>
            <p className="text-sm text-secondary">Primary</p>
          </div>
          <div className="theme-card p-4 text-center">
            <div className="w-full h-12 bg-primary-light rounded mb-2"></div>
            <p className="text-sm text-secondary">Primary Light</p>
          </div>
          <div className="theme-card p-4 text-center">
            <div className="w-full h-12 bg-primary-dark rounded mb-2"></div>
            <p className="text-sm text-secondary">Primary Dark</p>
          </div>
          <div className="theme-card p-4 text-center">
            <div className="w-full h-12 bg-gradient-primary rounded mb-2"></div>
            <p className="text-sm text-secondary">Gradient</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Typographie</h2>
        <div className="theme-card p-6 space-y-3">
          <h1 className="text-4xl font-bold text-primary">Titre Principal</h1>
          <h2 className="text-2xl font-semibold text-secondary">Titre Secondaire</h2>
          <p className="text-primary">Texte principal avec couleur primaire</p>
          <p className="text-secondary">Texte secondaire pour les descriptions</p>
          <p className="text-muted">Texte discret pour les informations moins importantes</p>
          <p className="text-disabled">Texte désactivé</p>
        </div>
      </section>

      {/* Status Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Couleurs de Statut</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="theme-card p-4">
            <div className="w-full h-3 bg-success rounded mb-2"></div>
            <p className="text-success font-medium">Succès</p>
            <p className="text-secondary text-sm">Opération réussie</p>
          </div>
          <div className="theme-card p-4">
            <div className="w-full h-3 bg-warning rounded mb-2"></div>
            <p className="text-warning font-medium">Attention</p>
            <p className="text-secondary text-sm">Attention requise</p>
          </div>
          <div className="theme-card p-4">
            <div className="w-full h-3 bg-error rounded mb-2"></div>
            <p className="text-error font-medium">Erreur</p>
            <p className="text-secondary text-sm">Erreur survenue</p>
          </div>
          <div className="theme-card p-4">
            <div className="w-full h-3 bg-info rounded mb-2"></div>
            <p className="text-info font-medium">Information</p>
            <p className="text-secondary text-sm">Information utile</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Boutons</h2>
        <div className="theme-card p-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <button className="theme-button-primary px-6 py-3 rounded-lg">
              Bouton Principal
            </button>
            <button className="theme-button-secondary px-6 py-3 rounded-lg">
              Bouton Secondaire
            </button>
            <button className="px-6 py-3 bg-success text-white rounded-lg hover:opacity-90 transition-opacity">
              Succès
            </button>
            <button className="px-6 py-3 bg-warning text-white rounded-lg hover:opacity-90 transition-opacity">
              Attention
            </button>
            <button className="px-6 py-3 bg-error text-white rounded-lg hover:opacity-90 transition-opacity">
              Erreur
            </button>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Éléments de Formulaire</h2>
        <div className="theme-card p-6 space-y-4">
          <div>
            <label className="block text-secondary font-medium mb-2">Input Standard</label>
            <input 
              type="text" 
              placeholder="Tapez quelque chose..." 
              className="theme-input w-full px-4 py-3 rounded-lg focus-ring"
            />
          </div>
          <div>
            <label className="block text-secondary font-medium mb-2">Textarea</label>
            <textarea 
              placeholder="Votre message..."
              rows={4}
              className="theme-input w-full px-4 py-3 rounded-lg focus-ring resize-none"
            />
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="checkbox" className="focus-ring" />
            <label htmlFor="checkbox" className="text-secondary">Case à cocher</label>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Cartes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="theme-card p-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Carte Simple</h3>
            <p className="text-secondary">Une carte basique avec le style du thème.</p>
          </div>
          <div className="theme-card p-6 hover-card">
            <h3 className="text-lg font-semibold text-primary mb-2">Carte Interactive</h3>
            <p className="text-secondary">Une carte avec effet hover.</p>
          </div>
          <div className="bg-gradient-primary text-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Carte Gradient</h3>
            <p className="opacity-90">Une carte avec gradient coloré.</p>
          </div>
        </div>
      </section>

      {/* Borders and Shadows */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Bordures et Ombres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-light rounded-lg p-6">
            <h3 className="text-primary font-semibold mb-2">Bordure Légère</h3>
            <p className="text-secondary">Bordure subtile pour les séparations douces.</p>
          </div>
          <div className="bg-surface border border-default rounded-lg p-6">
            <h3 className="text-primary font-semibold mb-2">Bordure Normale</h3>
            <p className="text-secondary">Bordure standard pour la plupart des éléments.</p>
          </div>
          <div className="bg-surface border border-strong rounded-lg p-6">
            <h3 className="text-primary font-semibold mb-2">Bordure Forte</h3>
            <p className="text-secondary">Bordure marquée pour les éléments importants.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
