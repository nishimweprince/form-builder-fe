import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputFields/InputField";
import InputErrorMessage from "../components/InputFields/InputErrorMessage";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await registerUser(data.name, data.email, data.password);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <div>
                <InputField
                  label="Username"
                  placeholder="yourusername"
                  type="text"
                  {...field}
                />
                <InputErrorMessage error={errors.name?.message} />
              </div>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: (value) =>
                value.includes("@") || "Email must include @",
            }}
            render={({ field }) => (
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
                if (!/[A-Z]/.test(value))
                  return "Password must include an uppercase letter";
                if (!/[a-z]/.test(value))
                  return "Password must include a lowercase letter";
                if (!/[0-9]/.test(value))
                  return "Password must include a number";
                return true;
              },
            }}
            render={({ field }) => (
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium text-sm"
          >
            Register
          </button>

          {/* Already have an account */}
          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
