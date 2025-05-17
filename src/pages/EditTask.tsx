// src/pages/EditTask.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { getTasks } from '../services/taskService';
import { useUpdateTask } from '../hooks/useUpdate';
import InputField from '../components/InputFields/InputField';
import TextareaField from '../components/InputFields/TextareaField';
import SelectField from '../components/InputFields/SelectField';
import InputErrorMessage from '../components/InputFields/InputErrorMessage';
import { CreateTaskPayload, TaskTypes } from '../types/task.types';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { update, loading } = useUpdateTask();

  const [task, setTask] = useState<TaskTypes | null>(null);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Partial<CreateTaskPayload>>();

  useEffect(() => {
    const fetchTask = async () => {
      const allTasks = await getTasks();
      const currentTask = allTasks.find((t) => t.id === id);
      if (currentTask) {
        setTask(currentTask);
        const { title, description, status, priority, assignedToId } = currentTask;
        reset({ title, description, status, priority, assignedToId });
      }
    };
    fetchTask();
  }, [id, reset]);
  
  const onSubmit = async (data: Partial<CreateTaskPayload>) => {
    try {
      const { title, description, status, priority, assignedToId } = data;
      await update(id!, { title, description, status, priority, assignedToId });
      navigate('/todo');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

  if (!task) return <p>Loading task...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
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
          render={({ field }) => (
            <div>
              <SelectField
                label="Status"
                options={[
                  { label: 'Pending', value: 'PENDING' },
                  { label: 'In Progress', value: 'IN_PROGRESS' },
                  { label: 'Completed', value: 'COMPLETED' },
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
          render={({ field }) => (
            <div>
              <SelectField
                label="Priority"
                options={[
                  { label: 'Low', value: 'LOW' },
                  { label: 'Medium', value: 'MEDIUM' },
                  { label: 'High', value: 'HIGH' },
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

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  );
};

export default EditTask;
