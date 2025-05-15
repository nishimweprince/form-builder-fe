import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todo from "../pages/Todo";
import CreateTasks from "../pages/createTasks";
import PrivateRoute from "./PrivateRoute"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
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
        ],
      },
   

]);

export default router;