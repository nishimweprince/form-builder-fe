import React from 'react'
import { CreateTaskPayload } from '../../types/task.types'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useCreateTask } from '../../hooks/useCreateTask';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputFields/InputField';
import InputErrorMessage from '../InputFields/InputErrorMessage';
import TextareaField from '../InputFields/TextareaField';
import SelectField from '../InputFields/SelectField';

const CreateTask: React.FC = () => {

  const {control, handleSubmit, formState: {errors}} = useForm<CreateTaskPayload>({
    defaultValues: {
      title: '',
      description: '',
      status: 'PENDING',
      priority: 'LOW',
      assignedToId: '',}
  });
  const {create, loading} = useCreateTask();
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<CreateTaskPayload> = async (data) =>{
    try {
      await create(data);
      navigate("/todo");
      
    } catch (error) {
      console.error("error creating task", error);
      
      
    }
  }

  return (
    <div>
      <h2>Create a new task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask