import type { AuthorOption, Post } from '@/domains/posts/types';

export const AUTHOR_OPTIONS: AuthorOption[] = [
  { value: 'author-1', label: '1번 강사' },
  { value: 'author-2', label: '2번 조교' },
  { value: 'author-3', label: '3번 멘토' },
  { value: 'author-4', label: '4번 리뷰어' },
];

export const LOCAL_POSTS_PAGE_LIMIT = 4;

export const DEFAULT_POST_FORM_VALUES = {
  title: '',
  content: '',
  authorId: 'author-1',
};

export const LOCAL_PRACTICE_STEPS = [
  '3장에서 Post 타입과 PostCard/PostDetail/PostForm props의 any를 정리합니다.',
  '4장에서 이벤트 핸들러 매개변수의 any를 구체 타입으로 바꿉니다.',
  '5장에서 useState, useRef, useParams 관련 any와 제네릭을 채웁니다.',
  '6장~8장에서 Context, TanStack Query, react-hook-form 구간의 any를 제거합니다.',
];

export const CHAPTER_LINKS = [
  {
    href: '/posts',
    eyebrow: '3~5장',
    title: 'Props, 이벤트, 기본 Hook 타입 적용',
    description:
      '학생용 시작본에서 props, 이벤트, useState/useRef/useParams 자리에 남은 any를 교재 순서대로 채웁니다.',
  },
  {
    href: '/context',
    eyebrow: '6장',
    title: 'Context 타입 적용',
    description:
      'PostContext의 value, Provider props, mountedRef 관련 any를 정리합니다.',
  },
  {
    href: '/query',
    eyebrow: '7장',
    title: 'TanStack Query 타입 적용',
    description:
      'useQuery, useMutation, useInfiniteQuery의 데이터 타입과 입력 타입을 채웁니다.',
  },
  {
    href: '/form',
    eyebrow: '8장',
    title: 'react-hook-form 보너스 챕터',
    description:
      'useForm 제네릭, submit 값, error 구조에 남은 any를 정리합니다.',
  },
] as const;

export function getAuthorLabel(authorId: string) {
  return (
    AUTHOR_OPTIONS.find((option) => option.value === authorId)?.label ??
    `작성자 ${authorId}`
  );
}

export function findPostById(posts: Post[], postId: string) {
  return posts.find((post) => post.id === postId) ?? null;
}
