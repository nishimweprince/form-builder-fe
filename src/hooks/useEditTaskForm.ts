// hooks/useEditTaskForm.ts
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateTaskPayload, TaskTypes } from "../types/task.types";
import { useUpdateTask } from "./useUpdate";



export const useEditTaskForm = (task: TaskTypes | null, taskId: string) => {
  const navigate = useNavigate();
  const { update, loading: isUpdating } = useUpdateTask();
  

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<CreateTaskPayload>>();
 

  useEffect(() => {
    if (task) {
      const { title, description, status, priority, assignedToId } = task;
      reset({ title, description, status, priority, assignedToId });
    }
  }, [task, reset]);

  const onSubmit = async (data: Partial<CreateTaskPayload>) => {
    try {
      await update(taskId, data);
      toast.success("Task updated successfully!");
      navigate("/todo");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update task");
    }
  };

  return { control, errors, handleSubmit, onSubmit, isUpdating };
};
