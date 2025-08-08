"use client";
import {useState, useEffect} from 'react';
import {readSession} from '@/lib/auth';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
}

export function Comments({itemId}: {itemId: string}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<{userId: string; email: string} | null>(null);

  useEffect(() => {
    // Check session
    const checkSession = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) {
          const cookies = document.cookie.split(';');
          const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
          if (sessionCookie) {
            const sessionData = JSON.parse(atob(sessionCookie.split('=')[1]));
            setSession(sessionData);
          }
        }
      } catch (error) {
        console.error('Failed to check session');
      }
    };

    checkSession();
    loadComments();
  }, [itemId]);

  const loadComments = async () => {
    try {
      const res = await fetch(`/api/comments?itemId=${itemId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Failed to load comments');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setLoading(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          content: newComment.trim(),
          itemId
        })
      });

      if (res.ok) {
        const comment = await res.json();
        setComments([comment, ...comments]);
        setNewComment('');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to post comment');
      }
    } catch (error) {
      alert('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Comments ({comments.length})</h2>
      
      {/* Comment Form */}
      {session ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            disabled={loading}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              Commenting as {session.email}
            </span>
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Please log in to comment</p>
          <a 
            href="/en/login" 
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Login to comment
          </a>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white/5 rounded-lg p-4 animate-fade-in-up">
              <div className="flex items-start space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {comment.user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">
                      {comment.user.email}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
