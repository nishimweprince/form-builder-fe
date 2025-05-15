// src/components/TaskTable.tsx

import { useTasks } from '../../hooks/useTasks';
import {useAuth} from '..//../hooks/useAuth'
import { Table } from '../Tables/Table';
import { TaskTypes } from '../../types/task.types';

const TaskList = () => {
  useAuth();
  const { tasks } = useTasks();

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Status', accessor: 'status' },
    { header: 'Assigned To', accessor: 'assignedToId' },
    { header: 'Created At', accessor: 'createdAt' },
  ] as const  satisfies { header: string; accessor: keyof TaskTypes }[];

  // Optionally format dates (e.g., if you want readable dates in the table)
  const formattedTasks = tasks.map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt || '').toLocaleString(),
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <Table<TaskTypes> columns={columns} data={formattedTasks} />
    </div>
  );
};

export default TaskList;
