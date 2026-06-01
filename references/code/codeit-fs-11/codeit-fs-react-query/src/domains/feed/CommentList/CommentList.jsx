'use client';

import Comment from '@/domains/feed/Comment';
import CommentForm from '@/domains/feed/CommentForm';
import * as styles from './CommentList.css.js';

/*
TODO(2-10): 댓글 목록 쿼리와 페이지네이션을 구현합니다.
- 댓글 목록 조회 쿼리
- 페이지 전환 및 prefetch 처리

TODO(3-01): 댓글 추가 뮤테이션을 연결합니다.
- addComment mutationFn과 mutate 호출

TODO(3-02): 댓글 추가 성공 후 쿼리를 무효화합니다.
- comments / commentCount 쿼리 무효화
*/

function CommentList({ currentUserInfo, postId }) {
  void postId;

  const comments = [];

  // TODO(3-01): 댓글 추가 뮤테이션을 연결합니다.
  const handleAddComment = (newComment) => {
    void newComment;
  };

  return (
    <div className={styles.commentList}>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <CommentForm
        currentUserInfo={currentUserInfo}
        onSubmit={handleAddComment}
        buttonDisabled={!currentUserInfo}
      />
    </div>
  );
}

export default CommentList;
