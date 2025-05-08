import { useEffect, useState } from "react"
import { TaskTypes } from "../types/task.types"
import { getTasks } from "../services/taskService";

export const useTasks = () => {
    const [tasks, setTasks] = useState<TaskTypes[]>([]);

    useEffect(() =>{
        const fetchTasks = async () =>{
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                
            }
        }
        fetchTasks();
    }, []);
    return {tasks}
}