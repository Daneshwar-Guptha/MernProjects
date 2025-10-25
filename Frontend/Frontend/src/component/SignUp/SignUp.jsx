import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userNameStatus, setUserNameStatus] = useState(true);
  const [passwordStatus, setPasswordStatus] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/");
  };

  const callApi = async (e) => {
    e.preventDefault();

    // Username validation
    if (username.length < 4) {
      setUserNameStatus(false);
      return;
    } else {
      setUserNameStatus(true);
    }

    // Password match validation
    if (password !== confirmPassword) {
      setPasswordStatus(false);
      return;
    } else {
      setPasswordStatus(true);
    }

    // Prepare data for API
    const postData = { username, email, password };

    try {
      const response = await axios.post("http://localhost:2000/signup", postData);
      console.log("Signup success:", response.data);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      const errmessage = error.response.data.message;
      console.error("Signup error:",errmessage);
      alert(errmessage);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h1>

        <form className="space-y-4" onSubmit={callApi}>
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {!userNameStatus && (
              <p className="text-red-500 text-sm mt-1">
                Username must be at least 4 characters
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {!passwordStatus && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          {/* Navigate to Login */}
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
