import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../hooks/useAuth';
import { Table } from '../Tables/Table';
import { TaskTypes } from '../../types/task.types';
import { useNavigate } from 'react-router-dom';
import {useDeleteTask} from '../../hooks/useDeleteTask'

const TaskList = () => {
  useAuth();
  const { tasks, refetch } = useTasks();
  const navigate = useNavigate();
  const { handleDelete } = useDeleteTask();

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Status', accessor: 'status' },
    { header: 'Assigned To', accessor: 'assignedToId' },
    { header: 'Created At', accessor: 'createdAt' },
  ] as const satisfies { header: string; accessor: keyof TaskTypes }[];

  const formattedTasks = tasks.map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt || '').toLocaleString(),
  }));

  // Edit handler to navigate to edit page
  const handleEdit = (task: TaskTypes) => {
    navigate(`/todo/edit/${task.id}`);
  };
  const handleDeleteClick = async (task: TaskTypes) => {
    console.log("Deleting task with id:", task.id);
    const confirmed = window.confirm(`Are you sure you want to delete "${task.title}"?`);
    if (confirmed) {
      const result = await handleDelete(task.id);
      if (result) {
        refetch();
      }
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <Table<TaskTypes>
        columns={columns}
        data={formattedTasks}
        onEdit={handleEdit} // 👈 Pass the handler here
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default TaskList;
