// src/pages/CreateTask.tsx

import React from "react";
import { CreateTaskPayload } from "../../types/task.types";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useCreateTask } from "../../hooks/useCreateTask";
import { useNavigate } from "react-router-dom";
import InputField from "../InputFields/InputField";
import InputErrorMessage from "../InputFields/InputErrorMessage";
import TextareaField from "../InputFields/TextareaField";
import SelectField from "../InputFields/SelectField";
import { toast } from "react-toastify";
import { useUsers } from "../../hooks/UseUsers";
import { FaSpinner } from "react-icons/fa";

const CreateTask: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskPayload>({
    defaultValues: {
      title: "",
      description: "",
      status: "PENDING",
      priority: "LOW",
      assignedToId: "",
    },
  });

  const { create, loading } = useCreateTask();
  const navigate = useNavigate();
  const { users, loading: usersLoading } = useUsers();

  const onSubmit: SubmitHandler<CreateTaskPayload> = async (data) => {
    try {
      const payload = {
        ...data,
        assignedToId: data.assignedToId,
      };

      await create(payload);
      toast.success("Task created successfully!");
      navigate("/todo");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create task");
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-gray-800">
      <h2 className="text-3xl font-semibold mb-8 tracking-tight">
        📝 Create a New Task
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <div className="space-y-1">
              <InputField
                label="Title"
                {...field}
                placeholder="Enter task title..."
              />
              <InputErrorMessage error={errors.title?.message} />
            </div>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <div className="space-y-1">
              <TextareaField
                label="Description"
                {...field}
                placeholder="Brief description..."
              />
              <InputErrorMessage error={errors.description?.message} />
            </div>
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <div className="space-y-1">
              <SelectField
                label="Status"
                {...field}
                options={[
                  { label: "Pending", value: "PENDING" },
                  { label: "In Progress", value: "IN_PROGRESS" },
                  { label: "Completed", value: "COMPLETED" },
                ]}
              />
              <InputErrorMessage error={errors.status?.message} />
            </div>
          )}
        />

        {/* Priority */}
        <Controller
          name="priority"
          control={control}
          rules={{ required: "Priority is required" }}
          render={({ field }) => (
            <div className="space-y-1">
              <SelectField
                label="Priority"
                {...field}
                options={[
                  { label: "Low", value: "LOW" },
                  { label: "Medium", value: "MEDIUM" },
                  { label: "High", value: "HIGH" },
                ]}
              />
              <InputErrorMessage error={errors.priority?.message} />
            </div>
          )}
        />

        {/* Assigned To */}
        <Controller
          name="assignedToId"
          control={control}
          rules={{ required: "Assigned user is required" }}
          render={({ field }) => (
            <div className="space-y-1">
              <SelectField
                label="Assign To"
                {...field}
                options={
                  usersLoading
                    ? [{ label: "Loading...", value: "" }]
                    : [
                        { label: "Unassigned", value: "" },
                        ...users.map((user) => ({
                          label: user.name,
                          value: user.id,
                        })),
                      ]
                }
              />
              <InputErrorMessage error={errors.assignedToId?.message} />
            </div>
          )}
        />

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex items-center justify-center py-3 px-6
              bg-blue-800 text-white font-medium rounded-2xl
              hover:bg-blue-900 active:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2 text-white text-sm" />
                Creating...
              </>
            ) : (
              "Create Task"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
