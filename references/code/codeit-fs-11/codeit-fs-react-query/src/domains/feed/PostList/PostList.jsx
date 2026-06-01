'use client';

import Post from '@/domains/feed/Post';
import { FEED_VARIANT } from '@/lib/constants';
import Button from '@/components/Button';
import { useLoginContext } from '@/contexts/LoginContext';
import * as styles from './PostList.css.js';
import usePostListQuery from '../hooks/usePostListQuery.js';

function PostList({ variant = FEED_VARIANT.HOME_FEED }) {
  const { currentUsername } = useLoginContext();
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostListQuery({ variant, currentUsername });

  const postsPages = postsData.pages;

  return (
    <div className={styles.postList}>
      {postsPages.map((postPage) =>
        postPage.results.map((post) => <Post key={post.id} post={post} />),
      )}
      <Button
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        더 불러오기
      </Button>
    </div>
  );
}

export default PostList;
