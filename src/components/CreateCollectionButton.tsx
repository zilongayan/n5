"use client";

import {useState} from 'react';

export function CreateCollectionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          isPublic,
        }),
      });

      if (response.ok) {
        // Reset form and close modal
        setName('');
        setDescription('');
        setIsPublic(false);
        setIsOpen(false);
        // Refresh the page to show the new collection
        window.location.reload();
      } else {
        console.error('Failed to create collection');
      }
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <>
                   <button
               onClick={() => setIsOpen(true)}
               className="theme-button-primary px-6 py-3 rounded-xl font-semibold"
             >
               ➕ Créer une Collection
             </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="theme-card p-6 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Créer une Nouvelle Collection
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="theme-input w-full px-3 py-2 rounded-lg focus-ring"
                  placeholder="Nom de la collection"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="theme-input w-full px-3 py-2 rounded-lg focus-ring resize-none"
                  placeholder="Description optionnelle"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPublic" className="ml-2 text-sm text-secondary">
                  Rendre la collection publique
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="theme-button-secondary flex-1 px-4 py-2 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="theme-button-primary flex-1 px-4 py-2 rounded-lg"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
