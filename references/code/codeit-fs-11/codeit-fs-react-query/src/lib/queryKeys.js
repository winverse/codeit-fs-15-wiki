/*
TODO(2-02): 쿼리 키 팩토리를 완성합니다.
- posts, user 영역의 키를 교재에 맞게 구성
*/

export const queryKeys = {
  posts: {
    all: () => ['posts'],
  },
  user: {
    info: (username) => ['user', username],
  },
};
