// starter: 교재를 따라가며 any를 구체 타입으로 바꿉니다.

export interface Post {
  id: any;
  title: any;
  content: any;
  authorId: any;
}

export type PostMutationInput = any;

export type PostFormInitialData = any;

export interface PostPage {
  items: any;
  nextPage: any;
}

export interface AuthorOption {
  value: string;
  label: string;
}
