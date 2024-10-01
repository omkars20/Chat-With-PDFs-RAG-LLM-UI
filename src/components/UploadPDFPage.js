import React, { useState } from "react";

function UploadPDFPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !userName) {
      alert("Please provide both a User Name and a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("username", userName);
    formData.append("pdf", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload_pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Upload successful: " + data.message);
      } else {
        alert("Error uploading PDF: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading PDF.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload PDF</h2>
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Upload PDF
      </button>
    </div>
  );
}

export default UploadPDFPage;

