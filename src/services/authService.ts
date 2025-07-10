// src/services/authService.ts
import api from "./api";
import {User} from "../types/user.type"

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

export const getUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache', // <-- optional for forcing refresh
      },
    });

    // ✅ Place this line here, immediately after getting the response
    const users = res.data?.data?.rows;

    console.log("Users loaded:", users); // <-- Add this to debug

    if (Array.isArray(users)) return users;

    console.error("Unexpected response structure:", res.data);
    return [];

  } catch (error) {
    console.error("Failed to fetch users", error);
    return [];
  }
};





