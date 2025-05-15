import TaskTable from '../components/todo/TaskList';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';

const Todo = () => {
  return (
    <div>
      <Button
        variant="contained"
        component={Link}
        to="create"
        sx={{ mb: 2 }} 
      >
        Create a New Task
      </Button>

      <TaskTable />
      <Outlet />
    </div>
  );
};

export default Todo;
