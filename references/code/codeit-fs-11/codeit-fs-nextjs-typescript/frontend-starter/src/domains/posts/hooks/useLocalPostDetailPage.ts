'use client';

import { useEffect, useState } from 'react';
import { getPost } from '@/lib/api/posts';

export default function useLocalPostDetailPage(postId: any) {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!postId) {
      setPost(null);
      setError('URL에서 postId를 찾지 못했습니다.');
      setIsLoading(false);
      return;
    }

    const currentPostId = postId;

    let ignore = false;

    async function fetchPost() {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedPost = await getPost(currentPostId);
        if (!ignore) {
          setPost(fetchedPost);
        }
      } catch {
        if (!ignore) {
          setError('포스트 상세 정보를 불러오지 못했습니다.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchPost();

    return () => {
      ignore = true;
    };
  }, [postId]);

  return {
    post,
    isLoading,
    error,
  };
}
