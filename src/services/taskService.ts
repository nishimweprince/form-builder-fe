import { TaskTypes, CreateTaskPayload } from "../types/task.types";
import api from "./api";


//GET TASKS
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

//CREATE
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


// UPDATE
export const updateTask = async (id: string, data: Partial<CreateTaskPayload>): Promise<TaskTypes> => {
  const token = localStorage.getItem("token");
  const res = await api.patch(`/tasks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


//GET TASK BY ID
export const getTaskById = async (id: string): Promise<TaskTypes> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No auth token found");
  }

  const res = await api.get(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};