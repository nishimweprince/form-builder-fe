// src/services/authService.ts
import api from "./api";

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await api.post("/auth/signup", { name, email, password });
  return res.data; // expects: { token, user }
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // expects: { token, user }
};
