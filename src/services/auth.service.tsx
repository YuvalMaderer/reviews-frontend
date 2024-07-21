import api from "./api.service";

export function login(username: string, password: string) {
  return api.post("/auth/login", { username, password });
}

export function register(username: string, email: string, password: string) {
  return api.post("/auth/register", { username, email, password });
}
