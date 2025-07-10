import { useEffect, useState, useCallback } from "react";
import { TaskTypes } from "../types/task.types";
import { getTasks } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null); 
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      setError(err?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
  };
};
