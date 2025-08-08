"use client";
import {useState} from 'react';
import {useRouter} from 'next/navigation';

interface Collection {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
}

export function CollectionActions({collection}: {collection: Collection}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description || '');
  const [isPublic, setIsPublic] = useState(collection.isPublic);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/collections/${collection.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, description, isPublic})
      });

      if (res.ok) {
        setIsEditOpen(false);
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update collection');
      }
    } catch (error) {
      alert('Failed to update collection');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/collections/${collection.id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        router.push('/collections');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete collection');
      }
    } catch (error) {
      alert('Failed to delete collection');
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/collections/${collection.id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Collection link copied to clipboard!');
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setIsEditOpen(true)}
        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
      >
        Edit
      </button>
      <button
        onClick={handleShare}
        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
      >
        Share
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors"
      >
        Delete
      </button>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Edit Collection</h2>
            
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Collection Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-300">
                  Make collection public
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
