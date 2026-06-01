'use client';

import PostForm from '@/domains/feed/PostForm';
import { useLoginContext } from '@/contexts/LoginContext';

/*
TODO(3-01): 업로드 로직을 뮤테이션으로 구현합니다.
- uploadPost 호출
- mutate 연결 및 isPending으로 버튼 제어

TODO(3-02): 업로드 성공 후 목록 쿼리를 무효화합니다.
- queryKeys.posts.all / queryKeys.posts.byUser 무효화
*/

function PostUploader() {
  const { currentUsername } = useLoginContext();

  const handleUploadPost = (newPost) => {
    void newPost;
  };

  if (!currentUsername) return null;

  return <PostForm onSubmit={handleUploadPost} buttonDisabled={false} />;
}

export default PostUploader;
