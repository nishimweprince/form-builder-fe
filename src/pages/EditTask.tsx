// src/pages/EditTask.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getTaskById } from "../services/taskService";
import { useUpdateTask } from "../hooks/useUpdate";
import InputField from "../components/InputFields/InputField";
import TextareaField from "../components/InputFields/TextareaField";
import SelectField from "../components/InputFields/SelectField";
import InputErrorMessage from "../components/InputFields/InputErrorMessage";

import { CreateTaskPayload, TaskTypes } from "../types/task.types";

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { update, loading } = useUpdateTask();
  const [task, setTask] = useState<TaskTypes | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<CreateTaskPayload>>();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const currentTask = await getTaskById(id!);
        setTask(currentTask);
        const { title, description, status, priority, assignedToId } = currentTask;
        reset({ title, description, status, priority, assignedToId });
      } catch (err) {
        toast.error("Failed to load task.");
      }
    };
    fetchTask();
  }, [id, reset]);

  const onSubmit = async (data: Partial<CreateTaskPayload>) => {
    try {
      await update(id!, data);
      toast.success("Task updated successfully!");
      navigate("/todo");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update task");
    }
  };

  if (!task) {
    return <div className="text-center text-gray-500 py-10">Loading task...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white mt-10 p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Task</h2>

      <button
        type="button"
        onClick={() => navigate("/todo")}
        className="text-blue-500 underline text-sm mb-4"
      >
        ← Back to Task List
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <div>
              <InputField label="Title" {...field} />
              <InputErrorMessage error={errors.title?.message} />
            </div>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <TextareaField label="Description" {...field} />
              <InputErrorMessage error={errors.description?.message} />
            </div>
          )}
        />

        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <div>
              <SelectField
                label="Status"
                options={[
                  { label: "Pending", value: "PENDING" },
                  { label: "In Progress", value: "IN_PROGRESS" },
                  { label: "Completed", value: "COMPLETED" },
                ]}
                {...field}
              />
              <InputErrorMessage error={errors.status?.message} />
            </div>
          )}
        />

        <Controller
          name="priority"
          control={control}
          rules={{ required: "Priority is required" }}
          render={({ field }) => (
            <div>
              <SelectField
                label="Priority"
                options={[
                  { label: "Low", value: "LOW" },
                  { label: "Medium", value: "MEDIUM" },
                  { label: "High", value: "HIGH" },
                ]}
                {...field}
              />
              <InputErrorMessage error={errors.priority?.message} />
            </div>
          )}
        />

        <Controller
          name="assignedToId"
          control={control}
          render={({ field }) => (
            <div>
              <InputField label="Assigned To (User ID)" {...field} />
              <InputErrorMessage error={errors.assignedToId?.message} />
            </div>
          )}
        />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Updating...
              </>
            ) : (
              "Update Task"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
