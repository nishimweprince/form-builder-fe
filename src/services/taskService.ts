import { TaskTypes } from "../types/task.types";
import api from "./api";

export const getTasks = async (): Promise<TaskTypes[]> => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.rows; 
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    throw error;
  }
};
