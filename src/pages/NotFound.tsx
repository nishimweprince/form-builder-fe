import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center px-6 py-12 bg-white shadow-xl rounded-2xl border border-gray-200 max-w-md">
        <FaExclamationTriangle size={50} className="text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg mb-6">Oops! Page not found.</p>
        <Link
          to="/todo"
          className="inline-block px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
