import { request } from "./request.js";

export function signUp(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: payload,
  });
}

export function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function logout() {
  return request("/auth/logout", {
    method: "POST",
  });
}

export async function getMe() {
  try {
    return await request("/auth/me");
  } catch (error) {
    if (error?.status === 401) {
      return null;
    }

    throw error;
  }
}
