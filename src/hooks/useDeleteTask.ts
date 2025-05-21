import { useState } from "react"
import { TaskTypes } from "../types/task.types";
import { deleteTask } from "../services/taskService";

export const useDeleteTask = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState <string | null>(null);

    const handleDelete = async(id: string): Promise<TaskTypes | null> => {

        try {
            setLoading(true); 
            const task = await deleteTask(id);
            return task;
            
        } catch (error) {
            setError("Error while deleting task");
            return null; 
        }
        finally{
            setLoading(false);
        }


    }
    
    return {handleDelete, loading, error}

}