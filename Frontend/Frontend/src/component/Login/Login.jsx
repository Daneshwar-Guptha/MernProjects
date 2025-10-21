import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();

    const navigateSignup  = ()=>{
        navigate('/signup')

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer" onClick={()=>navigateSignup()}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
