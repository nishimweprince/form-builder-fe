import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

type InputFields = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<InputFields>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputFields> = async (data) => {
    try {
      const res = await registerUser(data.username, data.email, data.password);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="yourusername"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium text-sm"
          >
            Register
          </button>

          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
