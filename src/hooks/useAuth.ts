import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "../types/user.types"; // adjust the path if needed

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = Date.now() / 1000 > payload.exp;
    return !isExpired;
  } catch (error) {
    return false;
  }
};

export const useAuth = (): { user: UserTypes | null } => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isTokenValid(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  return { user };
};
