import ContextPostsPage from '@/domains/posts/components/ContextPostsPage';
import { getPosts } from '@/lib/api/posts';

export default async function ContextPostsRoutePage() {
  const initialPosts = await getPosts();

  return <ContextPostsPage initialPosts={initialPosts} />;
}
