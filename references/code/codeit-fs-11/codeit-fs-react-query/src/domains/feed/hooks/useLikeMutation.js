import { useMutation } from '@tanstack/react-query';
import { USER_ACTION } from '@/lib/constants';
import { likePost, unlikePost } from '@/lib/api';

export function useLikeMutation() {
  /*
    TODO(3-03): Optimistic Updates를 추가합니다.
    - onMutate에서 cancelQueries, getQueryData, setQueryData를 작성합니다.
    - onError에서 롤백 로직을 작성합니다.
    - onSettled에서 invalidateQueries를 작성합니다.
    */
  return useMutation({
    onMutate: async ({ postId, username, userAction }) => {},
    mutationFn: async ({ postId, username, userAction }) => {
      const likeActionFn =
        userAction === USER_ACTION.LIKE_POST ? likePost : unlikePost;
      await likeActionFn(postId, username);
    },
    onError: (
      error,
      { postId, username },
      onMutateResult, // onMutate에서 반환한 context(이전 스냅샷 값)입니다.
    ) => {},
    onSettled: (data, error, { postId, username }) => {},
  });
}
