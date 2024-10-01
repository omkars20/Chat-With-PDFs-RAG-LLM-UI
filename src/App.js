import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadPDFPage from "./components/UploadPDFPage";
import ChatSelectionPage from "./components/ChatSelectionPage";
import ChatInterface from "./components/ChatInterface";  // Make sure to import ChatInterface

function App() {
  return (
    <Router>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">PDF Chatbot Application</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center space-y-4">
                <Link to="/upload" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Upload PDF
                </Link>
                <Link to="/chat-selection" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Chat with Uploaded PDFs
                </Link>
              </div>
            }
          />
          <Route path="/upload" element={<UploadPDFPage />} />
          <Route path="/chat-selection" element={<ChatSelectionPage />} />
          <Route path="/chat" element={<ChatInterface />} />  {/* This defines the /chat route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



