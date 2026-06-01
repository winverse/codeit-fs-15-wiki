import styles from './HomeLayout.module.css';
import { usePostContext } from '@/contexts/PostContext';
import { FiPlus, FiX } from 'react-icons/fi';
import { PostList } from '@/features/Home/PostList';
import { AddPostForm } from '@/features/Home/AddPostForm';
import { useAddPostForm } from '@/hooks/useAddPostForm';

export function HomeLayout() {
  const { handleAddPost, totalTitleLength } = usePostContext();

  const {
    showAddForm,
    setShowAddForm,
    newPostTitle,
    setNewPostTitle,
    newPostBody,
    setNewPostBody,
    titleInputRef,
    resetForm,
  } = useAddPostForm();

  // AddPostForm에 넘겨줄 formState / formActions 구성
  const formState = {
    title: newPostTitle,
    body: newPostBody,
  };

  const formActions = {
    setTitle: setNewPostTitle,
    setBody: setNewPostBody,
    reset: resetForm,
  };

  const handleSubmitAddPost = async (e) => {
    e.preventDefault();
    handleAddPost({
      title: formState.title,
      body: formState.body,
    });
    formActions.reset();
  };

  return (
    <div className={styles.HomePage}>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className={styles.toggleFormButton}
      >
        {showAddForm ? (
          <>
            <FiX /> 폼 닫기
          </>
        ) : (
          <>
            <FiPlus /> 새 게시물 추가
          </>
        )}
      </button>

      <h1>게시물 목록</h1>

      <AddPostForm
        isFormOpen={showAddForm}
        setFormOpen={setShowAddForm}
        formState={formState}
        formActions={formActions}
        onSubmit={handleSubmitAddPost}
        titleInputRef={titleInputRef}
      />

      <p className={styles.totalLengthText}>
        총 게시물 제목 길이 (useMemo): {totalTitleLength()}
      </p>

      <PostList />
    </div>
  );
}
