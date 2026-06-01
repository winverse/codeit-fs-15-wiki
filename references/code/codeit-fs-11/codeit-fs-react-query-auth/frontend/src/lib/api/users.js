import { request } from "./request.js";

export async function getUsers() {
  const result = await request("/users");
  return Array.isArray(result) ? result : [];
}
