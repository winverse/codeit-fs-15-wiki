export const queryKeys = {
  backend: {
    health: () => ["backend", "health"],
  },
  auth: {
    me: () => ["auth", "me"],
  },
  users: {
    all: () => ["users"],
    list: () => [...queryKeys.users.all(), "list"],
  },
};
