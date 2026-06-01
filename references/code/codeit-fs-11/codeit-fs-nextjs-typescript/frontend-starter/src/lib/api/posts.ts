import { LOCAL_POSTS_PAGE_LIMIT } from '@/domains/posts/utils/constants';
import { request } from '@/lib/api/request';

export async function getPosts() {
  return request<any>('/posts', {
    message: '포스트 목록을 불러오지 못했습니다.',
  });
}

export async function getPost(postId: string) {
  return request<any>(`/posts/${postId}`, {
    message: '포스트 상세 정보를 불러오지 못했습니다.',
  });
}

export async function createPost(input: any) {
  return request<any>('/posts', {
    method: 'POST',
    body: JSON.stringify(input),
    message: '포스트를 등록하지 못했습니다.',
  });
}

export async function updatePost(postId: string, input: any) {
  return request<any>(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ id: postId, ...input }),
    message: '포스트를 수정하지 못했습니다.',
  });
}

export async function deletePost(postId: string) {
  return request<any>(`/posts/${postId}`, {
    method: 'DELETE',
    message: '포스트를 삭제하지 못했습니다.',
  });
}

export async function getPostPage(
  page: number,
  limit = LOCAL_POSTS_PAGE_LIMIT,
): Promise<any> {
  const safePage = Math.max(page, 1);
  const paginatedPosts = await request<any>(
    `/posts?page=${safePage}&limit=${limit}`,
    {
      message: '포스트 페이지를 불러오지 못했습니다.',
    },
  );

  return {
    items: paginatedPosts.data,
    nextPage: paginatedPosts.next,
  };
}
