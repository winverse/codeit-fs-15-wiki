import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, signUp } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export default function useAuthMutations() {
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async (createdUser) => {
      queryClient.setQueryData(queryKeys.auth.me(), createdUser);
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (loggedInUser) => {
      queryClient.setQueryData(queryKeys.auth.me(), loggedInUser);
    },
    onError: async () => {
      // 로그인 실패 후에도 현재 세션을 다시 확인해 UI를 서버 상태와 동기화합니다.
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.me(), null);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });

  return { signUpMutation, loginMutation, logoutMutation };
}
