


import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import { jwtDecode } from "jwt-decode";
import Logout from "./LogoutPage";
import {toast} from "react-hot-toast"

const COLORS = ["#38bdf8", "#e5e7eb"];

function UserAnalytics() {
  const [userId, setUserId] = useState(null);
  const [correctCoding, setCorrectCoding] = useState(0);
  const [correctMcq, setCorrectMcq] = useState(0);
  const [totalCoding, setTotalCoding] = useState(0);
  const [totalMcq, setTotalMcq] = useState(0);
  const [improvementData, setImprovementData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token of userAnalytics:", token); 
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        if (decodedToken.id) {
          setUserId(decodedToken.id); 
        } else {
          console.warn("User ID not found in token!");
        }
      } catch (err) {
        console.error("Invalid token!", err);
      }
    } else {
      console.error("No token found!");
    }
  }, []);

  async function getData() {
    if (!userId) {
      console.error("User ID is not available, cannot fetch data.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token available for API request , Login first");
        return;
      }
const response = await fetch(`https://crackit-backend-g70k.onrender.com/user/v1/userAnalytics/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
      console.error("Error in getting response in userAnalytics...");
        return;
      }

      const data = await response.json();
      console.log("Received Analytics Data:", data); 

      setTotalMcq(data.data.totalMCQ || 0);
      setTotalCoding(data.data.totalCoding || 0);
      setCorrectCoding(data.data.correctCoding || 0);
      setCorrectMcq(data.data.correctMCQ || 0);

      if (data.data.improvementOverTime.length > 0) {
        const improvement = data.data.improvementOverTime.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-GB"),
          score: item.score || 0,
          codingScore: item.codingScore || 0
          
        }));


        console.log("the correct coding question is ",improvement.codingScore)
        console.log("the correct MCQ question is ",improvement.score)


 setImprovementData(improvement);
      } else {
        setImprovementData([]);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }

  }

  useEffect(() => {
    if (userId) {
            console.log("User ID available, fetching data...");
      getData();
    }
  }, [userId]); 

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          User Analytics



        </h2>

        <button
          onClick={(e) => {
            e.preventDefault();
            getData();
          }}
          className="bg-[#0a0f1a] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
        >
          Show Analytics
        </button>

        <div className="flex flex-wrap gap-6 justify-center mt-15">
  
          <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Coding Stats</h3>
            <div className="w-full max-w-[200px]">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={[
                      { name: "Correct", value: correctCoding },
                      { name: "Remaining", value: totalCoding - correctCoding },
                    ]}
                    cx="50%" cy="50%"
                    innerRadius={40} outerRadius={60}
                    paddingAngle={3} dataKey="value"
                  >
                    <Cell key="cell-0" fill={COLORS[0]} />
                    <Cell key="cell-1" fill={COLORS[1]} />
                  </Pie>
                  <Tooltip />
                </PieChart>
  </ResponsiveContainer>
            </div>
            <p className="text-sm font-semibold text-blue-500">
              {correctCoding} / {totalCoding} ({totalCoding ? Math.round((correctCoding / totalCoding) * 100) : 0}%)
            </p>
          </div>

        
          <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">MCQ Stats</h3>
            <div className="w-full max-w-[200px]">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={[
                      { name: "Correct", value: correctMcq },
                      { name: "Remaining", value: totalMcq - correctMcq },
                    ]}
                    cx="50%" cy="50%"
                    innerRadius={40} outerRadius={60}
                    paddingAngle={3} dataKey="value"
                  >
                    <Cell key="cell-0" fill={COLORS[0]} />
                    <Cell key="cell-1" fill={COLORS[1]} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm font-semibold text-blue-500">
              {correctMcq} / {totalMcq} ({totalMcq ? Math.round((correctMcq / totalMcq) * 100) : 0}%)
            </p>
          </div>
        </div>

      
        <div className="mt-30">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Improvement Over Time</h3>
          <div className="w-full">
            

<ResponsiveContainer width="100%" height={250}>
  <LineChart data={improvementData.length ? improvementData : [{ date: "", score: 0 , codingScore: 0}]}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={2} name="MCQ Improvement" className="mr-5"/>
    <Line type="monotone" dataKey="codingScore" stroke="#0a0f1a" strokeWidth={2} name="Coding Improvement" className="ml-5"/>
  </LineChart>
</ResponsiveContainer>

          </div>
        </div>
      </div>
      <br></br>
      <center><Logout/></center>
    </div>
  );
}

export { UserAnalytics };
