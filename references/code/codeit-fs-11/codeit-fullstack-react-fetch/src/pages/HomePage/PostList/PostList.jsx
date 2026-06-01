import React from 'react';
import styles from './PostList.module.css';
import { Spinner } from '@/components/Spinner';
import { PostCard } from '@/pages/HomePage/PostCard';
import { usePosts } from '@/contexts/PostContext';

export function PostList() {
  const { posts, isLoading, error, handleDelete, handleUpdate } = usePosts();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className={styles.postListContainer}>
      <ul>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  );
}
