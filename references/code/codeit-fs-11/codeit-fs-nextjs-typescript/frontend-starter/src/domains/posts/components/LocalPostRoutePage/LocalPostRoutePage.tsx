'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Panel from '@/components/Panel';
import PostDetail from '@/domains/posts/components/PostDetail';
import useLocalPostDetailPage from '@/domains/posts/hooks/useLocalPostDetailPage';
import * as styles from './LocalPostRoutePage.css';

export default function LocalPostRoutePage() {
  const params = useParams<any>();
  const postId = typeof params.postId === 'string' ? params.postId : null;
  const { post, isLoading, error } = useLocalPostDetailPage(postId);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Panel
          title="useParams 시작본"
          description="교재를 따라가며 useParams 제네릭을 문자열 기준으로 좁히는 구간입니다."
        >
          <p className={styles.lead}>
            현재 페이지는 의도적으로 <code>useParams</code>를 느슨한 상태로
            두었습니다. 교재를 따라가며 <code>postId</code>를 문자열로 고정하고,
            상세 조회 Hook과 함께 타입 경계를 다시 맞추면 됩니다.
          </p>
          <p>
            <Link href="/posts">게시글 실습 페이지로 돌아가기</Link>
          </p>
          {isLoading ? <p>포스트를 불러오는 중입니다.</p> : null}
          {error ? <p className={styles.status}>{error}</p> : null}
        </Panel>

        <Panel title="PostDetail 라우트 결과">
          <PostDetail post={post} />
        </Panel>
      </div>
    </main>
  );
}
