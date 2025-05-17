import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import book from "../assets/book.avif";
import InputField from "../components/InputFields/InputField";
import InputErrorMessage from "../components/InputFields/InputErrorMessage";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await loginUser(data.email, data.password);
      console.log("RES:", res); 
      localStorage.setItem("token", res.data.token); 
        navigate('/todo')
      
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left visual panel */}
        <div className="text-gray-700 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center leading-snug mb-6">
            Welcome Back!
          </h2>
          <p className="text-sm opacity-80 mb-12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, sunt.
          </p>
          <div className="bg-white/20 rounded p-2">
            <img src={book} className="h-full w-full object-cover rounded" />
          </div>
        </div>

        {/* Right login panel */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required",
                validate: (value) =>
                  value.includes("@") || "Email must include @",
               }}
              render={({ field, }) => (
                <div>
                  <InputField
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  {...field}
                />
                  <InputErrorMessage error={errors.email?.message} />
                </div>
                

              )}
            />


            {/* Password */}
            <Controller
              name="password"
              control={control}
              rules={{ 
                required: "Password is required", 
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: (value) => {
                  if (!/[A-Z]/.test(value)) return "Password must include an uppercase letter";
                  if (!/[a-z]/.test(value)) return "Password must include an lowercase letter";
                  if (!/[0-9]/.test(value)) return "Password must include a number";
                  return true;
                },
              }}
              render={({ field}) => (
                <div>
                  <InputField
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  
                  {...field}
                />
                <InputErrorMessage error={errors.password?.message} />
                </div>
              )}
            />

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Reset Password
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Login
            </button>

            {/* Sign Up */}
            <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
              <span>Don't have an account?</span>
              <Link to="/register" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-sm text-gray-400">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
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
