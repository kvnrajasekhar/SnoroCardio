import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        return emailRegex.test(email);
    };

    // Handle email input change
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(validateEmail(value));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#48cae4]">
            <div className="w-full max-w-lg p-8 space-y-4 bg-[#ade8f4] rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <form className="space-y-6">
                    {!isLogin && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        id="age"
                                        placeholder="Enter your age"
                                        className="w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        className="w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 ${isEmailValid
                                ? "border-gray-300 focus:ring-blue-500"
                                : "border-red-500 focus:ring-red-500"
                                }`}
                            required
                        />
                        {!isEmailValid && email && (
                            <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                className="w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        {isLogin && (
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                        )}
                        {isLogin && (
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={!isEmailValid}
                        className={`w-full px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 ${isEmailValid
                            ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-blue-600 hover:underline"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
