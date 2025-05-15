// src/hooks/useAuth.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isTokenValid(token)) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);
};
