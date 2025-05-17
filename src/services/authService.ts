// src/services/authService.ts
import api from "./api";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const res = await api.post("/auth/signup", { name, email, password });
    console.log("REGISTER response:", res.data.user);
    return res.data; 
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};


export const loginUser = async (email: string, password: string) => {
  console.log("[DEBUG] Calling loginUser with:", { email, password });
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("[DEBUG] Login success:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("[DEBUG] Login failed:", error.response?.data || error.message);
    throw error;
  }
};



