import { useState } from 'react';

export const usePagination = (initialPage = 1, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber < 0) return;
    if (pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const next = () => {
    goToPage(currentPage + 1);
  };

  const prev = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setTotalItems,
    goToPage,
    next,
    prev,
    setCurrentPage,
  };
};
