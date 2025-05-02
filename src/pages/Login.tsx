import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import book from "../assets/book.avif";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await loginUser(data.email, data.password);
      localStorage.setItem("token", res.token);
      navigate("/todo");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left visual panel */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 flex flex-col justify-center relative">
          <h2 className="text-4xl font-bold leading-snug mb-4">
            Welcome Back!
          </h2>
          <p className="text-sm opacity-80 mb-12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, sunt.{" "}
          </p>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="h-64 bg-white/20 rounded shadow-inner p-2">
              <img src={book} className="h-full w-full object-cover rounded" />
            </div>
          </div>
        </div>

        {/* Right login panel */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Reset Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Login
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
              <span>Don't have an account?</span>
              <Link to="/register" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-sm text-gray-400">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
