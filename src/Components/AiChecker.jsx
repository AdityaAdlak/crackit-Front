


import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SplineComponent from "./Floating3js";
import Loader from "./Loader";
import { useState } from "react";
import {toast} from "react-hot-toast";

export default function AiChecker() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loaderOn , setLoaderOn] = useState(false);
    
    // Get token from localStorage
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

    // Extract values from state
    const selectedSetId = location.state?.selectedSetId || null;
    const userAnswer = location.state?.userAnswer || [];

    

    async function submitAnswers() {
        if (!userId || !selectedSetId) {
            alert("Missing user or interview set ID!");
            return;
        }

        try {
            setLoaderOn(true);
            const response = await axios.post("https://crackit-backend-g70k.onrender.com/user/v1/submit", {
                userId,
                interviewSetId: selectedSetId,
                answers: userAnswer,
                codingQueLang: "cpp",
            });

            console.log("The AI Response:", response);


            if (response.data.success) {
                const userAnswerId = response.data.data._id;
                toast.success("Answers submitted successfully!");

                
                navigate(`/aiResponse/${userAnswerId}`, { state: { selectedSetId } });
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            console.error("Error submitting answers:", error);
            alert("Something went wrong. Please try again.");
        }
        finally{
            setLoaderOn(false);
        }
    }

    return (
        <div>
            {
                loaderOn ? (<Loader/>) : 
            (<button onClick={submitAnswers}><SplineComponent/></button>)
                }
        </div>
    );
}


