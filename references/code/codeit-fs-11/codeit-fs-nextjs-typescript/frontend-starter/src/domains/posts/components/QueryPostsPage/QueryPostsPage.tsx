'use client';

import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '@/components/Button';
import Panel from '@/components/Panel';
import PostCard from '@/domains/posts/components/PostCard';
import PostDetail from '@/domains/posts/components/PostDetail';
import PostForm from '@/domains/posts/components/PostForm';
import { useInfinitePostsQuery } from '@/domains/posts/hooks/useInfinitePostsQuery';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from '@/domains/posts/hooks/usePostMutations';
import {
  usePostQuery,
  usePostsQuery,
} from '@/domains/posts/hooks/usePostQueries';
import * as styles from './QueryPostsPage.css';

interface QueryPostsPageProps {
  initialPosts: any;
}

export default function QueryPostsPage({ initialPosts }: QueryPostsPageProps) {
  const [selectedPostId, setSelectedPostId] = useState<any>(
    initialPosts[0]?.id ?? null,
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const postsQuery = usePostsQuery(initialPosts);
  const selectedPostQuery = usePostQuery(selectedPostId);
  const infinitePostsQuery = useInfinitePostsQuery();
  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation();
  const deletePostMutation = useDeletePostMutation();

  const selectedPost = selectedPostQuery.data ?? null;
  const posts = postsQuery.data ?? [];
  const infinitePosts = useMemo(
    () =>
      infinitePostsQuery.data?.pages.flatMap((page: any) => page.items) ?? [],
    [infinitePostsQuery.data],
  );

  async function handleCreatePost(input: any) {
    await createPostMutation.mutateAsync(input);
    toast.success('포스트를 등록했습니다.');
  }

  async function handleUpdatePost(input: any) {
    if (!selectedPostId) {
      return;
    }

    await updatePostMutation.mutateAsync({
      postId: selectedPostId,
      input,
    });
    setIsEditMode(false);
    toast.success('포스트를 수정했습니다.');
  }

  async function handleDeletePost() {
    if (!selectedPostId) {
      return;
    }

    await deletePostMutation.mutateAsync(selectedPostId);
    setSelectedPostId(null);
    setIsEditMode(false);
    toast.success('포스트를 삭제했습니다.');
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Panel
          title="TanStack Query 시작본"
          description="교재 7장에서 조회/변경 Hook 제네릭과 응답 타입을 채워 넣는 구간입니다."
        >
          <p className={styles.lead}>
            이 시작본은 useQuery, useMutation, useInfiniteQuery가 모두 동작은
            하지만 데이터 타입이 느슨하게 남아 있는 상태입니다. 교재를 따라가며
            요청 함수, 오류 타입, 무한 조회 페이지 결과를 차례대로 고정하면
            됩니다.
          </p>
        </Panel>

        <section className={styles.grid}>
          <div className={styles.side}>
            <Panel
              title="useQuery: 포스트 목록"
              description="목록 조회 결과 타입과 initialData 타입을 정리합니다."
            >
              {postsQuery.isLoading ? (
                <p>포스트 목록을 불러오는 중입니다.</p>
              ) : null}
              {postsQuery.error ? (
                <p className={styles.status}>{postsQuery.error.message}</p>
              ) : null}
              <PostListFallback
                posts={posts}
                selectedPostId={selectedPostId}
                onSelectPost={setSelectedPostId}
              />
            </Panel>

            <Panel
              title="useMutation: 새 포스트 등록"
              description="mutation 입력 타입과 반환 타입을 분리하는 구간입니다."
            >
              <PostForm
                onSubmit={handleCreatePost}
                isLoading={createPostMutation.isPending}
                submitLabel="서버에 포스트 등록"
              />
            </Panel>
          </div>

          <div className={styles.side}>
            <Panel
              title="선택한 포스트 상세(useQuery)"
              description="선택 ID와 상세 조회 결과 타입을 함께 정리합니다."
            >
              {selectedPostQuery.isLoading ? (
                <p>상세 포스트를 불러오는 중입니다.</p>
              ) : null}
              {selectedPostQuery.error ? (
                <p className={styles.status}>
                  {selectedPostQuery.error.message}
                </p>
              ) : null}
              <PostDetail post={selectedPost} />
              <div className={styles.actions}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditMode((previous) => !previous)}
                  disabled={!selectedPost}
                >
                  {isEditMode ? '수정 폼 닫기' : '선택 포스트 수정'}
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleDeletePost}
                  disabled={!selectedPost || deletePostMutation.isPending}
                >
                  {deletePostMutation.isPending
                    ? '삭제 중'
                    : '선택 포스트 삭제'}
                </Button>
              </div>
            </Panel>

            {isEditMode && selectedPost ? (
              <Panel
                title="useMutation: 포스트 수정"
                description="mutate 인자 객체와 수정 입력 타입을 채워 넣습니다."
              >
                <PostForm
                  key={selectedPost.id}
                  initialData={selectedPost}
                  onSubmit={handleUpdatePost}
                  isLoading={updatePostMutation.isPending}
                  submitLabel="선택 포스트 수정"
                />
              </Panel>
            ) : null}

            <Panel
              title="useInfiniteQuery: 더 보기 목록"
              description="pages 구조와 nextPage 계산 타입을 정리합니다."
            >
              <div className={styles.infiniteList}>
                {infinitePosts.map((post: any) => (
                  <PostCard key={`infinite-${post.id}`} post={post} />
                ))}
              </div>
              {infinitePostsQuery.error ? (
                <p className={styles.status}>
                  {infinitePostsQuery.error.message}
                </p>
              ) : null}
              {infinitePostsQuery.hasNextPage ? (
                <Button
                  type="button"
                  onClick={() => infinitePostsQuery.fetchNextPage()}
                  disabled={infinitePostsQuery.isFetchingNextPage}
                >
                  {infinitePostsQuery.isFetchingNextPage
                    ? '추가 로딩 중'
                    : '더 보기'}
                </Button>
              ) : (
                <p>더 이상 불러올 포스트가 없습니다.</p>
              )}
            </Panel>
          </div>
        </section>
      </div>
    </main>
  );
}

interface PostListFallbackProps {
  posts: any;
  selectedPostId: any;
  onSelectPost: any;
}

function PostListFallback({
  posts,
  selectedPostId,
  onSelectPost,
}: PostListFallbackProps) {
  if (posts.length === 0) {
    return <p>표시할 포스트가 없습니다.</p>;
  }

  return (
    <div className={styles.infiniteList}>
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
