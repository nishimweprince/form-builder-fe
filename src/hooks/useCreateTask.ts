import { CreateTaskPayload, TaskTypes } from "../types/task.types";
import {createTask} from "../services/taskService"
import { useState } from "react";

export const useCreateTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState <string | null>(null);
    
    const create = async (taskData: CreateTaskPayload): Promise<TaskTypes | null> => {
        try {
            setLoading(true);
            const task = await createTask(taskData);
            return task;
            
        } catch (error) {
            setError("Failed to create a task");
            return null;
            
        } finally{
            setLoading(false);
        }


    };
    return {create, loading, error};
    

}