'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import Panel from '@/components/Panel';
import PostDetail from '@/domains/posts/components/PostDetail';
import PostForm from '@/domains/posts/components/PostForm';
import PostList from '@/domains/posts/components/PostList';
import useLocalPostsPage from '@/domains/posts/hooks/useLocalPostsPage';
import type { Post } from '@/domains/posts/types';
import * as styles from './LocalPostsPage.css';

interface LocalPostsPageProps {
  initialPosts: Post[];
}

export default function LocalPostsPage({ initialPosts }: LocalPostsPageProps) {
  const {
    posts,
    isLoading,
    error,
    selectedPost,
    selectedPostId,
    setSelectedPostId,
    handleCreatePost,
    handleResetPosts,
  } = useLocalPostsPage(initialPosts);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Chapters 3-5</span>
          <h1>Props, 이벤트, 기본 Hook 타입을 채워 넣는 학생용 시작본</h1>
          <p className={styles.lead}>
            이 페이지는 PostCard, PostDetail, PostForm의 props 타입과 입력
            이벤트 타입, 그리고 useState, useRef, useParams 제네릭을 교재
            순서대로 메우도록 만든 시작 상태입니다. 상세 라우트 예제는 별도
            페이지에서 같은 흐름으로 이어집니다.
          </p>
          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleResetPosts}
            >
              서버 데이터 다시 불러오기
            </Button>
            {selectedPostId ? (
              <Link href={`/posts/${selectedPostId}`}>
                선택한 포스트 상세 라우트 보기
              </Link>
            ) : null}
          </div>
          {error ? <p className={styles.status}>{error}</p> : null}
        </section>

        <section className={styles.workspace}>
          <div className={styles.side}>
            <Panel
              title="PostList"
              description="교재 3장에서 props와 Post 타입 연결을 채워 넣는 구간입니다."
            >
              <PostList
                posts={posts}
                selectedPostId={selectedPostId}
                onSelectPost={setSelectedPostId}
              />
            </Panel>
          </div>

          <div className={styles.side}>
            <Panel
              title="PostDetail"
              description="선택된 포스트와 빈 상태를 어떤 타입으로 다룰지 직접 정리합니다."
            >
              <PostDetail post={selectedPost} />
            </Panel>

            <Panel
              title="PostForm"
              description="이벤트 객체 타입과 useRef 제네릭을 교재 순서대로 채웁니다."
            >
              <PostForm
                onSubmit={handleCreatePost}
                isLoading={isLoading}
                submitLabel="로컬 포스트 추가"
              />
            </Panel>
          </div>
        </section>
      </div>
    </main>
  );
}
