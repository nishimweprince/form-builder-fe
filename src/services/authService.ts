// src/services/authService.ts
import api from "./api";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const res = await api.post("/auth/signup", { name, email, password });
    return res.data; 
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};


export const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("Login response:", res.data); // ✅ Debug response
    return res.data.token; // ✅ Only return the token
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

