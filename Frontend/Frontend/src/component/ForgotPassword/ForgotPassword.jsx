const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Reset Password
                </h1>

                <form className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            required
                            type="email"
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
                            required
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Reset Password
                    </button>

                    {/* Back to Login */}
                    <p className="text-sm text-center text-gray-600 mt-3">
                        Remembered your password?{" "}
                        <span
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => window.location.href = "/login"}
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
