// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() / 1000 < payload.exp;
  } catch {
    return false;
  }
};

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return isTokenValid(token) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
