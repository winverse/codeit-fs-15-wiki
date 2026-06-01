'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Card from '@/components/Card';
import QueryBoundary from '@/components/QueryBoundary';
import Loading from '@/components/Loading';
import ContentInfo from '@/domains/feed/ContentInfo';
import Button from '@/components/Button';
import CommentList from '@/domains/feed/CommentList';
import { USER_ACTION } from '@/lib/constants';
import { queryKeys } from '@/lib/queryKeys';
import {
  getCommentCountByPostId,
  getUserInfo,
  getLikeStatusByUsername,
  getLikeCountByPostId,
} from '@/lib/api';
import { useLoginContext } from '@/contexts/LoginContext';
import * as styles from './Post.css.js';
import { useLikeMutation } from '../hooks/useLikeMutation';

const yellowHeartImage = '/assets/yellow-heart.png';
const greyHeartImage = '/assets/grey-heart.png';

function Post({ post }) {
  const { currentUsername } = useLoginContext();

  if (currentUsername) {
    return <PostWithUser post={post} currentUsername={currentUsername} />;
  }

  return <PostWithoutUser post={post} />;
}

function PostWithUser({ post, currentUsername }) {
  const { data: currentUserInfo } = useSuspenseQuery({
    queryKey: queryKeys.user.info(currentUsername),
    queryFn: () => getUserInfo(currentUsername),
  });

  const { data: isPostLikedByCurrentUser } = useSuspenseQuery({
    queryKey: queryKeys.posts.likeStatus(post.id, currentUsername),
    queryFn: () => getLikeStatusByUsername(post.id, currentUsername),
  });

  return (
    <PostContent
      post={post}
      currentUsername={currentUsername}
      currentUserInfo={currentUserInfo}
      isPostLikedByCurrentUser={isPostLikedByCurrentUser}
    />
  );
}

function PostWithoutUser({ post }) {
  return <PostContent post={post} />;
}

function PostContent({
  post,
  currentUsername,
  currentUserInfo,
  isPostLikedByCurrentUser = false,
}) {
  const router = useRouter();
  const [showCommentList, setShowCommentList] = useState(false);

  const { data: commentCount, refetch: refetchCommentCount } = useSuspenseQuery(
    {
      queryKey: queryKeys.posts.commentCount(post.id),
      queryFn: () => getCommentCountByPostId(post.id),
    },
  );

  const { data: likeCount } = useSuspenseQuery({
    queryKey: queryKeys.posts.likeCount(post.id),
    queryFn: () => getLikeCountByPostId(post.id),
  });

  const likeMutation = useLikeMutation();

  const handleCommentButtonClick = () => {
    if (!currentUsername) {
      router.push('/not-logged-in');
      return;
    }
    setShowCommentList(
      (previousIsCommentListOpen) => !previousIsCommentListOpen,
    );
    refetchCommentCount();
  };

  const handleLikeButtonClick = (userAction) => {
    if (!currentUsername) {
      toast('로그인이 필요합니다.');
      router.push('/not-logged-in');
      return;
    }
    likeMutation.mutate({
      postId: post.id,
      username: currentUsername,
      userAction,
    });
  };

  return (
    <Card className={styles.post}>
      <div className={styles.content}>
        <ContentInfo user={post.user} updatedTime={post.updatedAt} />
        <p className={styles.description}>{post.content}</p>
        <div className={styles.engagement}>
          <Button
            className={clsx(styles.engagementButton, styles.likeButton)}
            onClick={() => {
              handleLikeButtonClick(
                isPostLikedByCurrentUser
                  ? USER_ACTION.UNLIKE_POST
                  : USER_ACTION.LIKE_POST,
              );
            }}
          >
            <Image
              className={styles.like}
              src={isPostLikedByCurrentUser ? yellowHeartImage : greyHeartImage}
              alt="좋아요"
              width={12}
              height={12}
            />
            {`좋아요 ${likeCount ?? 0}개`}
          </Button>
          <Button
            className={styles.engagementButton}
            onClick={() => {
              handleCommentButtonClick(post.id);
            }}
          >
            {`댓글 ${commentCount ?? 0}개`}
          </Button>
        </div>
        {showCommentList ? (
          <QueryBoundary
            pendingFallback={
              <Loading description="댓글을 불러오는 중입니다..." />
            }
            errorTitle="댓글을 불러오지 못했습니다."
            errorDescription="잠시 후 다시 시도해 주세요."
          >
            <CommentList currentUserInfo={currentUserInfo} postId={post.id} />
          </QueryBoundary>
        ) : (
          ''
        )}
      </div>
    </Card>
  );
}

export default Post;
