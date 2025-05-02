// src/services/authService.ts
import api from "./api";

export const registerUser = async (username: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data; // expects: { token, user }
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // expects: { token, user }
};
