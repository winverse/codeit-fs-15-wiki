import QueryPostsPage from '@/domains/posts/components/QueryPostsPage';
import { getPosts } from '@/lib/api/posts';

export default async function QueryPostsRoutePage() {
  const initialPosts = await getPosts();

  return <QueryPostsPage initialPosts={initialPosts} />;
}
