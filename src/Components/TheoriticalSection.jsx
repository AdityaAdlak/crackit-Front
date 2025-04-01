

import { useState } from "react";
import { useLocation , useNavigate} from "react-router-dom";



export default function TheorySection() {
    const location = useLocation();
    const selectedSet = location.state?.selectedSet;
    const navigate = useNavigate();


    // console.log("Printing selectedSet questionType" , selectedSet.questionType)
    const [userAnswer , setUserAnswers] = useState([]);

   

    if (!selectedSet) {
        return <p className="text-center text-red-500">No set selected.</p>;
    }

    const handleTheoreticalAnswer = (index, answer) => {
        setUserAnswers(prev => {
            const updatedAnswers = [...prev];
    
            if (selectedSet.theoreticalQuestions[index]) { 
                updatedAnswers[index] = { 
                    question: selectedSet.theoreticalQuestions[index].question,
                    answer,
                    questionType: selectedSet.theoreticalQuestions[index].questionType || "unknown"
                };
            }
    
            return updatedAnswers;
        });
    };

    const submitHandler = () =>
    {
        const selectedSetId = selectedSet.setId;
        navigate("/aiChecker" , {state : {userAnswer , selectedSetId}})
    }


    console.log(userAnswer)

    return (
        <div className="min-h-screen flex flex-col items-center p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Theory Section - Set {selectedSet.setNumber}
            </h2>

            <div className="w-full max-w-3xl space-y-6">
                {selectedSet.theoreticalQuestions.map((questionObj, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {index + 1}. {questionObj.question}
                        </h3>
                        <textarea 
                            className="w-full mt-2 p-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Write your answer here..."
                            rows="5"
                            onChange={(e) => handleTheoreticalAnswer(index, e.target.value)}
                            />

                    </div>
                ))}
            </div>

            <button className="mt-8 px-6 py-3 bg-[#0a0f1a] text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition" onClick={submitHandler}> 
                Submit
            </button>
        </div>
    );
}
