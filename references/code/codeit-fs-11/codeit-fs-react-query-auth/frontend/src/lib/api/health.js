import { request } from "./request.js";

export function checkBackendHealth() {
  return request("/");
}
