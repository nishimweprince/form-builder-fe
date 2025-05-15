import { TaskTypes, CreateTaskPayload } from "../types/task.types";
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


export const createTask = async (taskData: CreateTaskPayload): Promise<TaskTypes> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No auth token found");
  }
  
  try {
  

     const res = await api.post("/tasks", taskData, {
      headers:{
        Authorization: `Bearer ${token}`,
      }
     })
     return res.data
    
  } catch (error) {
    console.error("failed to create task", error);
    throw error;
    
  }
  
}
