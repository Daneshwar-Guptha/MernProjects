import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [confirmPassword,setConfirmPassword] = useState("")
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h1>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value = {email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(event)=>setEmail(event.target.value)}
           />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={navigateLogin}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
