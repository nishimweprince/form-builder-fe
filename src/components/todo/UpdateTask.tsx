import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { TaskTypes, CreateTaskPayload } from "../../types/task.types";
import { useUpdateTask } from "../../hooks/useUpdate";

type Props = {
  task: TaskTypes;
  onClose: () => void;
  onSuccess: () => void;
};

const UpdateTask = ({ task, onClose, onSuccess }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTaskPayload>({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
    }
  });

  const { update, loading } = useUpdateTask();

  const onSubmit = async (data: Partial<CreateTaskPayload>) => {
    const updated = await update(task.id, data);
    if (updated) {
      onSuccess();
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />
          <TextField
            label="Description"
            {...register("description")}
            fullWidth
          />
          <TextField
            label="Priority"
            type="number"
            {...register("priority", {
              min: { value: 1, message: "Min 1" },
              max: { value: 5, message: "Max 5" },
            })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateTask;
