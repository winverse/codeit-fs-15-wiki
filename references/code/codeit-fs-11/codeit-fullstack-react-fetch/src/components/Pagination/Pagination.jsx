import React from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.css';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={clsx(
            styles.pageButton,
            currentPage === pageNumber && styles.active,
          )}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
