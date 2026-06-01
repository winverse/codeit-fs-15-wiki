'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getPosts } from '@/lib/api/posts';

interface PostContextValue {
  posts: any;
  setPosts: any;
  loading: any;
  setLoading: any;
  error: any;
  setError: any;
  refreshPosts: any;
}

const PostContext = createContext<PostContextValue | undefined>(undefined);

interface PostProviderProps {
  children: React.ReactNode;
  initialPosts: any;
}

export function PostProvider({ children, initialPosts }: PostProviderProps) {
  const [posts, setPosts] = useState<any>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const mountedRef = useRef<any>(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  async function refreshPosts() {
    setLoading(true);
    setError(null);

    try {
      const fetchedPosts = await getPosts();
      if (mountedRef.current) {
        setPosts(fetchedPosts);
      }
    } catch {
      if (mountedRef.current) {
        setError('Context에서 포스트를 다시 불러오지 못했습니다.');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }

  return (
    <PostContext
      value={{
        posts,
        setPosts,
        loading,
        setLoading,
        error,
        setError,
        refreshPosts,
      }}
    >
      {children}
    </PostContext>
  );
}

export function usePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostContext must be used within PostProvider');
  }

  return context;
}
