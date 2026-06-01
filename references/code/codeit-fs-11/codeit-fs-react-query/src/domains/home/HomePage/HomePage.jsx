'use client';

import Container from '@/components/Container';
import QueryBoundary from '@/components/QueryBoundary';
import PostList from '@/domains/feed/PostList';
import { FEED_VARIANT } from '@/lib/constants';
import * as styles from './HomePage.css.js';

function HomePage() {
  return (
    <Container className={styles.container}>
      {/* 1. PostList를 QueryBoundary로 감싸 로딩/에러를 처리합니다. */}
      <QueryBoundary>
        <PostList variant={FEED_VARIANT.HOME_FEED} />
      </QueryBoundary>
    </Container>
  );
}

export default HomePage;
