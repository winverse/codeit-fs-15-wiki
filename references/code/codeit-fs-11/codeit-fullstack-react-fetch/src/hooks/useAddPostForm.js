import { useState, useEffect, useRef } from 'react';

export const useAddPostForm = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (showAddForm && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [showAddForm, titleInputRef]);

  const resetForm = () => {
    setNewPostTitle('');
    setNewPostBody('');
    setShowAddForm(false);
  };

  return {
    showAddForm,
    setShowAddForm,
    newPostTitle,
    setNewPostTitle,
    newPostBody,
    setNewPostBody,
    titleInputRef,
    resetForm,
  };
};
