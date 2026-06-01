const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (page, limit) => {
  const response = await fetch(
    `${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
  const data = await response.json();
  const totalCount = response.headers.get('X-Total-Count');
  return { data, totalCount: parseInt(totalCount, 10) };
};

export const createPost = async (postData) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error('게시물 추가에 실패했습니다.');
  }
  return response.json();
};

export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error('게시물 업데이트에 실패했습니다.');
  }
  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('게시물 삭제에 실패했습니다.');
  }
  return { success: true };
};
