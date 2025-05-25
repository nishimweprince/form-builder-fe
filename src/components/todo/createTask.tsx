// src/pages/CreateTask.tsx

import React from 'react';
import { CreateTaskPayload } from '../../types/task.types';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useCreateTask } from '../../hooks/useCreateTask';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputFields/InputField';
import InputErrorMessage from '../InputFields/InputErrorMessage';
import TextareaField from '../InputFields/TextareaField';
import SelectField from '../InputFields/SelectField';
import { toast } from 'react-toastify';

const CreateTask: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskPayload>({
    defaultValues: {
      title: '',
      description: '',
      status: 'PENDING',
      priority: 'LOW',
      assignedToId: '',
    },
  });

  const { create, loading } = useCreateTask();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateTaskPayload> = async (data) => {
    try {
      await create(data);
      toast.success('Task created successfully!');
      navigate('/todo');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Create a New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
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
          rules={{ required: 'Description is required' }}
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
          rules={{ required: 'Status is required' }}
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
          rules={{ required: 'Priority is required' }}
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

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
