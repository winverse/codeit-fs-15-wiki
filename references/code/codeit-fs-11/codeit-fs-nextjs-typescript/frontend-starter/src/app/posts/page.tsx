import LocalPostsPage from '@/domains/posts/components/LocalPostsPage';
import { getPosts } from '@/lib/api/posts';

export default async function PostsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { page: rawPage } = await searchParams;
  const page = typeof rawPage === 'string' ? Number(rawPage) || 1 : 1;

  const initialPosts = await getPosts();

  return <LocalPostsPage initialPosts={initialPosts} />;
}
