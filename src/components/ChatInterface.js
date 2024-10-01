import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ChatInterface() {
  const location = useLocation();
  const { userId, pdfName } = location.state || {}; // Access passed state

  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Function to handle query submission
  const handleQuerySubmit = async () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          pdf_name: pdfName,
          query: query,
          history: chatHistory,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const newResponse = data.response;
        setChatHistory([...chatHistory, { query, response: newResponse }]);
        setQuery(""); // Clear the query input after submission
      } else {
        alert("Error getting response: " + data.message);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      alert("Error getting response from the server.");
    }
  };

  // Function to clear the chat history
  const handleClearChat = () => {
    setChatHistory([]);
  };

  // If userId or pdfName is missing, render an error message
  if (!userId || !pdfName) {
    return (
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Error</h2>
        <p>Missing user information or PDF selection. Please go back and select a PDF to chat with.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <div className="w-full max-w-2xl p-4 bg-pink-200 shadow-lg rounded-lg border border-green-300 mb-4">
        <div className="h-96 overflow-y-auto p-4 bg-pink-50 rounded-lg border border-green-200">
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="text-left mb-1">
                <span className="text-blue-700 font-semibold">User:</span>
                <div className="inline-block ml-2 bg-blue-100 text-blue-900 p-2 rounded-lg">
                  {chat.query}
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-700 font-semibold">Response:</span>
                <div className="inline-block ml-2 bg-green-100 text-green-900 p-2 rounded-lg">
                  {chat.response}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-2xl flex items-center space-x-4">
        <input
          type="text"
          placeholder="Message Daalo"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border border-green-300 p-3 rounded-lg shadow-md focus:outline-none"
        />
        <button
          onClick={handleQuerySubmit}
          className="bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 shadow-md"
        >
          <span role="img" aria-label="send">📤</span>
        </button>
        <button
          onClick={handleClearChat}
          className="bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 shadow-md"
        >
          Chat Clear Kare
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;




