import PostCard from '@/domains/posts/components/PostCard';
import * as styles from './PostList.css';

interface PostListProps {
  posts: any;
  selectedPostId: any;
  onSelectPost: any;
  emptyText?: any;
}

export default function PostList({
  posts,
  selectedPostId,
  onSelectPost,
  emptyText = '표시할 포스트가 없습니다.',
}: PostListProps) {
  if (posts.length === 0) {
    return <p className={styles.empty}>{emptyText}</p>;
  }

  return (
    <div className={styles.list}>
      {posts.map((post: any) => (
        <PostCard
          key={post.id}
          post={post}
          isSelected={post.id === selectedPostId}
          onSelect={() => onSelectPost(post.id)}
        />
      ))}
    </div>
  );
}
