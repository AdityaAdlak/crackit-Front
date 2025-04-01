import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react"


export default function AiResponse() {
    const [aiFeedback, setAiFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userAnswerId } = useParams(); 
    const navigate = useNavigate();
   

    useEffect(() => {
        if (userAnswerId) {
            getAiResponse();
        }
    }, [userAnswerId]);

    async function getAiResponse() {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`https://crackit-backend-g70k.onrender.com/user/v1/getAiEvaluation/${userAnswerId}`);

            if (!response.data?.data?.length) {
                throw new Error("No AI feedback available.");
            }

            setAiFeedback(response.data.data); 
        } catch (error) {
            console.log("Error in AiResponse : ",error)
            setError("Something went wrong. Please attempt at least one question for AI feedback.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen w-full px-10 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">AI Feedback</h2>

            {loading && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
                </div>
            )}

            {error && (
                <div className="text-red-600 bg-red-100 p-3 rounded-md text-center mb-4">
                    {error}
                </div>
            )}

            {aiFeedback.length > 0 ? (
                <div className="max-w-4xl mx-auto space-y-6">
                    {aiFeedback.map((feedback, index) => (
                        <div key={index} className="border-b pb-4">
                            <h3 className="text-xl font-semibold text-blue-600">{feedback.questionTitle}</h3>
                            <p className="mt-2"><strong>User Response:</strong> {feedback.userAnswer}</p>
                            <p className="mt-2"><strong>AI Feedback:</strong> {feedback.feedback}</p>
                            <p className="mt-2 font-medium"><strong>Remark:</strong> {feedback.remark}</p>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && !error && (
                    <p className="text-gray-500 text-center mt-6">No feedback available yet.</p>
                )
            )}

            <div className="flex justify-center mt-8 gap-3">
                <button 
                    onClick={getAiResponse}
                    className="flex items-center gap-2 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
                >
                    <RefreshCw size={16} /> Refresh
                </button>

                <button 
                    onClick={()=>{navigate(-3)}}
                    className="flex items-center gap-2 bg-black text-white py-2 px-8 rounded-md hover:bg-gray-800 transition"
                >
                    <ArrowLeft size={16} />Back
                </button>

            </div>
        </div>
    );
}
