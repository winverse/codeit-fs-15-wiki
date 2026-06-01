import { useState } from 'react';

export const usePagination = (initialPage = 1, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState([]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber) => {
    // 유효하지 않은 페이지 번호인 경우 즉시 종료
    if (pageNumber <= 0 || pageNumber > totalPages) {
      return;
    }
    // 유효한 경우에만 상태 업데이트
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
    items,
    setTotalItems,
    setItems,
    goToPage,
    next,
    prev,
    setCurrentPage,
  };
};
