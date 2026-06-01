import React, { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';
import styles from './PostCard.module.css';
import { usePosts } from '@/contexts/PostContext';

export function PostCard({ post }) {
  const { handleDelete, handleUpdate } = usePosts();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleUpdate(post.id, editedTitle, editedBody); // Use handleUpdate from context
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(post.title); // Reset to original
    setEditedBody(post.body); // Reset to original
  };

  const handleDeleteClick = () => {
    handleDelete(post.id); // Use handleDelete from context
  };

  return (
    <li className={clsx(styles.postCard, { [styles.editing]: isEditing })}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          ></textarea>
          <div className={styles.formActions}>
            <button
              onClick={handleSaveClick}
              className={clsx(styles.button, styles.saveButton)}
            >
              저장
            </button>
            <button
              onClick={handleCancelClick}
              className={clsx(styles.button, styles.cancelButton)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <div className={styles.actions}>
            <button
              onClick={handleEditClick}
              className={clsx(styles.button, styles.editButton)}
              aria-label="수정"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={handleDeleteClick}
              className={clsx(styles.button, styles.deleteButton)}
              aria-label="삭제"
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
