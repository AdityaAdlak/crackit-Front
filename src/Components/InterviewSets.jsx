


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegQuestionCircle, FaFileAlt, FaCode } from "react-icons/fa"; 


export default function InterviewSets() {
    const [sets, setSets] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  

  
    
        async function fetchSets(e) {
            e.preventDefault();
            setLoading(true);
            setError('');

            const token = localStorage.getItem("token");
            if(!token)
            {
                setError("Unauthorized. Please log in.");
                setTimeout(()=>{
                    navigate("/login");
                },1000)
                
          return;
            }
            try {
                const response = await fetch(`https://crackit-backend-g70k.onrender.com/user/v1/interviewSetShow/${difficulty}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                      },
                });
                if (!response.ok) throw new Error("Failed to fetch sets...");
    
    
    
                
    
                const data = await response.json();
                if (!data?.data) throw new Error("No sets available.");
    
                const uniqueSets = Array.from(new Map(data.data.map(set => [set.setNumber, set])).values());
                const setsWithUUID = uniqueSets.slice(0, 10).map((set, index) => ({
                    ...set,
                    setNumber: index + 1,
                    id: set.setId,
                }));
    
                setSets(setsWithUUID);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    console.log("the interview sets of this level are",sets)
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            
            <div className="max-w-6xl mx-auto">
             
                <form onSubmit={fetchSets} className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter Difficulty Level (Easy / Medium / Hard)..."
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className={`bg-[#0a0f1a] text-white px-6 py-3 rounded-lg font-semibold shadow-md 
                        hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Get Sets'}
                    </button>
                </form>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sets.map((set) => (
                        <div
                            key={set.id}
                            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-2xl transition transform duration-300 hover:scale-105"
                            

                            onClick={() => {
                                if (set.setId) {
                                    navigate(`/set-details/${set.setId}`, { state: { set: set } });
                                } else {
                                    console.error("Set ID is undefined:", set);
                                }
                            }}
                            
                        >
                        
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800">Set {set.setNumber}</h2>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full `}>
                                    {set.setDifficulty || "N/A"}
                                </span>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-gray-600">
                                    <FaRegQuestionCircle className="mr-2 text-blue-500" />
                                    <p><strong>MCQs:</strong> {set.mcqQuestions?.length || 0}</p>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaFileAlt className="mr-2 text-green-500" />
                                    <p><strong>Theoretical:</strong> {set.theoreticalQuestions?.length || 0}</p>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaCode className="mr-2 text-purple-500" />
                                    <p><strong>Coding:</strong> {set.codingQuestions?.length || 0}</p>
                                </div>
                            </div>
                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
