'use client';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import { getPosts } from '@/lib/api/posts';

export default function useLocalPostsPage(initialPosts: any) {
  const [posts, setPosts] = useState<any>(initialPosts);
  const [selectedPostId, setSelectedPostId] = useState<any>(
    initialPosts[0]?.id ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const selectedPost =
    posts.find((post: any) => post.id === selectedPostId) ?? null;

  async function handleCreatePost(input: any) {
    setIsLoading(true);

    try {
      const nextPost = {
        id: nanoid(),
        ...input,
      };

      setPosts((previousPosts: any) => [nextPost, ...previousPosts]);
      setSelectedPostId(nextPost.id);
    } catch {
      setError('로컬 포스트를 추가하지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPosts() {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setSelectedPostId(fetchedPosts[0]?.id ?? null);
    } catch {
      setError('포스트 목록을 다시 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    posts,
    isLoading,
    error,
    selectedPost,
    selectedPostId,
    setSelectedPostId,
    handleCreatePost,
    handleResetPosts,
  };
}
