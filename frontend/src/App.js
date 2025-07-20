import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file first.");

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/upload ', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: '#f4f4f9',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    }}>
      <div style={{
        maxWidth: '700px',
        margin: 'auto',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>PDF Summarizer</h2>
        <h3>This is a PDF summarizer.Please upload the pdf and the agent will give a summarization of it.</h3>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: '1rem' }}
        />
        <br />
        <button
          onClick={handleUpload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Summarizing...' : 'Upload & Summarize'}
        </button>

        {summary && (
          <div style={{ marginTop: '2rem' }}>
            <h3>📌 Summary:</h3>
            <div style={{
              backgroundColor: '#f9f9f9',
              padding: '1rem',
              borderRadius: '8px',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5'
            }}>
              {summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
