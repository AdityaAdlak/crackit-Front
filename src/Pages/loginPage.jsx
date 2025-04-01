import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/UserContext.jsx";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-hot-toast"
// have to use Authentication later remind


const Login = () => {
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

   
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post(
                'https://crackit-backend-g70k.onrender.com/user/v1/login', 
                { email, password },
            );
            
            if(response){
            console.log("Login successful:", response.data.message);
            toast.success("Login successful:")
            }
            

            login(response.data.token, response.data.user);

            const token = localStorage.getItem("token");
            let userId = null;
        
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.id; 
                    console.log("User ID:", userId);
                } catch (err) {
                    console.error("Invalid token!", err);
                }
            } else {
                console.log("No token found!");
            }
            
            setTimeout(() => {
                navigate(`/userAnalytics/${userId}`); 
            }, 2000);
            
    
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
                
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
           
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                 
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                  
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#0a0f1a]  text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>

               
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                        Not have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;


