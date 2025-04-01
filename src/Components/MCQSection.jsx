

import { useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MCQSection() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedSet = location.state?.selectedSet;

    const [userAnswers, setUserAnswers] = useState([]);
    
    

    
    console.log(selectedSet)

    if (!selectedSet) {
        return <p className="text-center text-red-500">No Set Selected...</p>;
    }

    
    



    // keeps the updated value only always

    const handleOptionChange = (questionId, selectedOption) => {
        setUserAnswers(prevAnswer => {
            const updatedAnswers = prevAnswer.filter(ans => ans.questionId !== questionId);
            return [...updatedAnswers, { questionId, userAnswer: selectedOption }];
        });
    };
    

    const handleSubmission = async () => {
        const correctAnswers = selectedSet.mcqQuestions.map(q => ({
            questionId: q.questionId,  
            correctAnswer: q.correctOption,
        }));
    
        let score = 0;
        let correctAnsArray = [];
    
        userAnswers.forEach(userAns => {
            const correctAns = correctAnswers.find(ans => ans.questionId === userAns.questionId);
            if (correctAns && correctAns.correctAnswer === userAns.userAnswer) {
                correctAnsArray.push({
                    questionId: userAns.questionId,  
                    question: selectedSet.mcqQuestions.find(q => q.questionId === userAns.questionId)?.question, 
                    answer: userAns.userAnswer,
                    correct: true
                });
                score++;
            }
        });
    
        navigate("/correctMCQ", { state: { correctAnswers: correctAnsArray, score } });
    };
    



    return (
        <div className="min-h-screen flex flex-col items-center p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                MCQ Section - Set {selectedSet.setNumber}
            </h2>

            <div className="w-full max-w-3xl space-y-6">
                {selectedSet.mcqQuestions.map((questionObj, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{questionObj.question}</h3>

                        <div className="space-y-3">
                            {questionObj.options.map((option, optIndex) => (
                                <label 
                                    key={optIndex} 
                                    className="flex items-center space-x-3 bg-gray-100 p-4 rounded-xl shadow-md hover:bg-gray-200 transition cursor-pointer"
                                >
                                   <input
                             type="radio"
                            name={`question-${questionObj.questionId}`} 
                                value={option}
                    onChange={() => handleOptionChange(questionObj.questionId, option)}  
                    className="form-radio text-blue-600 focus:ring-blue-400"
                        />

                                    <span className="text-gray-800 text-lg">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSubmission}
                className="mt-8 px-6 py-3 bg-[#0a0f1a] text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </div>
    );
   

}
