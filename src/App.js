import './App.css';
import Navbar from './Components/Navbar';
import TextArea from './Components/TextArea';
import { useRef, useState, useEffect } from 'react';
import Alert from './Components/Alert';
import About from './Components/About';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    document.body.style.backgroundColor = '#0f172a';
    document.body.style.color = '#e0f2fe';
  }, []);

  const toggleMode = () => {
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#e0f2fe';
      showAlert("Dark Mode Enabled.", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = '#f5faff';
      document.body.style.color = '#001f3f';
      showAlert("Light Mode Enabled.", "success");
    }
  };


  const [alert, setAlert] = useState(null);
  const alertTimeoutRef = useRef(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });

    // Clear any existing timeout
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }

    // Set timeout to dismiss alert
    alertTimeoutRef.current = setTimeout(() => {
      setAlert(null);
      alertTimeoutRef.current = null;
    }, 3000);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);


  return (
    <Router>
      <Navbar title="TextUtils" AboutText="About TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route path="/about" element={<About mode={mode} />} />
          <Route path="/" element={<TextArea showAlert={showAlert} heading="Enter your Text to analyze." mode={mode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
