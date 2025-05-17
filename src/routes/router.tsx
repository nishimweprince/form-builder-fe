import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todo from "../pages/Todo";
import CreateTasks from "../pages/CreateTasks";
import PrivateRoute from "./PrivateRoute";
import EditTask from "../pages/EditTask"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/todo",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Todo />,
      },
      {
        path: "create",
        element: <CreateTasks />,
      },
      { 
        path: "edit/:id", 
        element: <EditTask /> },
    ],
  },
]);

export default router;
