'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostPage } from '@/lib/api/posts';
import { queryKeys } from '@/lib/query-keys';

export function useInfinitePostsQuery() {
  return useInfiniteQuery({
    queryKey: queryKeys.infinitePosts,
    initialPageParam: 1,
    queryFn: ({ pageParam }: any) => getPostPage(pageParam),
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
  });
}
