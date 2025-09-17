import './App.css';
import Navbar from './Components/Navbar';
import TextArea from './Components/TextArea';
import { useRef, useState, useEffect } from 'react';
import Alert from './Components/Alert';
import About from './Components/About';
// -> 1. Import useLocation from react-router-dom
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// A new component to handle the title change logic
function PageTitleUpdater() {
  // -> 2. Get the location object
  const location = useLocation();

  // -> 3. Add useEffect to update the title when the location changes
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'TextUtils - Home';
        break;
      case '/about':
        document.title = 'TextUtils - About';
        break;
      default:
        document.title = 'TextUtils'; // Fallback title
        break;
    }
  }, [location]); // The effect runs every time the location object changes

  return null; // This component does not render anything
}

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
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    alertTimeoutRef.current = setTimeout(() => {
      setAlert(null);
      alertTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Router>
      {/* This component will now handle all title updates */}
      <PageTitleUpdater />
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