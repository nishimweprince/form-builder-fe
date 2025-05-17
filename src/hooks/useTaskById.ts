import { useEffect, useState } from 'react';
import { getTaskById } from '../services/taskService';
import { TaskTypes } from '../types/task.types';

export const useTaskById = (id: string) => {
  const [task, setTask] = useState<TaskTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        console.error('Error fetching task by ID', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  return { task, loading };
};
