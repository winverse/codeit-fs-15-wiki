import { AUTH_MODE } from "@/domains/auth/utils/constants";

const LOGIN_REACT_QUERY_CODE = `const meQuery = useQuery({
  queryKey: queryKeys.auth.me(),
  queryFn: getMe,
  retry: false,
  refetchOnWindowFocus: false,
});

const loginMutation = useMutation({
  mutationFn: login,
  onSuccess: (loggedInUser) => {
    queryClient.setQueryData(queryKeys.auth.me(), loggedInUser);
  },
  onError: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.auth.me(),
    });
  },
});

const logoutMutation = useMutation({
  mutationFn: logout,
  onSuccess: () => {
    queryClient.setQueryData(queryKeys.auth.me(), null);
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.auth.me(),
    });
  },
});`;

const SIGN_UP_REACT_QUERY_CODE = `const usersQuery = useQuery({
  queryKey: queryKeys.users.list(),
  queryFn: getUsers,
});

const signUpMutation = useMutation({
  mutationFn: signUp,
  onSuccess: async (createdUser) => {
    queryClient.setQueryData(queryKeys.auth.me(), createdUser);
    await queryClient.invalidateQueries({
      queryKey: queryKeys.users.list(),
    });
  },
});`;

const REACT_QUERY_CODE_BY_MODE = {
  [AUTH_MODE.LOGIN]: LOGIN_REACT_QUERY_CODE,
  [AUTH_MODE.SIGN_UP]: SIGN_UP_REACT_QUERY_CODE,
};

export function getReactQueryCode(mode) {
  return (
    REACT_QUERY_CODE_BY_MODE[mode] ??
    SIGN_UP_REACT_QUERY_CODE
  );
}
