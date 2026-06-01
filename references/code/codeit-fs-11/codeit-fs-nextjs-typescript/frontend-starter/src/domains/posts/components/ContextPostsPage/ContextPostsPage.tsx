'use client';

import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import Button from '@/components/Button';
import Panel from '@/components/Panel';
import PostDetail from '@/domains/posts/components/PostDetail';
import PostList from '@/domains/posts/components/PostList';
import {
  PostProvider,
  usePostContext,
} from '@/domains/posts/contexts/PostContext';
import type { Post } from '@/domains/posts/types';
import * as styles from './ContextPostsPage.css';

interface ContextPostsPageProps {
  initialPosts: Post[];
}

function ContextPostsWorkspace() {
  const { posts, setPosts, loading, error, refreshPosts } = usePostContext();
  const [selectedPostId, setSelectedPostId] = useState<any>(
    posts[0]?.id ?? null,
  );

  const selectedPost = useMemo(
    () => posts.find((post: any) => post.id === selectedPostId) ?? null,
    [posts, selectedPostId],
  );

  function handleAddContextDraft() {
    const nextPost = {
      id: nanoid(),
      title: 'Context에서 추가한 임시 포스트',
      content:
        '이 시작본은 Provider props, createContext 제네릭, mountedRef 패턴에 any가 남아 있는 상태입니다.',
      authorId: 'author-4',
    };

    setPosts((previousPosts: any) => [nextPost, ...previousPosts]);
    setSelectedPostId(nextPost.id);
  }

  return (
    <>
      <section>
        <p className={styles.lead}>
          Context 실습에서는 Provider가 어떤 값을 공급하는지 먼저 타입으로
          고정하는 흐름을 다룹니다. 현재 코드는 교재를 따라가며 value 구조,
          Provider props, mountedRef 관련 타입을 채워 넣도록 일부러 느슨하게
          두었습니다.
        </p>
      </section>

      <section className={styles.actions}>
        <Button type="button" onClick={refreshPosts} disabled={loading}>
          {loading ? '새로고침 중' : 'refreshPosts 실행'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddContextDraft}
        >
          setPosts로 임시 포스트 추가
        </Button>
      </section>

      {error ? <p className={styles.status}>{error}</p> : null}

      <section className={styles.workspace}>
        <div className={styles.side}>
          <Panel title="Context가 공급하는 목록 상태">
            <PostList
              posts={posts}
              selectedPostId={selectedPostId}
              onSelectPost={setSelectedPostId}
            />
          </Panel>
        </div>

        <div className={styles.side}>
          <Panel title="선택한 포스트 상세">
            <PostDetail post={selectedPost} />
          </Panel>

          <Panel
            title="Context value 핵심 구성"
            description="교재 6장에서 value 타입, Provider props, mountedRef 위치를 정리합니다."
          >
            <p className={styles.lead}>
              이 구간에서는 <code>createContext</code> 제네릭과{' '}
              <code>useRef</code> 제네릭이 아직 느슨하게 남아 있습니다. 교재를
              따라가며 Context value가 어떤 모양을 가져야 하는지 명확히 연결하면
              됩니다.
            </p>
          </Panel>
        </div>
      </section>
    </>
  );
}

export default function ContextPostsPage({
  initialPosts,
}: ContextPostsPageProps) {
  return (
    <PostProvider initialPosts={initialPosts}>
      <main className={styles.page}>
        <div className={styles.container}>
          <Panel
            title="Context 타입 시작본"
            description="학생이 Provider와 value 구조를 교재에 맞춰 완성하는 단계입니다."
          >
            <ContextPostsWorkspace />
          </Panel>
        </div>
      </main>
    </PostProvider>
  );
}
