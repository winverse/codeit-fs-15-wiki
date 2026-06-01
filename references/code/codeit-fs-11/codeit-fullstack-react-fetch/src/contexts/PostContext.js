import { createContext, useContext } from 'react';

export const PostContext = createContext({
  posts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalTitleLength: 0,
  goToPage: () => console.warn('goToPage not implemented'),
  handleAddPost: () => console.warn('handleAddPost not implemented'),
  handleDelete: () => console.warn('handleDelete not implemented'),
  handleUpdate: () => console.warn('handleUpdate not implemented'),
});

export const usePosts = () => {
  return useContext(PostContext);
};
