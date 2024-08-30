"use client";

import { useState } from "react";

const AskAIButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleAskAI = async () => {
    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "Your question here" }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Use data.response here
      console.log(data.response);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleAskAI}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "Asking AI..." : "Ask AI"}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskAIButton;
