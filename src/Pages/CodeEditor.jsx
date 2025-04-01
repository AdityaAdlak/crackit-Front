
import {useLocation} from "react-router-dom"
import Editor from "@monaco-editor/react";
import {useState} from "react"
import axios from "axios";
import Loader from "../Components/Loader";
import { jwtDecode } from "jwt-decode";


export default function CodeEditor()
{
    const location = useLocation();
    const question = location.state?.questionTitle;
    const questionExample= location.state?.example;
    const questionTestCase =location.state?.testCases || [];


    const visibleTestCases = questionTestCase.slice(0,2);

    const [code, setCode] = useState("// Write your code here...");
    const [lang, setLanguage] = useState("cpp"); 
    const [mode,setMode] = useState("vs-light")
    const [runData, setRunData] = useState(null); 
    const [submitData, setSubmitData] = useState(null);
    const [isRunning , setIsRunning] = useState(false);
    const [isSubmitting , setIsSubmitting] = useState(false);




    // console.log(question);
    // console.log(questionExample);
    // console.log(questionTestCase)
    if (!question || !questionExample || !questionTestCase) {
        return <p className="text-center text-red-500">No question selected.</p>;
    }



    
    async function submitHandler() {
        try {
            

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
                console.warn("No token found!");
            }

            

            setIsSubmitting(true);
            const testCases = questionTestCase.map(test => ({
                input: test.input, 
                expectedOutput: test.expectedOutput 
            }));

            

           
      
    
            const response = await axios.post(
                "http://localhost:3000/user/v1/execute",
                {
                    code,
                    lang,
                    testCases
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            


            
            setSubmitData(response.data)
    
            console.log("Response from backend: The GCC REsponse", response.data);

            console.log(response.data.successRate)

            if(response.data.successRate === "100.00%")
            {
                const questionId = location.state?.questionId;  

                if(!questionId)
                {
                    console.error("Question ID is missing! Cannot update analytics.");
                return;
                }

                const codingUserAnalytics = await axios.post(`http://localhost:3000/user/v1/coding/${userId}`, {
                    correctSolvedQuestionsIds: [questionId]
                });

                console.log("coding userAnalytics",codingUserAnalytics)
            }


        } catch (error) {
            console.log("Error in compiling the code...", error.response ? error.response.data : error);
        }
        finally{
            setIsSubmitting(false);
            
        }
    }





    async function runHandler() {
        try {
            setIsRunning(true);

            const testCases = visibleTestCases.map(test => ({
                input: test.input, 
                expectedOutput: test.expectedOutput 
            }));

           
      
    
            const response = await axios.post(
                "https://crackit-backend-g70k.onrender.com/user/v1/execute",
                {
                    code,
                    lang,
                    testCases
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            setRunData(response.data);
    
            console.log("Response from backend:", response.data);
        } catch (error) {
            console.log("Error in compiling the code...", error.response ? error.response.data : error);
        }
        finally{
            setIsRunning(false);
        }
    }
    

    

        return (
            <div className="flex flex-col md:flex-row h-screen bg-gray-100">
               
                <div className="w-full md:w-1/2 p-4 overflow-auto border-r border-gray-300 bg-white">
                    <h2 className="text-xl font-bold text-gray-900">{question}</h2>
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Example</h3>
                        <pre className="text-sm bg-gray-100 p-2 rounded-md">{JSON.stringify(questionExample, null, 2)}</pre>
                    </div>
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
             <h3 className="text-md font-semibold text-gray-700 mb-2">Test Cases</h3>
                        {visibleTestCases.map((test, index) => (
                            <pre key={index} className="text-sm bg-gray-100 p-2 rounded-md mb-2">{JSON.stringify(test, null, 2)}</pre>
                        ))}
                        <p className="text-gray-800">Hidden Testcases Present...</p>
                    </div>
                </div>
                
              
            <div className="w-full md:w-1/2 flex flex-col p-4 bg-white">
                    <div className="flex flex-wrap gap-2">


                        <select value={lang} onChange={(e) => setLanguage(e.target.value)} className="border rounded px-2 py-1 text-sm">
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="javascript">JavaScript</option>
                        </select>


                        <select value={mode} onChange={(e) => setMode(e.target.value)} className="border rounded px-2 py-1 text-sm">
                            <option value="vs-light">Light</option>
                            <option value="vs-dark">Dark</option>
                        </select>


                    </div>


                    <Editor className="mt-4 border rounded-lg" height="50vh" language={lang} theme={mode} value={code} onChange={(newCode) => setCode(newCode)} options={{ fontSize: 14, minimap: { enabled: false } }} />
                    <div className="mt-4 flex flex-wrap gap-2">
                        <button className="bg-[#0a0f1a] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={runHandler}>Run</button>
                        <button className="bg-[#0a0f1a] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={submitHandler}>Submit</button>
                    </div>


                    <div className="mt-4 overflow-auto max-h-48">
                        {isRunning ? <Loader /> : runData && (
                            <div className="p-4 border rounded-lg bg-gray-50">
                                <h3 className="text-md font-semibold">Run Results</h3>
                                <pre className="text-sm bg-gray-100 p-2 rounded-md">Success Rate: {runData.successRate}</pre>
                            </div>
                        )}



                        {isSubmitting ? <Loader /> : submitData && (
                            <div className="p-4 border rounded-lg bg-gray-50">
                                <h3 className="text-md font-semibold">Submit Results</h3>
                                <pre className="text-sm bg-gray-100 p-2 rounded-md">Success Rate: {submitData.successRate}</pre>
                            </div>
                        )}

            
        </div>
                </div>
            </div>
        );

}
