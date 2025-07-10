import { useState } from "react";
import {
  FaHome,
  FaTasks,
  FaUserAlt,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-blue-800 text-white min-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Top section */}
      <div className="flex items-center justify-between p-4">
        {isOpen && <h2 className="text-xl font-bold">To Do</h2>}
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1">
        <ul>
          {/* Home */}
          <li>
            <Link
              to="/todo"
              className="flex items-center p-4 hover:bg-blue-900 transition-colors"
            >
              <FaHome size={24} />
              {isOpen && <span className="ml-4">Home</span>}
            </Link>
          </li>

          {/* Tasks with submenu */}
          <li>
            <div
              onClick={() => setTasksOpen(!tasksOpen)}
              className="flex items-center justify-between p-4 hover:bg-blue-900 cursor-pointer"
            >
              <div className="flex items-center">
                <FaTasks size={24} />
                {isOpen && <span className="ml-4">Tasks</span>}
              </div>
              {isOpen &&
                (tasksOpen ? (
                  <FaChevronDown size={16} />
                ) : (
                  <FaChevronRight size={16} />
                ))}
            </div>

            {/* Submenu */}
            {isOpen && tasksOpen && (
              <ul className="ml-8 space-y-1">
                <li>
                  <Link
                    to="/todo/create"
                    className="block p-2 rounded hover:bg-blue-900"
                  >
                    Create a New Task
                  </Link>
                </li>
                <li>
                  <Link
                    to="/todo/completed"
                    className="block p-2 rounded hover:bg-blue-900"
                  >
                    Completed Tasks
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Profile */}
          <li>
            <Link
              to="/profile"
              className="flex items-center p-4 hover:bg-blue-900 transition-colors"
            >
              <FaUserAlt size={24} />
              {isOpen && <span className="ml-4">Profile</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout at bottom */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-4 hover:bg-blue-900 cursor-pointer transition-colors"
        >
          <FaSignOutAlt size={24} />
          {isOpen && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
