/*
TODO(2-04): 무한 목록 쿼리로 구현합니다.
- React Query 무한 쿼리 훅으로 변경
- 결과 구조는 { data, fetchNextPage, hasNextPage, isFetchingNextPage }
*/

function usePostListQuery({ variant, currentUsername }) {
  void variant;
  void currentUsername;

  return {
    data: { pages: [] },
    fetchNextPage: () => {},
    hasNextPage: false,
    isFetchingNextPage: false,
  };
}

export default usePostListQuery;
