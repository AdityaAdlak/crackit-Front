


import { useAuth } from "../Context/UserContext";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout(); 
       navigate("/");
    };

    return <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>;
};

export default Logout;
