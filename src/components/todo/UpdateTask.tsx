import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TaskTypes, CreateTaskPayload } from "../../types/task.types";
import { useUpdateTask } from "../../hooks/useUpdate";
import InputField from "../InputFields/InputField";
import TextareaField from "../InputFields/TextareaField";
import SelectField from "../InputFields/SelectField";
import InputErrorMessage from "../InputFields/InputErrorMessage";

type Props = {
  task: TaskTypes;
  onClose: () => void;
  onSuccess: () => void;
};

const UpdateTask = ({ task, onClose, onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskPayload>({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
    },
  });

  const { update, loading } = useUpdateTask();

  const onSubmit = async (data: Partial<CreateTaskPayload>) => {
    try {
      const updated = await update(task.id, data);
      if (updated) {
        toast.success("Task updated successfully!");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update task");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold -text-gray-800 mb-4 text-blue">Edit Task</h2>

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

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
