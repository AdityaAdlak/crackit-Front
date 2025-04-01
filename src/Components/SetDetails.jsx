

import { useLocation, useNavigate } from "react-router-dom";

export default function SetDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedSet = location.state?.set;

    const subjects = ["DSA", "CN", "DBMS", "OS", "OOPs", "SE"];



    console.log("In set dateils",selectedSet)

   

    if (!selectedSet) {
        return <p className="text-center text-red-500">No set selected.</p>;
    }

    return (
        <div className="flex flex-col items-center mt-6">
       
            <div className="p-6 bg-white shadow-lg rounded-xl w-3/4 text-center">
                <h2 className="text-lg font-bold text-gray-800">Set {selectedSet.setNumber} - Sections</h2>
                
               
                <div className="flex justify-center gap-6 mt-6">
                    <button className="bg-[#0a0f1a] text-white px-6 py-3 rounded-md shadow-md  hover:shadow-lg hover:bg-blue-500 transition duration-300"
                        onClick={() => navigate(`/mcq/${selectedSet.setId}`, { state: { selectedSet } })}>
                        MCQs
                    </button>
                    <button className="bg-[#0a0f1a] text-white px-6 py-3 rounded-md shadow-md  hover:shadow-lg hover:bg-blue-500 transition duration-300"
                        onClick={() => navigate(`/theory/${selectedSet.setId}`, { state: { selectedSet } })}>
                        Theory
                    </button>
                    <button className="bg-[#0a0f1a] text-white px-6 py-3 rounded-md shadow-md  hover:shadow-lg hover:bg-blue-500 transition duration-300"
                        onClick={() => navigate(`/coding/${selectedSet.setId}`, { state: { selectedSet } })}>
                        Coding
                    </button>
                </div>
            </div>
                <br></br>
           
            <div className="p-6 bg-white shadow-lg rounded-xl w-3/4 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Subjects Covered</h3>
                
               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
    {subjects.map((subject, index) => (
        <div 
            key={index} 
            className="relative p-10 shadow-md text-center text-lg font-bold uppercase 
            rounded-lg w-40 h-40 flex justify-center items-center text-white overflow-hidden"
            style={{ 
                backgroundImage: "url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=600')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
           
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}></div>

           
            <span className="relative z-10">{subject}</span>
        </div>
    ))}
</div>
            </div>
        </div>
    );
}
