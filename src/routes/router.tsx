import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todo from "../pages/Todo";
import CreateTasks from "../pages/CreateTasks";
import PrivateRoute from "./PrivateRoute";
import EditTask from "../pages/EditTask";
import MainLayout from "../layout/MainLayout"; // adjust path
import NotFound from "../pages/NotFound"

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
    element: <PrivateRoute />, // protects all children
    children: [
      {
        element: <MainLayout />, // this wraps the sidebar + content
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
            element: <EditTask />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
