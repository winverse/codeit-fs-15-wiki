import styles from './HomeLayout.module.css';
import { PostList } from '@/pages/HomePage/PostList';
import { AddPostForm } from '@/pages/HomePage/AddPostForm';
import { usePosts } from '@/contexts/PostContext';
import { useAddPostForm } from '@/hooks/useAddPostForm';
import { FiPlus, FiX } from 'react-icons/fi';
import { Pagination } from '@/components/Pagination';
import { AddPostButton } from '@/pages/HomePage/AddPostButton';

export function HomeLayout() {
  const {
    handleAddPost,
    totalTitleLength,
    currentPage,
    totalPages,
    goToPage,
    isLoading,
  } = usePosts();

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

  const handleSubmitAddPost = async (e) => {
    e.preventDefault();
    handleAddPost({ title: newPostTitle, body: newPostBody });
    resetForm();
  };

  const handleVisibleForm = () => {
    setShowAddForm(!showAddForm);
    setNewPostBody('');
    setNewPostTitle('');
  };

  return (
    <div className={styles.HomePage}>
      <AddPostButton
        handleVisibleForm={handleVisibleForm}
        showAddForm={showAddForm}
      />
      <h1>게시물 목록</h1>
      <AddPostForm
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        newPostTitle={newPostTitle}
        setNewPostTitle={setNewPostTitle}
        newPostBody={newPostBody}
        setNewPostBody={setNewPostBody}
        titleInputRef={titleInputRef}
        handleAddPost={handleSubmitAddPost}
      />
      <p className={styles.totalLengthText}>
        총 게시물 제목 길이 (useMemo): {totalTitleLength}
      </p>
      <PostList />
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
