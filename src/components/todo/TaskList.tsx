import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../hooks/useAuth';
import { Table } from '../Tables/Table';
import { TaskTypes, TaskDisplay } from '../../types/task.types';
import { useNavigate } from 'react-router-dom';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { toast } from 'react-toastify';
import { useUsers } from '../../hooks/UseUsers';

const TaskList = () => {
  const { user } = useAuth();
  const { tasks, refetch, loading } = useTasks();
  const { users } = useUsers(); // Fetch all users
  const { handleDelete } = useDeleteTask();
  const navigate = useNavigate();

  console.log("User ID:", user?.id);
  console.log("All tasks:", tasks);
  console.log("All users:", users);


  const columns: { header: string; accessor: keyof TaskDisplay }[] = [
    { header: 'Title', accessor: 'title' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Description', accessor: 'description' },
    { header: 'Status', accessor: 'status' },
    { header: 'Assigned To', accessor: 'assignedToName' },
    { header: 'Created At', accessor: 'createdAt' },
  ];

console.log("Current User ID:", user?.id);
console.log("All tasks:", tasks);
tasks.forEach(task => {
  console.log("Task assignedToId:", task.assignedToId, "createdById:", task.createdById);
});


const myTasks = tasks ?? []; // disable filtering just for now

  console.log('My filtered tasks:', myTasks);

  const formattedTasks: TaskDisplay[] = myTasks.map((task) => {
    const assignedUser = users.find((u) => u.id === task.assignedToId);

    return {
      ...task,
      assignedToName: assignedUser?.name || 'Unassigned',
      createdAt: task.createdAt
        ? new Date(task.createdAt).toLocaleString()
        : 'N/A',
    };
  });

  console.log("Formatted tasks to display:", formattedTasks);

  const handleEdit = (task: TaskTypes) => {
    navigate(`/todo/edit/${task.id}`);
  };

  const handleDeleteClick = async (task: TaskTypes) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );
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
        <h2 className="text-2xl font-bold text-blue-800">My Tasks</h2>
        <button
          onClick={() => navigate('/todo/create')}
          className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          + New Task
        </button>
      </div>
  
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading tasks...</div>
      ) : myTasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No tasks found for your account.
        </div>
      ) : (
        <Table<TaskDisplay>
          columns={columns}
          data={formattedTasks}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          // 💡 If you want icon colors here, update the Table component itself.
        />
      )}
    </div>
  );
  
};

export default TaskList;
