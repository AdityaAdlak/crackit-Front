import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();
        setError(""); 

        try {
            const user = { fullName, email, password };

            const response = await fetch("https://crackit-backend-g70k.onrender.com/user/v1/signup", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 409) {
                setError("User already exists with this email ID...");
                return;
            }

            if (!response.ok) {
                setError("Something went wrong. Please try again.");
                return;
            }

            const data = await response.json();
            setResult(data.message);

            if (data.data && data.data._id) {
                console.log(data.data._id);

                setTimeout(() => {
                    navigate(`/userAnalytics/${data.data._id}`);
                }, 1000);
                
            } else {
                setError("No user ID found.");
            }
        } catch (error) {
            setError("An error occurred. Please check your connection.");
            console.log("Error:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

                
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter Full Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#0a0f1a] text-white font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                
                {result && (
                    <div className="mt-6 text-center text-green-600 font-medium">
                        {result}
                    </div>
                )}
            </div>
        </div>
    );
}
