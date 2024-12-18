import { useState } from 'react';

function Forgotpass() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    // Function to validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        return emailRegex.test(email);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsValid(validateEmail(value));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#48cae4]">
            <div className="bg-[#ade8f4] p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className={`w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 ${isValid ? 'border-gray-300 focus:ring-[#48cae4]' : 'border-red-500 focus:ring-red-500'
                                }`}
                            placeholder="Email"
                            required
                        />
                        {!isValid && email && (
                            <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-full p-3 rounded-md text-white focus:outline-none focus:ring-2 ${isValid
                                ? 'bg-[#48cae4] hover:bg-[#36a6c5] focus:ring-[#36a6c5]'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Forgotpass;
