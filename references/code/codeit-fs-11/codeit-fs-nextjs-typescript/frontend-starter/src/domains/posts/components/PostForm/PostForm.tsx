'use client';

import { useRef, useState } from 'react';
import Button from '@/components/Button';
import SelectField from '@/components/SelectField';
import TextField from '@/components/TextField';
import {
  AUTHOR_OPTIONS,
  DEFAULT_POST_FORM_VALUES,
} from '@/domains/posts/utils/constants';
import * as styles from './PostForm.css';

interface PostFormProps {
  onSubmit: any;
  initialData?: any;
  isLoading?: any;
  submitLabel?: any;
}

export default function PostForm({
  onSubmit,
  initialData = DEFAULT_POST_FORM_VALUES,
  isLoading = false,
  submitLabel = '포스트 저장',
}: PostFormProps) {
  const [formData, setFormData] = useState<any>({
    title: initialData.title ?? DEFAULT_POST_FORM_VALUES.title,
    content: initialData.content ?? DEFAULT_POST_FORM_VALUES.content,
    authorId: initialData.authorId ?? DEFAULT_POST_FORM_VALUES.authorId,
  });
  const [error, setError] = useState<any>(null);
  const titleInputRef = useRef<any>(null);

  function handleTitleChange(event: any) {
    setFormData((previousState: any) => ({
      ...previousState,
      title: event.currentTarget.value,
    }));
  }

  function handleContentChange(event: any) {
    setFormData((previousState: any) => ({
      ...previousState,
      content: event.currentTarget.value,
    }));
  }

  function handleAuthorChange(event: any) {
    setFormData((previousState: any) => ({
      ...previousState,
      authorId: event.currentTarget.value,
    }));
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('제목과 내용을 모두 입력해야 합니다.');
      titleInputRef.current?.focus();
      return;
    }

    setError(null);
    await onSubmit({
      title: formData.title.trim(),
      content: formData.content.trim(),
      authorId: formData.authorId,
    });
  }

  function handleReset() {
    setError(null);
    setFormData({
      title: initialData.title ?? DEFAULT_POST_FORM_VALUES.title,
      content: initialData.content ?? DEFAULT_POST_FORM_VALUES.content,
      authorId: initialData.authorId ?? DEFAULT_POST_FORM_VALUES.authorId,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        ref={titleInputRef}
        label="제목"
        name="title"
        value={formData.title}
        onChange={handleTitleChange}
        placeholder="포스트 제목을 입력합니다"
      />

      <label className={styles.textareaField}>
        <span className={styles.label}>내용</span>
        <textarea
          className={styles.textarea}
          name="content"
          value={formData.content}
          onChange={handleContentChange}
          placeholder="포스트 본문을 입력합니다"
        />
      </label>

      <SelectField
        label="작성자"
        name="authorId"
        value={formData.authorId}
        onChange={handleAuthorChange}
        options={AUTHOR_OPTIONS}
      />

      {error ? <p className={styles.message}>{error}</p> : null}

      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '저장 중' : submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          폼 초기화
        </Button>
      </div>
    </form>
  );
}
