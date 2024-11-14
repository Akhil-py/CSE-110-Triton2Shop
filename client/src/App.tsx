import { AppProvider } from "./context/AppContext";
import { HomePage } from "./views/HomePage";
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import RequestTracker from './Components/Request Tracker/requestTracker';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rq-tracker" element={<RequestTracker />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
