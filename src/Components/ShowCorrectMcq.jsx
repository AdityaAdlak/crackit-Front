import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"
import { useNavigate, useLocation } from "react-router-dom";

export default function ShowCorrectMcq() {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("token"); 
    let userId = null;
    
    if (token) {
        try {
            const decoded = jwtDecode(token); 
            userId = decoded.id;
            console.log("this is userID : ", userId);
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    const { correctAnswers, score} = location.state || { correctAnswers: [], score: 0 };



    useEffect(() => {
        if (userId && correctAnswers.length > 0) {
            const formattedAnswers = correctAnswers.map(ans => ({
                questionId: ans.questionId,  
                correctAnswer: ans.correct ? ans.answer : null, 
                userAnswer: ans.answer 
            }));
    
            fetch(`https://crackit-backend-g70k.onrender.com/user/v1/updateMcqAnalytics/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mcqAnswers: formattedAnswers }) 
            })
            .then((res) => res.json())
            .then((data) => console.log("Analytics updated:", data))
            .catch((error) => console.error("Error updating analytics:", error));
        }
    }, [userId, correctAnswers]);
    
    return (
        <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-lg font-bold text-gray-800">MCQ Results</h2>
            <p className="text-md text-gray-700">Score: {score}</p>

            <div className="mt-4 space-y-4">
                {correctAnswers.length === 0 ? (
                    <p className="text-red-500">No answers tracked.</p>
                ) : (
                    correctAnswers.map((ans, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                            <p className="font-semibold">{ans.question}</p>
                            <p className={`mt-1 ${ans.correct ? "text-green-500" : "text-red-500"}`}>
                                Your Answer: {ans.answer} {ans.correct ? "✅" : "❌"}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate(-2)}
                className="mt-4 px-4 py-2 bg-[#0a0f1a] text-white rounded-lg hover:bg-blue-600"
            >
                Back
            </button>
        </div>
    );
}
