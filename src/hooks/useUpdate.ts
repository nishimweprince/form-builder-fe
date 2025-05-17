import { useState } from "react";
import { updateTask } from "../services/taskService";

export const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: any) => {
    try {
      setLoading(true);
      return await updateTask(id, data);
    } catch (err) {
      setError("Failed to update task");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};
