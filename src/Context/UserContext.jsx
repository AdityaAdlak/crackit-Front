import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

// Provide authentication state to components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Checking if user already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        console.log("Stored token:", token); 

        if (token && storedUser) {
            try {
                const decoded = jwtDecode(token);
                setUser(JSON.parse(storedUser)); 
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); 
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

   

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for authentication context
export const useAuth = () => useContext(AuthContext);
