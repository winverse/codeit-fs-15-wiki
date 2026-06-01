import React from 'react';
import styles from './AddPostForm.module.css';
import { FiPlus, FiX } from 'react-icons/fi';

export function AddPostForm({
  showAddForm,
  setShowAddForm,
  newPostTitle,
  setNewPostTitle,
  newPostBody,
  setNewPostBody,
  titleInputRef,
  handleAddPost,
}) {
  if (!showAddForm) {
    return null;
  }

  return (
    <form onSubmit={handleAddPost} className={styles.addPostForm}>
      <h2>새 게시물 추가</h2>
      <input
        type="text"
        placeholder="제목"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        ref={titleInputRef}
        required
      />
      <textarea
        placeholder="내용"
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
        required
      ></textarea>
      <div className={styles.formActions}>
        <button type="submit">
          <FiPlus /> 추가
        </button>
        <button type="button" onClick={() => setShowAddForm(false)}>
          <FiX /> 취소
        </button>
      </div>
    </form>
  );
}
