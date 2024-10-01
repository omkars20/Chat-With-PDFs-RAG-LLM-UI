import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatSelectionPage() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch("http://localhost:5000/get_documents");
        const data = await response.json();
        if (response.ok) {
          setDocuments(data.documents);
        } else {
          alert("Error fetching documents: " + data.message);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        alert("Error fetching documents from the server.");
      }
    }

    fetchDocuments();
  }, []);

  const handleChatClick = (username, pdfName) => {
    console.log("Navigating to /chat with:", { username, pdfName });
    navigate("/chat", { state: { userId: username, pdfName } });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Select PDF to Chat</h2>
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-md shadow">
            <p><strong>User:</strong> {doc.username}</p>
            <p><strong>PDF Name:</strong> {doc.doc_name}</p>
            <button
              onClick={() => handleChatClick(doc.username, doc.doc_name)}
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600"
            >
              Chat with this PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSelectionPage;

