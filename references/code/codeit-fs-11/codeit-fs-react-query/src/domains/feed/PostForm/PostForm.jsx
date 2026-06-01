'use client';

import { useLoginContext } from '@/contexts/LoginContext.jsx';
import TextInputForm from '@/domains/feed/TextInputForm';
import * as styles from './PostForm.css.js';

/*
TODO(2-03): PostForm을 완성합니다.
- 현재 사용자 정보 쿼리로 가져오기
- onSubmit에 전달할 newPost 생성
*/

function PostForm({ onSubmit, buttonDisabled }) {
  const { currentUsername } = useLoginContext();
  void onSubmit;

  const handleSubmit = (content) => {
    void content;
  };

  return (
    <div className={styles.textInputForm}>
      <TextInputForm
        onSubmit={handleSubmit}
        currentUserInfo={null}
        placeholder="오늘의 공부 기록을 남겨보세요."
        buttonText="업로드"
        buttonDisabled={buttonDisabled}
      />
    </div>
  );
}

export default PostForm;
