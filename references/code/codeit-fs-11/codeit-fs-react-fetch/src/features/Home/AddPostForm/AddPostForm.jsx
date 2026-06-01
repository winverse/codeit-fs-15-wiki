import React from 'react';
import styles from './AddPostForm.module.css';
import { FiPlus, FiX } from 'react-icons/fi';

export function AddPostForm({
  isFormOpen,
  setFormOpen,
  formState,
  formActions,
  onSubmit,
  titleInputRef,
}) {
  if (!isFormOpen) {
    return null;
  }

  const { title, body } = formState;
  const { setTitle, setBody } = formActions;

  return (
    <form onSubmit={onSubmit} className={styles.addPostForm}>
      <h2>새 게시물 추가</h2>

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleInputRef}
        required
      />

      <textarea
        placeholder="내용"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required={true}
      />

      <div className={styles.formActions}>
        <button type="submit">
          <FiPlus /> 추가
        </button>
        <button type="button" onClick={() => setFormOpen(false)}>
          <FiX /> 취소
        </button>
      </div>
    </form>
  );
}
