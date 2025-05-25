import TaskTable from '../components/todo/TaskList';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';

const Todo = () => {
  return (
    <div>
      <TaskTable />
    </div>
  );
};

export default Todo;
