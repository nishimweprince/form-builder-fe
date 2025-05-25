// src/pages/TaskList.tsx

import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../hooks/useAuth';
import { Table } from '../Tables/Table';
import { TaskTypes } from '../../types/task.types';
import { useNavigate } from 'react-router-dom';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { toast } from 'react-toastify';

const TaskList = () => {
  useAuth();
  const { tasks, refetch, loading } = useTasks();
  const { handleDelete } = useDeleteTask();
  const navigate = useNavigate();

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Description', accessor: 'description' },
    { header: 'Status', accessor: 'status' },
    { header: 'Assigned To', accessor: 'assignedToId' },
    { header: 'Created At', accessor: 'createdAt' },
  ] as const satisfies { header: string; accessor: keyof TaskTypes }[];

  const formattedTasks = tasks.map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt || '').toLocaleString(),
  }));

  const handleEdit = (task: TaskTypes) => {
    navigate(`/todo/edit/${task.id}`);
  };

  const handleDeleteClick = async (task: TaskTypes) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${task.title}"?`);
    if (!confirmed) return;

    const success = await handleDelete(task.id);
    if (success) {
      toast.success(`Task "${task.title}" deleted`);
      refetch();
    } else {
      toast.error(`Failed to delete task "${task.title}"`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Task List</h2>
        <button
          onClick={() => navigate('/todo/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          + New Task
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No tasks found.</div>
      ) : (
        <Table<TaskTypes>
          columns={columns}
          data={formattedTasks}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
};

export default TaskList;
