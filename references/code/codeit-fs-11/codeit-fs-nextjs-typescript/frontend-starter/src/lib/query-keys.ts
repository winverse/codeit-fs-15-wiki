export const queryKeys = {
  posts: ['posts'] as const,
  post: (postId: string) => ['posts', postId] as const,
  infinitePosts: ['posts', 'infinite'] as const,
};
