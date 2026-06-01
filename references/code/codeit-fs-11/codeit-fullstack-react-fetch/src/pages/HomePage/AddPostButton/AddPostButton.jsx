import { FiPlus, FiX } from 'react-icons/fi';
import styles from './AddPostButton.module.css';

export function AddPostButton({ handleVisibleForm, showAddForm }) {
  return (
    <button
      onClick={() => handleVisibleForm()}
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
  );
}
