import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState(true); 
    const navigate = useNavigate();
   
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:',.<>/?]).{8,32}$/;

    const handlePasswordChange = (value) => {
        setNewPassword(value);
        setPasswordStrength(strongPasswordRegex.test(value));
    };

    const checkDetails = async (e) => {
        e.preventDefault();


        if (newPassword !== confirmPassword) {
            setPasswordStatus(false);
            return;
        } else {
            setPasswordStatus(true);
            try {
                const response = await axios.patch('http://localhost:2000/login/forgotPassword', {
                    email,
                    "password": newPassword
                })
                 alert("Password reset successful!");
                 navigate('/');

            } catch (err) {
                const message = err.response.data;
                alert(message);
               
            }

        }


       
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Reset Password
                </h1>

                <form className="space-y-4" onSubmit={checkDetails}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {!passwordStrength && (
                            <p className="text-red-500 text-sm mt-1 animate-pulse">
                                Password must be 8-32 chars, include uppercase, lowercase, number & special char.
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {!passwordStatus && (
                            <p className="text-red-500 text-sm mt-1 animate-pulse">
                                Passwords didn't match
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
