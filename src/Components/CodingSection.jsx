import { useLocation, useNavigate } from "react-router-dom";


export default function CodingSection() {
    const location = useLocation();
    const selectedSet = location.state?.selectedSet;
    const navigate = useNavigate();

    if (!selectedSet) {
        return <p className="text-center text-red-500">No set selected.</p>;
    }
    

    console.log("Coding Questions:", selectedSet.codingQuestions);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Coding Questions</h2>
            
            <div className="space-y-4">
                {selectedSet.codingQuestions.map((questionObj) => {
                    const { questionTitle, example, testCases, questionId } = questionObj;

                    const formattedTestCases = testCases.map(tc => ({
                        input: tc.input,
                        expectedOutput: tc.expectedOutput ?? "Invalid output"  
                    }));





                    console.log("Formatted Test Cases:", formattedTestCases);
                    return (
                        <div 
                            key={questionId} 
                            className="p-5 bg-white shadow-md rounded-lg border border-gray-200 cursor-pointer 
                                       hover:shadow-lg hover:bg-gray-50 transition duration-300"
                            onClick={() => navigate(`/code-editor/${questionId}`, { 
                                state: { questionTitle, example, testCases , questionId } 
                            })}
                        >
                            <p className="text-lg font-semibold text-gray-800">{questionTitle}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
