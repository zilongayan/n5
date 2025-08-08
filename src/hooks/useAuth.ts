'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export type User = {
  id: string;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check server authentication status on mount
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth');
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated && data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            // Clear any stale localStorage data
            localStorage.removeItem('user');
            setUser(null);
          }
        } else {
          localStorage.removeItem('user');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Fallback to localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            localStorage.removeItem('user');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });

      if (response.ok) {
        const data = await response.json();
        const userData = {id: data.user.id, email: data.user.email};
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return {success: true};
      } else {
        const error = await response.json();
        return {success: false, error: error.error || 'Login failed'};
      }
    } catch (error) {
      return {success: false, error: 'Network error'};
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', {method: 'POST'});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}
