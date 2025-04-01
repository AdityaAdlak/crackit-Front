import { useState } from "react";

export default function CrackAI() {
  const [prompts, setPrompts] = useState("");
  const [result, setResult] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    const prompt = { contents: prompts };
    try {
      const response = await fetch("https://crackit-backend-g70k.onrender.com/user/v1/askAi", {
        method: "POST",
        body: JSON.stringify(prompt),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Something went wrong from getting AI response...");
      }

      const data = await response.json();
      setResult(data.data || "No response from AI");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0a0f1a] p-6 rounded-lg shadow-lg">
        <form onSubmit={submitHandler} className="space-y-4">
          <div className="text-2xl font-bold text-[#38bdf8]">
            CrackAI Search
          </div>
          <input
            type="text"
            placeholder="Search here..."
            value={prompts}
            onChange={(e) => setPrompts(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#1a2233] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
          />
          <button
            type="submit"
            className="w-full bg-[#38bdf8] text-white py-2 rounded-lg font-semibold hover:bg-[#1e3a8a] transition duration-300"
          >
            Click Here
          </button>
        </form>
      </div>
    </div>
  );
}
